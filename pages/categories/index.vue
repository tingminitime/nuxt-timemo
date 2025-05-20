<script setup lang="ts">
import { categories } from '~/constants'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: pageBase } = await useAsyncData(
  route.path,
  () => queryCollection('base')
    .where('stem', '=', 'categories/base')
    .first(),
)

const { getArticleCategories } = useGetCategories()
const { data: articleFlatCategories } = await getArticleCategories()

const prerenderCategoriesRoutes = computed(() => {
  return articleFlatCategories.value.map(category => `/categories/${category.id}`)
})

prerenderRoutes(prerenderCategoriesRoutes.value)

/* SEO */
useSeoMeta({
  title: pageBase.value?.title,
  description: pageBase.value?.description,
  ogTitle: `${pageBase.value?.title} | ${runtimeConfig.public.siteName}`,
  ogDescription: pageBase.value?.description,
  ogImage: pageBase.value?.ogImage,
  twitterTitle: pageBase.value?.title,
  twitterDescription: pageBase.value?.description,
  twitterImage: pageBase.value?.ogImage,
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
      {{ pageBase?.hero?.title || pageBase?.title }}
    </template>
  </AppHero>

  <div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="category in articleFlatCategories"
        :key="category.id"
      >
        <NuxtLink
          :to="`/categories/${category.id}`"
          :aria-label="`前往分類頁面 - ${category.text}`"
          class="flex items-center gap-2 rounded-md p-2 transition-colors md:hover:bg-gray-200 md:dark:hover:bg-sky-700"
        >
          <Icon
            v-if="category.icon"
            :name="category.icon"
            class="md:size-6"
          />
          <span class="text-gray-700 dark:text-gray-300">{{ category.text }}&nbsp;({{ category.count || '0' }})</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scope></style>
