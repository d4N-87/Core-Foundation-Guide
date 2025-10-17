// src/routes/[lang]/+page.ts

// EN: Import the main function to fetch all posts.
// IT: Importa la funzione principale per recuperare tutti i post.
import { getPosts } from '$lib/posts';

// EN: Import the type definition for a SvelteKit page load function.
// IT: Importa la definizione del tipo per una funzione di load di pagina di SvelteKit.
import type { PageLoad } from './$types';

// EN: Import types and fallback data for UI translations.
// IT: Importa i tipi e i dati di fallback per le traduzioni della UI.
import { type Language, fallbackTranslations } from '$lib/translations';

// EN: Defines a simplified structure for a post, used for index lists.
// IT: Definisce una struttura semplificata per un post, usata negli elenchi indice.
export interface PostForIndex {
	title: string;
	slug: string;
}

// EN: Defines the structure for a category group, containing its name and a list of its posts.
// IT: Definisce la struttura per un gruppo di categorie, contenente il suo nome e l'elenco dei suoi post.
export interface CategoryIndex {
	categoryName: string;
	categorySlug: string;
	posts: PostForIndex[];
}

/**
 * EN: This load function runs for each language-specific index page (e.g., /en, /it).
 * It fetches all posts for that language and structures them by category.
 * IT: Questa funzione di load viene eseguita per ogni pagina indice di una lingua (es. /en, /it).
 * Recupera tutti i post per quella lingua e li struttura per categoria.
 */
export const load: PageLoad = async ({ params, parent }) => {
	// EN: Cleans the 'lang' parameter by removing the '.html' suffix, which might be present due to static adapter routing.
	// IT: Pulisce il parametro 'lang' rimuovendo il suffisso '.html', che potrebbe essere presente a causa del routing dell'adapter statico.
	const lang = params.lang.replace(/\.html$/, '');

	// EN: Fetches the global translations object from the parent layout's load function.
	// IT: Recupera l'oggetto globale delle traduzioni dalla funzione di load del layout genitore.
	const { translations } = await parent();

	// EN: Selects the specific translation object for the current language, with a fallback to default translations.
	// IT: Seleziona l'oggetto di traduzione specifico per la lingua corrente, con un fallback alle traduzioni predefinite.
	const t =
		translations && translations[lang as Language] ? translations[lang as Language] : fallbackTranslations;

	// EN: Fetch all posts across all languages from the cache or file system.
	// IT: Recupera tutti i post di tutte le lingue dalla cache o dal file system.
	const allPosts = await getPosts();

	// EN: Filter the posts to keep only those matching the current language.
	// IT: Filtra i post per mantenere solo quelli che corrispondono alla lingua corrente.
	const posts = allPosts.filter((p) => p.lang === lang);

	// EN: Defines a custom sort order for the categories on the page.
	// IT: Definisce un ordine di visualizzazione personalizzato per le categorie nella pagina.
	const categoryOrder = ['fundamentals', 'system_anatomy', 'core_concepts', 'advanced_topics'];

	// EN: Groups the filtered posts by category using the 'reduce' method.
	// IT: Raggruppa i post filtrati per categoria usando il metodo 'reduce'.
	const postIndex = posts.reduce<CategoryIndex[]>((accumulator, currentPost) => {
		// EN: Check if a group for the current post's category already exists in the accumulator.
		// IT: Controlla se un gruppo per la categoria del post corrente esiste già nell'accumulatore.
		let categoryGroup = accumulator.find(
			(group) => group.categorySlug === currentPost.categorySlug
		);

		// EN: If not, create a new category group and add it to the accumulator.
		// IT: Se non esiste, crea un nuovo gruppo di categorie e lo aggiunge all'accumulatore.
		if (!categoryGroup) {
			categoryGroup = {
				categoryName: currentPost.categoryName,
				categorySlug: currentPost.categorySlug,
				posts: []
			};
			accumulator.push(categoryGroup);
		}

		// EN: Add the simplified post data to the corresponding category group.
		// IT: Aggiunge i dati semplificati del post al gruppo di categoria corrispondente.
		categoryGroup.posts.push({
			title: currentPost.title,
			slug: currentPost.slug
		});
		return accumulator;
	}, []);

	// EN: Sorts the category groups based on the predefined 'categoryOrder' array.
	// IT: Ordina i gruppi di categorie in base all'array 'categoryOrder' predefinito.
	postIndex.sort((a, b) => {
		const indexA = categoryOrder.indexOf(a.categorySlug);
		const indexB = categoryOrder.indexOf(b.categorySlug);
		// EN: If a category is not in the order array, it's pushed to the end.
		// IT: Se una categoria non è nell'array di ordinamento, viene spinta alla fine.
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	// EN: Returns the processed data to the +page.svelte component.
	// IT: Restituisce i dati elaborati al componente +page.svelte.
	return {
		lang, // EN: Pass the cleaned 'lang' code. / IT: Passa il codice 'lang' pulito.
		posts,
		postIndex,
		translations
	};
};