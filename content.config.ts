import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSeoCollection({
        source: '**/articles/*.md',
        type: 'page',
      }),
    ),

    // https://content.nuxt.com/docs/files/yaml#define-collection
    authors: defineCollection({
      source: 'authors.yml',
      type: 'data',
      schema: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            avatar_url: z.string(),
            main_url: z.string().url(),
            social_links: z.array(
              z.object({
                type: z.string(),
                url: z.string().url(),
              }),
            ).optional(),
          }),
        ),
      }),
    }),
  },
})
