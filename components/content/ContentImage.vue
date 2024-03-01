<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <div class="aspect-h-9 aspect-w-16 w-full rounded">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="my-0 object-cover"
      format="webp"
    />
  </div>
</template>

<style scope></style>
