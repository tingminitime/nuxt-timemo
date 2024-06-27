<script setup lang="ts">
import type { Toc } from '@nuxt/content'

defineProps<{
  toc: Toc
}>()

// const { activeHeadings } = useScrollSpyHeadings()
</script>

<template>
  <div class="lg:sticky lg:top-[5.5rem] lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto">
    <ul class="space-y-2 text-sm">
      <li
        v-for="link in toc.links"
        :key="link.id"
      >
        <NuxtLink
          :to="`#${link.id}`"
          class="block"
        >
          {{ link.text }}
        </NuxtLink>
        <template v-if="link.children">
          <ul class="my-2 ml-4 space-y-2 pl-2">
            <li
              v-for="child in link.children"
              :key="child.id"
            >
              <NuxtLink
                :to="`#${child.id}`"
                class="block"
              >
                {{ child.text }}
              </NuxtLink>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scope></style>
