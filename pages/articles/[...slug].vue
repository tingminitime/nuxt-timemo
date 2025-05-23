<script setup lang="ts">
import { categories } from '~/constants'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: pageData, error } = await useAsyncData(
  route.path,
  () => queryCollection('articles').path(route.path).first(),
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
  return categories.find(category => category.id === route.params.slug)
})

const authorData = computed(() => {
  return authors.value?.data.find(author => author.id === pageData.value?.author)
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
    <template #prev-next>
      <ArticleContentPrevNext
        class="mt-8"
        :surround="surround"
      />
    </template>
  </ArticleLayout>
</template>

<style scope></style>
