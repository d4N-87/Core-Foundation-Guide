<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { Language } from '$lib/translations';

	// English: Data is passed from the root server layout (`+layout.server.ts`).
	// Italiano: I dati vengono passati dal layout server radice (`+layout.server.ts`).
	export let data: PageData;

	const defaultLang = data.defaultLang as Language;
	const { translations } = data;

	// English: Select the appropriate translation object with a fallback to Italian.
	// Italiano: Seleziona l'oggetto di traduzione appropriato con un fallback all'italiano.
	const t = translations[defaultLang] || translations.it;

	onMount(() => {
		// English: Immediately redirect the user to the localized homepage (e.g., '/en').
		//          `replaceState: true` prevents this redirect page from being in the browser history.
		// Italiano: Reindirizza immediatamente l'utente alla homepage localizzata (es. '/en').
		//           `replaceState: true` impedisce che questa pagina di reindirizzamento finisca nella cronologia del browser.
		goto(`/${defaultLang}`, { replaceState: true });
	});
</script>

<!-- 
  English: This content is a fallback, typically visible only for a fraction of a second while the client-side redirect occurs.
  Italiano: Questo contenuto è un fallback, visibile tipicamente solo per una frazione di secondo mentre avviene il reindirizzamento lato client.
-->
<div class="min-h-screen w-full flex items-center justify-center">
	<p class="text-white">{t.initializing || 'Initializing...'}</p>
</div>