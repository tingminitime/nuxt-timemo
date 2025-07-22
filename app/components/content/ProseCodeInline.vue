<script setup lang="ts"></script>

<template>
  <code class="mx-px rounded-md bg-gray-200 px-[0.375rem] py-[0.2rem] font-mono font-normal text-red-500 before:content-[''] after:content-[''] dark:bg-gray-700 dark:text-red-500">
    <slot></slot>
  </code>
</template>

<style scoped>
a code {
  border-width: 1px;
  border-style: dashed;
  border-color: theme('colors.red.500');
}

a:hover code {
  color: theme('colors.red.600');
  border-style: solid;
  border-color: theme('colors.red.600');
}

.dark a code {
  border-color: theme('colors.red.400');
}

.dark a:hover code {
  color: theme('colors.red.300');
  border-color: theme('colors.red.300');
}
</style>
