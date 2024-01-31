<template>
  <!-- Inner section background -->
  <div class="fixed inset-0 sm:px-8 lg:px-16">
    <div class="mx-auto size-full max-w-screen-xl bg-inner-primary-light ring-1 ring-gray-200 transition duration-200 ease-in-out dark:bg-inner-primary-dark dark:ring-gray-300/20"></div>
  </div>

  <!-- Header -->
  <!-- <TheHeader /> -->
  <AppGridLayout class="sticky top-6 z-50 mt-6">
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
    class="relative mt-16 sm:mt-32"
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
