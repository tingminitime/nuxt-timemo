import type { ContentNavigationItem } from '@nuxt/content'
import type { NavItemWithCategory } from '~/types/category'

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
        category_id: node.stem,
        icon: node.icon as string | undefined,
        count: rootCount,
      })
    }

    // Second, calculate the count of all items in children
    node.children?.forEach((child) => {
      if ('children' in child) {
        result.push({
          path: child.path,
          title: child.title,
          category_id: child.stem?.split('/').at(-1),
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

  /**
   * Use `content/articles/*` directory name as `category_id`
   */
  function getArticleCategories() {
    return useAsyncData(
      'article-flat-categories',
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
