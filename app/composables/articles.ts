import type { ArticlesCollectionItem } from '@nuxt/content'

export function useGetArticles() {
  /**
   * Basic articles query
   */
  function createAllArticlesQuery() {
    return queryCollection('articles')
      .where('extension', '=', 'md')
      .where('draft', 'IS NULL')
      .order('published_date', 'DESC')
      .all()
  }

  function createArticlesWithCategoryQuery(category: string) {
    switch (category) {
      case 'uncategorized': {
        return queryCollection('articles')
          .where('extension', '=', 'md')
          .where('draft', 'IS NULL')
          .where('category', 'IS NULL')
          .order('published_date', 'DESC')
          .all()
      }
      default: {
        return queryCollection('articles')
          .where('extension', '=', 'md')
          .where('draft', 'IS NULL')
          .where('category', '=', category)
          .order('published_date', 'DESC')
          .all()
      }
    }
  }

  function createArticleQuery(path: string) {
    return queryCollection('articles')
      .path(path)
      .first()
  }

  function groupArticlesByYear(articles: ArticlesCollectionItem[]) {
    if (!articles)
      return []

    const groupedArticles = Object.groupBy(
      articles,
      ({ published_date }) => {
        return new Date(published_date).getFullYear() || ''
      },
    )

    const entries = Object.entries(groupedArticles)

    return entries
      .reverse()
      .map(([year, articles]) => {
        return {
          year,
          articles: (articles ?? []).map((article) => {
            return {
              ...article,
              published_date_iso_string: article.published_date ? ISODate(article.published_date) : '',
              published_date_format: article.published_date ? formatDate(article.published_date) : '',
              modified_date_iso_string: article.modified_date ? ISODate(article.modified_date) : '',
              modified_date_format: article.modified_date ? formatDate(article.modified_date) : '',
            }
          }),
        }
      })
  }

  function addDateInfoToArticle(article: ArticlesCollectionItem | null) {
    if (!article)
      return null

    return {
      ...article,
      published_date_iso_string: article.published_date ? ISODate(article.published_date) : '',
      published_date_format: article.published_date ? formatDate(article.published_date) : '',
      modified_date_iso_string: article.modified_date ? ISODate(article.modified_date) : '',
      modified_date_format: article.modified_date ? formatDate(article.modified_date) : '',
    }
  }

  /**
   * Retrieving all published articles (including subdirectories)
   */
  function getAllArticlesGroupedByYear() {
    return useAsyncData(
      `all-grouped-by-year-articles`,
      createAllArticlesQuery,
      {
        default: () => [],
        transform: groupArticlesByYear,
      },
    )
  }

  /**
   * Retrieving all published articles with category path
   */
  function getArticlesWithCategory(
    category: string = 'uncategorized',
  ) {
    return useAsyncData(
      `articles-with-category-${category}`,
      () => createArticlesWithCategoryQuery(category),
      {
        default: () => [],
        transform: groupArticlesByYear,
      },
    )
  }

  /**
   *
   */
  function getArticleWithPath(path: string) {
    return useAsyncData(
      path,
      () => createArticleQuery(path),
      {
        default: () => null,
        transform: addDateInfoToArticle,
      },
    )
  }

  return {
    getAllArticlesGroupedByYear,
    getArticlesWithCategory,
    getArticleWithPath,
  }
}
