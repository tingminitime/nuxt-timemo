<script setup lang="ts">
/* TODO: 過濾未分類文章 */
const route = useRoute()
const isUnclassified = computed(() => route.params.slug === 'articles')
const queryPath = computed(() => isUnclassified.value ? '/articles/' : `/articles/${route.params.slug}/`)

const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()

const { getAllPublishedPosts } = useGetAllPublishedPosts()
const { data: groupedArticlesByYear, error } = await getAllPublishedPosts(articleFlatCategories.value, queryPath.value)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
  })
}

const categoryData = computed(() => articleFlatCategories.value.find(category => category.slug === route.params.slug))
</script>

<template>
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
      :key="groupedArticles.year"
      :year="groupedArticles.year"
    >
      <ArticleItem
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
    </ArticleListLayout>
  </div>
</template>

<style scoped></style>
