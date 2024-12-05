<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxRoot,
  ComboboxTrigger,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'radix-vue'

const openSearch = defineModel<boolean>()

const v = ref('')
</script>

<template>
  <div>
    <DialogRoot :open="openSearch">
      <DialogPortal>
        <Transition
          mode="out-in"
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 z-50 bg-black/20" />
        </Transition>

        <Transition
          mode="out-in"
          enter-active-class="transition-transform ease-out duration-200"
          enter-from-class="scale-90"
          enter-to-class="scale-100"
          leave-active-class="transition-transform ease-in duration-150"
          leave-from-class="scale-100"
          leave-to-class="scale-90"
        >
          <DialogContent class="fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[min(90dvw,32rem)] rounded-md bg-white p-6 -translate-x-1/2 -translate-y-1/2">
            <DialogTitle class="sr-only">
              搜尋內容
            </DialogTitle>
            <DialogDescription class="sr-only">
              輸入搜尋內容顯示搜尋結果列表
            </DialogDescription>

            <ComboboxRoot
              v-model="v"
              class="relative"
            >
              <ComboboxAnchor class="inline-flex h-[35px] min-w-[160px] items-center justify-between gap-[5px] rounded bg-white px-4 text-sm leading-none text-gray-700 outline-none data-[placeholder]:text-gray-300">
                <ComboboxInput
                  class="h-full !bg-transparent text-gray-700 outline-none selection:bg-gray-300 placeholder:text-gray-200"
                  placeholder="Placeholder..."
                />
                <ComboboxTrigger>
                  <Icon
                    name="i-heroicons-chevron-down"
                    class="size-4 text-gray-700"
                  />
                </ComboboxTrigger>
              </ComboboxAnchor>
            </ComboboxRoot>
          </DialogContent>
        </Transition>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped></style>
