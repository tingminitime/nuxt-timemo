<script setup lang="ts">
import type { ParsedArticle } from '~/types/article'

const route = useRoute()
const { data: pageData, error } = await useAsyncData(route.path, () => queryContent<ParsedArticle>(route.path).findOne())

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
  <div>Article Page</div>
</template>

<style scope></style>
