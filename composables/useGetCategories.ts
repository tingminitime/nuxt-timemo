import type { NavItem } from '@nuxt/content/types'

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

export function useGetArticleCategories() {
  return {
    getArticleCategories,
    findCategoryTitleByPath,
  }
}
