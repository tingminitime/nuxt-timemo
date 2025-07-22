<script setup lang="ts">
import { appDescription } from '~/constants'

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '首頁',
  description: appDescription,
})

// const { isHome } = useActivePath()
</script>

<template>
  <div class="flex max-w-2xl flex-col gap-6">
    <div class="size-16 overflow-hidden rounded-full">
      <img
        class="object-cover"
        src="/tim-avatar.webp"
        alt="my avatar"
      >
    </div>
    <h1 class="text-4xl font-bold leading-[3.5rem] tracking-tight sm:text-5xl">
      {{ title }}
    </h1>
    <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<style scope></style>
