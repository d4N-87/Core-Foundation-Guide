<!-- src/lib/components/ContentIndex.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type { CategoryIndex } from '../../routes/[lang]/+page.server';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	// English: The main data for the index, structured by category.
	// Italiano: I dati principali per l'indice, strutturati per categoria.
	export let postIndex: CategoryIndex[] = [];
	// English: Dispatches events to the parent component, e.g., for scroll-to-card.
	// Italiano: Invia eventi al componente genitore, es. per lo scroll-alla-card.
	const dispatch = createEventDispatcher();

	// English: Stores the slug of the currently open category in the mobile accordion view.
	// Italiano: Memorizza lo slug della categoria attualmente aperta nella visualizzazione a fisarmonica mobile.
	let openCategorySlug: string | null = null;
	// English: An array to hold the DOM elements of the category panels for GSAP manipulation.
	// Italiano: Un array per contenere gli elementi DOM dei pannelli delle categorie per la manipolazione con GSAP.
	let categoryPanels: HTMLElement[] = [];

	function toggleCategory(slug: string) {
		openCategorySlug = openCategorySlug === slug ? null : slug;
	}

	// English: Dispatches the slug of the clicked post to the parent component.
	// Italiano: Invia lo slug del post cliccato al componente genitore.
	function handleLinkClick(slug: string) {
		dispatch('indexclick', slug);
	}

	// English: On component mount, initialize the animated border effect for visible desktop panels.
	// Italiano: Al montaggio del componente, inizializza l'effetto del bordo animato per i pannelli desktop visibili.
	onMount(() => {
		categoryPanels.forEach((panel) => {
			if (!panel) return;

			// English: This check ensures the animation logic only runs for the desktop grid, not the hidden mobile layout.
			// Italiano: Questo controllo assicura che la logica di animazione venga eseguita solo per la griglia desktop, non per il layout mobile nascosto.
			if (panel.clientWidth > 0) {
				const rect = panel.querySelector<SVGRectElement>('.glow-rect');
				if (!rect) return;

				const length = rect.getTotalLength();
				const impulseLength = length * 0.25;

				// English: Uses the SVG stroke-dasharray/stroke-dashoffset technique to create a moving 'impulse' effect along the border.
				// Italiano: Utilizza la tecnica SVG stroke-dasharray/stroke-dashoffset per creare un effetto 'impulso' in movimento lungo il bordo.
				gsap.set(rect, {
					strokeDasharray: `${impulseLength} ${length}`,
					strokeDashoffset: impulseLength,
					opacity: 0
				});

				gsap.from(rect, {
					strokeDashoffset: length,
					duration: 2.5,
					ease: 'none',
					repeat: -1
				});

				// English: Fade the glowing border in and out on mouse hover.
				// Italiano: Mostra e nasconde il bordo luminescente al passaggio del mouse.
				panel.addEventListener('mouseenter', () => {
					gsap.to(rect, { opacity: 1, duration: 0.3 });
				});
				panel.addEventListener('mouseleave', () => {
					gsap.to(rect, { opacity: 0, duration: 0.3 });
				});
			}
		});
	});
</script>

<div class="w-full max-w-7xl mx-auto mb-16 px-4">
	<!-- English: Desktop layout: a grid of category panels with the animated border effect. -->
	<!-- Italiano: Layout desktop: una griglia di pannelli per categoria con l'effetto di bordo animato. -->
	<div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each postIndex as category, i}
			<div
				bind:this={categoryPanels[i]}
				class="relative rounded-xl border border-cyan-900/50
                       bg-gradient-to-br from-cyan-950/20 to-slate-950/10
                       backdrop-blur-lg p-5"
			>
				<!-- 
          English: SVG container for the animated glowing border effect. It's positioned behind the content.
          Italiano: Contenitore SVG per l'effetto del bordo animato luminescente. È posizionato dietro al contenuto.
        -->
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
							<!-- 
                English: `preventDefault` stops the default anchor jump; `handleLinkClick` dispatches an event for custom smooth scrolling.
                Italiano: `preventDefault` blocca il salto di pagina dell'ancora; `handleLinkClick` invia un evento per uno scroll personalizzato.
              -->
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

	<!-- English: Mobile layout: an accordion that displays one category at a time. -->
	<!-- Italiano: Layout mobile: una fisarmonica che mostra una categoria alla volta. -->
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