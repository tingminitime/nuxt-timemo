// Refer : https://content.nuxt.com/usage/typescript
import type { ParsedContent } from '@nuxt/content'

export interface Author {
  id: string
  name: string
  title: string
  url: string
  avatar_url: string
}

export interface ParsedAuthor extends ParsedContent {
  data: Author[]
}
