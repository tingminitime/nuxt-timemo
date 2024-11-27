import type { NavItem } from '@nuxt/content'

export function useGetArticleCategories() {
  function transform(navigation: Array<NavItem>) {
    if (!navigation)
      return []

    const articlesPath = '/articles'
    const articlesNav = navigation.find(nav => nav._path === articlesPath)

    return getDirectories(articlesNav)
  }

  /**
   * 回傳透過 `transform` 轉換後的搜尋文章分類的方法
   *
   * @see https://content.nuxt.com/composables/fetch-content-navigation
   */
  function getDirectories(node: NavItem | undefined): NavItem[] {
    const directories: NavItem[] = []

    if (!node)
      return directories

    if ('children' in node) {
      directories.push({
        title: node.title,
        _path: node._path,
      })

      node.children?.forEach((child) => {
        directories.push(...getDirectories(child))
      })
    }

    return directories
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
