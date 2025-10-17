<!-- src/routes/[lang]/[category]/+page.svelte -->
<script lang="ts">
	// EN: Import the type definition for the 'data' prop from SvelteKit's generated types.
	// IT: Importa la definizione del tipo per la prop 'data' dai tipi generati da SvelteKit.
	import type { PageData } from './$types';
	// EN: Import reusable UI components.
	// IT: Importa i componenti UI riutilizzabili.
	import NodeGrid from '$lib/components/NodeGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';
	// EN: Import SvelteKit utilities for navigation and path handling.
	// IT: Importa le utility di SvelteKit per la navigazione e la gestione dei percorsi.
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	// EN: Import data types and translation utilities.
	// IT: Importa i tipi di dati e le utility per le traduzioni.
	import type { Post } from '$lib/posts';
	import { type Language, fallbackTranslations } from '$lib/translations';

	// EN: The 'data' prop, populated by the load function in the corresponding +page.ts file.
	// IT: La prop 'data', popolata dalla funzione di load nel file +page.ts corrispondente.
	export let data: PageData;

	// EN: Extract data from the 'data' prop into local constants for easier access in the template.
	// IT: Estrae i dati dalla prop 'data' in costanti locali per un accesso più semplice nel template.
	const posts = data.posts;
	const lang = data.lang as Language;
	const category = data.category;
	// EN: Selects the appropriate translation object for the current language, with a fallback.
	// IT: Seleziona l'oggetto di traduzione appropriato per la lingua corrente, con un fallback.
	const t = lang && data.translations ? data.translations[lang] : fallbackTranslations;

	/**
	 * EN: Handles the click event from a NodeCard. Although NodeGrid might handle navigation internally,
	 * this function is kept for consistency or potential future use.
	 * IT: Gestisce l'evento di click da una NodeCard. Sebbene NodeGrid possa gestire la navigazione internamente,
	 * questa funzione viene mantenuta per coerenza o per un potenziale uso futuro.
	 * @param event The custom event containing the post data.
	 */
	function handleCardClick(event: CustomEvent<{ post: Post }>) {
		const { post } = event.detail;
		goto(`${base}/${post.lang}/${post.categorySlug}/${post.slug}.html`);
	}
</script>

<!-- EN: Sets the page's metadata (title, description) for SEO purposes, dynamically using the category name. -->
<!-- IT: Imposta i metadati della pagina (titolo, descrizione) per finalità SEO, usando dinamicamente il nome della categoria. -->
<SEO
	title={`${t.pageTitleCategory}: ${category}`}
	description={`Esplora tutti gli articoli nella categoria ${category}`}
/>

<!-- EN: The main heading of the category page. -->
<!-- IT: L'intestazione principale della pagina di categoria. -->
<div class="text-center pt-12 pb-8">
	<h1 class="text-4xl font-bold tracking-widest uppercase text-white">
		{t.pageTitleCategory}: <span class="text-cyan-400">{category}</span>
	</h1>
</div>

<!-- EN: The main content area that displays the grid of posts. -->
<!-- IT: L'area del contenuto principale che mostra la griglia dei post. -->
<div class="max-w-7xl mx-auto px-4 pb-12">
	<!-- EN: If there are posts for this category, display them in the NodeGrid. -->
	<!-- IT: Se ci sono post per questa categoria, li mostra nella NodeGrid. -->
	{#if posts.length > 0}
		<NodeGrid {posts} />
	{:else}
		<!-- EN: Otherwise, display a "not found" message. -->
		<!-- IT: Altrimenti, mostra un messaggio di "nessun risultato". -->
		<p class="text-center text-slate-500">{t.noPostsFound}</p>
	{/if}
</div>