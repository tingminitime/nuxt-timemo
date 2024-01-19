<script setup lang="ts">
import { navigation } from '@/constants'

const { isActive } = useActivePath()

const route = useRoute()

// Navigation underline effect
const currentNavigationName = computed(() => {
  const currentPath = route.path
  const currentNavigation = navigation.find((item) => {
    return item.path === currentPath
  })
  return currentNavigation?.name
})

const navbarEffect = ref<HTMLElement | null>(null)
const navbarEffectReady = ref(false)

function navBarHandler(currentNavigationName: string | undefined) {
  const currentNavItem = document.querySelector(
    `[data-navbar="${currentNavigationName}"]`,
  )
  if (currentNavItem) {
    const { offsetLeft, offsetWidth } = currentNavItem as HTMLElement
    navbarEffect.value!.style.transform = `translateX(${offsetLeft}px)`
    navbarEffect.value!.style.width = `${offsetWidth}px`
    navbarEffectReady.value = true
  }
}

onMounted(() => {
  navBarHandler(currentNavigationName.value)
})

watch(currentNavigationName, (newValue) => {
  navBarHandler(newValue)
})

// Navigation mouse hover effect
const spotlight = reactive({
  x: 0,
  y: 0,
  radius: 0,
})

const navigationRef = ref<HTMLElement | null>(null)
const navigationBounds = useElementBounding(navigationRef)

useEventListener(navigationRef, 'mousemove', (e) => {
  spotlight.x = e.clientX - navigationBounds.left.value
  spotlight.y = e.clientY - navigationBounds.top.value
  spotlight.radius
    = Math.sqrt(
      navigationBounds.width.value ** 2 + navigationBounds.height.value ** 2,
    ) / 2.5
})
</script>

<template>
  <HeaderItem class="relative px-3">
    <nav
      ref="navigationRef"
      aria-labelledby="Primary navigation"
    >
      <ul class="flex">
        <li
          v-for="item in navigation"
          :key="item.path"
          class="relative"
          :data-navbar="item.name"
        >
          <NuxtLink
            :to="item.path"
            class="relative block px-3 py-2 text-sm font-medium text-gray-800 transition hover:text-sky-500 dark:text-gray-100 hover:dark:text-sky-400"
            :class="{
              'text-sky-500 dark:text-sky-400':
                isActive(item.path),
            }"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Navigation underline effect -->
      <div
        ref="navbarEffect"
        class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-sky-500/0 via-sky-500  to-sky-500/0 transition dark:from-sky-400/0 dark:via-sky-400 dark:to-sky-400/0"
        :class="[navbarEffectReady ? 'opacity-100' : 'opacity-0']"
      >
      </div>

      <!-- Navigation mouse hover effect -->
      <div
        class="pointer-events-none absolute -inset-px -z-20 rounded-full bg-lime-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :style="{
          background: `radial-gradient(${spotlight.radius}px circle at ${
            `${spotlight.x}px ${spotlight.y}px`
          }, var(--header-mouse-background-color) 0%, transparent 65%)`,
        }"
      ></div>
    </nav>
  </HeaderItem>
</template>

<style scope></style>
