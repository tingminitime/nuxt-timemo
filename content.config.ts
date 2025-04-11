import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '**/articles/*.md',
      }),
    ),
  },
})
