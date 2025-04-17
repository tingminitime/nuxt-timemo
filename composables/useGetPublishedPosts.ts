import type { ContentNavigationItem } from '@nuxt/content'
import type { ParsedArticle } from '~/types/article'

export function useGetPublishedPosts() {
  const IGNORED_PATH: string[] = []

  /**
   * 轉換文章資料為年份分組格式
   */
  function transform(articles: ParsedArticle[]) {
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
            }
          }),
        }
      })
  }

  /**
   * 基礎的文章查詢配置
   */
  function createBaseQuery(path: string) {
    return queryCollection<ParsedArticle>(path)
      .where({ _type: { $ne: 'yaml' } })
      .sort({ published_date: -1 })
  }

  /**
   * 將回傳的文章資料加上分類資訊
   */
  function addCategoryInfoToPosts(
    posts: ParsedArticle[],
    categories: ContentNavigationItem[] | never[],
  ): ParsedArticle[] {
    if (!categories)
      return posts

    return posts.map((post) => {
      const category = categories.reduce((title, category) => {
        if (!post._path)
          return title

        const sliceEnd = category._path.split('/').length >= 3 ? 3 : 2

        const mainCategoryPath = post._path
          .split('/')
          .slice(0, sliceEnd)
          .join('/')

        if (category._path?.startsWith(mainCategoryPath))
          title = category.title

        return title
      }, '')

      return {
        ...post,
        category,
      }
    })
  }

  /**
   * 過濾有效的文章
   */
  function filterValidPosts(posts: ParsedArticle[]) {
    return posts.filter(post => !IGNORED_PATH.includes(post._path as string) && !post.draft)
  }

  /**
   * 獲取所有已發布的文章（包含子目錄）
   */
  function getAllPublishedPosts(
    categories: ContentNavigationItem[] | never[],
    path: string = '/articles/',
  ) {
    const queryAllPublishedPosts = () => {
      return createBaseQuery(path)
        .find()
        .then((res) => {
          const validPosts = filterValidPosts(res)
          return addCategoryInfoToPosts(validPosts, categories)
        })
    }

    return useAsyncData(`all-published-articles-${path}`, queryAllPublishedPosts, {
      default: () => [],
      transform,
    })
  }

  /**
   * 獲取未分類的文章（只在 /articles/ 第一層的 .md 文件）
   */
  function getUnclassifiedPosts() {
    const queryUnclassifiedPosts = () => {
      return createBaseQuery('/articles/')
        .where({
          _path: {
            $regex: '^/articles/[^/]+$', // 只匹配第一層(未分類)的 .md 文件
          },
        })
        .find()
        .then(res => filterValidPosts(res))
    }

    return useAsyncData('unclassified-articles', queryUnclassifiedPosts, {
      default: () => [],
      transform,
    })
  }

  return {
    getAllPublishedPosts,
    getUnclassifiedPosts,
  }
}
