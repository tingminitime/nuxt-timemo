<script setup lang="ts">
import type { SearchResult } from 'minisearch'
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

const isSearchTermEmpty = ref(true)
const isSlicedResultEmpty = ref(false)

watch (searchTermDebounced, (val) => {
  if (val)
    isSearchTermEmpty.value = false
  else
    isSearchTermEmpty.value = true
})

watch(slicedResult, (val) => {
  if (val.length)
    isSlicedResultEmpty.value = false
  else
    isSlicedResultEmpty.value = true
})

function navigate() {
  if (!selected.value)
    return

  navigateTo(selected.value.id)
  openSearch.value = false
}
</script>

<template>
  <HeadlessTransitionRoot
    appear
    :show="openSearch"
    as="template"
  >
    <HeadlessDialog
      class="relative z-50"
      @close="openSearch = false"
    >
      <HeadlessTransitionChild
        as="template"
        enter="transition duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"></div>
      </HeadlessTransitionChild>

      <div class="fixed inset-0 z-50 flex h-full flex-row items-center justify-center">
        <HeadlessTransitionChild
          as="template"
          enter="transition-all duration-200 ease-out"
          enter-from="scale-90 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transition-all duration-150 ease-in"
          leave-from="scale-100 opacity-100"
          leave-to="scale-90 opacity-0"
        >
          <HeadlessDialogPanel class="w-[min(90dvw,40rem)] overflow-hidden rounded-lg bg-white ring-1  ring-gray-900/5 dark:bg-gray-800/85 dark:ring-gray-100/15">
            <HeadlessCombobox v-model="selected">
              <div class="relative inline-flex w-full items-center justify-between gap-[5px] border-b px-4 text-sm leading-none text-gray-700 outline-none dark:border-gray-700">
                <label for="search">
                  <span class="sr-only">Search</span>
                  <Icon
                    name="i-heroicons-magnifying-glass"
                    size="24"
                    class="text-gray-500"
                  />
                </label>
                <HeadlessComboboxInput
                  id="search"
                  type="text"
                  name="search"
                  class="block h-11 w-full border-none !bg-transparent py-3 text-gray-700 outline-none selection:bg-gray-300 placeholder:text-gray-300 dark:text-gray-200 dark:placeholder:text-gray-500"
                  :value="searchTerm"
                  @change="searchTerm = $event.target.value"
                  @keydown.enter="navigate"
                />
                <button
                  type="button"
                  aria-label="關閉搜尋視窗"
                  @click="openSearch = false"
                >
                  <Icon
                    name="i-heroicons-x-mark"
                    size="24"
                    class="text-gray-500"
                  />
                </button>
              </div>

              <div class="relative">
                <div
                  class="absolute left-1/2 top-0 py-3 text-center text-gray-500 -translate-x-1/2"
                >
                  <template v-if="!isSearchTermEmpty && isSlicedResultEmpty">
                    No results for "{{ searchTerm }}"
                  </template>
                  <template v-else-if="isSearchTermEmpty">
                    請輸入關鍵字搜尋
                  </template>
                </div>

                <HeadlessComboboxOptions
                  static
                  class="h-80 divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700"
                >
                  <HeadlessComboboxOption
                    v-for="item in slicedResult"
                    :key="item.id"
                    :value="item"
                  >
                    <NuxtLink
                      :to="item.id"
                      class="ui-active:bg-gray-200 dark:ui-active:bg-sky-700/20 flex w-full items-center gap-x-2 px-6 py-3"
                      @click="openSearch = false"
                    >
                      <Icon
                        name="i-heroicons-hashtag"
                        class="ui-active:text-sky-500 dark:ui-active:text-sky-400 inline-block shrink-0"
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
                        <span class=" ui-active:text-sky-500 dark:ui-active:text-sky-400">
                          {{ item.title }}
                        </span>
                      </div>
                    </NuxtLink>
                  </HeadlessComboboxOption>
                </HeadlessComboboxOptions>
              </div>
            </HeadlessCombobox>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style scoped></style>
