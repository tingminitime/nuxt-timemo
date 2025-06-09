<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { getArticleWithPath } = useGetArticles()
const { data: pageData, error } = await getArticleWithPath(route.path)

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
  return getCategoryWithCategoryId(pageData.value?.category)
})

const authorData = computed(() => {
  return authors.value?.data.find(author => author.id === pageData.value?.author)
})

/* SEO */
useSeoMeta({
  title: pageData.value?.title,
  description: pageData.value?.description,
  author: authorData.value?.name || runtimeConfig.public.mainAuthor,
  ogTitle: `${pageData.value?.title} | ${runtimeConfig.public.siteName}`,
  ogDescription: pageData.value?.description,
  ogImage: pageData.value?.image,
  ogType: 'article',
  twitterTitle: `${pageData.value?.title} | ${runtimeConfig.public.siteName}`,
  twitterDescription: pageData.value?.description,
  twitterImage: pageData.value?.image,
  twitterCard: 'summary_large_image',
  articleAuthor: [authorData.value?.name || runtimeConfig.public.mainAuthor],
  articlePublishedTime: pageData.value?.published_date_iso_string,
  articleModifiedTime: pageData.value?.modified_date_iso_string,
  articleTag: pageData.value?.tags || [],
})

if (import.meta.server) {
  useHead({
    meta: [
      {
        property: 'og:article:author',
        content: authorData.value?.name || runtimeConfig.public.mainAuthor,
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
}

useSchemaOrg([
  // Refer : https://unhead.unjs.io/docs/typescript/schema-org/api/schema/article
  defineArticle({
    image: pageData.value?.image ?? '',
    datePublished: pageData.value?.published_date_iso_string,
    dateModified: pageData.value?.modified_date_iso_string,
    keywords: pageData.value?.tags || [],
  }),
])

/* Surround article data */
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('articles', route.path)
    .order('published_date', 'DESC')
})
</script>

<template>
  <ArticleLayout
    :title="pageData?.title"
    :publish-date="pageData?.published_date"
    :modified-date="pageData?.modified_date"
    :category-id="categoryData?.id"
    :category="categoryData?.text"
    :author-data="authorData"
    :cover="pageData?.cover"
    :toc="pageData?.body?.toc"
  >
    <ContentRenderer
      v-if="pageData"
      :value="pageData"
    />

    <template #tags>
      <ArticleContentTags
        v-if="pageData?.tags"
        class="mt-8"
        :tags="pageData?.tags"
      />
    </template>

    <template #prev-next>
      <ArticleContentPrevNext
        class="mt-8"
        :surround="surround"
      />
    </template>
  </ArticleLayout>
</template>

<style scope></style>
