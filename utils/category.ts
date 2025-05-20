import { categories } from '~/constants'

export function getCategoryWithCategoryId(categoryId?: string) {
  return categories.find(category => category.id === (categoryId || 'uncategorized'))
}
