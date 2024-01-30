<script setup lang="ts"></script>

<template>
  <HeaderItem
    as="button"
    type="button"
    title="Search"
    v-bind="$attrs"
    class="group flex size-10 items-center justify-center"
    hover
  >
    <Icon
      name="i-heroicons-magnifying-glass"
      class="size-5 fill-sky-50 stroke-zinc-500 group-hover:stroke-zinc-600 dark:fill-sky-400/10 dark:group-hover:stroke-zinc-400"
    />
  </HeaderItem>
</template>

<style scope></style>
