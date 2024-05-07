<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
  <a
    :href
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    rel="noopener nofollow"
    target="blank"
  >
    <slot />
  </a>
</template>
