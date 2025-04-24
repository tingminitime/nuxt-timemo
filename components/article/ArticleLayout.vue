<script setup lang="ts">
import type { ArticlesCollectionItem, Toc } from '@nuxt/content'
// import type { ParsedArticle } from '~/types/article'
import type { Author } from '~/types/author'

defineProps<{
  title?: string
  publishDate?: string | Date
  modifiedDate?: string | Date
  categoryId?: string
  category?: string
  authorData?: Author
  // cover?: ParsedArticle['cover']
  cover?: ArticlesCollectionItem['cover']
  toc: Toc | undefined
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-[158px_660px_158px]">
    <div class="row-start-2 w-full xl:col-start-3 xl:row-span-2 xl:row-start-1">
      <ArticleTocLayout>
        <template #toc>
          <ArticleToc
            v-if="toc"
            :toc="toc"
          />
        </template>
      </ArticleTocLayout>
    </div>

    <header class="w-full xl:col-start-2">
      <ArticleContentHeader
        :title
        :publish-date="publishDate"
        :modified-date="modifiedDate"
        :category-id="categoryId"
        :category="category"
        :author-data="authorData"
        :cover="cover"
      />
    </header>

    <ArticleContentBody class="mx-auto xl:col-start-2">
      <slot></slot>
      <UDivider
        :ui="{ border: { base: 'dark:border-gray-600' } }"
      />
      <slot name="prev-next"></slot>
    </ArticleContentBody>
  </div>
</template>

<style scope></style>
