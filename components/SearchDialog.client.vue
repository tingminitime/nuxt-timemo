<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'radix-vue'

const options = [
  {
    title: 'Option 1',
    href: '/articles',
  },
  {
    title: 'Option 2',
    href: '/articles',
  },
  {
    title: 'Option 3',
    href: '/articles',
  },
  {
    title: 'Option 4',
    href: '/articles',
  },
  {
    title: 'Option 5',
    href: '/articles',
  },
  {
    title: 'Option 6',
    href: '/articles',
  },
  {
    title: 'Option 7',
    href: '/articles',
  },
  {
    title: 'Option 8',
    href: '/articles',
  },
  {
    title: 'Option 9',
    href: '/articles',
  },
  {
    title: 'Option 10',
    href: '/articles',
  },
]

const openSearch = defineModel<boolean>()

const searchDialogContentRef = ref(null)

onClickOutside(
  searchDialogContentRef,
  () => {
    openSearch.value = false
  },
)

const v = ref<Record<string, any>>(options[0])

function filterFunction(list: typeof options, searchTerm: string) {
  return list.filter(option => option.title.toLowerCase().includes(searchTerm.toLowerCase()))
}
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
          <DialogOverlay class="fixed inset-0 z-50 bg-black/75" />
        </Transition>

        <Transition
          mode="out-in"
          enter-active-class="transition-all ease-out duration-200"
          enter-from-class="scale-90 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition-all ease-in duration-150"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-90 opacity-0"
        >
          <DialogContent
            ref="searchDialogContentRef"
            class="fixed left-1/2 top-1/2 z-50 w-[min(90dvw,36rem)] overflow-hidden rounded-lg bg-white ring-1  ring-gray-900/5 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-800/85 dark:ring-gray-100/15"
          >
            <DialogTitle class="sr-only">
              搜尋內容
            </DialogTitle>
            <DialogDescription class="sr-only">
              輸入搜尋內容顯示搜尋結果列表
            </DialogDescription>

            <ComboboxRoot
              v-model="v"
              :filter-function="filterFunction"
              class="relative"
            >
              <ComboboxAnchor class="inline-flex w-full items-center justify-between gap-[5px] border-b px-4 text-sm leading-none text-gray-700 outline-none data-[placeholder]:text-gray-300 dark:border-gray-700">
                <Icon
                  name="i-heroicons-magnifying-glass"
                  size="24"
                  class="text-gray-500"
                />
                <ComboboxInput
                  class="block h-11 w-full border-none !bg-transparent py-3 text-gray-700 outline-none selection:bg-gray-300 placeholder:text-gray-300 dark:text-gray-200 dark:placeholder:text-gray-500"
                  placeholder="Search..."
                />
                <DialogClose
                  as="button"
                  aria-label="關閉搜尋視窗"
                  @click="openSearch = false"
                >
                  <Icon
                    name="i-heroicons-x-mark"
                    size="24"
                    class="text-gray-500"
                  />
                </DialogClose>
              </ComboboxAnchor>

              <ComboboxContent :force-mount="true">
                <ComboboxViewport>
                  <ComboboxEmpty class="py-3 text-center text-gray-500">
                    No results found
                  </ComboboxEmpty>
                  <ComboboxGroup
                    as="ul"
                    class="h-96 divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700"
                  >
                    <ComboboxItem
                      v-for="option in options"
                      :key="option.title"
                      as="li"
                      :value="option"
                      class="relative flex w-full select-none items-center px-6 py-3 text-base leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-200 data-[disabled]:text-gray-300 data-[highlighted]:outline-none dark:data-[highlighted]:bg-sky-700/20"
                    >
                      <span>{{ option.title }}</span>
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxViewport>
              </ComboboxContent>
            </ComboboxRoot>
          </DialogContent>
        </Transition>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped></style>
