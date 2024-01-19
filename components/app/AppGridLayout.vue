<script setup lang="ts">
defineProps<{
  as?: string
}>()
</script>

<template>
  <component
    :is="as ? as : 'div'"
    class="relative mt-16 text-gray-800 dark:text-gray-100 sm:mt-32 sm:px-8 lg:px-16"
  >
    <div class="mx-auto max-w-screen-xl">
      <div class="main-grid grid">
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<style scope></style>
