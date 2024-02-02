<script setup lang="ts">
const { y } = useWindowScroll()

const headerTop = computed(() => {
  return y.value > 120 ? '-translate-y-3 md:-translate-y-2' : 'translate-y-0'
})
</script>

<template>
  <!-- Inner section background -->
  <div class="fixed inset-0 sm:px-8 lg:px-16">
    <div class="mx-auto size-full max-w-screen-xl bg-inner-primary-light ring-1 ring-gray-200 transition duration-200 ease-in-out dark:bg-inner-primary-dark dark:ring-gray-300/20"></div>
  </div>

  <!-- Header -->
  <!-- <TheHeader /> -->
  <AppGridLayout
    class="sticky top-0 z-50 transition-transform"
    :class="headerTop"
    inner-mask-class="inner-header-mask"
  >
    <TheHeader />
  </AppGridLayout>

  <!-- Container that fit into inner section -->
  <!-- <main class="relative mt-16 text-gray-800 dark:text-gray-100 sm:mt-32 sm:px-8 lg:px-16">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-12">
      <div class="mx-auto flex max-w-2xl flex-col gap-16 lg:max-w-5xl">
        <slot></slot>
      </div>
    </div>
  </main> -->

  <AppGridLayout
    as="main"
    class="relative mt-12 sm:mt-28"
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
