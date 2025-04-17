<script setup lang="ts">
import type { ParsedPage } from '~/types/common'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { data: pageData } = await useAsyncData(route.path, () => queryCollection<ParsedPage>(route.path).findOne())

const {
  articlesDisplayOptions,
  currentArticlesDisplayMethod,
  currentArticlesDisplayOption,
  currentArticleLayoutComponent,
  currentArticleComponent,
} = useUserPrefer()

/* Articles data */
const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()

const { getAllPublishedPosts } = useGetPublishedPosts()
const { data: groupedArticlesByYear } = await getAllPublishedPosts(articleFlatCategories.value)

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
      { name: '文章' },
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
    <template #description>
      {{ pageData?.hero?.description }}
    </template>
  </AppHero>

  <div class="flex flex-col gap-8">
    <!-- Articles display control -->
    <div class="flex justify-end">
      <ClientOnly>
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
      </ClientOnly>
    </div>

    <!-- Articles list -->
    <div
      v-if="groupedArticlesByYear?.length"
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
          :category-id="article._dir"
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
