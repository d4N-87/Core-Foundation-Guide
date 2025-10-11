<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import NodeGrid from '$lib/components/NodeGrid.svelte';
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/server/posts';
	import { type Language, fallbackTranslations } from '$lib/translations';
	import { transitionStore } from '$lib/transitionStore';
	import { gsap } from 'gsap';

	export let data: PageData;

	// 1. Dichiariamo una variabile per mantenere un riferimento al nostro contenitore della griglia
	let gridWrapperElement: HTMLElement;

	const allPosts = data?.posts ?? [];
	const lang = data?.lang as Language | undefined;
	const t = lang && data?.translations ? data.translations[lang] : fallbackTranslations;

	const categories = [...new Set(allPosts.map((p) => p.categorySlug))].map((slug) => ({
		slug,
		name: allPosts.find((p) => p.categorySlug === slug)?.categoryName || slug,
		color: allPosts.find((p) => p.categorySlug === slug)?.categoryColor || 'slate'
	}));

	let searchTerm = '';
	let selectedCategories: string[] = [];

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

	async function handleCardClick(event: CustomEvent<{ post: Post; element: HTMLElement }>) {
		const { post, element } = event.detail;
		if (!lang) return;

		transitionStore.set({
			rect: element.getBoundingClientRect(),
			scrollY: window.scrollY
		});

		// 3. LA CORREZIONE: Ora animiamo la variabile specifica invece di fare una query generica.
		// Questo garantisce che solo il contenitore della griglia venga reso trasparente.
		if (gridWrapperElement) {
			await gsap.to(gridWrapperElement, { opacity: 0, duration: 0.3 }).then();
		}

		goto(`/${lang}/${post.categorySlug}/${post.slug}`);
	}
</script>

<section class="mb-8 px-4 pt-8 text-center md:mb-12 md:px-8">
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
			<label
				class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-transparent p-2 transition-all hover:bg-slate-800/50 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-900/30 has-[:checked]:shadow-[0_0_15px_theme(colors.amber.500/0.4)]"
			>
				<input
					type="checkbox"
					value={category.slug}
					bind:group={selectedCategories}
					class="h-4 w-4 appearance-none rounded-sm border-2 border-slate-600 bg-slate-700 transition checked:border-transparent checked:bg-amber-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-0"
				/>
				<span
					class="text-sm font-medium text-slate-300 transition-colors has-[:checked]:text-white"
				>
					{category.name}
				</span>
			</label>
		{/each}
	</div>
</section>

<!-- 2. Usiamo bind:this per legare l'elemento DOM alla nostra variabile -->
<div bind:this={gridWrapperElement} class="mx-auto max-w-7xl px-4 pb-12">
	<NodeGrid posts={filteredPosts} on:cardclick={handleCardClick} />

	{#if filteredPosts.length === 0 && allPosts.length > 0}
		<p class="mt-8 text-center text-slate-500">{t.noPostsFound}</p>
	{/if}
</div>