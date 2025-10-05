<!-- src/lib/components/NodeCard.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	// L'import di GSAP è stato RIMOSSO da qui
	import { translations } from '$lib/translations';
	import type { Post } from '$lib/server/posts';

	export let lang: string;
	export let category: string = '';
	export let slug: string | undefined;
	export let title: string;
	export let excerpt: string | undefined;

	let cardElement: HTMLDivElement;

	onMount(async () => {
		// Importazione DINAMICA: avviene solo nel browser
		const { gsap } = await import('gsap');

		// Il resto del codice è identico, ma ora 'gsap' esiste solo qui dentro
		gsap.to(cardElement, {
			y: -8,
			duration: 2.5 + Math.random() * 2,
			ease: 'sine.inOut',
			repeat: -1,
			yoyo: true,
			delay: Math.random() * 2
		});
	});

	function formatCategory(cat: string): string {
		if (!cat) return '';
		return cat
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	const t = translations[lang as keyof typeof translations] || translations.it;
</script>

<div
	bind:this={cardElement}
	id="node-{slug}"
	class="group relative bg-slate-900/60 border border-slate-700/80 backdrop-blur-sm rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_theme(colors.cyan.400/0.4)]"
>
	<!-- Il resto del template rimane invariato -->
	<div
		class="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
	></div>
	<div
		class="absolute -top-px -right-px w-4 h-4 border-t border-r border-cyan-400 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
	></div>
	<div
		class="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-cyan-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
	></div>
	<div
		class="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
	></div>

	<div class="flex-grow">
		<a href={`/${lang}/${category}/${slug}`}>
			<h3
				class="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300"
			>
				{title}
			</h3>
		</a>

		{#if excerpt}
			<p class="mt-3 text-sm text-slate-400 leading-relaxed">
				{@html excerpt}
			</p>
		{/if}
	</div>

	<div class="mt-4 pt-4 border-t border-slate-700/50">
		<div class="text-sm text-slate-400">
			{t.category}:
			<a
				href={`/${lang}/${category}`}
				class="text-amber-400 underline hover:text-cyan-400 transition-colors"
			>
				{formatCategory(category)}
			</a>
		</div>
	</div>
</div>