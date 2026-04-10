<template>
    <article>
        <a href="#" @click.prevent="() => console.log(props.name)">
            <img
                ref="image-ref"
                :data-src="props.image"
                :alt="props.name"
                width="1"
                height="1"
            />
            <div class="details">
                <div class="title">{{ name }}</div>
                <div class="info">
                    <span class="status status-alive"></span>
                    <span :aria-label="'Status: ' + status"
                        >{{ statusIcon }} {{ status }} - {{ species }}</span
                    >
                </div>
            </div>
        </a>
    </article>
</template>

<script setup>
import { computed, onMounted, useTemplateRef } from "vue";
import { useLazyImage } from "../composables/lazyImage";

const { observe } = useLazyImage();

const imgRef = useTemplateRef("image-ref");

const props = defineProps({
    // as returned from the /character api endpoint
    name: String,
    status: String,
    species: String,
    image: String,
});

onMounted(() => {
    observe(imgRef.value);
});

const statusIcon = computed(() => {
    // returning emojis, not properly rendered in zed editor
    switch (props?.status) {
        case "Alive":
            return "🟢";
        case "Dead":
            return "🔴";
        case "unknown":
        default:
            return "🟡";
    }
});
</script>

<style scoped>
article {
    /*border: 2px solid var(--character-card-border, transparent);*/
    box-shadow: 0 0 16px 1px var(--character-card-border);
    border-radius: 4px;
    background-color: white;
    width: 230px;
    min-height: 86px;
    max-height: 120px;

    @media (hover: hover) {
        &:hover {
            --character-card-border: darkgreen;
        }
    }
}

a {
    padding: 12px;
    display: flex;
    gap: 12px;
    color: #000000;
    text-decoration: none;
}

img {
    width: 60px;
    height: 60px;
    border-radius: 4px;
}

.title {
    font-size: 16px;
    font-weight: 700;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
}
</style>
