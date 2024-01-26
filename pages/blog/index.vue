<script setup lang="ts">
const route = useRoute()
const { data: pageData } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
</script>

<template>
  <AppHero>
    <template #title>
      {{ pageData?.title }}
    </template>
    <template #description>
      {{ pageData?.hero.description }}
    </template>
  </AppHero>
  <div class="flex flex-col gap-8"></div>
</template>

<style scope></style>
