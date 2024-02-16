<script setup lang="ts">
defineProps<{
  as?: string
  innerMaskClass?: string
}>()
</script>

<template>
  <component
    :is="as ? as : 'div'"
    class="text-gray-800 dark:text-gray-100 sm:px-8 lg:px-16"
  >
    <div
      class="mx-auto max-w-screen-xl"
      :class="innerMaskClass"
    >
      <div class="main-grid mx-auto grid max-w-3xl md:max-w-5xl">
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<style scope>
</style>
