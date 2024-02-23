<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
    <div class="row-start-2 w-full md:col-start-1 md:row-span-2 md:row-start-1">
      <ArticleContentNav />
    </div>
    <header class="w-full md:col-start-2">
      <ArticleContentHeader />
    </header>
    <ArticleContentBody class="mx-auto md:col-start-2">
      <slot></slot>
    </ArticleContentBody>
  </div>
</template>

<style scope></style>
