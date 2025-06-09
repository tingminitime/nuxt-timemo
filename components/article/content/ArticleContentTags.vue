<!-- TODO: Add tag search -->
<script setup lang="ts">
interface TagsProps {
  tags?: string[]
}

const props = withDefaults(defineProps<TagsProps>(), {
  tags: () => [],
})
</script>

<template>
  <ul class="not-prose flex items-center gap-x-4">
    <li
      v-for="tag in tags"
      :key="tag"
      class=""
    >
      <NuxtLink
        :to="`/tags/${tag}`"
        class="inline-flex items-center rounded-md bg-gray-200 px-2 py-0.5 text-[0.9rem] dark:bg-gray-600"
      >
        #&nbsp;{{ tag }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped></style>
