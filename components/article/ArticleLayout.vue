<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_auto_1fr]">
    <ArticleContentHeader />
    <ArticleContentBody class="mx-auto xl:col-start-2">
      <slot></slot>
    </ArticleContentBody>
  </div>
</template>

<style scope></style>
