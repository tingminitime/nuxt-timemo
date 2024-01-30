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
        <div class="flex flex-col items-start justify-between gap-y-2">
          <span class="relative line-clamp-2 grow font-semibold">{{ title }}</span>
          <!-- Publish date -->
          <dl
            v-if="publishedDate"
            class="relative order-first shrink-0 text-sm text-gray-600 dark:text-gray-300 md:text-base"
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
        </div>
      </NuxtLink>
    </h2>

    <!-- Article description -->
    <p class="relative text-sm text-gray-600 dark:text-gray-300 md:text-base">
      {{ description }}
    </p>

    <!-- Article tags -->
    <div class="relative z-30 mt-2 flex flex-wrap gap-x-3">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        to="/"
        class="flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600 transition duration-100 ease-in-out hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 hover:dark:bg-gray-500"
      >
        <span class="relative shrink-0">
          {{ tag }}
        </span>
      </NuxtLink>
    </div>
  </article>
</template>

<style scope></style>
