<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineProps<{
  as?: string
  innerWrapperClass?: HTMLAttributes['class']
}>()

const route = useRoute()
const isArticlePage = route.name === 'articles-slug'
</script>

<template>
  <component
    :is="as ? as : 'div'"
    class="text-gray-800 dark:text-gray-100 sm:px-8 lg:px-16"
  >
    <div
      class="mx-auto max-w-screen-xl"
      :class="innerWrapperClass"
    >
      <component
        :is="isArticlePage ? 'article' : 'div'"
        class="main-grid mx-auto grid max-w-3xl"
        :class="isArticlePage ? 'md:max-w-7xl' : 'md:max-w-5xl'"
      >
        <slot></slot>
      </component>
    </div>
  </component>
</template>

<style scope>
</style>
