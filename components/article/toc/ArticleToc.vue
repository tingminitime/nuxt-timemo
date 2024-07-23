<script setup lang="ts">
import type { Toc } from '@nuxt/content'
import { NuxtLink } from '#components'

defineProps<{
  toc: Toc
}>()

const { activeHeadings } = useTocScroll()

function isHeadingActive(id: string) {
  return activeHeadings.value.includes(id)
}
</script>

<template>
  <div class="lg:sticky lg:top-[5.5rem] lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto">
    <ul class="space-y-2 text-sm">
      <li
        v-for="link in toc.links"
        :key="link.id"
      >
        <ArticleTocItem
          :is="NuxtLink"
          :to="`#${link.id}`"
          class="block"
          :class="isHeadingActive(link.id) ? 'text-sky-500 dark:text-sky-400' : ''"
        >
          {{ link.text }}
        </ArticleTocItem>
        <template v-if="link.children">
          <ul class="my-2 ml-2 space-y-2 border-l border-gray-300 dark:border-gray-600">
            <li
              v-for="child in link.children"
              :key="child.id"
            >
              <ArticleTocItem
                :is="NuxtLink"
                :to="`#${child.id}`"
                class="block pl-4"
                :class="isHeadingActive(child.id) ? 'text-sky-500 dark:text-sky-400' : ''"
              >
                {{ child.text }}
              </ArticleTocItem>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scope></style>
