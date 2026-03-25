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

  <button v-if="!loading && !allCharactersAreLoaded" @click="loadMoreCharacters()">
    Load more
  </button>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import Character from "./character.vue";

const characters = ref([]);
const nextPage = ref("https://rickandmortyapi.com/api/character");

onMounted(async () => {
  await loadMoreCharacters();
});

const loading = computed(() => characters.value.length === 0);
const allCharactersAreLoaded = computed(() => nextPage.value === null);

async function loadMoreCharacters() {
  if (!nextPage.value) {
    alert("No more characters to load.");
    return;
  }
  try {
    const response = await (await fetch(nextPage.value)).json();
    characters.value = [...characters.value, ...response.results];
    nextPage.value = response.info?.next;
  } catch (err) {
    console.error(err);
  }
}
</script>
