<script lang="ts" setup>
const { data: page } = await useAsyncData('home', () => {
  return queryContent('/').findOne()
})
</script>

<template>
  <HomeHero
    :title="page?.hero.title"
    :description="page?.hero.description"
  />
</template>

<style scoped></style>
