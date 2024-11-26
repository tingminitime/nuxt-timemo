<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  ulClass?: HTMLAttributes['class']
}>()

const socials = usePortfolio().value.socials
</script>

<template>
  <nav>
    <h2 class="sr-only">
      Social Links
    </h2>
    <ul :class="cn('flex gap-4', props.ulClass)">
      <li
        v-for="social in socials"
        :key="social.name"
      >
        <NuxtLink
          :to="social.url"
          target="_blank"
          rel="noopener"
          class="block text-gray-500 transition ease-in hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
        >
          <span class="sr-only">{{ social.name }}</span>
          <Icon
            size="24"
            :name="social.iconClass"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scope></style>
