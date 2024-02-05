export type ArticleDisplayMethod = 'cards' | 'list'

export const useUserPreferStore = defineStore(
  'user-prefer',
  () => {
    const articlesDisplayMethod = ref<ArticleDisplayMethod>('cards')

    function setArticlesDisplayMethod(method: ArticleDisplayMethod) {
      articlesDisplayMethod.value = method
    }

    function getArticlesDisplayMethod() {
      return articlesDisplayMethod.value
    }

    return {
      setArticlesDisplayMethod,
      getArticlesDisplayMethod,
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
)
