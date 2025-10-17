<!-- src/routes/[lang]/[category]/[slug]/+page.svelte -->
<script lang="ts">
	// EN: Import Svelte's onMount for lifecycle-specific logic (like animations).
	// IT: Importa onMount di Svelte per logiche legate al ciclo di vita (come le animazioni).
	import { onMount } from 'svelte';
	// EN: Import the base path for constructing correct URLs.
	// IT: Importa il percorso di base per costruire URL corretti.
	import { base } from '$app/paths';
	// EN: Import GSAP for animations.
	// IT: Importa GSAP per le animazioni.
	import { gsap } from 'gsap';
	// EN: Import types and components.
	// IT: Importa tipi e componenti.
	import type { PageData } from './$types';
	import { type Language, fallbackTranslations } from '$lib/translations';
	import SEO from '$lib/components/SEO.svelte';
	import SpeechControl from '$lib/components/SpeechControl.svelte';

	// EN: The 'data' prop, populated by the load function in the corresponding +page.ts.
	// IT: La prop 'data', popolata dalla funzione di load nel +page.ts corrispondente.
	export let data: PageData;

	// EN: Extract data from the 'data' prop into local constants for cleaner access in the template.
	// IT: Estrae i dati dalla prop 'data' in costanti locali per un accesso più pulito nel template.
	const post = data.post;
	const translations = data.translations;
	const seo = data.seo;
	const textContent = data.textContent; // EN: Cleaned text for the TTS component. / IT: Testo pulito per il componente TTS.
	const lang = post?.lang as Language;
	const t = lang && translations ? translations[lang] : fallbackTranslations;

	// EN: A reference to the main article container element, used for the GSAP fade-in animation.
	// IT: Un riferimento all'elemento contenitore dell'articolo, usato per l'animazione di fade-in con GSAP.
	let articleWrapper: HTMLElement;

	// EN: After the component is mounted, this function runs to animate the article's appearance.
	// IT: Dopo che il componente è stato montato, questa funzione viene eseguita per animare la comparsa dell'articolo.
	onMount(() => {
		if (articleWrapper) {
			// EN: Animate the opacity and visibility from hidden to visible.
			// IT: Anima l'opacità e la visibilità da nascosto a visibile.
			gsap.to(articleWrapper, { autoAlpha: 1, duration: 0.4 });
		}
	});
</script>

<!-- EN: Sets the page's metadata using the SEO data prepared in the load function. -->
<!-- IT: Imposta i metadati della pagina usando i dati SEO preparati nella funzione di load. -->
<SEO title={seo.title} description={seo.description} />

<div class="flex w-full flex-grow items-center justify-center p-4 md:p-8">
	<!-- 
    EN: This is the main container for the article content. It's bound to the 'articleWrapper' variable
        and is initially hidden (`style="visibility: hidden;"`) to allow for a smooth GSAP fade-in animation.
    IT: Questo è il contenitore principale per il contenuto dell'articolo. È collegato alla variabile 'articleWrapper'
        ed è inizialmente nascosto (`style="visibility: hidden;"`) per permettere una morbida animazione di fade-in con GSAP.
  -->
	<div
		bind:this={articleWrapper}
		class="w-full max-w-4xl rounded-xl bg-gradient-to-br from-cyan-950/20 to-slate-950/10 backdrop-blur-lg border-2 border-cyan-500/30 shadow-2xl shadow-cyan-900/50 p-6 md:p-10"
		style="visibility: hidden;"
	>
		<!-- EN: Only render the content if the 'post' object exists. -->
		<!-- IT: Renderizza il contenuto solo se l'oggetto 'post' esiste. -->
		{#if post}
			<!-- EN: A link to navigate back to the language's main index page. -->
			<!-- IT: Un link per tornare alla pagina indice principale della lingua. -->
			<a
				href="{base}/{post.lang}.html"
				class="mb-8 block font-semibold text-cyan-400 transition-colors hover:text-amber-400"
			>
				&larr; {t.backToArticles}
			</a>

			<!-- 
        EN: The 'prose' classes from Tailwind Typography automatically style the HTML content generated from Markdown.
        IT: Le classi 'prose' di Tailwind Typography applicano uno stile automatico al contenuto HTML generato dal Markdown.
      -->
			<article
				class="prose prose-invert prose-strong:text-amber-400 prose-hr:border-cyan-500/30 prose-ol:text-gray-400 lg:prose-xl"
			>
				<h1>{post.title}</h1>

				<!-- EN: If text content for TTS is available, render the speech control component. -->
				<!-- IT: Se il contenuto testuale per il TTS è disponibile, renderizza il componente di controllo vocale. -->
				{#if textContent}
					<div class="not-prose my-8">
						<SpeechControl text={textContent} lang={post.lang} {t} />
					</div>
				{/if}

				<!-- 
          EN: The `{@html ...}` tag renders the HTML string from 'post.content'. This is safe because the content
              originates from trusted Markdown files within the project.
          IT: Il tag `{@html ...}` renderizza la stringa HTML da 'post.content'. È sicuro perché il contenuto
              proviene da file Markdown fidati all'interno del progetto.
        -->
				{@html post.content}

				<!-- EN: If the post has sources listed in its front matter, display them in an ordered list. -->
				<!-- IT: Se il post ha delle fonti elencate nel suo front matter, le mostra in una lista ordinata. -->
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