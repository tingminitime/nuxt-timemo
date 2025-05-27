<!-- Refer: https://lucaong.github.io/minisearch/index.html -->
<script setup lang="ts">
import MiniSearch from 'minisearch'

// TODO: Complete the search functionality
const openSearch = defineModel<boolean>()

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data } = await useAsyncData(
  'search',
  () => queryCollectionSearchSections('articles', {
    ignoredTags: ['code'],
  })
    .where('extension', '=', 'md'),
)

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

if (data.value) {
  miniSearch.addAll(toValue(data.value))
}

const result = computed(() => {
  return miniSearch.search(toValue(searchTermDebounced))
})

const SEARCH_FILTER_SCORE = 1
const SEARCH_SLICE_COUNT = 12
const filteredResult = computed(() => {
  return result.value
    .filter(item => Math.floor(item.score) >= SEARCH_FILTER_SCORE)
    .slice(0, SEARCH_SLICE_COUNT)
    // .map((item) => {
    //   if (item.titles.length <= 3)
    //     return item

  //   return {
  //     ...item,
  //     titles: [
  //       item.titles[0],
  //       item.titles[1],
  //       '...',
  //     ],
  //   }
  // })
})
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
        <DialogOverlay class="fixed inset-0 z-50 bg-black/75" />
      </Transition>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-150 ease-in"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <DialogContent
          class="fixed left-1/2 top-1/2 z-[100] w-[min(90dvw,40rem)] rounded-[6px] bg-white shadow-lg -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          @pointer-down-outside="openSearch = false"
        >
          <DialogTitle class="sr-only">
            Search
          </DialogTitle>
          <DialogDescription class="sr-only">
            Search for articles
          </DialogDescription>
          <!-- Search input -->
          <ComboboxRoot
            class="relative"
          >
            <ComboboxAnchor class="relative inline-flex w-full items-center justify-between gap-[5px] border-b px-4 text-sm leading-none text-gray-700 outline-none dark:border-gray-700">
              <label for="search">
                <span class="sr-only">Search</span>
                <Icon
                  name="i-heroicons-magnifying-glass"
                  size="24"
                  class="text-gray-500"
                />
              </label>
              <ComboboxInput
                id="search"
                v-model="searchTerm"
                name="search"
                class="block h-11 w-full border-none !bg-transparent py-3 text-gray-700 outline-none selection:bg-gray-300 placeholder:text-gray-300 dark:text-gray-200 dark:placeholder:text-gray-500"
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
            </ComboboxAnchor>

            <!-- Search results -->
            <ComboboxContent>
              <ComboboxViewport class="p-1">
                <ComboboxEmpty class="py-2 text-center text-xs font-medium" />
                <ComboboxItem
                  v-for="item in result"
                  :key="item.id"
                  :value="item"
                >
                  {{ item.title }}
                </ComboboxItem>
              </ComboboxViewport>
            </ComboboxContent>
          </ComboboxRoot>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped></style>
