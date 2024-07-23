---
title: Vue.js 第一篇文章
description: Vue.js says 「 Hello World 」 to you.
author: tim
category: vue
tags: ["vue", "hello"]
image: /assets/articles/vue-banner-1.jpg
cover:
  src: /assets/articles/vue-banner-1.jpg
  alt: Vue banner
published_date: 2024-02-17 16:30:00
modified_date: 2024-02-17 16:30:00
---

# First Vue Post

This is the first post about Vue.js
第一篇關於 Vue.js 的文章

Markdown image

## TOC Header 2 Test 1

![Vue](/assets/articles/vue-banner-1.jpg)

Custom image component

::content-image{src="/assets/articles/vue-banner-1.jpg"}
::

## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

[Shiki](https://shiki.style/) (式, a Japanese word for "Style") is a beautiful and powerful syntax highlighter based on TextMate grammar and themes, the same engine as VS Code's syntax highlighting. Provides very accurate and fast syntax highlighting for almost any mainstream programming language.

No custom RegExp to maintain, no custom CSS to maintain, no custom HTML to maintain. And as your favorite languages and themes in VS Code evolve - your syntax highlighting will evolve too.

Oh by the way, all the code blocks in this site are highlighted by Shiki, as you'd expect :)

[Link 1](https://vuejs.org/)

[Link 2](https://vuejs.org/)

[Link 3](https://vuejs.org/)

**Bold** *Italic* ***Bold and Italic***

- List 1
- List 2
- List 3

1. List 1
2. List 2
3. List 3

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

> Blockquote

### TOC Header 3 Test 123456

::alert
This is an Alert component.
::

::alert{type="info"}
This is an Alert component for info.
::

::alert{type="info" title="Info"}
Info alert.

`Inline Code`

```js
console.log('Code block')
```
::

::alert{type="success" title="Success"}
Success alert.

`Inline Code`

```js
console.log('Code block')
```
::

::alert{type="warning" title="Warning"}
Warning alert.

`Inline Code`

```js
console.log('Code block')
```
::

::alert{type="danger" title="Danger"}
Danger alert.

`Inline Code`

```js
console.log('Code block')
```
::

`inline code`

[Link `inline code`](https://vuejs.org/)

JavaScript code block

```js [file.js] meta-info=val
export default () => {
  console.log('Code block') // [!code highlight]
}
```

```ts {1,3-4} [server/api/search.ts]
const test: number = 123

export default defineEventHandler(async (event) => {
  return 'Hello search'
})
```

```js [test.js]
function increase(num) {
  return num + 1 // [!code --]
  return num + 2 // [!code ++]
}
```

HTML code block

```html
<div>
  <p>Test</p>
</div>
```

CSS code block

```css
body {
  background-color: #f0f0f0;
}
```

SCSS code block

```scss
$primary-color: #f0f0f0;
body {
  background-color: $primary-color;
}
```

JSON code block

```json
{
  "name": "Tim",
  "age": 18
}
```

Vue code block

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <p>Test</p>
  </div>
</template>
```

Python code block

```python
def test():
  return 123

print(test())
```

Bash code block

```bash
echo "Hello World"

pnpm run install
```

## TOC Header 2 Test 2

---

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Content 1 | Content 2 | Content 3 |
| Content 4 | Content 5 | Content 6 |

### TOC Header 3 Test 2

Iriure ipsum vero dolores aliquip velit gubergren takimata ut aliquip diam no ad erat diam. Vulputate justo sit lorem sit ut molestie consequat. No sed sea et invidunt esse iusto autem sed aliquyam. Justo stet et euismod voluptua iriure sed stet. Dolores delenit sanctus ipsum sit. Nonummy dolor no stet consetetur. Iriure sit eum dolores ut sit dolore dolores ut eu et lorem. Lorem sea vero esse eos eos tation accusam in luptatum sed illum sea velit vero. Diam invidunt iriure liber erat no duis vulputate no vero elitr amet dolor et lorem sed nulla duo. Qui lorem sed. Sed consequat duo ipsum et ea dolore elitr veniam vero sanctus tincidunt consequat. Minim ut nibh elit nobis dolore.
