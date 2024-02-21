<script setup lang="ts">
type Type = 'info' | 'success' | 'warning' | 'danger'

defineProps<{
  type: Type
}>()

const typeClasses: Record<Type, string> = {
  info: 'border-blue-400 dark:border-blue-600 bg-gray-200/40 dark:bg-gray-800/80',
  success: 'border-green-400 dark:border-green-600 bg-gray-200/40 dark:bg-gray-800/80',
  warning: 'border-yellow-400 dark:border-yellow-600 bg-gray-200/40 dark:bg-gray-800/80',
  danger: 'border-red-400 dark:border-red-600 bg-gray-200/40 dark:bg-gray-800/80',
}
</script>

<template>
  <div
    class="my-8 flex rounded-md border text-sm"
    :class="typeClasses[type]"
  >
    <div class="px-2">
      <Icon
        name="i-heroicons-information-circle-20-solid"
        class="text-blue-400"
      />
    </div>
    <div class="">
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>

<style scope></style>
