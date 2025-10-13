<!-- src/lib/components/SEO.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	// English: Props for the specific page's title and description.
	// Italiano: Prop per il titolo e la descrizione della pagina specifica.
	export let title: string;
	export let description: string;

	// English: The base name of the site, used consistently across all pages.
	// Italiano: Il nome base del sito, usato in modo coerente in tutte le pagine.
	const siteName = 'Core Foundation Guide';

	// English: Reactive statement to construct the full page title.
	// Italiano: Dichiarazione reattiva per costruire il titolo completo della pagina.
	$: fullTitle = `${title} | ${siteName}`;

	// English: Reactive statement to get the full, canonical URL of the current page.
	// Italiano: Dichiarazione reattiva per ottenere l'URL canonico completo della pagina corrente.
	$: currentUrl = $page.url.href;
</script>

<!-- 
  English: `svelte:head` allows us to inject tags directly into the `<head>` of the HTML document.
  Italiano: `svelte:head` ci permette di iniettare tag direttamente nell'`<head>` del documento HTML.
-->
<svelte:head>
	<!-- English: Fundamental SEO Tags -->
	<!-- Italiano: Tag SEO Fondamentali -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- English: Open Graph / Facebook meta tags for rich social media sharing. -->
	<!-- Italiano: Meta tag Open Graph / Facebook per una condivisione ricca sui social media. -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<!-- <meta property="og:image" content="URL_DI_UN_IMMAGINE_PREDEFINITA" /> -->

	<!-- English: Twitter Card meta tags for rich sharing on Twitter. -->
	<!-- Italiano: Meta tag Twitter Card per una condivisione ricca su Twitter. -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<!-- <meta property="twitter:image" content="URL_DI_UN_IMMAGINE_PREDEFINITA" /> -->
</svelte:head>