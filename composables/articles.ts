// TODO: 完成新的取得所有文章方法
import type { ArticlesCollectionItem } from '@nuxt/content'

export function useGetArticles() {
  /**
   * Basic articles query
   */
  function createAllArticlesQuery() {
    return queryCollection('articles')
      .order('published_date', 'DESC')
      .all()
  }

  /**
   * Filtering valid articles
   */
  function filterValidPosts(posts: ArticlesCollectionItem[]) {
    return posts.filter(post => !post.draft)
  }

  function groupArticlesByYear(articles: ArticlesCollectionItem[]) {
    if (!articles)
      return []

    const articlesClone = structuredClone(articles)
    const groupedArticles = Object.groupBy(articlesClone, ({ published_date }) => {
      return new Date(published_date).getFullYear() || ''
    })

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
        .then(articles => filterValidPosts(articles))
    }

    return useAsyncData(
      `all-grouped-by-year-articles`,
      queryAllArticles,
      {
        default: () => [],
        transform: groupArticlesByYear,
      },
    )
  }

  return {
    getAllArticlesGroupedByYear,
  }
}
