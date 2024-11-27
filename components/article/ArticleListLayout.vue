<script setup lang="ts">
defineProps<{
  year: string
}>()
</script>

<template>
  <div class="text-2xl font-semibold text-gray-500 dark:text-gray-400 md:text-3xl">
    {{ year }}
  </div>
  <div class="mb-6 grid grid-cols-1 items-start gap-y-5">
    <slot></slot>
  </div>
</template>

<style scope></style>
