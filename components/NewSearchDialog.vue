<script setup lang="ts">
import MiniSearch from 'minisearch'
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

// TODO: Complete the search functionality
const openSearch = defineModel<boolean>()

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)
</script>

<template>
  <DialogRoot
    :open="openSearch"
  >
    <DialogPortal>
      <Transition
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-150 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 z-50 bg-black/75 data-[state=open]:animate-overlayShow" />
      </Transition>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-150 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <DialogContent class="fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] translate-x-[-50%] translate-y-[-50%] focus:outline-none data-[state=open]:animate-contentShow">
          <DialogTitle>
            Dialog Title
          </DialogTitle>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped></style>
