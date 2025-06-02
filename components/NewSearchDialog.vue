<!-- Refer: https://lucaong.github.io/minisearch/index.html -->
<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import MiniSearch from 'minisearch'

const openSearch = defineModel<boolean>()

const { data } = await useAsyncData(
  'search',
  () => queryCollectionSearchSections('articles', {
    ignoredTags: ['code'],
  })
    .where('extension', '=', 'md'),
)

const miniSearch = new MiniSearch({
  fields: ['title', 'titles', 'content'],
  storeFields: ['title', 'titles', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

if (data.value) {
  miniSearch.addAll(toValue(data.value))
}

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const result = computed(() => {
  return miniSearch.search(toValue(searchTermDebounced))
})

const SEARCH_FILTER_SCORE = 1
const SEARCH_SLICE_COUNT = 12
const filteredResult = computed(() => {
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
const isFilteredResultEmpty = ref(false)

watch (searchTermDebounced, (val) => {
  if (val)
    isSearchTermEmpty.value = false
  else
    isSearchTermEmpty.value = true
})

watch(filteredResult, (val) => {
  if (val.length)
    isFilteredResultEmpty.value = false
  else
    isFilteredResultEmpty.value = true
})

const selected = ref<SearchResult>()

function navigate() {
  if (!selected.value)
    return

  navigateTo(selected.value.id)
  openSearch.value = false
}
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
          class="fixed left-1/2 top-1/2 z-[100] w-[min(90dvw,40rem)] rounded-[6px] bg-white shadow-lg ring-1 -translate-x-1/2 -translate-y-1/2 focus:outline-none dark:bg-gray-800/85 dark:ring-gray-100/15"
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
            :ignore-filter="true"
            @highlight="(payload) => selected = (payload?.value as SearchResult)"
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
            </ComboboxAnchor>

            <!-- Search results -->
            <div class="relative">
              <div
                class="absolute left-1/2 top-0 py-3 text-center text-gray-500 -translate-x-1/2"
              >
                <template v-if="!isSearchTermEmpty && isFilteredResultEmpty">
                  No results for "{{ searchTerm }}"
                </template>
                <template v-else-if="isSearchTermEmpty">
                  請輸入關鍵字搜尋
                </template>
              </div>

              <ComboboxContent
                class="h-80"
                :data-dismissable-layer="false"
                force-mount
              >
                <ComboboxViewport
                  as="ul"
                  class="divide-y divide-gray-200 overflow-y-scroll p-1 dark:divide-gray-700"
                >
                  <ComboboxItem
                    v-for="item in filteredResult"
                    :key="item.id"
                    as="li"
                    :value="item"
                    class=" group"
                  >
                    <NuxtLink
                      :to="item.id"
                      class="flex w-full items-center gap-x-2 px-6 py-3 group-data-[highlighted]:bg-gray-200 dark:group-data-[highlighted]:bg-sky-700/20"
                      @click="openSearch = false"
                    >
                      <Icon
                        name="i-heroicons-hashtag"
                        class="inline-block shrink-0 group-data-[highlighted]:text-sky-500 dark:group-data-[highlighted]:text-sky-400"
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
                        <span class="group-data-[highlighted]:text-sky-500 dark:group-data-[highlighted]:text-sky-400">
                          {{ item.title }}
                        </span>
                      </div>
                    </NuxtLink>
                  </ComboboxItem>
                </ComboboxViewport>
              </ComboboxContent>
            </div>
          </ComboboxRoot>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
:deep([data-reka-combobox-viewport]::-webkit-scrollbar) {
  display: block;
}

:deep([data-reka-combobox-viewport]) {
  scrollbar-width: thin;
}
</style>
