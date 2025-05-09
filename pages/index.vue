<script lang="ts" setup>
const { data: pageBase } = await useAsyncData(
  'home',
  () => queryCollection('home').first(),
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
