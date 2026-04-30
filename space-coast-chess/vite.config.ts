/// <reference types="vitest" />

import { createLogger, defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

const logger = createLogger();
const originalWarn = logger.warn;
const originalWarnOnce = logger.warnOnce;

function isAngularPlatformServerSourcemapWarning(message: string): boolean {
  return (
    message.includes('Sourcemap for') &&
    message.includes('@angular/platform-server')
  );
}

logger.warn = (message, options) => {
  if (!isAngularPlatformServerSourcemapWarning(message)) {
    originalWarn(message, options);
  }
};

logger.warnOnce = (message, options) => {
  if (!isAngularPlatformServerSourcemapWarning(message)) {
    originalWarnOnce(message, options);
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  customLogger: logger,
  build: {
    target: ['es2020'],
  },
  environments: {
    ssr: {
      build: {
        copyPublicDir: false,
      },
    },
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'prism'
      }
    }),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
