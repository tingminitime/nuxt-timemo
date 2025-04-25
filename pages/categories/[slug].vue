<script setup lang="ts">
// import { useGetPublishedPosts } from '~/composables/useGetPublishedPosts'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const isUnclassified = computed(() => route.params.slug === 'articles')
const queryPath = computed(() => isUnclassified.value ? '/articles/' : `/articles/${route.params.slug}/`)

// TODO: refactor this with new approach
// const { getFlatArticleCategories } = useGetArticleCategories()
// const { data: articleFlatCategories } = await getFlatArticleCategories()

// TODO: refactor this with new approach
// const { getAllPublishedPosts, getUnclassifiedPosts } = useGetPublishedPosts()
// const { data: groupedArticlesByYear, error } = await (
//   isUnclassified.value
//     ? getUnclassifiedPosts()
//     : getAllPublishedPosts(articleFlatCategories.value, queryPath.value)
// )

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
  })
}

const categoryData = computed(() => articleFlatCategories.value.find(category => category.slug === route.params.slug))

/* SEO */
useSeoMeta({
  title: `分類 - ${categoryData.value?.title}`,
  ogTitle: `分類 - ${categoryData.value?.title} | ${runtimeConfig.public.siteName}`,
  description: `在 ${categoryData.value?.title} 分類下的文章`,
  ogDescription: `在 ${categoryData.value?.title} 分類下的文章`,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: '首頁', item: '/' },
      { name: '分類' },
      { name: categoryData.value?.title },
    ],
  }),
  // Refer : https://unhead.unjs.io/schema-org/schema/webpage
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <NuxtLink
    to="/categories"
    class="mb-2 flex size-10 items-center justify-center rounded-lg bg-gray-200/75 p-2 transition-colors dark:bg-gray-700 md:mb-4 md:size-12 md:hover:bg-gray-300 md:dark:hover:bg-gray-500"
    aria-label="回到分類頁面"
  >
    <Icon
      name="i-heroicons-arrow-uturn-left"
      size="32"
      class="text-gray-700 dark:text-gray-200"
    />
    <span class="sr-only">回到分類頁面</span>
  </NuxtLink>

  <AppHero class="mb-8">
    <template #title>
      <Icon
        v-if="categoryData?.icon"
        :name="categoryData.icon"
      />
      <span>{{ categoryData?.title || '未分類' }}</span>
    </template>
  </AppHero>

  <div class="flex flex-col gap-y-6">
    <ArticleListLayout
      v-for="groupedArticles in groupedArticlesByYear"
      :key="`${groupedArticles.year}-${categoryData?.slug}`"
      :year="groupedArticles.year"
    >
      <ArticleItem
        v-for="article in groupedArticles.articles"
        :key="`${article._path}-${categoryData?.slug}`"
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
    </ArticleListLayout>
  </div>
</template>

<style scoped></style>
