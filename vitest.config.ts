import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    testTransformMode: {
      web: ["\.[jt]sx?$"],
    },
    setupFiles: ['./src/test/setup.ts'],
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      optimizer: {
        web: {
          include: ["solid-js"]
        }
      }
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});