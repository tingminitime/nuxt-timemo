<script setup lang="ts">
defineProps<{
  to?: string
  title?: string
  description?: string
  author?: string
  category?: string
  coverImage?: string
  publishedDate?: string | Date
}>()
</script>

<template>
  <article class="group relative z-0">
    <!-- Article title -->
    <h2>
      <NuxtLink to="/">
        <!-- Cover click range -->
        <span class="absolute inset-0 z-30 sm:rounded-2xl"></span>
        <!-- Article title and publish date -->
        <span class="relative z-20 block grow overflow-hidden truncate text-base font-medium leading-6 drop-shadow-md md:h-[3em] md:text-lg md:leading-7">
          {{ title }}
        </span>
      </NuxtLink>
    </h2>

    <!-- Article description -->

    <!-- Article published date -->

    <!-- Article category -->
  </article>
</template>

<style scope></style>
