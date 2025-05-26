<script setup lang="ts">
const openSearch = ref(false)

useEventListener(document, 'keydown', (event) => {
  if (event.key === 'k' && event.ctrlKey) {
    event.preventDefault()
    openSearch.value = !openSearch.value
  }

  if (event.key === 'Escape') {
    openSearch.value = false
  }
})
</script>

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
      @click="openSearch = true"
    >
      <Icon
        name="i-heroicons-magnifying-glass"
        class="size-5 fill-sky-50 stroke-zinc-500 group-hover:stroke-zinc-600 group-hover:scale-105 dark:fill-sky-400/10 dark:group-hover:stroke-zinc-400"
      />
    </HeaderItem>

    <!-- TODO: 目前會 500 error -->
    <!-- <SearchDialog v-model="openSearch" /> -->
    <NewSearchDialog v-model="openSearch" />
  </UTooltip>
</template>

<style scope></style>
