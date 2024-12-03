import type { NavItem } from '@nuxt/content'
import type { ParsedArticle } from '~/types/article'

export function useGetAllPublishedPosts() {
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

  const IGNORED_PATH: string[] = []

  function getAllPublishedPosts(categories: NavItem[] | never[], path: string = '/articles/') {
    const queryAllPublishedPosts = () => {
      return queryContent<ParsedArticle>(path)
        .where({ _type: { $ne: 'yaml' } })
        .sort({ published_date: -1 })
        .only(['_path', '_dir', 'title', 'description', 'author', 'cover', 'published_date', 'modified_date', 'draft'])
        .find()
        .then((res) => {
          const posts = res.filter(post => !IGNORED_PATH.includes(post._path as string) && !post.draft)

          if (!categories)
            return posts as unknown as ParsedArticle[]

          const postsWithCategory = posts.map((post) => {
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

          return postsWithCategory as unknown as ParsedArticle[]
        })
    }

    return useAsyncData('group-articles', queryAllPublishedPosts, {
      default: () => [],
      transform,
    })
  }

  return {
    getAllPublishedPosts,
  }
}
