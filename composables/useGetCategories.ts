import type { NavItem } from '@nuxt/content'

export function useGetArticleCategories() {
  /**
   * 找到 `_path` 為 `/articles` 的物件
   */
  function transformIntoArticles(navigation: Array<NavItem>) {
    if (!navigation)
      return []

    const targetCategoryPath = '/articles'
    const category = navigation.find(category => category._path === targetCategoryPath)

    return category || null
  }

  /**
   * 回傳透過 `transform` 轉換後的搜尋文章分類的方法
   *
   * @see https://content.nuxt.com/composables/fetch-content-navigation
   */
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
