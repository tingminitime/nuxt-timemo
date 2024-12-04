export default defineAppConfig({
  ui: {
    primary: 'sky',
    dropdown: {
      item: {
        active: 'bg-sky-100 dark:bg-sky-900 text-gray-900 dark:text-white',
        icon: {
          active: 'text-sky-500 dark:text-sky-400',
        },
      },
    },
  },

  portfolio: {
    socials: {
      github: {
        name: 'GitHub',
        url: 'https://github.com/tingminitime',
        iconClass: 'i-simple-icons-github',
      },
      linkedin: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/timemo/',
        iconClass: 'i-simple-icons-linkedin',
      },
      codepen: {
        name: 'Codepen',
        url: 'https://codepen.io/jake1155/pens/public',
        iconClass: 'i-simple-icons-codepen',
      },
    },
  },
})
