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

![Vue](/assets/articles/vue-banner-1.jpg)

[Vue](https://vuejs.org/)

::content-image{src="/assets/articles/vue-banner-1.jpg"}
::

## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Shiki (式, a Japanese word for "Style") is a beautiful and powerful syntax highlighter based on TextMate grammar and themes, the same engine as VS Code's syntax highlighting. Provides very accurate and fast syntax highlighting for almost any mainstream programming language.

No custom RegExp to maintain, no custom CSS to maintain, no custom HTML to maintain. And as your favorite languages and themes in VS Code evolve - your syntax highlighting will evolve too.

Oh by the way, all the code blocks in this site are highlighted by Shiki, as you'd expect :)

**Bold** *Italic* ***Bold and Italic***

- List 1
- List 2
- List 3

1. List 1
2. List 2
3. List 3

> Blockquote

::alert{type="info"}
Info alert.
::

::alert{type="success"}
Success alert.
::

::alert{type="warning"}
Warning alert.
::

::alert{type="danger"}
Danger alert.
::

<!-- ::alert{type="info"}
This is an Alert component for info.
:: -->

---

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Content 1 | Content 2 | Content 3 |
| Content 4 | Content 5 | Content 6 |

---

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

`code inline`

JavaScript code block

```js [file.js]{4-6,7} meta-info=val
export default () => {
  console.log('Code block')
}
```

```ts [server/api/search.ts]
const test: number = 123

export default defineEventHandler(async (event) => {
  return 'Hello search'
})
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
