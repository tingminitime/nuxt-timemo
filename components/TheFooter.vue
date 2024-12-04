<script setup lang="ts">
import { navigation } from '~/constants'
</script>

<template>
  <div class="py-8">
    <div class="flex items-center justify-between">
      <ul class="flex items-center gap-x-4">
        <li
          v-for="nav in navigation"
          :key="nav.path"
        >
          <NuxtLink
            :to="nav.path"
            :aria-label="`前往${nav.name}頁面`"
            class="p-1 text-gray-700 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400"
          >
            {{ nav.name }}
          </NuxtLink>
        </li>
      </ul>

      <SocialLinks ul-class="gap-x-4" />
    </div>

    <div class="mt-2 text-gray-400 dark:text-gray-500">
      &#169; {{ new Date().getFullYear() }} timemo
    </div>
  </div>
</template>

<style scope></style>
