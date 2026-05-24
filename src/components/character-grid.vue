<template>
    <div class="characters-area">
        <span v-if="initialLoading">Loading...</span>
        <Character
            v-else
            v-for="character in characters"
            :key="character.id"
            :name="character.name"
            :status="character.status"
            :species="character.species"
            :image="character.image"
        />
    </div>

    <button
        class="load-more-btn"
        v-if="!initialLoading && !allCharactersAreLoaded"
        @click="loadMoreCharacters()"
    >
        <span :style="{ opacity: buttonLoading ? '0' : '100' }">
            Load more
        </span>
        <span
            :style="{ opacity: buttonLoading ? '100' : '0' }"
            class="load-more-btn-loader"
        ></span>
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

const initialLoading = computed(() => characters.value.length === 0);
const buttonLoading = ref(false);
const allCharactersAreLoaded = computed(() => nextPage.value === null);

async function loadMoreCharacters() {
    if (!nextPage.value) {
        alert("No more characters to load.");
        return;
    }
    try {
        buttonLoading.value = true;
        const response = await (await fetch(nextPage.value)).json();
        characters.value = [...characters.value, ...response.results];
        nextPage.value = response.info?.next;
    } catch (err) {
        console.error(err);
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style>
.characters-area {
    padding-block: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
}

.load-more-btn {
    border: 1px solid darkslategrey;
    box-shadow: 0 0 1px 1px darkslategrey;
    border-radius: 8px;
    padding: 8px 16px;
    font: inherit;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    margin-top: 16px;
    align-self: center;
    position: relative;
}

.load-more-btn-loader {
    width: 16px;
    height: 16px;
    border: 2px solid #000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    position: absolute;
    margin: auto;
    inset: 0;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
