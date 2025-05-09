export function useGetCategories() {
  /**
   * Basic navigation query
   */
  function createCollectionNavigationQuery() {
    return queryCollectionNavigation('articles')
      .where('draft', '<>', true)
      .order('published_date', 'DESC')
  }

  // TODO: Add query function to get articles categories

  return {}
}
