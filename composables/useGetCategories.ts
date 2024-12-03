import type { NavItem } from '@nuxt/content'

interface NavItemWithCategory extends NavItem {
  slug?: string
  icon?: string
  count?: number
}

export function useGetArticleCategories() {
  const countNonDirectoryItems = (node: NavItem): number => {
    if (!node.children)
      return 0

    return node.children.reduce((count, child) =>
      count + ('children' in child ? countNonDirectoryItems(child) : 1), 0)
  }

  function flatNavigation(node: NavItem | undefined): NavItemWithCategory[] {
    if (!node)
      return []

    const result: NavItemWithCategory[] = []

    if ('children' in node) {
      const rootCount = node.children?.filter(child => !('children' in child)).length ?? 0
      result.push({
        _path: node._path,
        title: node.title,
        slug: node._path.split('/').pop(),
        icon: node.icon,
        count: rootCount,
      })
    }

    node.children?.forEach((child) => {
      if ('children' in child) {
        result.push({
          _path: child._path,
          title: child.title,
          slug: child._path.split('/').pop(),
          icon: child.icon,
          count: countNonDirectoryItems(child),
        })
      }
    })

    return result
  }

  function transform(navigation: Array<NavItem>) {
    if (!navigation)
      return []

    const articlesPath = '/articles'
    const articlesNav = navigation.find(nav => nav._path === articlesPath)

    return flatNavigation(articlesNav)
  }

  /**
   * 回傳透過 `transform` 轉換後的搜尋文章分類的方法
   *
   * @see https://content.nuxt.com/composables/fetch-content-navigation
   */
  function getFlatArticleCategories() {
    return useAsyncData('article-flat-categories', () => fetchContentNavigation(), {
      default: () => [],
      transform,
    })
  }

  return {
    getFlatArticleCategories,
  }
}
