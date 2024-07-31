<script setup lang="ts">
const open = ref(false)

const items = [{
  label: 'Summary',
  icon: 'i-heroicons-list-bullet-20-solid',
  defaultOpen: false,
  slot: 'summary',
}]
</script>

<template>
  <!-- Mobile -->
  <UDivider
    class="xl:hidden"
    :ui="{ border: { base: 'dark:border-gray-600' } }"
  />
  <UAccordion
    :items
    class="block xl:hidden"
  >
    <template #default="{ item, open }">
      <UButton
        color="gray"
        variant="ghost"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
      >
        <template #leading>
          <UIcon
            :name="item.icon"
            class="size-4"
          />
        </template>

        <span class="truncate">{{ item.label }}</span>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="ms-auto size-5 transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>

    <template #summary>
      <slot name="toc"></slot>
    </template>
  </UAccordion>
  <UDivider
    class="xl:hidden"
    :ui="{ border: { base: 'dark:border-gray-600' } }"
  />

  <!-- Desktop -->
  <div class="hidden xl:sticky xl:top-[5.5rem] xl:block xl:max-h-[calc(100dvh-5.5rem)] xl:overflow-y-auto">
    <slot name="toc"></slot>
  </div>
</template>

<style scope></style>
