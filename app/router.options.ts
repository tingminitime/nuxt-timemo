import type { RouterConfig } from 'nuxt/schema'

export default {
  /**
   * Cannot scroll to anchor section immediately after navigation
   * because the element may not be rendered from markdown yet.
   */
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        const waitForRenderElement = (attempts = 0, maxAttempts = 20) => {
          const element = document.querySelector(to.hash)

          if (element || attempts >= maxAttempts) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            })
          }
          else {
            // Check `element` every 100ms until it exists or max attempts reached
            setTimeout(() => waitForRenderElement(attempts + 1, maxAttempts), 100)
          }
        }

        // Initial call to start checking for the element
        setTimeout(() => waitForRenderElement(), 300)
      })
    }
    return { top: 0 }
  },
} satisfies RouterConfig
