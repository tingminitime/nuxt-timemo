import type { ArticlesCollectionItem } from '@nuxt/content'

export function useGetArticles() {
  /**
   * Basic articles query
   */
  function createAllArticlesQuery() {
    return queryCollection('articles')
      .where('extension', '=', 'md')
      .order('published_date', 'DESC')
      .all()
  }

  function createArticlesWithCategoryQuery(category: string) {
    return queryCollection('articles')
      .where('extension', '=', 'md')
      .where('draft', 'IS NULL')
      .where('category', '=', category)
      .order('published_date', 'DESC')
      .all()
  }

  // function createUnclassifiedArticlesQuery() {
  //   return queryCollection('articles')
  //     .where('extension', '=', 'md')
  //     .where('draft', 'IS NULL')
  //     .where('category', )
  //     .order('published_date', 'DESC')
  //     .all()
  // }

  /**
   * Filtering valid articles
   */
  function filterValidArticles(posts: ArticlesCollectionItem[]) {
    return posts.filter(post => !post.draft)
  }

  function addCategoryToArticles(articles: ArticlesCollectionItem[]) {
    return articles.map((article) => {
      const pathParts = article.stem.split('/')
      const category_id = pathParts.length >= 3
        ? pathParts[1]
        : pathParts[0]

      return {
        ...article,
        category_id,
      }
    })
  }

  function groupArticlesByYear(articles: ArticlesCollectionItem[]) {
    if (!articles)
      return []

    const articlesWithCategoryId = addCategoryToArticles(articles)
    const groupedArticles = Object.groupBy(
      articlesWithCategoryId,
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

  /**
   * Retrieving all published articles (including subdirectories)
   */
  function getAllArticlesGroupedByYear() {
    const queryAllArticles = () => {
      return createAllArticlesQuery()
        .then(articles => filterValidArticles(articles))
    }

    return useAsyncData(
      `all-grouped-by-year-articles`,
      queryAllArticles,
      {
        default: () => [],
        // transform: groupArticlesByYear,
        transform: groupArticlesByYear,
      },
    )
  }

  /**
   * Retrieving all published articles with category path
   */
  function getArticlesWithCategory(category: string) {
    const queryArticlesWithCategory = () => {
      return createArticlesWithCategoryQuery(category)
        .then((articles) => {
          console.log('articles with category:', articles)
          return filterValidArticles(articles)
        })
    }

    return useAsyncData(
      `articles-with-category-${category}`,
      queryArticlesWithCategory,
      {
        default: () => [],
        transform: groupArticlesByYear,
      },
    )
  }

  /**
   * Retrieving uncategorized articles (only in the `/articles` directory)
   */
  // function getUnclassifiedArticles() {
  //   const queryUnclassifiedArticles = () => {
  //     return createUnclassifiedArticlesQuery()
  //       .then(articles => filterValidArticles(articles))
  //   }

  //   return useAsyncData(
  //     `uncategorized-articles`,
  //     queryUnclassifiedArticles,
  //     {
  //       default: () => [],
  //       transform: groupArticlesByYear,
  //     },
  //   )
  // }

  return {
    getAllArticlesGroupedByYear,
    getArticlesWithCategory,
    // getUnclassifiedArticles,
  }
}
