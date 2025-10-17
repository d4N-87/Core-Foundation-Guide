// src/routes/[lang]/[category]/+page.ts

// EN: Import the main function to fetch all posts.
// IT: Importa la funzione principale per recuperare tutti i post.
import { getPosts } from '$lib/posts';

// EN: Import the type definition for a SvelteKit page load function.
// IT: Importa la definizione del tipo per una funzione di load di pagina di SvelteKit.
import type { PageLoad } from './$types';

/**
 * EN: This load function runs for category-specific index pages (e.g., /en/core_concepts).
 * It fetches all posts that belong to the specified language and category.
 * IT: Questa funzione di load viene eseguita per le pagine indice di una specifica categoria (es. /en/core_concepts).
 * Recupera tutti i post che appartengono alla lingua e alla categoria specificate.
 */
export const load: PageLoad = async ({ params, parent }) => {
	// EN: Cleans the route parameters by removing the '.html' suffix, which might be present due to the static adapter's routing.
	// IT: Pulisce i parametri della rotta rimuovendo il suffisso '.html', che potrebbe essere presente a causa del routing dell'adapter statico.
	const lang = params.lang.replace(/\.html$/, '');
	const category = params.category.replace(/\.html$/, '');

	// EN: Fetches the global translations object from the parent layout's load function.
	// IT: Recupera l'oggetto globale delle traduzioni dalla funzione di load del layout genitore.
	const { translations } = await parent();

	// EN: Fetch all posts across all languages from the cache or file system.
	// IT: Recupera tutti i post di tutte le lingue dalla cache o dal file system.
	const allPosts = await getPosts();

	// EN: Filter the posts to keep only those that match both the current language AND the current category slug.
	// IT: Filtra i post per mantenere solo quelli che corrispondono sia alla lingua corrente SIA allo slug della categoria corrente.
	const posts = allPosts.filter((p) => p.lang === lang && p.categorySlug === category);

	// EN: Returns the filtered posts and other relevant data to the corresponding +page.svelte component.
	// IT: Restituisce i post filtrati e altri dati rilevanti al componente +page.svelte corrispondente.
	return {
		posts,
		lang,
		category,
		translations
	};
};