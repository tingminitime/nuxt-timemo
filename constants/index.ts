import type { SocialLinkType } from '~/types/common'

export const appName = 'timemo'
export const appDescription = 'My dev notes.'
export const siteUrl = 'https://timemo.site'

export const navigation = [
  {
    name: '首頁',
    path: '/',
  },
  {
    name: '文章',
    path: '/articles',
  },
  {
    name: '分類',
    path: '/categories',
  },
]

export const socialLinksMap: { type: SocialLinkType, name: string, icon: string }[] = [
  { type: 'website', name: 'Website', icon: 'i-heroicons-globe-alt' },
  { type: 'linkedin', name: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  { type: 'github', name: 'GitHub', icon: 'i-simple-icons-github' },
  { type: 'facebook', name: 'Facebook', icon: 'i-simple-icons-facebook' },
  { type: 'instagram', name: 'Instagram', icon: 'i-simple-icons-instagram' },
  { type: 'thread', name: 'Thread', icon: 'i-simple-icons-threads' },
  { type: 'x', name: 'X', icon: 'i-simple-icons-x' },
  { type: 'youtube', name: 'YouTube', icon: 'i-simple-icons-youtube' },
  { type: 'medium', name: 'Medium', icon: 'i-simple-icons-medium' },
]

export function getSocialLinkData(type: SocialLinkType = 'website') {
  return socialLinksMap.find(link => link.type === type) || socialLinksMap[0]
}
