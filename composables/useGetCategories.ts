import type { NavItem } from '@nuxt/content/types'

export function useGetArticleCategories() {
  function transformIntoArticles(navigation: Array<NavItem>) {
    if (!navigation)
      return []

    const targetCategoryPath = '/articles'
    const category = navigation.find(category => category._path === targetCategoryPath)

    return category || null
  }

  function getArticleCategories() {
    return useAsyncData('article-categories', () => fetchContentNavigation(), {
      default: () => [],
      transform: transformIntoArticles,
    })
  }

  return {
    getArticleCategories,
    findCategoryTitleByPath,
  }
}
