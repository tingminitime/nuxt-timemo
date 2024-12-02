<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import type { ParsedArticle } from '~/types/article'

const route = useRoute()

const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()

const { data: pageData, error } = await useAsyncData(
  route.path,
  () => queryContent<ParsedArticle>(route.path).findOne(),
)

const { data: authors } = await useGetAllAuthors()

const category = computed(() => {
  if (!pageData.value?._path)
    return

  const sliceEnd = pageData.value?._dir === 'articles' ? 2 : 3

  const postCategoryPath = pageData.value?._path
    .split('/')
    .slice(0, sliceEnd)
    .join('/')

  return articleFlatCategories.value.find(category => category._path === postCategoryPath)
})

const authorData = computed(() => {
  return authors.value.find(author => author.id === pageData.value?.author)
})

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
  })
}

/* SEO */
useSeoMeta({
  title: pageData.value?.title,
  ogTitle: pageData.value?.title,
  description: pageData.value?.description,
  ogDescription: pageData.value?.description,
})

useServerHead({
  meta: [
    {
      name: 'author',
      content: 'Tim Lin',
    },
    {
      property: 'og:article:author',
      content: 'Tim Lin',
    },
    {
      name: 'publish_date',
      property: 'og:article:published_time',
      content: pageData.value?.published_date_iso_string,
    },
    {
      name: 'modified_date',
      property: 'og:article:modified_time',
      content: pageData.value?.modified_date_iso_string,
    },
  ],
})

useSchemaOrg([
  // Refer : https://unhead.unjs.io/schema-org/schema/article
  defineArticle({
    image: pageData.value?.image ?? '',
    datePublished: pageData.value?.published_date_iso_string,
    dateModified: pageData.value?.modified_date_iso_string,
  }),
])

/* Surround article data */
</script>

<template>
  <ArticleLayout
    :title="pageData?.title"
    :publish-date="pageData?.published_date"
    :modified-date="pageData?.modified_date"
    :category-id="category?.slug"
    :category="category?.title"
    :author-data="authorData"
    :toc="pageData?.body?.toc"
  >
    <ContentRenderer :value="(pageData as ParsedContent)" />
  </ArticleLayout>
</template>

<style scope></style>
