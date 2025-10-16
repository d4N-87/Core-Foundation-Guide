<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import logoUrl from '$lib/assets/logo.webp'; // <-- 1. IMPORTIAMO L'IMMAGINE

	const githubUrl = 'https://github.com/TuoNomeUtente/Core-Foundation-Guide';
	const title = 'CORE FOUNDATION GUIDE';
	const titleChars = title.split('');
	const highlightedChars = ['C', 'F', 'G'];
	let headerElement: HTMLElement;

	onMount(() => {
		// English: Initial stagger animation for each character on component mount.
		// Italiano: Animazione iniziale "stagger" per ogni carattere al montaggio del componente.
		const initialAnimation = gsap.from('.char-span', {
			opacity: 0,
			y: 20,
			duration: 0.5,
			ease: 'power3.out',
			stagger: 0.04,
			delay: 0.5
		});

		// English: After the intro animation, apply a subtle pulsing effect to highlighted characters.
		// Italiano: Dopo l'animazione di ingresso, applica un leggero effetto pulsante ai caratteri evidenziati.
		initialAnimation.then(() => {
			const highlightedElements = gsap.utils.toArray<HTMLElement>('.char-highlighted');
			highlightedElements.forEach((char) => {
				gsap.to(char, {
					opacity: 0.8,
					duration: 0.08,
					repeat: -1, // English: Repeat indefinitely / Italiano: Ripeti all'infinito
					yoyo: true, // English: Animate back and forth / Italiano: Anima avanti e indietro
					ease: 'power1.inOut',
					repeatDelay: gsap.utils.random(3, 8) // English: Random delay between pulses / Italiano: Ritardo casuale tra le pulsazioni
				});
			});
		});

		const chars = gsap.utils.toArray<HTMLElement>('.char-span:not(.char-highlighted)');
		const amberColor = '#fbbF24';
		const baseColor = '#e2e8f0';

		// English: Use GSAP context for safe animation cleanup when the component is destroyed.
		// Italiano: Usa il contesto GSAP per una pulizia sicura delle animazioni quando il componente viene distrutto.
		const ctx = gsap.context(() => {
			// English: Add mousemove event to create an interactive glow effect on characters.
			// Italiano: Aggiunge l'evento mousemove per creare un effetto interattivo di luminescenza sui caratteri.
			headerElement.addEventListener('mousemove', (e) => {
				const { left, top } = headerElement.getBoundingClientRect();
				const mouseX = e.clientX - left;
				const mouseY = e.clientY - top;

				chars.forEach((char) => {
					const { left, top, width, height } = char.getBoundingClientRect();
					const charX = left - headerElement.getBoundingClientRect().left + width / 2;
					const charY = top - headerElement.getBoundingClientRect().top + height / 2;
					
					// English: Calculate distance from mouse to character center.
					// Italiano: Calcola la distanza tra il mouse e il centro del carattere.
					const distance = Math.hypot(mouseX - charX, mouseY - charY);
					// English: Map distance to a proximity value (1 = close, 0 = far).
					// Italiano: Mappa la distanza a un valore di prossimità (1 = vicino, 0 = lontano).
					const proximity = gsap.utils.mapRange(0, 100, 1, 0, distance);

					gsap.to(char, {
						textShadow: `0 0 10px rgba(251, 191, 36, ${proximity * 0.8})`,
						color: proximity > 0.5 ? amberColor : baseColor,
						duration: 0.3,
						ease: 'power2.out'
					});
				});
			});

			// English: Reset character styles when the mouse leaves the header area.
			// Italiano: Reimposta gli stili dei caratteri quando il mouse lascia l'area dell'header.
			headerElement.addEventListener('mouseleave', () => {
				gsap.to(chars, {
					textShadow: '0 0 10px rgba(251, 191, 36, 0)',
					color: baseColor,
					duration: 0.4,
					ease: 'power2.out'
				});
			});
		}, headerElement);

		// English: Cleanup function that reverts the GSAP context.
		// Italiano: Funzione di pulizia che ripristina il contesto GSAP.
		return () => ctx.revert();
	});
</script>

<header
	bind:this={headerElement}
	class="fixed left-0 right-0 top-0 z-[60] w-full border-b border-cyan-900/50 bg-black/30 px-4 py-3 backdrop-blur-md md:px-8"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<div class="flex flex-shrink-0 items-center">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Core Foundation Guide GitHub Repository"
				class="transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_theme(colors.amber.400)] focus:scale-110 focus:outline-none"
			>
				<img src={logoUrl} alt="Logo" class="h-10 w-10 md:h-12 md:w-12" />
			</a>

			<!-- 
        English: Responsive title container. 'min-w-0' prevents it from pushing other elements on small screens.
        Italiano: Contenitore del titolo responsivo. 'min-w-0' evita che spinga via altri elementi su schermi piccoli.
      -->
			<div
				class="ml-3 min-w-0 text-xl font-bold tracking-wide text-slate-200 sm:ml-4 sm:text-2xl md:ml-6 md:text-3xl lg:text-4xl"
			>
				<!-- 
          English: Loop through each character to render it in a separate span, allowing for individual animation.
          Italiano: Itera su ogni carattere per renderizzarlo in uno span separato, permettendo l'animazione individuale.
        -->
				{#each titleChars as char}
					{#if char === ' '}
						<span class="char-span">&nbsp;</span>
					{:else}
						<span
							class="char-span inline-block {highlightedChars.includes(char)
								? 'text-amber-400 char-highlighted'
								: ''}"
						>
							{char}
						</span>
					{/if}
				{/each}
			</div>
		</div>

		<LanguageSwitcher />
	</div>
</header>