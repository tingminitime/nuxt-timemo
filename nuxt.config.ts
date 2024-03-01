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
    'nuxt-icon',
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

  css: ['@/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  colorMode: {
    classSuffix: '',
  },

  ui: {
    icons: ['heroicons', 'simple-icons', 'vscode-icons'],
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

  runtimeConfig: {
    public: {
      trailingSlash: true,
      siteUrl: 'https://timemo.site',
      siteName: 'timemo',
      siteDescription:
        'timemo WIP',
      language: 'zh-TW',
      titleSeparator: '·',
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
      crawlLinks: true, // TODO: enable this when the site is ready
      failOnError: false,
    },
  },
})
