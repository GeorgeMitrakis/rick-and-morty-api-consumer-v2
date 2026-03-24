<template>
  <span v-if="loading">Loading...</span>
  <Character
    v-else
    v-for="character in characters"
    :key="character.id"
    :name="character.name"
    :status="character.status"
    :species="character.species"
    :image="character.image"
  />
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import Character from "./character.vue";

const characters = ref(null);

onMounted(async () => {
  const URL = "https://rickandmortyapi.com/api";

  try {
    const response = await (await fetch(URL + "/character")).json();
    characters.value = response.results;
  } catch (err) {
    console.error(err);
  }
});

const loading = computed(() => characters.value === null);
</script>
