<script setup lang="ts">
const content = ref("<h1>Tiptap AI Extension</h1>");
</script>

<template>
  <RichTextEditor v-model="content" />
</template>
