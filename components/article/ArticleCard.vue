<script setup lang="ts">
defineProps<{
  to?: string
  title?: string
  description?: string
  tags?: string[]
  publishedDate?: string
}>()
</script>

<template>
  <article class="group relative flex flex-col gap-y-2 overflow-visible rounded-xl border border-gray-300 bg-gray-100/0 px-4 pb-4 pt-6 transition-colors duration-100 ease-in hover:border-gray-400 dark:border-gray-500 dark:bg-gray-700/0 hover:dark:border-gray-400 sm:rounded-2xl sm:px-6">
    <!-- Hover effect -->
    <div class="absolute inset-0 z-0 scale-75 bg-gray-100/0 transition duration-150 ease-in group-hover:scale-100 group-hover:bg-gray-200/50 dark:bg-gray-700/0 group-hover:dark:bg-gray-700/50 sm:rounded-2xl"></div>

    <h2>
      <NuxtLink to="/">
        <!-- Cover click range -->
        <span class="absolute inset-0 z-20 sm:rounded-2xl"></span>
        <!-- Article title and publish date -->
        <span class="relative line-clamp-2 grow text-base font-semibold md:text-lg">{{ title }}</span>
      </NuxtLink>
    </h2>

    <!-- Article description -->
    <p class="relative text-sm text-gray-600 dark:text-gray-300 md:text-base">
      {{ description }}
    </p>

    <!-- Publish date -->
    <dl
      v-if="publishedDate"
      class="relative shrink-0 text-xs text-gray-500 dark:text-gray-400 md:text-base"
    >
      <dt class="sr-only">
        Published on
      </dt>
      <dd>
        <time :datetime="ISODate(publishedDate)">
          {{ formatDate(publishedDate) }}
        </time>
      </dd>
    </dl>

    <!-- Article category -->
  </article>
</template>

<style scope></style>
