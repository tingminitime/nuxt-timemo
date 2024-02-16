<script setup lang="ts">
import { Popover, PopoverButton } from '@headlessui/vue'

const popoverButtonId = useId()
</script>

<template>
  <Popover>
    <HeaderItem
      v-bind="$attrs"
      :id="popoverButtonId"
      :as="PopoverButton"
      type="button"
      class="flex items-center gap-2 px-4 py-2 font-medium text-gray-800 dark:text-gray-100"
      hover
    >
      <span>前往</span>
      <Icon
        class="h-auto w-3 stroke-gray-500 group-hover:stroke-gray-700 dark:group-hover:stroke-gray-400"
        name="heroicons:chevron-down"
      />
    </HeaderItem>
    <HeaderNavigationDialog />
  </Popover>
</template>

<style scope></style>
