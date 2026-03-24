<template>
  <article>
    <a href="#" @click.prevent="() => console.log(props.name)">
      <img :src="props.image" loading="lazy" :alt="props.name" />
      <div class="details">
        <div class="title">{{ name }}</div>
        <div class="info">
          <span class="status status-alive"></span>
          <span>{{ status }} - {{ species }}</span>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup>
const props = defineProps({
  // as returned from the /character api endpoint
  name: String,
  status: String,
  species: String,
  image: String,
});
</script>

<style scoped>
article {
  border: 1px solid var(--character-card-border, transparent);
  box-shadow: 0 0 5px 1px var(--character-card-border);
  border-radius: 4px;
  background-color: white;
  width: 230px;
  max-height: 120px;

  &:hover {
    --character-card-border: #00ff00;
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
