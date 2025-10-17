<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths'; // <-- Importiamo 'base'
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		if (data.defaultLang) {
			// Costruiamo il percorso di reindirizzamento COMPLETO e CORRETTO
			const targetPath = `${base}/${data.defaultLang}.html`;
			
			// Eseguiamo il reindirizzamento
			goto(targetPath, { replaceState: true });
		}
	});
</script>

<!-- Messaggio di caricamento che l'utente vede per un istante -->
<div class="min-h-screen w-full flex items-center justify-center">
	<p class="text-white">{data.translations?.it.initializing || 'Initializing...'}</p>
</div>