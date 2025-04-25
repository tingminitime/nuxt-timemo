import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSeoCollection({
        source: '**/articles/*.md',
        type: 'page',
        schema: z.object({
          author: z.string(),
          category: z.string(),
          tags: z.array(z.string()).optional(),
          image: z.string().optional(),
          cover: z.object({
            src: z.string(),
            alt: z.string(),
          }).optional(),
          published_date: z.string(),
          published_date_iso_string: z.string().optional(),
          published_date_format: z.string().optional(),
          modified_date: z.string().optional(),
          modified_date_iso_string: z.string().optional(),
          modified_date_format: z.string().optional(),
        }),
      }),
    ),

    base: defineCollection({
      source: '**/base.yml',
      type: 'data',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        ogImage: z.string().optional(),
        hero: z.object({
          title: z.string(),
          description: z.string(),
        }).optional(),
      }),
    }),

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
