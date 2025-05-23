// Refer : https://content.nuxt.com/usage/typescript
export type SocialLinkType = 'website' | 'linkedin' | 'github' | 'facebook' | 'instagram' | 'x' | 'thread' | 'youtube' | 'medium'

export interface Category {
  id: string
  text: string
  icon: string
}

export interface CategoryWithCount extends Category {
  count: number
}

export interface SocialLinks {
  type: SocialLinkType
  url: string
}
