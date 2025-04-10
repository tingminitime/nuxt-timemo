import type { ParsedAuthor } from '~/types/author'

export function useGetAllAuthors() {
  const getAllAuthors = () => {
    return queryCollection<ParsedAuthor>('/authors')
      .where({ _type: { $eq: 'yaml' } })
      .findOne()
  }

  const transform = (authors: ParsedAuthor) => {
    return authors.data
  }

  return useAsyncData('authors', getAllAuthors, {
    default: () => [],
    transform,
  })
}
