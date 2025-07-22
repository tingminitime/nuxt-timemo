export function useActivePath() {
  const route = useRoute()

  const isHome = computed(() => route.path === '/')

  const isActive = (path: string) => {
    if (path === '/')
      return isHome.value

    return route.fullPath.startsWith(path)
  }

  return {
    isHome,
    isActive,
  }
}
