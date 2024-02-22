<script setup lang="ts">
defineProps<{
  code: string
}>()

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="group/copy absolute bottom-2 right-2 z-10 flex size-8 items-center justify-center rounded bg-white/90 p-1 opacity-0 transition group-hover:opacity-100 dark:bg-gray-800/90"
      @click="copy(code)"
    >
      <span
        v-if="copied"
        class="sr-only"
      >Copy to clipboard</span>
      <Transition
        appear
        mode="out-in"
        enter-active-class="duration-150 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <Icon
          v-if="copied"
          class="group-hover/copy:text-gray-400 dark:group-hover/copy:text-gray-300"
          name="i-heroicons-check-solid"
        />
        <Icon
          v-else
          class="group-hover/copy:text-gray-400 dark:group-hover/copy:text-gray-300"
          name="i-heroicons-clipboard-document"
        />
      </Transition>
    </button>
  </ClientOnly>
</template>

<style scope></style>
