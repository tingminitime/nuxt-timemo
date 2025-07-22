<script setup lang="ts">
defineProps<{
  to?: string
  title?: string
  description?: string
  author?: string
  category?: string
  coverImage?: string
  publishedDateFormat?: string
  publishedDateIsoString?: string
}>()
</script>

<template>
  <!-- TODO: 加上主要圖片 -->
  <article class="group relative z-0 p-3 max-md:rounded-lg max-md:bg-white max-md:dark:bg-gray-700 md:px-4">
    <!-- Hover effect -->
    <div class="absolute inset-0 z-0 rounded-xl opacity-0 transition-all duration-150 ease-in scale-95 md:rounded-xl md:bg-gray-300/30 md:group-hover:opacity-100 md:group-hover:scale-100 md:dark:bg-gray-600/20"></div>

    <!-- Article title -->
    <h2>
      <NuxtLink
        :to="to"
        :aria-label="`前往 - ${title}`"
      >
        <!-- Cover click range -->
        <span class="absolute inset-0 z-30 sm:rounded-2xl"></span>
        <!-- Article title and publish date -->
        <span class="relative z-20 block grow overflow-hidden truncate text-base font-medium leading-6 drop-shadow-md md:text-lg">
          {{ title }}
        </span>
      </NuxtLink>
    </h2>

    <!-- Article description -->
    <p class="relative z-20 mt-1.5 truncate text-sm text-gray-600 dark:text-gray-300">
      {{ description }}
    </p>

    <!-- Article published date and category -->
    <div class="mt-2 flex gap-x-4">
      <!-- Publish date -->
      <dl
        v-if="publishedDateFormat"
        class="relative shrink-0 text-sm text-gray-500 dark:text-gray-400"
      >
        <dt class="sr-only">
          Published on
        </dt>
        <dd class="flex items-center gap-x-1">
          <Icon name="i-heroicons-calendar-20-solid" />
          <time :datetime="publishedDateIsoString">
            {{ publishedDateFormat }}
          </time>
        </dd>
      </dl>
      <!-- Article category -->
      <dl
        v-if="category"
        class="relative z-20 shrink-0 text-sm text-gray-500 dark:text-gray-400"
      >
        <dt class="sr-only">
          Category
        </dt>
        <dd class="flex items-center gap-x-1">
          <Icon name="i-heroicons-folder-arrow-down-20-solid" />
          <span>{{ category }}</span>
        </dd>
      </dl>
    </div>

    <!-- Article category -->
  </article>
</template>

<style scope></style>
