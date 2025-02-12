<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import type { ParsedArticle } from '~/types/article'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { getFlatArticleCategories } = useGetArticleCategories()
const { data: articleFlatCategories } = await getFlatArticleCategories()

const { data: pageData, error } = await useAsyncData(
  route.path,
  () => queryContent<ParsedArticle>(route.path).findOne(),
)

const { data: authors } = await useGetAllAuthors()

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
  })
}

/**
 * Find category data by the current page path
 */
const categoryData = computed(() => {
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

/* SEO */
useSeoMeta({
  title: pageData.value?.title,
  ogTitle: `${pageData.value?.title} | ${runtimeConfig.public.siteName}`,
  description: pageData.value?.description,
  ogDescription: pageData.value?.description,
  ogImage: pageData.value?.image,
  twitterTitle: `${pageData.value?.title} | ${runtimeConfig.public.siteName}`,
  twitterDescription: pageData.value?.description,
  twitterImage: pageData.value?.image,
  twitterCard: 'summary_large_image',
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

/* Surround article data ( `useContent` cannot use when not use `documentDriven` mode ) */
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryContent<ParsedArticle>('/articles')
    .where({ _extension: 'md' })
    .sort({ published_date: 1 })
    .only(['_path', 'title', 'cover'])
    .findSurround(route.path)
})
</script>

<template>
  <ArticleLayout
    :title="pageData?.title"
    :publish-date="pageData?.published_date"
    :modified-date="pageData?.modified_date"
    :category-id="categoryData?.slug"
    :category="categoryData?.title"
    :author-data="authorData"
    :cover="pageData?.cover"
    :toc="pageData?.body?.toc"
  >
    <ContentRenderer :value="(pageData as ParsedContent)" />
    <template #prev-next>
      <ArticleContentPrevNext
        class="mt-8"
        :surround="surround"
      />
    </template>
  </ArticleLayout>
</template>

<style scope></style>
