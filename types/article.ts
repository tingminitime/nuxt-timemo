// Refer : https://content.nuxt.com/usage/typescript
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface ParsedArticle extends ParsedContent {
  title: string
  description: string
  author: string
  tags: string[]
  image: string
  cover: {
    src: string
    alt: string
  }
  published_date: string | Date
  modified_date: string | Date
}
