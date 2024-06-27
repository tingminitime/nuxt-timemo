// Refer : https://content.nuxt.com/usage/typescript
import type { MarkdownParsedContent } from '@nuxt/content'

export interface ParsedArticle extends MarkdownParsedContent {
  title: string
  description: string
  author: string
  category: string
  tags: string[]
  image: string
  cover: {
    src: string
    alt: string
  }
  published_date: string | Date
  published_date_iso_string?: string
  published_date_format?: string
  modified_date: string | Date
  modified_date_iso_string?: string
  modified_date_format?: string
}
