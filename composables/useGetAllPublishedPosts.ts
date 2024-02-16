import type { ParsedArticle } from '~/types/article'
import { group } from '~/utils/group'

function transform(articles: ParsedArticle[]) {
  if (!articles)
    return []

  const articlesClone = structuredClone(articles)

  const groupedArticles = group(articlesClone, (current) => {
    if (!current.published_date)
      return ''
    return new Date(current.published_date).getFullYear() || ''
  })

  const entries = Object.entries(groupedArticles)

  return entries
    .reverse()
    .map(([year, articles]) => {
      return {
        year,
        articles: articles.map((article) => {
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

export function useGetAllPublishedPosts() {
  const getAllPublishedPosts = () => {
    return queryContent<ParsedArticle>('/articles/')
      .where({ _type: { $ne: 'yaml' } })
      .sort({ published_date: -1 })
      .only(['_path', 'title', 'description', 'author', 'cover', 'category', 'published_date', 'draft'])
      .find()
      .then((res) => {
        return res.filter(post => !IGNORED_PATH.includes(post._path) && !post.draft) as ParsedArticle[]
      })
  }

  return useAsyncData('groupArticles', getAllPublishedPosts, {
    default: () => [],
    transform,
  })
}
