<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
	// EN: Import Svelte's onMount for lifecycle-specific logic.
	// IT: Importa onMount di Svelte per logiche legate al ciclo di vita del componente.
	import { onMount } from 'svelte';
	// EN: Import PageData type for the 'data' prop.
	// IT: Importa il tipo PageData per la prop 'data'.
	import type { PageData } from './$types';
	// EN: Import UI components.
	// IT: Importa i componenti UI.
	import NodeGrid from '$lib/components/NodeGrid.svelte';
	import ContentIndex from '$lib/components/ContentIndex.svelte';
	// EN: Import SvelteKit's navigation and path helpers.
	// IT: Importa gli helper di SvelteKit per la navigazione e i percorsi.
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	// EN: Import data types and translation utilities.
	// IT: Importa i tipi di dati e le utility per le traduzioni.
	import type { Post } from '$lib/posts';
	import { type Language, fallbackTranslations } from '$lib/translations';
	// EN: Import GSAP for advanced animations.
	// IT: Importa GSAP per animazioni avanzate.
	import { gsap } from 'gsap';
	// EN: Import Svelte's transition and easing functions.
	// IT: Importa le funzioni di transizione e di easing di Svelte.
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// EN: Import the SEO component for managing page metadata.
	// IT: Importa il componente SEO per la gestione dei metadati della pagina.
	import SEO from '$lib/components/SEO.svelte';
	// EN: Import the browser check utility.
	// IT: Importa l'utility per il controllo dell'ambiente browser.
	import { browser } from '$app/environment';

	// EN: The 'data' prop, populated by the load function in the corresponding +page.ts.
	// IT: La prop 'data', popolata dalla funzione di load nel +page.ts corrispondente.
	export let data: PageData;
	// EN: References to DOM elements for direct manipulation (e.g., animations).
	// IT: Riferimenti a elementi del DOM per la manipolazione diretta (es. animazioni).
	let gridWrapperElement: HTMLElement;
	let mapButtonElement: HTMLElement;
	// EN: State variable to control the visibility of the content index.
	// IT: Variabile di stato per controllare la visibilità dell'indice dei contenuti.
	let isIndexOpen = false;

	// EN: Extract and prepare data from the 'data' prop with fallbacks.
	// IT: Estrae e prepara i dati dalla prop 'data' con dei fallback.
	const allPosts = data.posts ?? [];
	const postIndex = data.postIndex ?? [];
	const lang = data.lang as Language | undefined;
	const t = lang && data.translations ? data.translations[lang] : fallbackTranslations;

	// EN: Defines a custom sort order for categories.
	// IT: Definisce un ordine di visualizzazione personalizzato per le categorie.
	const categoryOrder = ['fundamentals', 'system_anatomy', 'core_concepts', 'advanced_topics'];

	// EN: Creates a unique, sorted list of categories from the available posts.
	// IT: Crea una lista unica e ordinata di categorie a partire dai post disponibili.
	const categories = [...new Set(allPosts.map((p) => p.categorySlug))]
		.map((slug) => {
			const postInCategory = allPosts.find((p) => p.categorySlug === slug)!;
			return { slug, name: postInCategory.categoryName, color: postInCategory.categoryColor || 'slate' };
		})
		.sort((a, b) => {
			const indexA = categoryOrder.indexOf(a.slug);
			const indexB = categoryOrder.indexOf(b.slug);
			if (indexA === -1) return 1;
			if (indexB === -1) return -1;
			return indexA - indexB;
		});

	// EN: Reactive state variables for the search input and category filters.
	// IT: Variabili di stato reattive per l'input di ricerca e i filtri di categoria.
	let searchTerm = '';
	let selectedCategories: string[] = [];

	// EN: A Svelte reactive statement (`$:`) that automatically recalculates the list of posts to display whenever 'allPosts', 'searchTerm', or 'selectedCategories' changes.
	// IT: Una dichiarazione reattiva di Svelte (`$:`) che ricalcola automaticamente la lista dei post da visualizzare ogni volta che 'allPosts', 'searchTerm' o 'selectedCategories' cambiano.
	$: filteredPosts = allPosts.filter((post) => {
		const searchMatch =
			searchTerm === '' ||
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.plainExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
		const categoryMatch =
			selectedCategories.length === 0 || selectedCategories.includes(post.categorySlug);
		return searchMatch && categoryMatch;
	});

	/**
	 * EN: Handles the click event from a NodeCard component and navigates to the corresponding post page.
	 * IT: Gestisce l'evento di click da un componente NodeCard e naviga alla pagina del post corrispondente.
	 */
	function handleCardClick(event: CustomEvent<{ post: Post }>) {
		const { post } = event.detail;
		if (!lang) return;
		goto(`${base}/${lang}/${post.categorySlug}/${post.slug}.html`);
	}

	/**
	 * EN: Handles the click event from the ContentIndex, scrolls to the selected post, and applies a highlight animation.
	 * IT: Gestisce l'evento di click dal ContentIndex, scorre fino al post selezionato e applica un'animazione di evidenziazione.
	 */
	function handleIndexClick(event: CustomEvent<string>) {
		const slug = event.detail;
		const cardElement = gridWrapperElement?.querySelector(`[data-slug="${slug}"]`);
		if (cardElement) {
			cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
			gsap.fromTo(
				cardElement,
				{
					boxShadow: '0 0 25px rgba(251, 191, 36, 0.7)',
					outline: '2px solid rgba(251, 191, 36, 0.8)'
				},
				{
					boxShadow: '0 0 0px rgba(251, 191, 36, 0)',
					outline: '0px solid rgba(251, 191, 36, 0)',
					duration: 1.5,
					ease: 'power2.out'
				}
			);
		}
	}

	// EN: onMount runs client-side after the component is rendered.
	// IT: onMount viene eseguito lato client dopo che il componente è stato renderizzato.
	onMount(() => {
		// EN: Fade in the grid wrapper for a smooth entrance.
		// IT: Applica un fade-in al contenitore della griglia per un ingresso morbido.
		if (gridWrapperElement) {
			gsap.set(gridWrapperElement, { opacity: 1 });
		}
		if (!mapButtonElement) return;
		const shineElement = mapButtonElement.querySelector('.shine-effect');
		if (!shineElement) return;
		// EN: Set up a GSAP timeline for the button's hover effect.
		// IT: Imposta una timeline GSAP per l'effetto hover del pulsante.
		const timeline = gsap.timeline({ paused: true });
		timeline.fromTo(shineElement, { x: '-110%' }, { x: '110%', duration: 0.5, ease: 'power1.in' });
		mapButtonElement.addEventListener('mouseenter', () => timeline.restart());
	});
</script>

<SEO
	title="Home"
	description="Core Foundation Guide: un manuale interattivo e una guida di riferimento per i concetti fondamentali dell'intelligenza artificiale."
/>

<!-- English: Button to toggle the visibility of the ContentIndex. -->
<!-- Italiano: Pulsante per mostrare/nascondere il ContentIndex. -->
<div class="pt-8 text-center">
	<button
		bind:this={mapButtonElement}
		on:click={() => (isIndexOpen = !isIndexOpen)}
		class="relative inline-flex items-center gap-3 overflow-hidden rounded-lg border-2
           border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold text-slate-300
           transition-colors hover:border-amber-400 hover:text-white"
	>
		<!-- EN: This span creates the animated shine effect on hover. -->
		<!-- IT: Questo span crea l'effetto "shine" animato al passaggio del mouse. -->
		<span
			class="shine-effect absolute inset-0 -skew-x-[15deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
		></span>
		<span class="relative inline-flex items-center gap-3">
			{#if isIndexOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
				>
				<span>{t.hideMap}</span>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line
						x1="8"
						x2="8"
						y1="2"
						y2="18"
					/><line x1="16" x2="16" y1="6" y2="22" /></svg
				>
				<span>{t.showMap}</span>
			{/if}
		</span>
	</button>
</div>

<!-- English: The ContentIndex component, which is conditionally rendered based on 'isIndexOpen'. -->
<!-- Italiano: Il componente ContentIndex, che viene renderizzato condizionalmente in base a 'isIndexOpen'. -->
{#if isIndexOpen}
	<div class="pt-8" transition:slide={{ duration: 400, easing: quintOut }}>
		<ContentIndex {postIndex} on:indexclick={handleIndexClick} />
	</div>
{/if}

<!-- English: Search and filter controls section. -->
<!-- Italiano: Sezione dei controlli di ricerca e filtro. -->
<section class="px-4 pt-8 text-center md:mb-6">
	<div class="mx-auto max-w-lg">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder={t.searchPlaceholder}
			class="w-full rounded-lg border-2 border-slate-700 bg-slate-900/50 px-4 py-2 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
		/>
	</div>
	<div class="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
		{#each categories as category}
			<!-- EN: The 'has[:checked]' selector is a Tailwind CSS feature for styling a parent based on a child's state. -->
			<!-- IT: Il selettore 'has[:checked]' è una feature di Tailwind CSS per stilizzare un genitore in base allo stato di un figlio. -->
			<label
				class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-transparent p-2 transition-all hover:bg-slate-800/50 has[:checked]:border-amber-500 has-[:checked]:bg-amber-900/30 has-[:checked]:shadow-[0_0_15px_theme(colors.amber.500/0.4)]"
			>
				<input
					type="checkbox"
					value={category.slug}
					bind:group={selectedCategories}
					class="h-4 w-4 appearance-none rounded-sm border-2 border-slate-600 bg-slate-700 transition checked:border-transparent checked:bg-amber-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-0"
				/>
				<span class="text-sm font-medium text-slate-300 transition-colors has-[:checked]:text-white">
					{category.name}
				</span>
			</label>
		{/each}
	</div>
</section>

<!-- English: The main grid of posts, displaying the filtered results. -->
<!-- Italiano: La griglia principale dei post, che mostra i risultati filtrati. -->
<div bind:this={gridWrapperElement} class="mx-auto max-w-7xl px-4 pb-12">
	<NodeGrid posts={filteredPosts} on:cardclick={handleCardClick} />
	<!-- EN: Display a message if no posts match the current filters. -->
	<!-- IT: Mostra un messaggio se nessun post corrisponde ai filtri correnti. -->
	{#if filteredPosts.length === 0 && allPosts.length > 0}
		<p class="mt-8 text-center text-slate-500">{t.noPostsFound}</p>
	{/if}
</div>