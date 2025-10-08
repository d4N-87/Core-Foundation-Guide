// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  // 🔹 Svelte 5 non richiede più vitePreprocess() separato
  preprocess: mdsvex({
    extensions: ['.md'],
    smartypants: true,
    highlight: false,
    remarkPlugins: [remarkGfm],
  }),

  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
    },
  },
};

export default config;
