<script lang="ts" setup>
const { data: page } = await useAsyncData('home', () => {
  return queryContent('/').findOne()
})

/* SEO */
useSeoMeta({
  title: '首頁',
})

// const search = ref('')
// const results = await searchContent(search)
</script>

<template>
  <HomeHero
    :title="page?.hero.title"
    :description="page?.hero.description"
  />
  <!-- <div>
    <input
      v-model="search"
      type="text"
    >
    <pre>{{ results }}</pre>
  </div> -->
</template>

<style scoped></style>
