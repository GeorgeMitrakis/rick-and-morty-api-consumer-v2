// Note: loading="lazy" doesn't work on <img> elements tht are rendered after the page loads (like in vue client components).
// You can use this composable, that makes use of the Intersection Observer API instead.
import { onMounted, onUnmounted, ref } from "vue";

export function useLazyImage(rootMargin = "24px") {
  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const img = entry.target as HTMLImageElement;
          const src = img.dataset?.src;

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        });
      },
      { rootMargin },
    );
  });

  function observe(el: HTMLImageElement) {
    if (el && observer) observer.observe(el);
  }

  onUnmounted(() => observer?.disconnect());

  return { observe };
}
