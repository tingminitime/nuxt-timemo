<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const { copy, copied, isSupported } = useClipboard()
const filteredCode = props.code.replace(/ \/\/ \[!code.*?\]/g, '')
</script>

<template>
  <ClientOnly>
    <button
      v-if="isSupported"
      id="copy-button"
      type="button"
      class="group/copy absolute bottom-2.5 right-2 z-10 flex size-8 items-center justify-center rounded bg-white/90 p-1 transition dark:bg-gray-800/90 md:opacity-0 md:group-hover:opacity-100"
      :class="copied ? 'md:opacity-100' : 'md:opacity-0'"
      @click="copy(filteredCode)"
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
