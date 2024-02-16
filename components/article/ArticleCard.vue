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
  <article
    class="group relative flex flex-col gap-y-2 overflow-hidden rounded-xl border border-gray-300 bg-inner-primary-light drop-shadow-lg transition-all duration-100 ease-in translate-z-0 dark:border-gray-500 dark:bg-inner-primary-dark sm:rounded-2xl md:hover:border-gray-400 md:hover:bg-gray-200/30 md:hover:-translate-y-0.5 md:hover:translate-z-0 md:hover:dark:border-gray-400 md:dark:hover:dark:bg-gray-700/20"
  >
    <!-- Hover effect -->
    <div class="absolute inset-0 z-0 rounded-xl bg-transparent transition duration-150 ease-in sm:rounded-2xl"></div>

    <!-- Article image -->
    <div class="aspect-h-9 aspect-w-16 relative w-full">
      <NuxtImg
        :src="coverImage"
        class="object-cover"
        format="webp"
        sizes="50vw md:75vw lg:800px"
        :placeholder="[16, 9, 80, 10]"
      />
    </div>

    <div class="p-4 sm:px-6">
      <h2>
        <NuxtLink to="/">
          <!-- Cover click range -->
          <span class="absolute inset-0 z-30 sm:rounded-2xl"></span>
          <!-- Article title and publish date -->
          <span class="relative z-20 line-clamp-2 grow overflow-hidden text-base font-medium leading-6 drop-shadow-md md:h-[3em] md:text-lg md:leading-7">
            {{ title }}
          </span>
        </NuxtLink>
      </h2>
      <!-- Article description -->
      <p class="relative z-20 mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400 md:h-[3em] md:text-base">
        {{ description }}
      </p>
      <div class="mt-2 flex gap-x-4">
        <!-- Publish date -->
        <dl
          v-if="publishedDate"
          class="relative shrink-0 text-sm text-gray-500 dark:text-gray-400 md:text-base"
        >
          <dt class="sr-only">
            Published on
          </dt>
          <dd class="flex items-center gap-x-1">
            <Icon name="i-heroicons-calendar-20-solid" />
            <time :datetime="ISODate(publishedDate)">
              {{ formatDate(publishedDate) }}
            </time>
          </dd>
        </dl>
        <!-- Article category -->
        <dl
          v-if="category"
          class="relative z-20 shrink-0 text-sm text-gray-500 dark:text-gray-400 md:text-base"
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
    </div>
  </article>
</template>

<style scope></style>
