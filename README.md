# timemo

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/nuxt/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/%40nuxt%2Fui/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/%40nuxt%2Fcontent/master?color=00dc82)

🏠 My personal site base on Nuxt 3.

## WIP

- [x] Header
- [x] Navigation
- [x] Theme mode
- [ ] Home page
- [x] Search
- [ ] Tags page
- [x] Articles list page
- [x] Article page
- [x] Next / Prev article navigation
- [x] Add OG Image to pages and articles
- [x] Categories and tags page
- [x] Footer

## Prerequisites

- Node.js >= v22.0.0
- pnpm >= v10.0.0
- [VS Code](https://code.visualstudio.com/)

### VS Code Extensions

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
## ESLint Configuration

This project uses [@antfu/eslint-config](https://github.com/antfu/eslint-config) for linting.

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

## How to add a new article markdown ?

1. Create a new markdown file in `content/articles/` with the name of your article, for example `my-new-article.md`.

2. Add the following frontmatter to the top of the file:
    ```yaml
    ---
    title: My New Article
    description: This is a description of my new article.
    author: <author>
    category: <category> # Optional
    tags: ["tag1", "tag2"] # Optional
    image: /assets/articles/<image>.jpg
    cover:
      src: /assets/articles/<image>.jpg
      alt: <alt>
    published_date: yyyy-mm-dd HH:MM:ss
    modified_date: yyyy-mm-dd HH:MM:ss
    draft: true # Optional
    ---
    ```

3. Add your article content below the frontmatter.

### Add new category

1. First, add new category data to `categories` object in `constants/index.ts` file, for example:

```typescript
// In `constants/index.ts`
export const categories: Category[] = [
  // ... existing categories
  {
    id: 'new-category',
    text: 'New Category',
    icon: 'icon from icones',
  },
]
```

2. Then, add the new category to the `category` field in the frontmatter of your article markdown file.
