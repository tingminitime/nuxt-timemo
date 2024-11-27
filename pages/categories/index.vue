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

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>

<template>
  <!-- TODO: 頁面呈現方式依照文章的分類 (Category) 排版 -->
  <AppHero class="mb-8">
    <template #title>
      分類
    </template>
  </AppHero>
</template>

<style scope></style>
