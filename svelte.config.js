// svelte.config.js

// EN: Import the static adapter, which is used to prerender the site into a collection of static files suitable for hosting on services like GitHub Pages.
// IT: Importa l'adapter statico, utilizzato per pre-renderizzare il sito in una collezione di file statici, adatti per l'hosting su servizi come GitHub Pages.
import adapter from '@sveltejs/adapter-static';

// EN: Import the Vite preprocessor, which allows using languages like TypeScript or Sass within Svelte components.
// IT: Importa il preprocessore di Vite, che permette di utilizzare linguaggi come TypeScript o Sass all'interno dei componenti Svelte.
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// EN: Import the custom script that generates a list of all content paths. This is crucial for prerendering dynamic routes.
// IT: Importa lo script personalizzato che genera una lista di tutti i percorsi dei contenuti. È fondamentale per il prerendering delle rotte dinamiche.
import { generatePaths } from './generate-paths.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// EN: Specifies the file extensions that SvelteKit should treat as components.
	// IT: Specifica le estensioni dei file che SvelteKit deve considerare come componenti. Lasciamo solo .svelte per evitare conflitti.
	extensions: ['.svelte'],

	// EN: Applies the Vite preprocessor to Svelte components, enabling features like TypeScript and PostCSS.
	// IT: Applica il preprocessore di Vite ai componenti Svelte, abilitando funzionalità come TypeScript e PostCSS.
	preprocess: vitePreprocess(),

	kit: {
		// EN: Configures the static adapter to build the project as a static site.
		// IT: Configura l'adapter statico per compilare il progetto come un sito statico.
		adapter: adapter(),

		paths: {
			// EN: Sets the base path for the application. It's empty for local development but set to the repository name for production on GitHub Pages.
			// IT: Imposta il percorso di base per l'applicazione. È vuoto per lo sviluppo locale, ma impostato sul nome del repository per la produzione su GitHub Pages.
			base: process.env.NODE_ENV === 'production' ? '/Core-Foundation-Guide' : ''
		},

		alias: {
			// EN: Defines a path alias for easier and cleaner imports from the 'src/lib' directory.
			// IT: Definisce un alias per i percorsi, per importazioni più semplici e pulite dalla directory 'src/lib'.
			$lib: 'src/lib'
		},

		prerender: {
			// EN: Explicitly tells SvelteKit which pages to prerender. This is necessary because the site uses dynamic routes ([lang], [category], [slug]) that SvelteKit cannot discover on its own. The `generatePaths()` function provides the complete list.
			// IT: Indica esplicitamente a SvelteKit quali pagine pre-renderizzare. Questo è necessario perché il sito usa rotte dinamiche ([lang], [category], [slug]) che SvelteKit non può scoprire da solo. La funzione `generatePaths()` fornisce l'elenco completo.
			entries: generatePaths()
		}
	}
};

export default config;