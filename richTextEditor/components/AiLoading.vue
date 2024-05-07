<template>
  <div class="w-full rounded-md">
    <div class="animate-pulse space-x-4">
      <div class="space-y-3">
        <div class="v-item" />
        <div class="grid grid-cols-3 gap-4">
          <div class="v-item col-span-2" />
          <div class="v-item col-span-1" />
        </div>
        <div class="v-item" />
        <div class="grid grid-cols-3 gap-4">
          <div class="v-item col-span-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-item {
  @apply h-1 rounded bg-gray-200 dark:bg-gray-700;
}
</style>
