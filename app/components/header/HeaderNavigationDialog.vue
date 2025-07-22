<script setup lang="ts">
import { PopoverOverlay, PopoverPanel } from '@headlessui/vue'
import { navigation } from '~/constants'

const { isActive } = useActivePath()
</script>

<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <PopoverOverlay class="fixed inset-0 h-screen bg-white/10 backdrop-blur-sm" />
  </Transition>

  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-100 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <PopoverPanel
      v-slot="{ close }"
      class="fixed inset-x-4 top-8 z-50 rounded-2xl bg-white/90 p-8 text-gray-800 shadow-xl ring-1 ring-gray-900/5 dark:bg-gray-800/90 dark:text-gray-100 dark:ring-white/10"
    >
      <div class="flex flex-row-reverse items-center justify-between text-gray-500 dark:text-gray-400">
        <button
          class="-m-1 p-1"
          @click="close"
        >
          <Icon
            class="size-6"
            name="heroicons:x-mark-solid"
          />
        </button>
        <h2 class="text-sm font-medium">
          前往頁面
        </h2>
      </div>
      <nav class="mt-6">
        <ul
          class="-my-2 divide-y text-base text-gray-800 dark:divide-white/5 dark:text-gray-100"
          aria-labelledby="Navigation mobile"
        >
          <li
            v-for="item in navigation"
            :key="item.path"
          >
            <NuxtLink
              class="block py-2 hover:text-sky-500 hover:dark:text-sky-400"
              :class="{
                'text-sky-500 dark:text-sky-400':
                  isActive(item.path),
              }"
              :to="item.path"
              @click="close"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </PopoverPanel>
  </Transition>
</template>

<style scope></style>
