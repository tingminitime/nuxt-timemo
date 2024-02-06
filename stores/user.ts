import { acceptHMRUpdate, defineStore } from 'pinia'

type ArticlesDisplayMethod = 'cards' | 'list'

export const useUserPreferStore = defineStore('user-prefer', () => {
  /* Current articles display */
  const articlesDisplayMethod = ref<ArticlesDisplayMethod>('cards')

  function setArticlesDisplayMethod(method: ArticlesDisplayMethod) {
    articlesDisplayMethod.value = method
  }

  return {
    articlesDisplayMethod,
    setArticlesDisplayMethod,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserPreferStore, import.meta.hot))
