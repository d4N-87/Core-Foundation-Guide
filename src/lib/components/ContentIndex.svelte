<!-- src/lib/components/ContentIndex.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type { CategoryIndex } from '../../routes/[lang]/+page.server';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	export let postIndex: CategoryIndex[] = [];
	const dispatch = createEventDispatcher();

	let openCategorySlug: string | null = null;
	let categoryPanels: HTMLElement[] = [];

	function toggleCategory(slug: string) {
		openCategorySlug = openCategorySlug === slug ? null : slug;
	}

	function handleLinkClick(slug: string) {
		dispatch('indexclick', slug);
	}

	onMount(() => {
		categoryPanels.forEach((panel) => {
			if (!panel) return;

			const rect = panel.querySelector<SVGRectElement>('.glow-rect');
			if (!rect) return;

			const length = rect.getTotalLength();
			const impulseLength = length * 0.25;

			// LA LOGICA DI ANIMAZIONE DEFINITIVA E CORRETTA
			// 1. Definiamo il pattern: un impulso visibile e un buco invisibile.
			gsap.set(rect, {
				strokeDasharray: `${impulseLength} ${length - impulseLength}`,
				opacity: 0
			});

			// 2. Creiamo un'animazione 'from' che si ripete all'infinito.
			// Anima lo strokeDashoffset da 'length' a '0'.
			const animation = gsap.from(rect, {
				strokeDashoffset: length,
				duration: 2.5,
				ease: 'none',
				repeat: -1
			});

			// 3. Controlliamo solo l'opacità con gli eventi del mouse.
			panel.addEventListener('mouseenter', () => {
				gsap.to(rect, { opacity: 1, duration: 0.3 });
			});
			panel.addEventListener('mouseleave', () => {
				gsap.to(rect, { opacity: 0, duration: 0.3 });
			});
		});
	});
</script>

<div class="w-full max-w-7xl mx-auto mb-16 px-4">
	<div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each postIndex as category, i}
			<div
				bind:this={categoryPanels[i]}
				class="relative rounded-xl border border-cyan-900/50
                       bg-gradient-to-br from-cyan-950/20 to-slate-950/10
                       backdrop-blur-lg p-5"
			>
				<svg
					class="glow-svg absolute inset-0 w-full h-full pointer-events-none"
					width="100%"
					height="100%"
					fill="none"
				>
					<defs>
						<filter id="glow-filter">
							<feGaussianBlur stdDeviation="1" result="coloredBlur" />
						</filter>
						<linearGradient id="impulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FEF08A" />
							<stop offset="100%" stop-color="#FBBF24" stop-opacity="0" />
						</linearGradient>
					</defs>
					<rect
						class="glow-rect"
						x="1"
						y="1"
						width="calc(100% - 2px)"
						height="calc(100% - 2px)"
						rx="11"
						stroke="url(#impulse-gradient)"
						stroke-width="0.8"
						filter="url(#glow-filter)"
					/>
				</svg>

				<h3 class="text-lg font-bold text-amber-400 border-b-2 border-amber-800/50 pb-2 mb-4">
					{category.categoryName}
				</h3>
				<ul class="space-y-2">
					{#each category.posts as post}
						<li class="relative group/item">
							<a
								href={`#${post.slug}`}
								on:click|preventDefault={() => handleLinkClick(post.slug)}
								class="flex items-center text-slate-300 hover:text-white transition-colors
                                       pl-6 
                                       before:content-['└─'] before:absolute before:left-0 before:top-0
                                       before:text-cyan-700 before:transition-colors
                                       group-hover/item:before:text-amber-400"
							>
								<span>{post.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- Layout mobile corretto -->
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
						<ul class="space-y-2 mt-4">
							{#each category.posts as post}
								<li class="relative group">
									<a
										href={`#${post.slug}`}
										on:click|preventDefault={() => handleLinkClick(post.slug)}
										class="block py-1 text-slate-300 hover:text-white transition-colors
                               pl-6
                               before:content-['└─'] before:absolute before:left-0 before:top-1
                               before:text-cyan-700 before:transition-colors
                               group-hover:before:text-amber-400"
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