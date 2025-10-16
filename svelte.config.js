// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { generatePaths } from './generate-paths.js'; // Importiamo il nostro script

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'], // Lasciamo solo .svelte per evitare conflitti
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/Core-Foundation-Guide' : ''
		},
		alias: {
			$lib: 'src/lib'
		},
		prerender: {
			// Diciamo a SvelteKit esattamente quali pagine costruire.
			entries: generatePaths()
		}
	}
};

export default config;