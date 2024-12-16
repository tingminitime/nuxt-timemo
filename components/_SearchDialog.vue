<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
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
import customSearchContent from '~/composables/search'

const openSearch = defineModel<boolean>()

const searchDialogContentRef = ref(null)

onClickOutside(
  searchDialogContentRef,
  () => {
    openSearch.value = false
  },
)

const selected = ref<SearchResult>()
const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const result = await customSearchContent(searchTermDebounced)

const SEARCH_FILTER_SCORE = 1
const SEARCH_SLICE_COUNT = 12
const slicedResult = computed(() => {
  return result.value
    .filter(item => Math.floor(item.score) >= SEARCH_FILTER_SCORE)
    .slice(0, SEARCH_SLICE_COUNT)
    .map((item) => {
      if (item.titles.length <= 3)
        return item

      return {
        ...item,
        titles: [
          item.titles[0],
          item.titles[1],
          '...',
        ],
      }
    })
})

const isEmpty = computed(() => !slicedResult.value.length)

function navigate() {
  if (!selected.value)
    return

  navigateTo(selected.value.id)
  openSearch.value = false
}
</script>

<template>
  <div>
    <DialogRoot :open="openSearch">
      <DialogPortal>
        <Transition
          appear
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
          appear
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
            class="fixed left-1/2 top-1/2 z-50 w-[min(90dvw,40rem)] overflow-hidden rounded-lg bg-white ring-1  ring-gray-900/5 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-800/85 dark:ring-gray-100/15"
          >
            <DialogTitle class="sr-only">
              搜尋內容
            </DialogTitle>
            <DialogDescription class="sr-only">
              輸入搜尋內容顯示搜尋結果列表
            </DialogDescription>

            <ComboboxRoot
              v-model:selected-value="selected"
              v-model:search-term="searchTerm"
              :reset-search-term-on-blur="false"
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
                  :auto-focus="true"
                  @keydown.enter="navigate"
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

              <ComboboxContent
                :force-mount="true"
                class="relative"
              >
                <ComboboxViewport>
                  <ComboboxEmpty class="absolute left-1/2 top-0 py-3 text-center text-gray-500 -translate-x-1/2">
                    No results found
                  </ComboboxEmpty>
                  <ComboboxGroup
                    as="ul"
                    class="!block h-80 divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700"
                  >
                    <ComboboxItem
                      v-for="item in slicedResult"
                      :key="item.id"
                      :value="item"
                      as="li"
                      class="group relative flex w-full select-none items-center text-base leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-200 data-[disabled]:text-gray-300 data-[highlighted]:outline-none dark:data-[highlighted]:bg-sky-700/20"
                      :class="[isEmpty ? '!hidden' : '!block']"
                    >
                      <NuxtLink
                        :to="item.id"
                        class="flex w-full items-center gap-x-2 px-6 py-3"
                      >
                        <Icon
                          name="i-heroicons-hashtag"
                          class="inline-block shrink-0 group-data-[highlighted]:text-sky-500"
                        />
                        <div class="flex flex-wrap items-center gap-x-2 leading-5">
                          <template
                            v-for="title in item.titles"
                            :key="title"
                          >
                            <span class="inline-block">{{ title }}</span>
                            <Icon
                              name="i-heroicons-chevron-right"
                              class="inline-block text-gray-500 dark:text-gray-400"
                            />
                          </template>
                          <span class=" group-data-[highlighted]:text-sky-500 dark:group-data-[highlighted]:text-sky-400">
                            {{ item.title }}
                          </span>
                        </div>
                      </NuxtLink>
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxViewport>
              </ComboboxContent>
            </ComboboxRoot>

            <!-- <div class="h-80 overflow-y-auto">
              <pre>{{ result }}</pre>
            </div> -->
          </DialogContent>
        </Transition>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped></style>
