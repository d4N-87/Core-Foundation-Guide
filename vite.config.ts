// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// 🔹 RIMOSSO: l'import di @tailwindcss/vite

export default defineConfig({
  // 🔹 RIMOSSO: il plugin tailwindcss() dall'array
  plugins: [
    sveltekit(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.endsWith('.raw.md')) {
          return `export default ${JSON.stringify(code)};`;
        }
      },
    },
  ],

  resolve: {
    alias: {
      $lib: '/src/lib',
    },
  },

  optimizeDeps: {
    include: ['gsap'],
  },

  server: {
    watch: {},
    fs: {
      strict: false,
    },
  },
});