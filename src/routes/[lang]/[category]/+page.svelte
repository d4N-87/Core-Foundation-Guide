<!-- src/routes/[lang]/[category]/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import NodeGrid from '$lib/components/NodeGrid.svelte';
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/server/posts';
	import { type Language, fallbackTranslations } from '$lib/translations';
	import { transitionStore } from '$lib/transitionStore';
	import { gsap } from 'gsap';

	// English: Data passed from the corresponding `+page.server.ts` file.
	// Italiano: Dati passati dal file `+page.server.ts` corrispondente.
	export let data: PageData;

	const posts = data?.posts ?? [];
	const lang = data?.lang as Language | undefined;
	const category = data?.category;
	// English: Select the appropriate translation object with a fallback.
	// Italiano: Seleziona l'oggetto di traduzione appropriato con un fallback.
	const t = lang && data?.translations ? data.translations[lang] : fallbackTranslations;

	// English: Handles the click event dispatched from the NodeGrid component.
	// Italiano: Gestisce l'evento di click inviato dal componente NodeGrid.
	async function handleCardClick(event: CustomEvent<{ post: Post; element: HTMLElement }>) {
		const { post, element } = event.detail;
		if (!lang) return;

		// English: Store the clicked card's position and dimensions in the global store for the transition animation.
		// Italiano: Memorizza la posizione e le dimensioni della card cliccata nello store globale per l'animazione di transizione.
		transitionStore.set({
			rect: element.getBoundingClientRect(),
			scrollY: window.scrollY
		});

		// English: Animate the grid fading out before navigating to the next page.
		// Italiano: Anima la griglia con un fade-out prima di navigare alla pagina successiva.
		const gridContainer = document.querySelector('.max-w-7xl');
		if (gridContainer) {
			await gsap.to(gridContainer, { opacity: 0, duration: 0.3 }).then();
		}

		// English: Navigate to the selected article's page.
		// Italiano: Naviga alla pagina dell'articolo selezionato.
		goto(`/${lang}/${post.categorySlug}/${post.slug}`);
	}
</script>

<header class="mb-8 md:mb-12 pt-12 text-center">
	<h1 class="text-4xl font-bold tracking-widest uppercase text-white">
		{t.pageTitleCategory}: <span class="text-cyan-400">{category}</span>
	</h1>
	<a href={`/${lang}`} class="text-amber-400 hover:underline mt-4 block">
		{t.backToHub}
	</a>
</header>

<div class="max-w-7xl mx-auto px-4 pb-12">
	{#if posts.length > 0}
		<!-- 
      English: Renders the grid of nodes (cards) with the filtered posts.
               It listens for the `cardclick` event to trigger the navigation.
      Italiano: Renderizza la griglia di nodi (card) con i post filtrati.
                Ascolta l'evento `cardclick` per avviare la navigazione.
    -->
		<NodeGrid {posts} on:cardclick={handleCardClick} />
	{:else}
		<p class="text-center text-slate-500">{t.noPostsFound}</p>
	{/if}
</div>