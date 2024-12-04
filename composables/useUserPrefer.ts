import {
  ArticleCard,
  ArticleCardsLayout,
  ArticleItem,
  ArticleListLayout,
} from '#components'

interface ArticlesDisplayOption {
  id: 'cards' | 'list'
  label: string
  icon: string
}

export function useUserPrefer() {
  /* Articles display */
  const articlesDisplayOptions = useState<ArticlesDisplayOption[]>('articlesDisplayOptions', () => [
    {
      id: 'cards',
      label: 'Cards',
      icon: 'i-heroicons-squares-2x2-solid',
    },
    {
      id: 'list',
      label: 'List',
      icon: 'i-heroicons-list-bullet',
    },
  ])

  const currentArticlesDisplayMethod = useState('articlesDisplayMethod', () => 'cards')

  const currentArticlesDisplayOption = computed(() => {
    return articlesDisplayOptions.value.find(
      option => option.id === currentArticlesDisplayMethod.value,
    ) || articlesDisplayOptions.value[0]
  })

  const currentArticleLayoutComponent = computed(() => {
    switch (currentArticlesDisplayMethod.value) {
      case 'cards':
        return ArticleCardsLayout
      case 'list':
        return ArticleListLayout
    }
  })

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
    currentArticleLayoutComponent,
    currentArticleComponent,
  }
}
