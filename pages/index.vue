<script setup lang="ts">
import RichTextEditor from "../modules/RichTextEditor/RichTextEditor.vue";

const content = ref("");
</script>

<template>
  <ClientOnly>
    <RichTextEditor v-model="content" />
  </ClientOnly>
</template>
