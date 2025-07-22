<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  is: string | Component
}>()
</script>

<template>
  <component
    :is="is"
    class="truncate p-1 text-gray-500 transition duration-150 ease-in hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
  >
    <slot></slot>
  </component>
</template>

<style scope></style>
