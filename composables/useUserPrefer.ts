import type { ConcreteComponent } from 'vue'
import type { LayoutKey } from '#build/types/layouts'
import { ArticleCard, ArticleItem } from '#components'

interface ArticlesDisplayOption {
  id: 'cards' | 'list'
  label: string
  icon: string
  layout: LayoutKey
  component: ConcreteComponent
}

export function useUserPrefer() {
  /* Articles display */
  const articlesDisplayOptions: ArticlesDisplayOption[] = [
    {
      id: 'cards',
      label: 'Cards',
      icon: 'i-heroicons-squares-2x2-solid',
      layout: 'articles-cards-layout',
      component: shallowRef(ArticleCard),
    },
    {
      id: 'list',
      label: 'List',
      icon: 'i-heroicons-list-bullet',
      layout: 'articles-list-layout',
      component: shallowRef(ArticleItem),
    },
  ]

  return {
    articlesDisplayOptions,
  }
}
