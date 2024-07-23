<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import { useGetAllAuthors } from '~/composables/useGetAllAuthors'
import { useGetArticleCategories } from '~/composables/useGetCategories'

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
  // Refer : https://unhead.unjs.io/schema-org/schema/webpage
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])

/* Articles data */
const { getArticleCategories } = useGetArticleCategories()
const { data: articleCatories } = await getArticleCategories()

const { getAllPublishedPosts } = useGetAllPublishedPosts()
const { data: groupedArticlesByYear } = await getAllPublishedPosts(articleCatories.value as NavItem | undefined)

const { data: authors } = await useGetAllAuthors()

const {
  articlesDisplayOptions,
  currentArticlesDisplayMethod,
  currentArticlesDisplayOption,
  currentArticleLayoutComponent,
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
    <div
      v-if="groupedArticlesByYear?.length && currentArticlesDisplayOption"
      class="flex flex-col gap-y-6"
    >
      <component
        :is="currentArticleLayoutComponent"
        v-for="groupedArticles in groupedArticlesByYear"
        :key="groupedArticles.year"
        :year="groupedArticles.year"
      >
        <component
          :is="currentArticleComponent"
          v-for="article in groupedArticles.articles"
          :key="article._path"
          :to="article._path"
          :title="article.title"
          :description="article.description"
          :author="article.author"
          :category="article.category"
          :cover-image="article.cover.src"
          :published-date-format="article.published_date_format"
          :published-date-iso-string="article.published_date_iso_string"
        />
      </component>
    </div>
    <p
      v-else
      class="text-gray-700 dark:text-gray-300"
    >
      No articles found.
    </p>
  </div>
</template>

<style scope></style>
