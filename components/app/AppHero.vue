<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-4xl font-bold leading-[3.5rem] tracking-tight sm:text-5xl">
      <slot name="title"></slot>
    </h1>
    <p class="mt-4 text-base text-gray-500 dark:text-gray-400">
      <slot name="description"></slot>
    </p>
    <slot></slot>
  </div>
</template>

<style scope></style>
