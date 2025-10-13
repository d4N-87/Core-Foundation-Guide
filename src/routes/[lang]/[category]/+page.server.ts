// src/routes/[lang]/[category]/+page.server.ts
import { getPosts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

// English: SvelteKit's server-side load function for the category page.
// Italiano: Funzione di load lato server di SvelteKit per la pagina di categoria.
export const load: PageServerLoad = async ({ params, parent }) => {
	// English: Destructure language and category slug from the URL parameters.
	// Italiano: Destruttura la lingua e lo slug della categoria dai parametri dell'URL.
	const { lang, category } = params;

	// English: Fetch all posts for the given language.
	// Italiano: Recupera tutti i post per la lingua specificata.
	const allPosts = await getPosts(lang);

	// English: Filter the posts to include only those that match the current category slug.
	// Italiano: Filtra i post per includere solo quelli che corrispondono allo slug della categoria corrente.
	const posts = allPosts.filter((p) => p.categorySlug === category);

	// English: Load translations from the parent layout's load function.
	// Italiano: Carica le traduzioni dalla funzione di load del layout genitore.
	const { translations } = await parent();

	// English: Return the filtered posts and other relevant data to the page component.
	// Italiano: Restituisce i post filtrati e altri dati rilevanti al componente della pagina.
	return {
		posts,
		lang,
		category,
		translations
	};
};