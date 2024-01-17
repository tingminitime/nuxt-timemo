<script setup lang="ts"></script>

<template>
  <header class="sticky top-6 z-50 flex w-full justify-center sm:px-8 lg:px-16">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-12">
      <div class="relative mx-auto flex w-full max-w-2xl items-center justify-between md:justify-center lg:max-w-5xl">
        <HeaderHome />

        <HeaderNavigation />

        <div>
          <HeaderNavigationMobile />
          <HeaderSearch />
          <HeaderThemeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>

<style scope></style>
