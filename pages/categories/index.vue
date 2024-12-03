<script setup lang="ts">
const route = useRoute()
const { data: pageData } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

/* SEO */
useSeoMeta({
  title: pageData.value?.title,
  ogTitle: pageData.value?.title,
  description: pageData.value?.description,
  ogDescription: pageData.value?.description,
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

const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()
</script>

<template>
  <AppHero class="mb-8">
    <template #title>
      分類
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
          class="flex items-center gap-2 rounded-md p-2 transition-colors md:hover:bg-gray-200"
        >
          <Icon
            v-if="category.icon"
            :name="category.icon"
            class="md:size-6"
          />
          <span class="text-gray-700">{{ category.title }}&nbsp;({{ category.count || '0' }})</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scope></style>
