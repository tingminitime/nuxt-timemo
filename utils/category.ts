import type { NavItem } from '@nuxt/content/types'

export function findCategoryTitleByPath(categories: NavItem, path: string): string {
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
