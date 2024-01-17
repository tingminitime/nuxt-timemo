<script setup lang="ts">
const { isHome } = useActivePath()
</script>

<template>
  <NuxtLink
    class="block size-10 p-0.5"
    to="/"
  >
    <img
      src="/tim-avatar.webp"
      alt="my avatar"
      class="block size-9 rounded-full object-cover backdrop-blur"
      loading="lazy"
    >
  </NuxtLink>
</template>

<style scope></style>
