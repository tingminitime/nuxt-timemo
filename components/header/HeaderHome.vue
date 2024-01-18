<script setup lang="ts">
const { isHome } = useActivePath()
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <template v-if="!isHome">
      <NuxtLink
        class="block size-10 p-0.5"
        to="/"
        v-bind="$attrs"
      >
        <img
          src="/tim-avatar.webp"
          alt="my avatar"
          class="block size-9 rounded-full object-cover backdrop-blur"
        >
      </NuxtLink>
    </template>
  </Transition>
</template>

<style scope>
</style>
