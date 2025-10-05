// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm'; // Importiamo l'estensione per il Markdown avanzato

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			// --- NUOVA CONFIGURAZIONE DETTAGLIATA ---
			// Disabilitiamo la modalità "componente Svelte" per i file .md
			// e li trattiamo come puro Markdown.
			smartypants: true,
			highlight: false, // Disabilitiamo l'highlighting del codice per ora
			// Attiviamo le estensioni per la sintassi Markdown completa
			remarkPlugins: [remarkGfm], 
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			'$lib': 'src/lib'
		}
	}
};

export default config;