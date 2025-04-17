import type { ContentNavigationItem } from '@nuxt/content'

export function findCategoryTitleByPath(
  categories: ContentNavigationItem,
  path: string,
): string {
  if (categories._path === path)
    return ''

  if (categories.children) {
    for (const child of categories.children) {
      if (child._path === path)
        return categories.title

      const title = findCategoryTitleByPath(child, path)
      if (title)
        return title
    }
  }

  return ''
}
