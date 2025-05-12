import type { ContentNavigationItem } from '@nuxt/content'

type NavItemWithCategory = ContentNavigationItem & {
  slug?: string
  icon?: string
  count?: number
}

export function useGetCategories() {
  /**
   * Basic navigation query
   */
  function createCollectionNavigationQuery() {
    return queryCollectionNavigation('articles')
      .order('published_date', 'DESC')
  }

  function flatNavigation(
    node: ContentNavigationItem | undefined,
  ): NavItemWithCategory[] {
    if (!node)
      return []

    const result: NavItemWithCategory[] = []

    const countAllItemsInChildren = (node: ContentNavigationItem): number => {
      if (!node.children)
        return 0

      return node.children.reduce((count, child) => {
        return count + ('children' in child ? countAllItemsInChildren(child) : 1)
      }, 0)
    }

    if ('children' in node) {
      // First, calculate the count of non-children items
      const rootCount = node.children?.filter((child) => {
        return !('children' in child)
      }).length ?? 0

      result.push({
        path: node.path,
        title: node.title,
        stem: node.stem,
        icon: node.icon as string | undefined,
        count: rootCount,
      })
    }

    //
    node.children?.forEach((child) => {
      if ('children' in child) {
        result.push({
          path: child.path,
          title: child.title,
          stem: child.stem,
          icon: child.icon as string | undefined,
          count: countAllItemsInChildren(child),
        })
      }
    })

    return result
  }

  function transformNavigation(navigation: ContentNavigationItem[]) {
    if (!navigation)
      return []

    const articlesNavigation = navigation.find(nav => nav.stem === 'articles')
    return flatNavigation(articlesNavigation)
  }

  function getArticleCategories() {
    return useAsyncData(
      'article-categories',
      () => createCollectionNavigationQuery(),
      {
        default: () => [],
        transform: transformNavigation,
      },
    )
  }

  return {
    getArticleCategories,
  }
}
