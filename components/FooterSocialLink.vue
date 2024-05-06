<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    href: string;
    d?: string;
    viewBox?: string;
  }>(),
  {
    viewBox: "0 0 24 24",
  }
);
</script>

<template>
  <a
    :href
    target="_blank"
    ref="noopener noreferrer nofollow"
    class="text-gray-500 hover:text-gray-400"
  >
    <span class="sr-only"> {{ label }} </span>
    <slot>
      <svg class="h-6 w-6" fill="currentColor" :viewBox aria-hidden="true">
        <path :d />
      </svg>
    </slot>
  </a>
</template>
