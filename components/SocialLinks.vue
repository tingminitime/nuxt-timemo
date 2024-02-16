<script setup lang="ts">
const socials = usePortfolio().value.socials
</script>

<template>
  <nav>
    <h2 class="sr-only">
      Social Links
    </h2>
    <ul class="flex gap-4">
      <li
        v-for="social in socials"
        :key="social.name"
      >
        <NuxtLink
          :to="social.url"
          target="_blank"
          rel="noopener"
          class="block size-6 text-gray-500 transition ease-in hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
          :class="social.iconClass"
        >
          <span class="sr-only">{{ social.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scope></style>
