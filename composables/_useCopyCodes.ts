/* Refer : https://github.com/vuejs/vitepress/blob/main/src/client/app/composables/copyCode.ts */
export function useCopyCode() {
  const timeoutIdMap: WeakMap<HTMLElement, NodeJS.Timeout> = new WeakMap()

  const copied = ref(false)

  function copyButtonHandler(e: MouseEvent) {
    const el = e.target as HTMLElement
    const matchCopyButtonEl = el.closest('pre[class*="language-"] + button#copy-button') as HTMLElement
    const isMatchCopyButton = !!matchCopyButtonEl

    if (isMatchCopyButton) {
      // const parent = el.parentElement
      const siblingPre = matchCopyButtonEl.previousElementSibling
      if (!siblingPre)
        return

      const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(
        siblingPre.className,
      )

      const ignoredNodes = ['.copy-ignore', '.diff.remove']

      // Clone the node and remove the ignored nodes
      const clone = siblingPre.cloneNode(true) as HTMLElement
      clone
        .querySelectorAll(ignoredNodes.join(','))
        .forEach(node => node.remove())

      let text = clone.textContent || ''

      if (isShell)
        text = text.replace(/^ *(\$|>) /gm, '').trim()

      text = remoteComments(text)

      copyToClipboard(text).then(() => {
        matchCopyButtonEl.classList.add('copied')
        copied.value = true
        clearTimeout(timeoutIdMap.get(matchCopyButtonEl))
        const timeoutId = setTimeout(() => {
          matchCopyButtonEl.classList.remove('copied')
          matchCopyButtonEl.blur()
          timeoutIdMap.delete(matchCopyButtonEl)
          copied.value = false
        }, 2000)
        timeoutIdMap.set(matchCopyButtonEl, timeoutId)
      })
    }
  }

  function remoteComments(code: string): string {
    return code.replace(/\/\/ \[!code.*?\]\n/g, '').trim()
  }

  async function copyToClipboard(text: string) {
    try {
      return navigator.clipboard.writeText(text)
    }
    catch {
      const element = document.createElement('textarea')
      const previouslyFocusedElement = document.activeElement

      element.value = text

      // Prevent keyboard from showing on mobile
      element.setAttribute('readonly', '')

      element.style.contain = 'strict'
      element.style.position = 'absolute'
      element.style.left = '-9999px'
      element.style.fontSize = '12pt' // Prevent zooming on iOS

      const selection = document.getSelection()
      const originalRange = selection
        ? selection.rangeCount > 0 && selection.getRangeAt(0)
        : null

      document.body.appendChild(element)
      element.select()

      // Explicit selection workaround for iOS
      element.selectionStart = 0
      element.selectionEnd = text.length

      document.execCommand('copy')
      document.body.removeChild(element)

      if (originalRange) {
        selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
        selection!.addRange(originalRange)
      }

      // Get the focus back on the previously focused element, if any
      if (previouslyFocusedElement) {
        ;(previouslyFocusedElement as HTMLElement).focus()
      }
    }
  }

  return {
    copyButtonHandler,
    copied,
  }
}
