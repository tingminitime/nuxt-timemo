import type { NavItem } from '@nuxt/content/types'

function transform(navigation: Array<NavItem>) {
  if (!navigation)
    return []

  // TODO: Filter directories from ~/content/articles/

  return navigation
}

export function useGetArticleCategories() {
  return useAsyncData('article-categories', () => fetchContentNavigation(), {
    default: () => [],
    transform,
  })
}
