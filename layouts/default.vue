<script setup lang="ts">
const route = useRoute()
const isArticlePage = route.name === 'articles-slug'

const { y } = useWindowScroll()
const yRef = ref(0)

watch(() => y.value, (value) => {
  yRef.value = value
})

const headerTop = computed(() => {
  return yRef.value > 120 ? '-translate-y-3 md:-translate-y-2' : 'translate-y-0'
})
</script>

<template>
  <!-- Inner section background -->
  <div class="fixed inset-0 sm:px-8 lg:px-16">
    <div class="mx-auto size-full max-w-screen-xl bg-inner-primary-light ring-1 ring-gray-200 transition duration-200 ease-in-out dark:bg-inner-primary-dark dark:ring-gray-300/20"></div>
  </div>

  <!-- Header -->
  <AppGridLayout
    class="sticky top-0 z-50 transition-transform"
    :class="headerTop"
    inner-mask-class="inner-header-mask"
  >
    <TheHeader />
  </AppGridLayout>

  <AppGridLayout
    as="main"
    :inner-as="isArticlePage ? 'article' : 'div'"
    class="relative mt-8 sm:mt-24"
  >
    <slot></slot>
  </AppGridLayout>

  <!-- Footer -->
  <AppGridLayout class="relative mt-16 sm:mt-32">
    <TheFooter />
  </AppGridLayout>
</template>

<style scoped>
</style>
