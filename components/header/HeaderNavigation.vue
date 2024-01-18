<script setup lang="ts">
// TODO: uncomment this when the content is ready
// const { data: navigation } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation()
// })

const navigation = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
  {
    label: 'Tags',
    path: '/tags',
  },
]

const { isActive } = useActivePath()
const navigationRefs = ref<
  Record<string, Element | ComponentPublicInstance | null>
>({})
</script>

<template>
  <HeaderItem class="relative px-3">
    <nav aria-labelledby="Primary navigation">
      <div class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-sky-500/0 via-sky-500  to-sky-500/0 transition dark:from-sky-400/0 dark:via-sky-400 dark:to-sky-400/0">
      </div>
      <ul class="flex text-sm font-medium text-gray-800 dark:text-gray-100">
        <li
          v-for="item in navigation"
          :key="item.path"
          :ref="(el) => navigationRefs[item.label] = el"
          class="relative"
        >
          <NuxtLink
            :to="item.path"
            class="relative block px-3 py-2 transition hover:text-sky-500 hover:dark:text-sky-400"
            :class="{
              'text-sky-500 dark:text-sky-400':
                isActive(item.path),
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
        <!-- <li class="relative">
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
        </li> -->
      </ul>
    </nav>
  </HeaderItem>
</template>

<style scope></style>
