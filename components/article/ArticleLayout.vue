<script setup lang="ts">
import type { Toc } from '@nuxt/content'

defineProps<{
  title?: string
  publishDateFormat?: string
  toc: Toc | undefined
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-[158px_660px_158px]">
    <div class="row-start-2 w-full lg:col-start-1 lg:row-span-2 lg:row-start-1">
      <ArticleContentNav
        v-if="toc"
        :toc="toc"
      />
    </div>
    <header class="w-full lg:col-start-2">
      <ArticleContentHeader />
    </header>
    <ArticleContentBody class="mx-auto lg:col-start-2">
      <slot></slot>
    </ArticleContentBody>
  </div>
</template>

<style scope></style>
