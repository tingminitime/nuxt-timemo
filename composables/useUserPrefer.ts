type ArticlesDisplayMethod = 'cards' | 'list'

export function useUserPrefer() {
  const articlesDisplayMethod = useState<ArticlesDisplayMethod>('articlesDisplayMethod', () => 'cards')

  function setArticlesDisplayMethod(method: ArticlesDisplayMethod) {
    articlesDisplayMethod.value = method
  }

  return {
    articlesDisplayMethod,
    setArticlesDisplayMethod,
  }
}
