<script setup lang="ts">
import type { ParsedArticle } from '~/types/article'

type PrevNext = Pick<ParsedArticle, '_path' | 'title' | 'cover'>

const props = defineProps<{
  surround: PrevNext[] | null
}>()

const prev = computed(() => props.surround?.[0])
const next = computed(() => props.surround?.[1])
</script>

<template>
  <div class="grid w-full gap-4 md:grid-cols-2 lg:gap-8">
    <NuxtLink
      v-if="prev"
      :to="prev._path"
      class="group block w-full rounded-xl border border-gray-300 px-4 pb-3 pt-2 no-underline transition dark:border-gray-600 md:hover:border-sky-500"
      style="overflow: clip;"
    >
      <div class="relative grid grid-cols-6 grid-rows-[1fr_2fr] gap-y-2">
        <span class="col-span-6 text-sm font-bold text-gray-400 dark:text-gray-500">上一篇</span>
        <Icon
          name="i-heroicons-arrow-left"
          class="col-span-1 hidden size-6 h-auto shrink-0 text-gray-700 dark:text-gray-200 md:block md:group-hover:text-sky-400"
        />
        <span class="col-span-5 line-clamp-2 content-center text-sm font-medium text-sky-500 dark:text-sky-400">
          {{ prev.title }}
        </span>
      </div>
    </NuxtLink>
    <div v-else></div>
    <NuxtLink
      v-if="next"
      :to="next._path"
      class="group relative block w-full rounded-xl border border-gray-300 px-4 pb-3 pt-2 no-underline transition dark:border-gray-600 md:hover:border-sky-500"
    >
      <div class="grid grid-cols-6 grid-rows-[1fr_2fr] gap-y-2">
        <span class="col-span-6 text-sm font-bold text-gray-400 dark:text-gray-500 md:text-end">下一篇</span>
        <span class="col-span-5 line-clamp-2 content-center text-sm font-medium text-sky-500 dark:text-sky-400">
          {{ next.title }}
        </span>
        <Icon
          name="i-heroicons-arrow-right"
          class="col-span-1 ml-auto hidden size-6 h-auto shrink-0 text-gray-700 dark:text-gray-200 md:block md:group-hover:text-sky-400"
        />
      </div>
    </NuxtLink>
    <div v-else></div>
  </div>
</template>

<style scoped></style>
