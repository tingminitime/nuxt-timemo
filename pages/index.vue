<script lang="ts" setup>
import type { ParsedPage } from '~/types/common'

const { data: pageData } = await useAsyncData('home', () => {
  return queryCollection<ParsedPage>('/').findOne()
})

/* SEO */
useSeoMeta({
  title: '首頁',
  ogImage: pageData.value?.ogImage,
  twitterTitle: '首頁',
  twitterDescription: pageData.value?.description,
  twitterImage: pageData.value?.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HomeHero
    :title="pageData?.hero?.title || pageData?.title"
    :description="pageData?.hero?.description || pageData?.description"
  />
</template>

<style scoped></style>
