<script setup lang="ts"></script>

<template>
  <div class="sticky top-6 z-50 flex w-full justify-center sm:px-8 lg:px-16">
    <HeaderHome class="md:absolute md:left-0" />

    <HeaderNavigation class="hidden md:flex" />

    <div class="flex w-full items-center justify-end gap-6 md:absolute md:right-0 md:w-auto">
      <HeaderNavigationMobile class="md:hidden" />
      <HeaderSearch />
      <HeaderThemeSwitcher />
    </div>
  </div>
</template>

<style scope></style>
