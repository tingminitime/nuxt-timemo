<!-- TODO: 取得作者名、文章發佈、修改日期 -->
<script setup lang="ts">
import type { Author } from '~/types/author'
import { getSocialLinkData } from '~/constants'

const props = defineProps<{
  title?: string
  publishDate?: string | Date
  modifiedDate?: string | Date
  categoryId?: string
  category?: string
  authorData?: Author
}>()

const publishDateFormat = computed(() => formatDate(props.publishDate ?? ''))
const modifiedDateFormat = computed(() => formatDate(props.modifiedDate ?? ''))

const isPublishedDateEqualModifiedDate = computed(() => {
  return publishDateFormat.value === modifiedDateFormat.value
})

const dropdownItems = computed(() => {
  const items = props.authorData?.social_links.map((social) => {
    const socialLinkData = getSocialLinkData(social.type)
    return {
      label: socialLinkData.name,
      icon: socialLinkData.icon,
      url: social.url,
    }
  })

  return [items || []]
})
</script>

<template>
  <div class="space-y-8 xl:sticky xl:top-[5.5rem] xl:max-h-[calc(100dvh-5.5rem)] xl:overflow-y-auto">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold lg:text-4xl">
        {{ title }}
      </h1>

      <dl>
        <dt class="sr-only">
          發佈日期
        </dt>
        <dd class="flex items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
          <NuxtLink
            v-if="category"
            :to="`/categories/${categoryId}`"
            class="flex items-center gap-x-1 p-1 text-gray-500 transition duration-150 ease-in hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Icon
              name="i-heroicons-folder-open-solid"
              class="mt-0.5"
            />
            <span>{{ category }}</span>
          </NuxtLink>

          <span
            v-if="category"
            class="flex-none"
          >|</span>

          <!-- 文章發布日期 -->
          <time
            :datetime="publishDateFormat"
          >
            {{ publishDateFormat }}
          </time>

          <!-- 若有更新文章則顯示更新日期 -->
          <time
            v-if="modifiedDate && !isPublishedDateEqualModifiedDate"
            :datetime="modifiedDateFormat"
          >
            &#40;&nbsp;最後更新&nbsp;:&nbsp;{{ modifiedDateFormat }}&nbsp;&#41;
          </time>
        </dd>
      </dl>
    </div>

    <address class="flex items-center gap-x-2 not-italic">
      <NuxtImg
        src="/tim-avatar.webp"
        class="relative size-9 shrink-0 overflow-hidden rounded-full object-cover"
      />
      <div class="flex flex-col text-sm">
        <p class="truncate text-gray-700 dark:text-gray-200">
          {{ authorData?.name || 'Unknown' }}
        </p>

        <ClientOnly>
          <UDropdown
            :items="dropdownItems"
            mode="hover"
            :popper="{ placement: 'bottom-start' }"
          >
            <button
              type="button"
              class="text-gray-500 transition dark:text-gray-400 md:hover:text-sky-500 dark:md:hover:text-sky-100"
            >
              @{{ authorData?.id }}
            </button>

            <template #item="{ item }">
              <NuxtLink
                external
                :to="item.url"
                target="_blank"
                class="flex w-full items-center justify-between"
              >
                <div class="flex items-center gap-x-2">
                  <Icon
                    :name="item.icon"
                    size="16"
                  />
                  <span class="truncate">{{ item.label }}</span>
                </div>

                <Icon
                  name="i-heroicons-arrow-top-right-on-square-20-solid"
                  class="text-gray-400 dark:text-gray-500"
                />
              </NuxtLink>
            </template>
          </UDropdown>
        </ClientOnly>
      </div>
    </address>
  </div>
</template>

<style scope></style>
