<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/translations';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';

	// English: A record to map language codes to their full names for display.
	// Italiano: Un record per mappare i codici lingua ai loro nomi completi per la visualizzazione.
	const languageNames: Record<string, string> = {
		it: 'Italiano',
		en: 'English',
		fr: 'Français',
		es: 'Español',
		de: 'Deutsch',
		pt: 'Português'
	};

	// English: Creates an array of available languages from the translations object.
	// Italiano: Crea un array delle lingue disponibili dall'oggetto delle traduzioni.
	const availableLanguages = Object.keys(translations).map((code) => ({
		code,
		name: languageNames[code] || code.toUpperCase()
	}));

	// English: Component's internal state.
	// Italiano: Stato interno del componente.
	let isOpen = false;
	let switcherElement: HTMLElement;

	// English: Constructs the correct URL for the new language, preserving the rest of the path.
	// Italiano: Costruisce l'URL corretto per la nuova lingua, preservando il resto del percorso.
	function getLanguageUrl(newLang: string): string {
		const currentPathname = $page.url.pathname;
		const parts = currentPathname.split('/');
		// English: The language code is expected to be the first part of the path (e.g., /en/...).
		// Italiano: Il codice della lingua è atteso come prima parte del percorso (es. /en/...).
		if (parts.length > 1) {
			parts[1] = newLang;
			return parts.join('/');
		}
		// English: Fallback for the root path.
		// Italiano: Fallback per il percorso radice.
		return `/${newLang}`;
	}

	// English: Closes the dropdown menu if a click is detected outside of the component.
	// Italiano: Chiude il menu a tendina se viene rilevato un click al di fuori del componente.
	function handleClickOutside(event: MouseEvent) {
		if (switcherElement && !switcherElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// English: Add and remove the global click listener only on the client-side.
	// Italiano: Aggiunge e rimuove il listener di click globale solo sul lato client.
	if (browser) {
		onMount(() => {
			window.addEventListener('click', handleClickOutside);
		});

		onDestroy(() => {
			window.removeEventListener('click', handleClickOutside);
		});
	}
</script>

<!-- English: SVG icon for the language switcher button. -->
<!-- Italiano: Icona SVG per il pulsante del selettore di lingua. -->
<svg class="hidden">
	<symbol id="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<circle cx="12" cy="12" r="10" />
		<line x1="2" y1="12" x2="22" y2="12" />
		<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
	</symbol>
</svg>

<div bind:this={switcherElement} class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		aria-label="Change language"
		class="text-slate-400 transition-colors hover:text-white"
	>
		<svg class="w-6 h-6"><use href="#icon-globe" /></svg>
	</button>

	{#if isOpen}
		<div
			class="absolute top-full right-0 mt-3 w-40 origin-top-right rounded-lg border border-cyan-900/50
                   bg-slate-950 p-2 shadow-2xl shadow-black/50"
			transition:fly={{ y: -10, duration: 200, easing: quintOut }}
		>
			<ul class="space-y-1">
				{#each availableLanguages as lang}
					<li>
						<!-- 
              English: `data-sveltekit-reload` forces a full page reload on navigation. 
                       This is necessary to ensure the server-side load functions re-run with the new language.
              Italiano: `data-sveltekit-reload` forza un ricaricamento completo della pagina alla navigazione. 
                        È necessario per assicurare che le funzioni di load lato server vengano rieseguite con la nuova lingua.
            -->
						<a
							href={getLanguageUrl(lang.code)}
							data-sveltekit-reload
							class="block w-full rounded-md px-3 py-1.5 text-left text-sm font-medium transition-colors
                           {$page.params.lang === lang.code
								? 'text-amber-400'
								: 'text-slate-300 hover:bg-slate-800/50 hover:text-white'}"
							on:click={() => (isOpen = false)}
						>
							{lang.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>