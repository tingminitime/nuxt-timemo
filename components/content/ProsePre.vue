<script setup lang="ts">
defineProps<{
  code: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class: string
}>()
</script>

<template>
  <div class="not-prose my-4 rounded-md border border-zinc-200/40 bg-white dark:border-zinc-600/40 dark:bg-zinc-900">
    <div class="group relative overflow-hidden bg-zinc-300/10 dark:bg-zinc-700/10">
      <span
        v-if="filename"
        class="absolute right-3 top-2 font-mono text-xs text-zinc-500 dark:text-zinc-400"
      >
        {{ filename }}
      </span>
      <pre :class="[filename ? 'pb-4 pt-6' : 'py-4', $props.class]"><slot></slot></pre>
      <ArticleCodeCopy :code="code" />
    </div>
  </div>
</template>

<style scoped>
</style>
