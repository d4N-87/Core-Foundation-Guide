<!-- src/routes/+page.svelte -->
<script lang="ts">
	// EN: Import the onMount lifecycle function to run code after the component has been rendered in the browser.
	// IT: Importa la funzione del ciclo di vita onMount per eseguire codice dopo che il componente è stato renderizzato nel browser.
	import { onMount } from 'svelte';

	// EN: Import the goto function for programmatic navigation (client-side redirects).
	// IT: Importa la funzione goto per la navigazione programmatica (reindirizzamenti lato client).
	import { goto } from '$app/navigation';

	// EN: Import the 'base' path to ensure redirects work correctly even when deployed in a subfolder.
	// IT: Importa il percorso 'base' per assicurare che i reindirizzamenti funzionino correttamente anche in una sottocartella.
	import { base } from '$app/paths';

	// EN: Import the type definition for the 'data' prop, provided by the corresponding +page.ts file.
	// IT: Importa la definizione del tipo per la prop 'data', fornita dal file +page.ts corrispondente.
	import type { PageData } from './$types';

	// EN: The 'data' prop receives data from the load function in +page.ts.
	// IT: La prop 'data' riceve i dati dalla funzione di load in +page.ts.
	export let data: PageData;

	// EN: This function runs once, client-side, after the component is mounted to the DOM.
	// IT: Questa funzione viene eseguita una volta, lato client, dopo che il componente è stato montato nel DOM.
	onMount(() => {
		// EN: Check if a default language was determined by the server-side load function.
		// IT: Controlla se una lingua predefinita è stata determinata dalla funzione di load lato server.
		if (data.defaultLang) {
			// EN: Construct the full, correct redirect path using the base path and the detected language.
			// IT: Costruisce il percorso di reindirizzamento completo e corretto usando il base path e la lingua rilevata.
			const targetPath = `${base}/${data.defaultLang}.html`;

			// EN: Perform the redirect. `replaceState: true` prevents the redirect from adding an entry to the browser's history,
			//     ensuring the user's back button works as expected.
			// IT: Esegue il reindirizzamento. `replaceState: true` impedisce al redirect di aggiungere una voce alla cronologia del browser,
			//     assicurando che il pulsante "indietro" dell'utente funzioni come previsto.
			goto(targetPath, { replaceState: true });
		}
	});
</script>

<!-- 
  EN: This is a temporary loading message that the user sees for a brief moment before the client-side redirect occurs.
  IT: Questo è un messaggio di caricamento temporaneo che l'utente vede per un breve istante prima che avvenga il reindirizzamento lato client.
-->
<div class="min-h-screen w-full flex items-center justify-center">
	<p class="text-white">{data.translations?.it.initializing || 'Initializing...'}</p>
</div>