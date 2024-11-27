/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  preview: {
    port: 3001,
  },
  test: {
    environment: 'jsdom',
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
