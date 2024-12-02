<script setup lang="ts">
/* --- Prevent hydration errors caused by different class names between SSR and CSR --- */
const { y } = useWindowScroll()
const yRef = ref(0)

watch(() => y.value, (value) => {
  yRef.value = value
})

const headerTop = computed(() => {
  return yRef.value > 120 ? '-translate-y-3 md:-translate-y-2' : 'translate-y-0'
})
/* -------- */
</script>

<template>
  <!-- Inner section background -->
  <div class="fixed inset-0 sm:px-8 lg:px-16">
    <div class="mx-auto size-full max-w-screen-xl bg-inner-primary-light ring-1 ring-gray-200 dark:bg-inner-primary-dark dark:ring-gray-300/20"></div>
  </div>

  <!-- Header -->
  <AppGridLayout
    as="header"
    class="sticky top-0 z-50 transition-transform"
    :class="headerTop"
    inner-wrapper-class="inner-header-mask"
  >
    <TheHeader />
  </AppGridLayout>

  <AppGridLayout
    as="main"
    class="relative mt-8 sm:mt-24"
  >
    <slot></slot>
  </AppGridLayout>

  <!-- Footer -->
  <AppGridLayout
    as="footer"
    class="relative mt-16 sm:mt-32"
    inner-wrapper-class="border-t border-gray-900/5 dark:border-white/10"
  >
    <TheFooter />
  </AppGridLayout>
</template>

<style scoped>
</style>
