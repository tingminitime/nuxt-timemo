/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

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
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
