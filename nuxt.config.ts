import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    'radix-vue/nuxt',
    'nuxt-headlessui',
    'nuxt-payload-analyzer',
    'dayjs-nuxt',
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  colorMode: {
    classSuffix: '',
  },

  googleFonts: {
    families: {
      'Inter': true,
      'Noto+Sans+TC': [400, 500, 600, 700, 900],
    },
    display: 'swap',
    download: false,
  },

  headlessui: {
    prefix: 'Headless',
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  dayjs: {
    locales: ['zh-tw'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'zh-tw',
    defaultTimezone: 'Asia/Taipei',
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant',
        dir: 'ltr',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'twitter:description', content: appDescription },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/open-props/easings.min.css' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      trailingSlash: true,
      siteUrl: 'https://timemo.site',
      siteName: 'timemo',
      siteDescription:
        'My dev notes.',
      language: 'zh-Hant',
      titleSeparator: '·',
    },
  },

  site: {
    url: process.env.NUXT_SITE_URL || 'https://timemo.site',
    name: 'timemo',
    description: 'My dev notes.',
    defaultLocale: 'zh-Hant',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  content: {
    experimental: {
      // @ts-expect-error: Unreachable code error
      search: true,
    },
    ignores: ['drafts'],
    documentDriven: false,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'scss', 'vue-html', 'python', 'bash', 'javascript', 'typescript'],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false,
    },
  },

  compatibilityDate: '2024-11-22',
})
