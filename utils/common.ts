import { categories, socialLinksMap } from '~/constants'

export function getCategoryWithCategoryId(categoryId?: string) {
  return categories.find(category => category.id === (categoryId || 'uncategorized'))
}

export function getSocialLinkData(type: string = 'website') {
  return socialLinksMap.find(link => link.type === type) || socialLinksMap[0]
}
