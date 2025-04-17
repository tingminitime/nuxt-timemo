<script setup lang="ts">
import type { ParsedPage } from '~/types/common'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: pageData } = await useAsyncData(route.path, () => queryCollection<ParsedPage>(route.path).findOne())

const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()

const prerenderCategoriesRoutes = computed(() => {
  return articleFlatCategories.value.map(category => `/categories/${category.slug}`)
})

prerenderRoutes(prerenderCategoriesRoutes.value)

/* SEO */
useSeoMeta({
  title: pageData.value?.title,
  description: pageData.value?.description,
  ogTitle: `${pageData.value?.title} | ${runtimeConfig.public.siteName}`,
  ogDescription: pageData.value?.description,
  ogImage: pageData.value?.ogImage,
  twitterTitle: pageData.value?.title,
  twitterDescription: pageData.value?.description,
  twitterImage: pageData.value?.ogImage,
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: '首頁', item: '/' },
      { name: '分類' },
    ],
  }),
  // Refer : https://unhead.unjs.io/schema-org/schema/webpage
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <AppHero class="mb-8">
    <template #title>
      {{ pageData?.hero?.title || pageData?.title }}
    </template>
  </AppHero>

  <div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="category in articleFlatCategories"
        :key="category._path"
      >
        <NuxtLink
          :to="`/categories/${category.slug}`"
          :aria-label="`前往分類頁面 - ${category.title}`"
          class="flex items-center gap-2 rounded-md p-2 transition-colors md:hover:bg-gray-200 md:dark:hover:bg-sky-700"
        >
          <Icon
            v-if="category.icon"
            :name="category.icon"
            class="md:size-6"
          />
          <span class="text-gray-700 dark:text-gray-300">{{ category.title }}&nbsp;({{ category.count || '0' }})</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scope></style>
