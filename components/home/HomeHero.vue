<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex max-w-2xl flex-col gap-6">
    <img
      class="size-16 rounded-full"
      src="/tim-avatar.webp"
      alt="my avatar"
    >
    <h1 class="text-4xl font-bold leading-[3.5rem] tracking-tight sm:text-5xl">
      {{ title }}
    </h1>
    <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<style scope></style>
