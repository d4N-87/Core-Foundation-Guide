<!-- src/routes/[lang]/[category]/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import NodeGrid from '$lib/components/NodeGrid.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { Post } from '$lib/posts';
	import { type Language, fallbackTranslations } from '$lib/translations';

	export let data: PageData;

	const posts = data.posts;
	const lang = data.lang as Language;
	const category = data.category;
	const t = (lang && data.translations) ? data.translations[lang] : fallbackTranslations;

	// La navigazione ora è gestita da NodeGrid, ma teniamo la funzione per coerenza
	function handleCardClick(event: CustomEvent<{ post: Post }>) {
		const { post } = event.detail;
		goto(`${base}/${post.lang}/${post.categorySlug}/${post.slug}.html`);
	}
</script>

<SEO title={`${t.pageTitleCategory}: ${category}`} description={`Esplora tutti gli articoli nella categoria ${category}`} />

<div class="text-center pt-12 pb-8">
	<h1 class="text-4xl font-bold tracking-widest uppercase text-white">
		{t.pageTitleCategory}: <span class="text-cyan-400">{category}</span>
	</h1>
</div>

<div class="max-w-7xl mx-auto px-4 pb-12">
	{#if posts.length > 0}
		<NodeGrid {posts} />
	{:else}
		<p class="text-center text-slate-500">{t.noPostsFound}</p>
	{/if}
</div>