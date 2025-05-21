import { categories } from '~/constants'

export function useGetCategories() {
  /**
   * Query all categories
   */
  function createAllArticlesQuery() {
    return queryCollection('articles')
      .where('extension', '=', 'md')
      .where('draft', 'IS NULL')
      .select('category')
      .all()
  }

  function getCategoriesWithCount(
    categoriesFromArticles: string[],
  ) {
    const countMap = categoriesFromArticles.reduce((map, id) => {
      map.set(id, (map.get(id) || 0) + 1)
      return map
    }, new Map<string, number>())

    return categories
      .filter(category => countMap.has(category.id))
      .map(category => ({
        ...category,
        count: countMap.get(category.id)!,
      }))
  }

  function getArticleCategories() {
    return useAsyncData(
      'article-categories',
      () => createAllArticlesQuery(),
      {
        default: () => [],
        transform: (result) => {
          const categories = result
            .map(item => item.category || 'uncategorized')
            .sort((a, b) => a.localeCompare(b))

          return getCategoriesWithCount(categories)
        },
      },
    )
  }

  return {
    getArticleCategories,
  }
}
