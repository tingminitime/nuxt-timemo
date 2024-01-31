# timemo

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/nuxt/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/%40nuxt%2Fui/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt-timemo/dev/%40nuxt%2Fcontent/master?color=00dc82)

🏠 My personal site base on Nuxt 3, WIP.

## Prerequistes

- Node.js >= v18.0.0
- pnpm >= v8.0.0
- [VS Code](https://code.visualstudio.com/)

### VS Code Extensions

- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### [Volar Takeover Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode)

In order to enable Vue SFC ( Single File Component ) and TypeScript Vue Plugin ( [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) ) to work together in VSCode and enhance performance using Volar's Takeover Mode, follow these steps :

1. Press `F1` or `Ctrl` + `Shift` + `P` in VSCode.
2. Type `built` and select `Extensions: Show Built-in Extensions`.
3. In the input box on the left side of the "EXTENSIONS" pane, type `@builtin` followed by `typescript`.
4. Choose `TypeScript and JavaScript Language Features`.
5. Click the `Disable` button in the dropdown menu for `Disable (Workspace)`.
6. Click `Reload required` to restart VSCode.

If the configuration is successful, you will see the following icon in the bottom right corner of VSCode :

![Volar Takeover Mode](https://raw.githubusercontent.com/tingminitime/my-assets/main/nuxt3-template/volar-takeover.png)

## ESLint Configuration

This template uses [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Run locally

```bash
npx degit tingminitime/nuxt-timemo <your-project-name>
cd <your-project-name>
pnpm install # If you don't have pnpm installed, run `npm i -g pnpm` first.
pnpm dev
```
