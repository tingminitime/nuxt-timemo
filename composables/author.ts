// import type { AuthorsCollectionItem } from '@nuxt/content'

export function useGetAllAuthors() {
  const getAllAuthors = () => {
    return queryCollection('authors')
      .first()
  }

  return useAsyncData(
    'authors',
    getAllAuthors,
  )
}
