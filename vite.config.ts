import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solid(), tailwindcss()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

  // Configure Vitest
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    // solid uses jsx as its file extension
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    deps: {
      // Put solid as external as we'll be manually handling how solid is initialized in the test env
      external: ["solid-js", "@solidjs/router"],
    },
    // Configure jsdom
    environmentOptions: {
      jsdom: {
        url: "http://localhost",
      },
    },
  },
}));
