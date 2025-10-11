<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	const githubUrl = '#';
	const title = 'Core Foundation Guide';
	const titleChars = title.split('');
	const highlightedChars = ['C', 'F', 'G'];

	let headerElement: HTMLElement;

	onMount(() => {
		const initialAnimation = gsap.from('.char-span', {
			opacity: 0,
			y: 20,
			duration: 0.5,
			ease: 'power3.out',
			stagger: 0.04,
			delay: 0.5
		});

		initialAnimation.then(() => {
			const highlightedElements = gsap.utils.toArray<HTMLElement>('.char-highlighted');
			highlightedElements.forEach((char) => {
				gsap.to(char, {
					opacity: 0.8,
					duration: 0.08,
					repeat: -1,
					yoyo: true,
					ease: 'power1.inOut',
					repeatDelay: gsap.utils.random(3, 8)
				});
			});
		});

		const chars = gsap.utils.toArray<HTMLElement>('.char-span:not(.char-highlighted)');
		const amberColor = '#fbbF24';

		const ctx = gsap.context(() => {
			headerElement.addEventListener('mousemove', (e) => {
				const { left, top } = headerElement.getBoundingClientRect();
				const mouseX = e.clientX - left;
				const mouseY = e.clientY - top;

				chars.forEach((char) => {
					const { left, top, width, height } = char.getBoundingClientRect();
					const charX = left - headerElement.getBoundingClientRect().left + width / 2;
					const charY = top - headerElement.getBoundingClientRect().top + height / 2;
					const distance = Math.hypot(mouseX - charX, mouseY - charY);
					const proximity = gsap.utils.mapRange(0, 100, 1, 0, distance);

					gsap.to(char, {
						textShadow: `0 0 10px rgba(251, 191, 36, ${proximity * 0.8})`,
						color: proximity > 0.5 ? amberColor : '#e2e8f0',
						duration: 0.3,
						ease: 'power2.out'
					});
				});
			});

			headerElement.addEventListener('mouseleave', () => {
				gsap.to(chars, {
					textShadow: '0 0 10px rgba(251, 191, 36, 0)',
					color: '#e2e8f0',
					duration: 0.4,
					ease: 'power2.out'
				});
			});
		}, headerElement);

		return () => ctx.revert();
	});
</script>

<header
	bind:this={headerElement}
	class="fixed left-0 right-0 top-0 z-[60] w-full border-b border-cyan-900/50 bg-black/30 px-4 py-3 backdrop-blur-md md:px-8"
>
	<div class="mx-auto flex max-w-7xl items-center justify-center">
		<a
			href={githubUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Core Foundation Guide GitHub Repository"
			class="transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_theme(colors.amber.400)] focus:scale-110 focus:outline-none"
		>
			<img src="/logo.webp" alt="Logo" class="h-12 w-12 md:h-14 md:w-14" />
		</a>

		<div class="ml-5 text-3xl font-bold tracking-wide text-slate-200 md:ml-6 md:text-4xl">
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
				<!-- LA CORREZIONE È QUI: Cambiato '{if}' in '{/if}' -->
				{/if}
			{/each}
		</div>
	</div>
</header>