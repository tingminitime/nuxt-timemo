// Refer : https://content.nuxt.com/usage/typescript
// import type { ParsedContent } from '@nuxt/content'

export type SocialLinkType = 'website' | 'linkedin' | 'github' | 'facebook' | 'instagram' | 'x' | 'thread' | 'youtube' | 'medium'

export interface Category {
  id: string
  text: string
  icon: string
}

export interface SocialLinks {
  type: SocialLinkType
  url: string
}

// export interface ParsedPage extends ParsedContent {
//   description?: string
//   hero?: {
//     title: string
//     description: string
//   }
//   ogImage?: string
// }
