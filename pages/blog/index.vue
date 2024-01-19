<script setup lang="ts">
const route = useRoute()
const { data: pageData } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
</script>

<template>
  <div>Blog</div>
  <pre>{{ pageData }}</pre>
</template>

<style scope></style>
