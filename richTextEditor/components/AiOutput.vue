<script setup lang="ts">
import sanitizeHtml from "sanitize-html";

const props = defineProps<{
  text: string;
}>();

defineEmits<{
  (e: "onInsertClick"): void;
}>();

const sanitizedText = computed(() => sanitizeHtml(props.text));
</script>

<template>
  <p v-html="sanitizedText" />
  <div class="mt-4">
    <button
      type="button"
      class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="$emit('onInsertClick')"
    >
      Insert
    </button>
  </div>
</template>
