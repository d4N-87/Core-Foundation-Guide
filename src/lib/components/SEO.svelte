<!-- src/lib/components/SEO.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;

	// Definiamo un titolo di base per tutto il sito
	const siteName = 'Core Foundation Guide';

	// Costruiamo il titolo completo della pagina: "Titolo Pagina | Nome Sito"
	$: fullTitle = `${title} | ${siteName}`;

	// Prendiamo l'URL completo della pagina corrente per i metadati social
	$: currentUrl = $page.url.href;
</script>

<svelte:head>
	<!-- Tag SEO Fondamentali -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<!-- <meta property="og:image" content="URL_DI_UN_IMMAGINE_PREDEFINITA" /> -->

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<!-- <meta property="twitter:image" content="URL_DI_UN_IMMAGINE_PREDEFINITA" /> -->
</svelte:head>