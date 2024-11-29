// Refer : https://content.nuxt.com/usage/typescript
import type { ParsedContent } from '@nuxt/content'
import type { SocialLinks } from './common'

export interface Author {
  id: string
  name: string
  title: string
  avatar_url: string
  main_url: string
  social_links: SocialLinks[]
}

export interface ParsedAuthor extends ParsedContent {
  data: Author[]
}
