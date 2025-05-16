<script setup lang="ts">
// import type { ParsedPage } from '~/types/common'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
// const { data: pageData } = await useAsyncData(route.path, () => queryCollection<ParsedPage>(route.path).findOne())
const { data: pageBase } = await useAsyncData(
  route.path,
  () => queryCollection('base')
    .where('stem', '=', 'articles/base')
    .first(),
)

const {
  articlesDisplayOptions,
  currentArticlesDisplayMethod,
  currentArticlesDisplayOption,
  currentArticleLayoutComponent,
  currentArticleComponent,
} = useUserPrefer()

// TODO: find category title from `articleFlatCategories`
const { getArticleCategories } = useGetCategories()
const { data: articleFlatCategories } = await getArticleCategories()

const { getAllArticlesGroupedByYear } = useGetArticles()
const { data: groupedArticlesByYear } = await getAllArticlesGroupedByYear()

function getArticleCategoryTitle(categoryId: string) {
  return articleFlatCategories.value
    .find(category => category.category_id === categoryId)
    ?.title
}

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
      {{ pageBase?.hero?.title || pageBase?.title }}
    </template>
    <template #description>
      {{ pageBase?.hero?.description }}
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
      <!-- ArticleCardsLayout or ArticleListLayout -->
      <component
        :is="currentArticleLayoutComponent"
        v-for="groupedArticles in groupedArticlesByYear"
        :key="groupedArticles.year"
        :year="groupedArticles.year"
      >
        <!-- ArticleCard or ArticleItem -->
        <component
          :is="currentArticleComponent"
          v-for="article in groupedArticles.articles"
          :key="article.path"
          :to="article.path"
          :title="article.title"
          :description="article.description"
          :author="article.author"
          :category="getArticleCategoryTitle(article.category_id)"
          :cover-image="article.cover?.src"
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
