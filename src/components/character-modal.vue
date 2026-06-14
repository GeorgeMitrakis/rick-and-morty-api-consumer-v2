<template>
    <Teleport to="body">
        <dialog id="character-modal" v-if="character" popover :open="character">
            <button @click="$emit('close')">✕</button>
            <h2>{{ character }}</h2>
        </dialog>
    </Teleport>
</template>

<script setup>
defineProps({
    character: String,
});
defineEmits(["close"]);
</script>

<style>
dialog {
    padding-inline: 16px;

    h2 {
        text-wrap-style: balance;
        text-align: center;
    }

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }
}

body:has(:popover-open) {
    overflow: hidden;
}
</style>
