// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// English: Tells SvelteKit to recognize both .svelte and .md files as components.
	// Italiano: Indica a SvelteKit di riconoscere sia i file .svelte che .md come componenti.
	extensions: ['.svelte', '.md'],

	// English: Configures the preprocessors. Here, we set up mdsvex to handle Markdown files.
	// Italiano: Configura i preprocessori. Qui, impostiamo mdsvex per gestire i file Markdown.
	preprocess: mdsvex({
		extensions: ['.md'],
		smartypants: true, // English: Converts quotes and dashes to smart, typographic equivalents. / Italiano: Converte virgolette e trattini in equivalenti tipografici "smart".
		highlight: false, // English: Syntax highlighting is disabled here. / Italiano: L'evidenziazione della sintassi è disabilitata qui.
		remarkPlugins: [remarkGfm] // English: Adds support for GitHub Flavored Markdown (tables, strikethrough, etc.). / Italiano: Aggiunge il supporto per GitHub Flavored Markdown (tabelle, testo barrato, ecc.).
	}),

	kit: {
		// English: Specifies the adapter to use for building the project. `adapter-auto` automatically detects the deployment environment.
		// Italiano: Specifica l'adattatore da usare per la build del progetto. `adapter-auto` rileva automaticamente l'ambiente di deployment.
		adapter: adapter(),

		// English: Sets up path aliases for cleaner imports. `$lib` points to the `src/lib` directory.
		// Italiano: Imposta degli alias per i percorsi per avere import più puliti. `$lib` punta alla cartella `src/lib`.
		alias: {
			$lib: 'src/lib'
		}
	}
};

export default config;