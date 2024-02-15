<script setup lang="ts">
import type { ParsedArticle } from '@/types/article'
import type { ParsedAuthor } from '@/types/author'

const route = useRoute()
const { data: pageData } = await useAsyncData(route.path, () => queryContent<ParsedArticle>(route.path).findOne())

/* SEO */
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

/* Articles data */
const { data: articles } = await useAsyncData(
  'articles',
  () => queryContent<ParsedArticle>('articles')
    .where({ _type: { $ne: 'yaml' } })
    .only(['_path', 'title', 'description', 'author', 'cover', 'category', 'published_date'])
    .find(),
)

// console.log('articles: ', articles.value)

const { data: authors } = await useAsyncData(
  'authors',
  () => queryContent<ParsedAuthor>('/authors')
    .where({ _type: { $eq: 'yaml' } })
    .findOne(),
)

// console.log('authors: ', authors.value)

const {
  articlesDisplayOptions,
  currentArticlesDisplayMethod,
  currentArticlesDisplayOption,
  currentArticleComponent,
} = useUserPrefer()
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
    <!-- Articles display control -->
    <div class="flex justify-end">
      <UButtonGroup
        size="md"
        orientation="horizontal"
      >
        <USelectMenu
          v-model="currentArticlesDisplayMethod"
          :options="articlesDisplayOptions"
          class="w-32 md:w-36"
          select-class="cursor-pointer bg-inner-primary-light dark:bg-inner-primary-dark md:text-base"
          :ui-menu="{ background: 'bg-outer-primary-light dark:bg-outer-primary-dark' }"
          value-attribute="id"
          option-attribute="label"
        >
          <template #leading>
            <UIcon
              :name="currentArticlesDisplayOption.icon"
              class="mx-0.5 size-4"
            />
          </template>
        </USelectMenu>
      </UButtonGroup>
    </div>

    <!-- Articles list -->
    <template v-if="articles?.length && currentArticlesDisplayOption">
      <NuxtLayout
        :name="currentArticlesDisplayOption.layout"
      >
        <component
          :is="currentArticleComponent"
          v-for="article in articles"
          :key="article._path"
          :to="article._path"
          :title="article.title"
          :description="article.description"
          :author="article.author"
          :category="article.category"
          :cover-image="article.cover.src"
          :published-date="article.published_date"
        />
      </NuxtLayout>
    </template>
    <p
      v-else
      class="text-gray-700 dark:text-gray-300"
    >
      No articles found.
    </p>
  </div>
</template>

<style scope></style>
