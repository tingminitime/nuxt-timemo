/* Refer : https://github.com/nuxt/content/blob/2.x/src/runtime/composables/search.ts#L14 */
import type { Options as MiniSearchOptions, SearchResult } from 'minisearch'
import MiniSearch from 'minisearch'

type SearchResultWithTitles = SearchResult & {
  title: string
  content: string
  titles: string[]
}

function useIndexedMiniSearch<DataItem>(search: MaybeRefOrGetter<string>, indexedData: MaybeRefOrGetter<string>, options: MaybeRefOrGetter<MiniSearchOptions<DataItem>>) {
  const indexedMiniSearch = computed(() => {
    return MiniSearch.loadJSON(toValue(indexedData), toValue(options))
  })

  const results = computed(() => {
    return indexedMiniSearch.value.search(toValue(search)) as SearchResultWithTitles[]
  })

  return results
}

function useMiniSearch<T = any>(search: MaybeRefOrGetter<string>, data: MaybeRefOrGetter<T[]>, options: MaybeRefOrGetter<MiniSearchOptions<T>>) {
  const miniSearch = computed(() => {
    return new MiniSearch(toValue(options))
  })

  miniSearch.value.addAll(toValue(data))

  const results = computed(() => {
    return miniSearch.value.search(toValue(search)) as SearchResultWithTitles[]
  })

  return results
}

export default async function customSearchContent<DataItem>(search: MaybeRefOrGetter<string>, options: { miniSearch?: MaybeRefOrGetter<MiniSearchOptions<DataItem>> } = {}) {
  const runtimeConfig = useRuntimeConfig()
  const { integrity, api: { baseURL: baseAPI }, search: searchOptions } = runtimeConfig.public.content
  const { indexed: useIndexedSearch } = searchOptions || {}

  const searchRoute = `${baseAPI}/search${integrity ? `-${integrity}` : ''}`

  if (useIndexedSearch) {
    const { options: miniSearchOptions } = searchOptions || {}

    const { data } = await useFetch<string>(searchRoute, { responseType: 'text' })

    if (!data.value) {
      throw createError({
        statusCode: 500,
        message: 'Missing search data',
      })
    }

    const results = useIndexedMiniSearch(search, data as Ref<string>, miniSearchOptions!)

    return results
  }

  if (!options.miniSearch) {
    throw createError({
      statusCode: 500,
      message: 'Missing miniSearch options',
    })
  }

  const { data } = await useFetch<DataItem[]>(searchRoute)

  if (!data.value) {
    throw createError({
      statusCode: 500,
      message: 'Missing search data',
    })
  }

  const results = useMiniSearch(search, data as Ref<DataItem[]>, options.miniSearch)

  return results
}
