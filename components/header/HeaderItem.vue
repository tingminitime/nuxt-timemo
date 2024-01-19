<!-- https://nuxt.com/docs/guide/directory-structure/components#dynamic-components -->
<script setup lang="ts">
defineProps<{
  as?: unknown
  hover?: boolean
}>()
</script>

<template>
  <component
    :is="as ?? 'div'"
    class="group rounded-full bg-white/90 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:ring-white/10"
    :class="{ 'transition ease-in hover:ring-gray-900/10 hover:dark:ring-white/25': hover }"
  >
    <slot></slot>
  </component>
</template>

<style scope></style>
