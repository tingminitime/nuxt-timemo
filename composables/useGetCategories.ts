import type { NavItem } from '@nuxt/content'

interface NavItemWithCategory extends NavItem {
  slug?: string
  icon?: string
  count?: number
}

export function useGetArticleCategories() {
  const countNonDirectoryItems = (node: NavItem): number => {
    let count = 0

    if (!node.children)
      return 0

    node.children.forEach((child) => {
      if ('children' in child) {
        count += countNonDirectoryItems(child)
      }
      else {
        count++
      }
    })

    return count
  }

  /**
   * 回傳透過 `transform` 轉換後的搜尋文章分類的方法
   *
   * @see https://content.nuxt.com/composables/fetch-content-navigation
   */
  function getDirectories(node: NavItem | undefined): NavItemWithCategory[] {
    const directories: NavItemWithCategory[] = []

    if (!node)
      return directories

    if ('children' in node) {
      const rootCount = node.children?.filter(child => !('children' in child)).length ?? 0
      directories.push({
        _path: node._path,
        title: node.title,
        slug: node._path.split('/').pop(),
        icon: node.icon,
        count: rootCount,
      })
    }

    node.children?.forEach((child) => {
      if ('children' in child) {
        directories.push({
          _path: child._path,
          title: child.title,
          slug: child._path.split('/').pop(),
          icon: child.icon,
          count: countNonDirectoryItems(child),
        })
      }
    })

    return directories
  }

  function transform(navigation: Array<NavItem>) {
    if (!navigation)
      return []

    const articlesPath = '/articles'
    const articlesNav = navigation.find(nav => nav._path === articlesPath)

    return getDirectories(articlesNav)
  }

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
