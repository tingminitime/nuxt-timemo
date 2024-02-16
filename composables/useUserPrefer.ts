import type { LayoutKey } from '#build/types/layouts'
import { ArticleCard, ArticleItem } from '#components'

interface ArticlesDisplayOption {
  id: 'cards' | 'list'
  label: string
  icon: string
  layout: LayoutKey
  component: string
}

export function useUserPrefer() {
  /* Articles display */
  const articlesDisplayOptions = useState<ArticlesDisplayOption[]>('articlesDisplayOptions', () => [
    {
      id: 'cards',
      label: 'Cards',
      icon: 'i-heroicons-squares-2x2-solid',
      layout: 'articles-cards-layout',
      component: 'ArticleCard',
    },
    {
      id: 'list',
      label: 'List',
      icon: 'i-heroicons-list-bullet',
      layout: 'articles-list-layout',
      component: 'ArticleItem',
    },
  ])

  const currentArticlesDisplayMethod = useState('articlesDisplayMethod', () => 'cards')

  const currentArticlesDisplayOption = computed(() => articlesDisplayOptions.value.find(option => option.id === currentArticlesDisplayMethod.value) || articlesDisplayOptions.value[0])

  const currentArticleComponent = computed(() => {
    switch (currentArticlesDisplayMethod.value) {
      case 'cards':
        return ArticleCard
      case 'list':
        return ArticleItem
    }
  })

  return {
    articlesDisplayOptions,
    currentArticlesDisplayMethod,
    currentArticlesDisplayOption,
    currentArticleComponent,
  }
}
