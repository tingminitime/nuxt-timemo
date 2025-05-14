import type { ContentNavigationItem } from '@nuxt/content'

export type NavItemWithCategory = ContentNavigationItem & {
  slug?: string
  icon?: string
  count?: number
}
