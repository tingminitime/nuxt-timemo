<script setup lang="ts"></script>

<template>
  <UTooltip
    text="Search"
    :shortcuts="['ctrl', 'K']"
  >
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
        class="size-5 fill-sky-50 stroke-zinc-500 group-hover:stroke-zinc-600 group-hover:scale-105 dark:fill-sky-400/10 dark:group-hover:stroke-zinc-400"
      />
    </HeaderItem>
  </UTooltip>
</template>

<style scope></style>
