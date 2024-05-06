<script setup lang="ts">
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <div class="min-h-100 flex space-between">
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
