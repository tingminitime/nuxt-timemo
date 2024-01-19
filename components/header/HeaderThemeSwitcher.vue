<script setup lang="ts">
const mode = useColorMode()

function changeColorMode() {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <HeaderItem
    id="theme-toggle"
    as="button"
    type="button"
    class="theme-toggle"
    aria-label="auto"
    aria-live="polite"
    @click="changeColorMode"
  >
    <svg
      class="sun-and-moon scale-75"
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <mask
        id="moon-mask"
        class="moon"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
        />
        <circle
          cx="24"
          cy="10"
          r="6"
          fill="black"
        />
      </mask>
      <circle
        class="sun"
        cx="12"
        cy="12"
        r="6"
        mask="url(#moon-mask)"
        fill="currentColor"
      />
      <g
        class="sun-beams"
        stroke="currentColor"
      >
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="3"
        />
        <line
          x1="12"
          y1="21"
          x2="12"
          y2="23"
        />
        <line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
        />
        <line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
        />
        <line
          x1="1"
          y1="12"
          x2="3"
          y2="12"
        />
        <line
          x1="21"
          y1="12"
          x2="23"
          y2="12"
        />
        <line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
        />
        <line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
        />
      </g>
    </svg>
  </HeaderItem>
</template>

<style scope>
.theme-toggle {
  --size: 2rem;

  background: none;
  border: none;
  padding: 0;

  inline-size: var(--size);
  block-size: var(--size);
  aspect-ratio: 1;
  border-radius: 50%;

  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  outline-offset: 5px;

  > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
  }

  @media (hover: none) {
    --size: 48px;
  }
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  & > .sun-and-moon > :is(.moon, .sun) {
    fill: var(--theme-icon-fill-hover);
  }

  & > .sun-and-moon > .sun-beams {
    stroke: var(--theme-icon-fill-hover);
  }
}

.sun-and-moon > :is(.moon, .sun, .sun-beams) {
  transform-origin: center center;
}

.sun-and-moon > :is(.moon, .sun) {
  fill: var(--theme-icon-fill);
}

.sun-and-moon > .sun-beams {
  stroke: var(--theme-icon-fill);
  stroke-width: 2px;
}

.sun-and-moon {
  @media (prefers-reduced-motion: no-preference) {
    & > .sun {
      transition: transform 0.5s var(--ease-elastic-3);
    }

    & > .sun-beams {
      transition:
        transform 0.5s var(--ease-elastic-4),
        opacity 0.5s var(--ease-3);
    }

    & .moon > circle {
      transition: transform 0.25s var(--ease-out-5);

      @supports (cx: 1) {
        transition: cx 0.25s var(--ease-out-5);
      }
    }
  }
}

html.dark .sun-and-moon {
  & > .sun {
    transform: scale(1.75);
  }

  & > .sun-beams {
    transform: rotateZ(-25deg);
    opacity: 0;
  }

  & > .moon > circle {
    transform: translateX(-7px);

    @supports (cx: 1) {
      transform: translateX(0);
      cx: 17;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    & > .sun {
      transform: scale(1.75);
      transition-timing-function: var(--ease-3);
      transition-duration: 0.25s;
    }

    & > .sun-beams {
      transform: rotateZ(-25deg);
      transition-duration: 0.15s;
    }

    & > .moon > circle {
      transition-delay: 0.25s;
      transition-duration: 0.5s;
    }
  }
}
</style>
