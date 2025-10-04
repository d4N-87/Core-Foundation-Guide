// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		// --- NUOVO PLUGIN ---
		// Questo plugin intercetta i file .md e li carica come testo grezzo
		{
			name: 'markdown-loader',
			transform(code, id) {
				if (id.endsWith('.md')) {
					return `export default ${JSON.stringify(code)};`;
				}
			}
		}
	]
});