<!-- src/lib/components/NodeGrid.svelte -->
<script lang="ts">
	import { onMount, createEventDispatcher, tick } from 'svelte';
	import NodeCard from '$lib/components/NodeCard.svelte';
	import type { Post } from '$lib/server/posts';
	import type { gsap as GSAP } from 'gsap';
	import { fly } from 'svelte/transition';

	// English: The array of post objects to display in the grid.
	// Italiano: L'array di oggetti post da visualizzare nella griglia.
	export let posts: Post[] = [];

	type AnimateGridParams = { posts: Post[]; gsap: typeof GSAP | undefined };

	// English: Used to dispatch events to the parent component.
	// Italiano: Utilizzato per inviare eventi al componente genitore.
	const dispatch = createEventDispatcher();
	// English: GSAP instance, dynamically imported in onMount for performance.
	// Italiano: Istanza di GSAP, importata dinamicamente in onMount per ottimizzare le prestazioni.
	let gsap: typeof GSAP | undefined = undefined;

	// English: Dispatches a 'cardclick' event with post data when a card is clicked.
	// Italiano: Invia un evento 'cardclick' con i dati del post quando una card viene cliccata.
	function handleCardClick(event: MouseEvent | KeyboardEvent, post: Post) {
		dispatch('cardclick', {
			post: post,
			element: event.currentTarget
		});
	}

	// English: A Svelte Action that orchestrates all GSAP animations for the grid.
	// Italiano: Una Svelte Action che orchestra tutte le animazioni GSAP per la griglia.
	function animateGrid(node: HTMLElement, params: AnimateGridParams) {
		let ctx: gsap.Context;
		async function init() {
			if (!params.gsap) return;
			// English: Wait for the DOM to be updated before selecting the cards, crucial for reactivity.
			// Italiano: Attende che il DOM sia aggiornato prima di selezionare le card, cruciale per la reattività.
			await tick();
			if (ctx) ctx.revert();
			const cards = params.gsap.utils.toArray<HTMLElement>('.card-container');
			if (cards.length === 0) return;
			ctx = params.gsap.context(() => {
				// English: Creates a continuous, subtle floating animation for the cards.
				// Italiano: Crea un'animazione di fluttuazione continua e leggera per le card.
				function createFloatingAnimation() {
					params.gsap!.to(cards, {
						y: (i) => params.gsap!.utils.random(-8, 8),
						duration: (i) => params.gsap!.utils.random(3, 5),
						repeat: -1, yoyo: true, ease: 'sine.inOut',
						delay: (i) => params.gsap!.utils.random(0, 4)
					});
				}
				// English: Pre-builds a paused timeline for each card to handle hover color changes efficiently.
				// Italiano: Pre-costruisce una timeline in pausa per ogni card per gestire in modo efficiente i cambi di colore all'hover.
				cards.forEach((card: any) => {
					card.colorTimeline = params.gsap!.timeline({ paused: true })
						.to(card.querySelectorAll('.card-border, .card-divider'), { borderColor: '#FBBF24' }, 0)
						.to(card.querySelector('.card-title'), { color: '#FBBF24' }, 0)
						.to(card.querySelector('.card-category-text'), { color: '#F59E0B' }, 0)
						.to(card.querySelector('.card-category-dot'), { backgroundColor: '#F59E0B' }, 0);
				});
				createFloatingAnimation();
				// English: Pause floating animation on mouse enter for a more direct interaction.
				// Italiano: Mette in pausa l'animazione di fluttuazione al mouse enter per un'interazione più diretta.
				node.addEventListener('mouseenter', () => params.gsap!.killTweensOf(cards, 'y'));
				// English: Handles the magnetic/repulsive interaction between the mouse and the cards.
				// Italiano: Gestisce l'interazione magnetica/repulsiva tra il mouse e le card.
				node.addEventListener('mousemove', (e: MouseEvent) => {
					const { left: gridX, top: gridY } = node.getBoundingClientRect();
					const mouseX = e.clientX - gridX;
					const mouseY = e.clientY - gridY;
					let activeCard: HTMLElement | null = null;
					for (const card of cards) {
						const { left, top, width, height } = card.getBoundingClientRect();
						const cardLeft = left - gridX;
						const cardTop = top - gridY;
						if (mouseX >= cardLeft && mouseX <= cardLeft + width && mouseY >= cardTop && mouseY <= cardTop + height) {
							activeCard = card;
							break;
						}
					}
					cards.forEach((card: any) => {
						// English: The card directly under the mouse is highlighted and lifted.
						// Italiano: La card direttamente sotto il mouse viene evidenziata e sollevata.
						if (card === activeCard) {
							params.gsap!.to(card, { x: 0, y: -10, scale: 1.1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
							if (card.colorTimeline) card.colorTimeline.play();
						} else {
							// English: Other cards are pushed away from the mouse cursor.
							// Italiano: Le altre card vengono allontanate dal cursore del mouse.
							const { left, top, width, height } = card.getBoundingClientRect();
							const cardX = left - gridX + width / 2;
							const cardY = top - gridY + height / 2;
							const distance = Math.hypot(mouseX - cardX, mouseY - cardY);
							let targetX = 0, targetY = 0;
							if (distance < width * 4) {
								const angle = Math.atan2(mouseY - cardY, mouseX - cardX);
								const move = -400 / distance;
								targetX = Math.cos(angle) * move;
								targetY = Math.sin(angle) * move;
							}
							params.gsap!.to(card, { x: targetX, y: targetY, scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
							if (card.colorTimeline) card.colorTimeline.reverse();
						}
					});
				});
				// English: Resets all cards to their initial state and restarts the floating animation.
				// Italiano: Reimposta tutte le card al loro stato iniziale e riavvia l'animazione di fluttuazione.
				node.addEventListener('mouseleave', () => {
					params.gsap!.to(cards, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.75)', onComplete: createFloatingAnimation });
					cards.forEach((card: any) => { if (card.colorTimeline) card.colorTimeline.reverse(); });
				});
			}, node);
		}
		init();
		return {
			update(newParams: AnimateGridParams) { params = newParams; init(); },
			destroy() { if (ctx) ctx.revert(); }
		};
	}
	// English: Dynamically import GSAP on the client-side to reduce initial bundle size.
	// Italiano: Importa dinamicamente GSAP sul lato client per ridurre la dimensione del bundle iniziale.
	onMount(async () => {
		const mod = await import('gsap');
		gsap = mod.gsap;
	});
</script>

<div
	class="isolate grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
	use:animateGrid={{ posts, gsap }}
>
	<!-- English: Keyed each block for efficient DOM updates when the posts array changes. -->
	<!-- Italiano: Blocco 'each' con chiave per aggiornamenti efficienti del DOM quando l'array di post cambia. -->
	{#each posts as post (post.slug)}
		<div
			data-slug={post.slug}
			class="card-container aspect-square cursor-pointer"
			role="button"
			tabindex="0"
			on:click={(e) => handleCardClick(e, post)}
			on:keydown={(e) => { if (e.key === 'Enter') handleCardClick(e, post); }}
			in:fly={{ y: 20, duration: 300, delay: 100 }}
			out:fly={{ y: 20, duration: 200 }}
		>
			<NodeCard categoryName={post.categoryName} title={post.title} excerpt={post.excerpt} />
		</div>
	{/each}
</div>