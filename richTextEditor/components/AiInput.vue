<script setup lang="ts">
defineEmits<{
  (e: "onSubmit", value: string): void;
}>();

const model = ref("");
</script>

<template>
  <form @submit.prevent="$emit('onSubmit', model.trim())">
    <input
      id="ai"
      autofocus
      v-model="model"
      type="text"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Ask anything!"
    />
  </form>
</template>
