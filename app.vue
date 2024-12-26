<script lang="ts" setup>
import { appName, siteUrl } from './constants'

const sameAs = [
  siteUrl,
  'https://github.com/tingminitime',
]
</script>

<template>
  <Html class="h-full font-sans antialiased">
    <Head>
      <Title>{{ appName }}</Title>
      <SchemaOrgPerson
        name="Tim"
        logo="/tim-avatar.webp"
        :same-as="sameAs"
      />
    </Head>
    <Body>
      <NuxtLoadingIndicator :throttle="0" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
</style>
