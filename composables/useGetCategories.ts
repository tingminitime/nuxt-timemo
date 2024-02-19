import type { NavItem } from '@nuxt/content/types'

export function findCategoryTitleByPath(categories: NavItem, path: string): string {
  if (categories._path === path || path.includes(categories._path))
    return categories.title

  if (categories.children) {
    for (const child of categories.children) {
      const title = findCategoryTitleByPath(child, path)
      if (title)
        return title
    }
  }

  return ''
}

function transformIntoArticles(navigation: Array<NavItem>) {
  if (!navigation)
    return []

  const targetCategoryPath = '/articles'
  const category = navigation.find(category => category._path === targetCategoryPath)

  return category
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
