<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { transitionStore } from '$lib/transitionStore';
	import { gsap } from 'gsap';
	import type { PageData } from './$types';
	import { type Language, fallbackTranslations } from '$lib/translations';
	import SEO from '$lib/components/SEO.svelte';
	import SpeechControl from '$lib/components/SpeechControl.svelte';

	export let data: PageData;

	// English: Destructure data passed from the server-side load function.
	// Italiano: Destruttura i dati passati dalla funzione di load lato server.
	const post = data.post;
	const translations = data.translations;
	const seo = data.seo;
	const textContent = data.textContent;

	const lang = post?.lang as Language;
	// English: Get the correct translation object with a fallback.
	// Italiano: Ottiene l'oggetto di traduzione corretto con un fallback.
	const t = lang && translations ? translations[lang] : fallbackTranslations;

	let articleWrapper: HTMLElement;
	// English: Stores the position of the card clicked on the previous page for the transition.
	// Italiano: Memorizza la posizione della card cliccata nella pagina precedente per la transizione.
	let startRect: DOMRect | null = null;

	onMount(() => {
		// English: Retrieve the starting rectangle from the global store and then clear it.
		// Italiano: Recupera il rettangolo di partenza dallo store globale e poi lo pulisce.
		const transitionData = $transitionStore;
		startRect = transitionData?.rect || null;
		transitionStore.set(null);

		// English: If there's no startRect, it means the user navigated directly to this page. Fade it in.
		// Italiano: Se non c'è startRect, l'utente ha navigato direttamente a questa pagina. Applica un fade-in.
		if (!startRect) {
			gsap.to(articleWrapper, { autoAlpha: 1, duration: 0.3 });
			return;
		}

		// English: This is the core of the "shared element" transition animation.
		// Italiano: Questo è il cuore dell'animazione di transizione "shared element".
		gsap.delayedCall(0.01, () => {
			const endRect = articleWrapper.getBoundingClientRect();
			if (startRect) {
				// English: 1. Instantly move the article container to the exact position and size of the original card.
				// Italiano: 1. Sposta istantaneamente il contenitore dell'articolo alla posizione e dimensione esatta della card originale.
				gsap.set(articleWrapper, {
					position: 'fixed',
					top: startRect.top,
					left: startRect.left,
					width: startRect.width,
					height: startRect.height,
					margin: 0,
					zIndex: 50
				});
				// English: 2. Animate the container from the card's position to its final position in the layout.
				// Italiano: 2. Anima il contenitore dalla posizione della card alla sua posizione finale nel layout.
				gsap.to(articleWrapper, {
					top: endRect.top,
					left: endRect.left,
					width: endRect.width,
					height: endRect.height,
					duration: 0.4,
					ease: 'power3.inOut',
					autoAlpha: 1,
					// English: 3. After animation, reset CSS to allow normal document flow.
					// Italiano: 3. Dopo l'animazione, reimposta il CSS per consentire il normale flusso del documento.
					onComplete: () => {
						gsap.set(articleWrapper, {
							position: 'relative',
							top: 'auto',
							left: 'auto',
							width: '100%',
							height: 'auto',
							overwrite: true
						});
					}
				});
			}
		});
	});

	// English: Handles the reverse animation when navigating back to the articles list.
	// Italiano: Gestisce l'animazione inversa quando si torna all'elenco degli articoli.
	async function goBack() {
		const targetLang = post?.lang || 'it';

		// English: If there's no startRect, just navigate back without animation.
		// Italiano: Se non c'è startRect, torna indietro senza animazione.
		if (!startRect) {
			await goto(`/${targetLang}`);
			return;
		}

		// English: Animate the article container back to the original card's position, then navigate.
		// Italiano: Anima il contenitore dell'articolo fino alla posizione originale della card, poi naviga.
		await gsap
			.to(articleWrapper, {
				top: startRect.top,
				left: startRect.left,
				width: startRect.width,
				height: startRect.height,
				duration: 0.4,
				ease: 'power3.inOut',
				autoAlpha: 0
			})
			.then();

		await goto(`/${targetLang}`);
	}
</script>

<SEO title={seo.title} description={seo.description} />

<div class="flex w-full flex-grow items-center justify-center p-4 md:p-8">
	<div
		bind:this={articleWrapper}
		class="w-full max-w-4xl rounded-xl
           bg-gradient-to-br from-cyan-950/20 to-slate-950/10
           backdrop-blur-lg border-2 border-cyan-500/30
           shadow-2xl shadow-cyan-900/50
           p-6 md:p-10"
		style="visibility: hidden;"
	>
		{#if post}
			<button
				on:click={goBack}
				class="mb-8 block font-semibold text-cyan-400 transition-colors hover:text-amber-400"
			>
				&larr; {t.backToArticles}
			</button>

			<article
				class="prose prose-invert prose-strong:text-amber-400 prose-hr:border-cyan-500/30 prose-ol:text-gray-400 lg:prose-xl"
			>
				<h1>{post.title}</h1>

				{#if textContent}
					<!-- 
            English: The SpeechControl component is placed outside the `prose` styled area for custom styling.
            Italiano: Il componente SpeechControl è posizionato fuori dall'area stilizzata da `prose` per uno stile personalizzato.
          -->
					<div class="not-prose my-8">
						<SpeechControl text={textContent} lang={post.lang} {t} />
					</div>
				{/if}

				<!-- English: Renders the HTML content of the article parsed from Markdown. -->
				<!-- Italiano: Renderizza il contenuto HTML dell'articolo processato dal Markdown. -->
				{@html post.content}

				<!-- English: Displays a list of sources if they are defined in the post's frontmatter. -->
				<!-- Italiano: Mostra un elenco di fonti se sono definite nel frontmatter del post. -->
				{#if post.sources && post.sources.length > 0}
					<hr />
					<h2>{t.sources}</h2>
					<ol>
						{#each post.sources as source}
							<li>
								<a
									href={source.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-cyan-400 transition-colors hover:text-amber-400 hover:underline"
								>
									{source.text}
								</a>
							</li>
						{/each}
					</ol>
				{/if}
			</article>
		{/if}
	</div>
</div>