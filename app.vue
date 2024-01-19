<script lang="ts" setup>
import { appName, siteUrl } from './constants'

const sameAs = [
  siteUrl,
  'https://github.com/tingminitime',
]
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
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
</style>
