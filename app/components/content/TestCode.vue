<script setup lang="ts">
defineProps<{
  code: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()
</script>

<template>
  <div class="not-prose my-4 rounded-md border border-zinc-200/40 bg-white dark:border-zinc-600/40 dark:bg-zinc-900">
    <div class="group relative overflow-hidden bg-zinc-300/10 p-4 dark:bg-zinc-700/10">
      <span
        v-if="filename"
        class="absolute right-3 top-2 font-mono text-xs text-zinc-500 dark:text-zinc-400"
      >
        {{ filename }}
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
:deep(code) {
  display: block;
  width: fit-content;
  min-width: 100%;
}

:deep(.shiki code span.highlight),
:deep(.shiki code span.highlighted) {
  background-color: var(--shiki-code-line-highlight-color);
  display: inline-block;
  margin: 0 -24px;
  padding: 0 24px;
  width: calc(100% + 48px);
}
</style>
