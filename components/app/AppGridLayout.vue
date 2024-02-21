<script setup lang="ts">
defineProps<{
  as?: string
  innerAs?: string
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
      <component
        :is="innerAs ? innerAs : 'div'"
        class="main-grid mx-auto grid max-w-3xl md:max-w-5xl"
      >
        <slot></slot>
      </component>
    </div>
  </component>
</template>

<style scope>
</style>
