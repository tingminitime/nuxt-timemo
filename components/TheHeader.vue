<script setup lang="ts"></script>

<template>
  <header class="sticky top-6 z-50 flex w-full justify-center sm:px-8 lg:px-16">
    <div class="main-grid mx-auto grid max-w-2xl lg:max-w-5xl">
      <div class="relative mx-auto flex w-full max-w-2xl items-center justify-between md:justify-center lg:max-w-5xl">
        <HeaderHome class="md:absolute md:left-0" />

        <HeaderNavigation class="hidden md:flex" />

        <div class="flex w-full items-center justify-end gap-6 md:absolute md:right-0 md:w-auto">
          <HeaderNavigationMobile class="md:hidden" />
          <HeaderSearch />
          <HeaderThemeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>

<style scope></style>
