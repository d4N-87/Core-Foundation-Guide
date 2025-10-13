// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// English: The main plugin that integrates SvelteKit's functionality into Vite.
		// Italiano: Il plugin principale che integra le funzionalità di SvelteKit in Vite.
		sveltekit(),
		// English: A custom inline plugin to handle raw Markdown imports.
		// Italiano: Un plugin personalizzato inline per gestire le importazioni di Markdown grezzo.
		{
			name: 'markdown-loader',
			// English: The `transform` hook intercepts files during the build process.
			// Italiano: L'hook `transform` intercetta i file durante il processo di build.
			transform(code, id) {
				// English: If a file ends with `.raw.md`, it exports its content as a plain string.
				// Italiano: Se un file termina con `.raw.md`, esporta il suo contenuto come una stringa di testo semplice.
				if (id.endsWith('.raw.md')) {
					return `export default ${JSON.stringify(code)};`;
				}
			}
		}
	],

	resolve: {
		// English: Defines path aliases for Vite's module resolver, consistent with other config files.
		// Italiano: Definisce gli alias dei percorsi per il resolver di moduli di Vite, in modo coerente con altri file di configurazione.
		alias: {
			$lib: '/src/lib'
		}
	},

	optimizeDeps: {
		// English: Forces Vite to pre-bundle `gsap` for better development server performance and to avoid potential issues.
		// Italiano: Forza Vite a pre-impacchettare `gsap` per migliori prestazioni del server di sviluppo ed evitare potenziali problemi.
		include: ['gsap']
	},

	server: {
		watch: {},
		fs: {
			// English: Relaxes Vite's file system restrictions. Can be useful in complex setups.
			// Italiano: Allenta le restrizioni del file system di Vite. Può essere utile in configurazioni complesse.
			strict: false
		}
	}
});