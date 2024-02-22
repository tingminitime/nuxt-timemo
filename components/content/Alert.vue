<script setup lang="ts">
type TypeKey = 'info' | 'success' | 'warning' | 'danger'

interface Type {
  containerClass: string
  iconName: string
  iconClass: string
}

withDefaults(defineProps<{
  type?: TypeKey
  title?: string
}>(), {
  type: 'info',
})

const typeClasses: Record<TypeKey, Type> = {
  info: {
    containerClass: 'border-blue-400 dark:border-blue-600 bg-gray-200/40 dark:bg-gray-800/80',
    iconName: 'i-heroicons-information-circle-20-solid',
    iconClass: 'text-blue-400',
  },
  success: {
    containerClass: 'border-green-400 dark:border-green-600 bg-gray-200/40 dark:bg-gray-800/80',
    iconName: 'i-heroicons-check-circle-20-solid',
    iconClass: 'text-green-400',
  },
  warning: {
    containerClass: 'border-yellow-400 dark:border-yellow-600 bg-gray-200/40 dark:bg-gray-800/80',
    iconName: 'i-heroicons-exclamation-triangle-20-solid',
    iconClass: 'dark:text-yellow-400 text-yellow-500',
  },
  danger: {
    containerClass: 'border-red-400 dark:border-red-600 bg-gray-200/40 dark:bg-gray-800/80',
    iconName: 'i-heroicons-information-circle-20-solid',
    iconClass: 'text-red-400',
  },
}
</script>

<template>
  <div
    class="not-prose my-8 flex gap-x-0.5 rounded-md border px-1 py-2 text-sm"
    :class="typeClasses[type].containerClass"
  >
    <div
      class="flex place-self-center self-start px-2 pt-0.5"
    >
      <Icon
        :name="typeClasses[type].iconName"
        class="size-4"
        :class="typeClasses[type].iconClass"
      />
    </div>
    <div class="flex flex-col gap-y-1">
      <div
        v-if="title"
        class="flex items-center font-semibold"
        :class="typeClasses[type].iconClass"
      >
        {{ title }}
      </div>
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>

<style scope>
</style>
