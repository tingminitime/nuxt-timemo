import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-headlessui',
    'nuxt-icon',
    'nuxt-payload-analyzer',
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  css: ['@/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
  },

  headlessui: {
    prefix: 'Headless',
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  app: {
    head: {
      meta: [
        { name: 'description', content: appDescription },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/open-props/easings.min.css' },
      ],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        // types: [],
      },
    },
  },

  site: {
    url: 'https://timemo.site',
    name: 'timemo',
    description: 'My dev notes.',
    defaultLocale: 'zh-TW',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  content: {
    experimental: {
      // @ts-expect-error: Unreachable code error
      search: true,
    },
    documentDriven: false,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['vue', 'vue-html'],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false, // TODO: enable this when the site is ready
      failOnError: false,
    },
  },
})
