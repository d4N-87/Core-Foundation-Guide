// English: This reference directive pulls in the default SvelteKit type definitions.
// Italiano: Questa direttiva di riferimento importa le definizioni dei tipi predefinite di SvelteKit.
/// <reference types="@sveltejs/kit" />

// English: This module declaration tells TypeScript how to handle imports of files ending in `.md`.
//          Without this, importing a markdown file would cause a type error.
// Italiano: Questa dichiarazione di modulo dice a TypeScript come gestire le importazioni di file che terminano in `.md`.
//           Senza di essa, importare un file markdown causerebbe un errore di tipo.
declare module '*.md' {
	// English: The "default" export from a .md file will be treated as a renderable Svelte component.
	// Italiano: L'esportazione "default" da un file .md verrà trattata come un componente Svelte renderizzabile.
	export { SvelteComponent as default } from 'svelte';

	// English: The "metadata" export will contain the file's frontmatter (title, sources, etc.)
	//          as an object with string keys and any type of values.
	// Italiano: L'esportazione "metadata" conterrà il frontmatter del file (titolo, fonti, ecc.)
	//           come un oggetto con chiavi di tipo stringa e valori di qualsiasi tipo.
	export const metadata: Record<string, any>;
}