<script setup lang="ts">
import { PopoverButton } from '@headlessui/vue'

const showNavigationDialog = ref(false)
</script>

<template>
  <ClientOnly>
    <HeadlessPopover>
      <HeaderItem
        :as="PopoverButton"
        type="button"
        v-bind="$attrs"
        class="flex items-center gap-2 px-4 py-2 font-medium text-gray-800 dark:text-gray-100"
        hover
        @click="showNavigationDialog = true"
      >
        <span>前往</span>
        <Icon
          class="h-auto w-3 stroke-gray-500 group-hover:stroke-gray-700 dark:group-hover:stroke-gray-400"
          name="heroicons:chevron-down"
        />
      </HeaderItem>
      <HeaderNavigationDialog v-model:open="showNavigationDialog" />
    </HeadlessPopover>
  </ClientOnly>
</template>

<style scope></style>
