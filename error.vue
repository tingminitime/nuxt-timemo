<script setup lang="ts">
import { appName, siteUrl } from './constants'
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const sameAs = [
  siteUrl,
  'https://github.com/tingminitime',
]

const title = props.error.statusCode === 404 ? 'Page not found' : 'An error occurred'

useSeoMeta({
  title,
  description: 'Sorry, the page you are looking for could not be found.',
})
</script>

<template>
  <Html
    dir="ltr"
    lang="zh-Hant"
    class="h-full font-sans antialiased"
  >
    <Head>
      <Title>{{ appName }}</Title>
      <SchemaOrgPerson
        name="Tim"
        logo="/tim-avatar.webp"
        :same-as="sameAs"
      />
      <Link
        rel="icon"
        href="/favicon.ico"
        type="image/ico"
      />
    </Head>
    <Body>
      <div>
        <p>{{ error.statusCode }}</p>
        <p>{{ error.message }}</p>
        <UButton>
          Back to home
        </UButton>
      </div>
    </Body>
  </Html>
</template>

<style scope></style>
