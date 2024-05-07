<script setup lang="ts">
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <div class="min-h-100 flex space-between">
    <main class="container px-6 pb-8 pt-6 lg:px-8 mx-auto mb-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
