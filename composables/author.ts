// import type { ParsedAuthor } from '~/types/author'
// import type { AuthorsCollectionItem } from '@nuxt/content'

export function useGetAllAuthors() {
  // const getAllAuthors = () => {
  //   return queryCollection('authors')
  //     .first()
  // }

  // const transform = (authors: AuthorsCollectionItem) => {
  //   return authors.data
  // }

  return useAsyncData(
    'authors',
    () => queryCollection('authors').first(),
    {
      default: () => [],
      // transform,
    },
  )
}
