<script setup lang="ts">
// TODO: uncomment this when the content is ready
// const { data: navigation } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation()
// })

const { isActive } = useActivePath()

const route = useRoute()

const isHome = computed(() => route.path === '/')
const isBlog = computed(() => route.path === '/blog')
const isTags = computed(() => route.path === '/tags')
</script>

<template>
  <HeaderItem class="px-3">
    <nav aria-labelledby="Primary navigation">
      <ul class="flex text-sm font-medium text-gray-800 dark:text-gray-100">
        <li class="relative">
          <NuxtLink
            to="/"
            class="relative block px-3 py-2 transition hover:text-sky-500 hover:dark:text-sky-400"
            :class="{ 'text-sky-500 dark:text-sky-400': isHome }"
          >
            Home
          </NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink
            to="/blog"
            class="relative block px-3 py-2 transition hover:text-sky-500 hover:dark:text-sky-400"
            :class="{ 'text-sky-500 dark:text-sky-400': isBlog }"
          >
            Blog
          </NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink
            to="/tags"
            class="relative block px-3 py-2 transition hover:text-sky-500 hover:dark:text-sky-400"
            :class="{ 'text-sky-500 dark:text-sky-400': isTags }"
          >
            Tags
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </HeaderItem>
</template>

<style scope></style>
