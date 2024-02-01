<script setup lang="ts">
import type { ParsedArticle } from '@/types/article'

const route = useRoute()
const { data: pageData } = await useAsyncData(route.path, () => queryContent<ParsedArticle>(route.path).findOne())

useSeoMeta({
  title: pageData.value?.title,
  ogTitle: pageData.value?.title,
  description: pageData.value?.description,
  ogDescription: pageData.value?.description,
})

useSchemaOrg([
  // Refer : https://unhead.unjs.io/schema-org/schema/webpage
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])

const { data: articles } = await useAsyncData(
  'articles',
  () => queryContent('articles')
    .where({ _type: { $ne: 'yaml' } })
    .only(['_path', 'title', 'description', 'author', 'category', 'published_date'])
    .find(),
)

// console.log('articles: ', articles.value)

const { data: authors } = await useAsyncData(
  'authors',
  () => queryContent('/author')
    .where({ _type: { $eq: 'yaml' } })
    .findOne(),
)

// console.log('authors: ', authors.value)
</script>

<template>
  <AppHero class="mb-8">
    <template #title>
      {{ pageData?.title }}
    </template>
    <template #description>
      {{ pageData?.hero.description }}
    </template>
  </AppHero>

  <div class="flex flex-col gap-8">
    <!-- Articles search area -->
    <div></div>

    <!-- Articles list -->
    <div
      v-if="articles?.length"
      class="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10"
    >
      <ArticleCard
        v-for="article in articles"
        :key="article._path"
        :to="article._path"
        :title="article.title"
        :description="article.description"
        :author="article.author"
        :category="article.category"
        :published-date="article.published_date"
      />
    </div>
  </div>
</template>

<style scope></style>
