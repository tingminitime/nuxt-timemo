# timemo

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/nuxt/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/%40nuxt%2Fui/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/%40nuxt%2Fcontent/master?color=00dc82)

🏠 My personal site base on Nuxt 3.

## WIP

- [x] Header
- [x] Navigation
- [x] Theme mode
- [ ] Home page
- [x] Search
- [ ] Search page
- [ ] Tags page
- [x] Articles list page
- [x] Article page
- [ ] Next / Prev article navigation
- [x] Add OG Image to pages and articles
- [x] Categories and tags page
- [x] Footer

## Prerequisites

- Node.js >= v22.0.0
- pnpm >= v9.0.0
- [VS Code](https://code.visualstudio.com/)

### VS Code Extensions

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## ESLint Configuration

This template uses [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Run locally

```bash
npx degit tingminitime/nuxt-timemo <your-project-name>
cd <your-project-name>
```

Copy `.env.example` to `.env.local` and fill in the necessary values.

```bash
pnpm install # If you don't have pnpm installed, run `npm i -g pnpm` first.
pnpm dev
```

## Production

Copy `.env.example` to `.env.production` and fill in the necessary values.

```bash
pnpm build
```
