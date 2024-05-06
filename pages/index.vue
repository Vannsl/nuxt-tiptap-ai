<script setup lang="ts">
import { ref } from "vue";
import RichTextEditor from "../modules/RichTextEditor/RichTextEditor.vue";

const content = ref("");
</script>

<template>
  <ClientOnly>
    <RichTextEditor v-model="content" />
  </ClientOnly>
</template>
