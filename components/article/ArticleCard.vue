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
  <article
    class="group relative flex flex-col gap-y-2 overflow-hidden rounded-xl border border-gray-300 bg-inner-primary-light drop-shadow-lg transition-all duration-100 ease-in translate-z-0 dark:border-gray-500 dark:bg-inner-primary-dark sm:rounded-2xl md:hover:-translate-y-0.5 md:hover:translate-z-0"
  >
    <!-- Article image -->
    <div class="aspect-h-9 aspect-w-16 relative w-full overflow-hidden">
      <NuxtImg
        :src="coverImage"
        class="object-cover transition-transform ease-in group-hover:scale-105"
        format="webp"
        sizes="50vw md:75vw lg:800px"
        :placeholder="[16, 9, 80, 10]"
      />
    </div>

    <div class="p-4 sm:px-6">
      <div class="md:h-28">
        <h2>
          <NuxtLink :to="to">
            <!-- Cover click range -->
            <span class="absolute inset-0 z-30 sm:rounded-2xl"></span>
            <!-- Article title and publish date -->
            <span class="relative z-20 line-clamp-2 grow overflow-hidden text-base font-medium leading-6 drop-shadow-md md:text-lg md:leading-7">
              {{ title }}
            </span>
          </NuxtLink>
        </h2>
        <!-- Article description -->
        <p class="relative z-20 mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
          {{ description }}
        </p>
      </div>

      <!-- Article published date and category -->
      <div class="mt-2 flex gap-x-4">
        <!-- Publish date -->
        <dl
          v-if="publishedDateFormat"
          class="relative shrink-0 text-sm text-gray-500 dark:text-gray-400 md:text-base"
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
          class="relative z-20 shrink-0 text-sm text-gray-500 dark:text-gray-400 md:text-base"
        >
          <dt class="sr-only">
            Category
          </dt>
          <dd class="flex items-center gap-x-1">
            <Icon name="i-heroicons-folder-open-solid" />
            <span>{{ category }}</span>
          </dd>
        </dl>
      </div>
    </div>
  </article>
</template>

<style scope></style>
