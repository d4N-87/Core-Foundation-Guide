// src/routes/[lang]/+page.server.ts
import { getPosts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';
import { translations } from '$lib/translations';

export const entries = () => {
	return Object.keys(translations).map((lang) => ({ lang }));
};

// English: Defines the shape of a single post entry for the content index.
// Italiano: Definisce la forma di una singola voce di post per l'indice dei contenuti.
export interface PostForIndex {
	title: string;
	slug: string;
}
// English: Defines the shape of a category group for the content index.
// Italiano: Definisce la forma di un gruppo di categorie per l'indice dei contenuti.
export interface CategoryIndex {
	categoryName: string;
	categorySlug: string;
	posts: PostForIndex[];
}

// English: SvelteKit's server-side load function for the localized homepage.
// Italiano: Funzione di load lato server di SvelteKit per la homepage localizzata.
export const load: PageServerLoad = async ({ params }) => {
	const { lang } = params;

	// English: Fetch all posts for the current language, ensuring it defaults to an empty array if none are found.
	// Italiano: Recupera tutti i post per la lingua corrente, assicurando che il valore predefinito sia un array vuoto se non ne vengono trovati.
	const posts = (await getPosts(lang)) || [];

	// English: Defines the desired display order for the categories in the content index.
	// Italiano: Definisce l'ordine di visualizzazione desiderato per le categorie nell'indice dei contenuti.
	const categoryOrder = ['fundamentals', 'system-anatomy', 'core-concepts', 'advanced-topics'];

	// English: Group the flat list of posts into a structured array by category.
	// Italiano: Raggruppa l'elenco piatto di post in un array strutturato per categoria.
	const postIndex = posts.reduce<CategoryIndex[]>((accumulator, currentPost) => {
		// English: Find if a group for the current category already exists.
		// Italiano: Cerca se esiste già un gruppo per la categoria corrente.
		let categoryGroup = accumulator.find((group) => group.categorySlug === currentPost.categorySlug);
		// English: If not, create a new group and add it to the accumulator.
		// Italiano: Se non esiste, crea un nuovo gruppo e lo aggiunge all'accumulatore.
		if (!categoryGroup) {
			categoryGroup = {
				categoryName: currentPost.categoryName,
				categorySlug: currentPost.categorySlug,
				posts: []
			};
			accumulator.push(categoryGroup);
		}
		// English: Add the current post (in a simplified format) to its category group.
		// Italiano: Aggiunge il post corrente (in un formato semplificato) al suo gruppo di categoria.
		categoryGroup.posts.push({
			title: currentPost.title,
			slug: currentPost.slug
		});
		return accumulator;
	}, []);

	// English: Sort the category groups based on the predefined `categoryOrder` array.
	// Italiano: Ordina i gruppi di categorie in base all'array predefinito `categoryOrder`.
	postIndex.sort((a, b) => {
		const indexA = categoryOrder.indexOf(a.categorySlug);
		const indexB = categoryOrder.indexOf(b.categorySlug);
		// English: Categories not in the order array are pushed to the end.
		// Italiano: Le categorie non presenti nell'array di ordinamento vengono spostate alla fine.
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	// English: Return all the necessary data to the page component.
	// Italiano: Restituisce tutti i dati necessari al componente della pagina.
	return {
		lang,
		posts, // English: The full, flat list of posts for the NodeGrid.
		postIndex // English: The structured and sorted list for the ContentIndex.
	};
};