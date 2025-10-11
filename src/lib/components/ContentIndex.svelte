<!-- src/lib/components/ContentIndex.svelte -->
<script lang="ts">
	import type { CategoryIndex } from '../../routes/[lang]/+page.server';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	export let postIndex: CategoryIndex[] = [];
	const dispatch = createEventDispatcher();

	let openCategorySlug: string | null = null;

	function toggleCategory(slug: string) {
		openCategorySlug = openCategorySlug === slug ? null : slug;
	}

	// Funzione che gestisce il click e invia l'evento alla pagina genitore
	function handleLinkClick(slug: string) {
		dispatch('indexclick', slug);
	}
</script>

<div class="w-full max-w-7xl mx-auto mb-16 px-4">
	<!-- LAYOUT DESKTOP RIDISEGNATO -->
	<div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each postIndex as category}
			<!-- Contenitore stile "vetro opaco" per ogni categoria -->
			<div class="bg-slate-900/30 border border-cyan-900/50 rounded-xl p-5 backdrop-blur-sm">
				<h3 class="text-lg font-bold text-amber-400 border-b-2 border-amber-800/50 pb-2 mb-4">
					{category.categoryName}
				</h3>
				<ul class="space-y-2.5">
					{#each category.posts as post}
						<li>
							<!-- Usiamo on:click per chiamare la nostra funzione -->
							<a
								href={`#${post.slug}`}
								on:click|preventDefault={() => handleLinkClick(post.slug)}
								class="group flex items-center text-slate-300 hover:text-white transition-colors"
							>
								<!-- Dettaglio grafico "tech" -->
								<span
									class="w-3 h-px bg-slate-600 mr-3 transition-colors group-hover:bg-amber-400"
								></span>
								<span>{post.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- LAYOUT MOBILE (invariato ma con la nuova logica di click) -->
	<div class="md:hidden space-y-3">
		{#each postIndex as category}
			<div class="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
				<button
					on:click={() => toggleCategory(category.categorySlug)}
					class="w-full text-left p-4 flex justify-between items-center"
				>
					<span class="font-bold text-amber-400">{category.categoryName}</span>
					<svg
						class="w-5 h-5 text-slate-400 transition-transform duration-300 {openCategorySlug ===
						category.categorySlug
							? 'rotate-180'
							: ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if openCategorySlug === category.categorySlug}
					<div
						class="px-4 pb-4 border-t border-slate-800"
						transition:slide={{ duration: 300, easing: quintOut }}
					>
						<ul class="space-y-2 mt-3">
							{#each category.posts as post}
								<li>
									<a
										href={`#${post.slug}`}
										on:click|preventDefault={() => handleLinkClick(post.slug)}
										class="text-slate-300 hover:text-white transition-colors block py-1"
									>
										{post.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>