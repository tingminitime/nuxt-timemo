const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
    './assets/**/*.css',
    './assets/**/*.scss',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', '"Noto Sans TC"', ...defaultTheme.fontFamily.sans],
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
      minHeight: {
        screen: ['100vh', '100dvh'],
      },
      colors: {
        'outer-primary': {
          DEFAULT: 'hsl(0, 0%, 93%)',
          light: 'hsl(0, 0%, 93%)',
          dark: 'hsl(220, 13%, 10%)',
        },
        'inner-primary': {
          DEFAULT: 'hsl(0,0%,95%)',
          light: 'hsl(0,0%,95%)',
          dark: 'hsl(220, 13%, 18%)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            'h1 a,h2 a,h3 a,h4 a,h5 a,h6 a': {
              'text-decoration-line': 'none',
            },
            'p a': {
              'color': theme('colors.sky.500'),
              'text-decoration-line': 'none',
              'transition-property': 'all',
              'transition-timing-function': theme('transitionTimingFunction.easeIn'),
              'transition-duration': theme('transitionDuration.150'),
            },
            'p a:hover': {
              'color': theme('colors.sky.600'),
              'transition-property': 'all',
              'transition-timing-function': theme('transitionTimingFunction.easeIn'),
              'transition-duration': theme('transitionDuration.150'),
            },
            '.dark p a': {
              color: theme('colors.sky.400'),
            },
            '.dark p a:hover': {
              color: theme('colors.sky.300'),
            },
            'img': {
              'border-radius': '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-3d'),
  ],
}
