<script lang="ts" setup>
// import type { ParsedPage } from '~/types/common'

// const { data: pageData } = await useAsyncData('home', () => {
//   return queryCollection<ParsedPage>('/').findOne()
// })
const { data: pageBase } = await useAsyncData(
  'home',
  () => queryCollection('base').first(),
)

/* SEO */
useSeoMeta({
  title: '首頁',
  ogImage: pageBase.value?.ogImage,
  twitterTitle: '首頁',
  twitterDescription: pageBase.value?.description,
  twitterImage: pageBase.value?.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HomeHero
    :title="pageBase?.hero?.title || pageBase?.title"
    :description="pageBase?.hero?.description || pageBase?.description"
  />
</template>

<style scoped></style>
