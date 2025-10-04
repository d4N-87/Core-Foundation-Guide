// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		adapter: adapter(),
		// --- LA NUOVA CONFIGURAZIONE È QUI ---
		// Diciamo a SvelteKit dove si trova la nostra cartella $lib.
		// Lui si occuperà di generare la configurazione corretta per VSC.
		alias: {
			'$lib': 'src/lib'
		}
	}
};

export default config;