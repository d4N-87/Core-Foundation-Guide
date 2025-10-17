<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
	// EN: Import Svelte lifecycle functions for managing side effects.
	// IT: Importa le funzioni del ciclo di vita di Svelte per la gestione degli effetti collaterali.
	import { onMount, onDestroy } from 'svelte';
	// EN: Import the 'page' store to access routing information like the current path and params.
	// IT: Importa lo store 'page' per accedere a informazioni di routing come il percorso e i parametri correnti.
	import { page } from '$app/stores';
	// EN: Import the translations object to dynamically build the list of available languages.
	// IT: Importa l'oggetto delle traduzioni per costruire dinamicamente l'elenco delle lingue disponibili.
	import { translations } from '$lib/translations';
	// EN: Import a Svelte transition and easing function for the dropdown animation.
	// IT: Importa una transizione e una funzione di easing di Svelte per l'animazione del menu a tendina.
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// EN: Import 'browser' to check if the code is running in the browser, preventing server-side errors.
	// IT: Importa 'browser' per verificare se il codice è in esecuzione nel browser, prevenendo errori lato server.
	import { browser } from '$app/environment';
	// EN: Import 'base' to correctly handle the base path when deployed to a subdirectory (like on GitHub Pages).
	// IT: Importa 'base' per gestire correttamente il percorso di base quando il sito è deployato in una sottodirectory (come su GitHub Pages).
	import { base } from '$app/paths';

	// EN: A map of language codes to their full, human-readable names.
	// IT: Una mappa dei codici lingua ai loro nomi completi e leggibili.
	const languageNames: Record<string, string> = {
		it: 'Italiano',
		en: 'English',
		fr: 'Français',
		es: 'Español',
		de: 'Deutsch',
		pt: 'Português'
	};

	// EN: Creates an array of available languages based on the keys of the 'translations' object.
	// IT: Crea un array delle lingue disponibili basandosi sulle chiavi dell'oggetto 'translations'.
	const availableLanguages = Object.keys(translations).map((code) => ({
		code,
		name: languageNames[code] || code.toUpperCase()
	}));

	// EN: Reactive state variable to control the visibility of the dropdown menu.
	// IT: Variabile di stato reattiva per controllare la visibilità del menu a tendina.
	let isOpen = false;
	// EN: A reference to the component's root element, used to detect outside clicks.
	// IT: Un riferimento all'elemento radice del componente, usato per rilevare i click esterni.
	let switcherElement: HTMLElement;

	/**
	 * EN: Generates the correct URL for a given language, preserving the current page context (category/slug).
	 * IT: Genera l'URL corretto per una data lingua, preservando il contesto della pagina corrente (categoria/slug).
	 * @param {string} newLang The language code to switch to (e.g., 'en').
	 * @returns {string} The new, fully-formed URL.
	 */
	function getLanguageUrl(newLang: string): string {
		// EN: Get the current path and remove the .html extension for easier parsing.
		// IT: Ottiene il percorso corrente e rimuove l'estensione .html per facilitare l'analisi.
		const currentPath = $page.url.pathname.replace(/\.html$/, '');
		const parts = currentPath.split('/');

		// EN: Path parts might look like ['', 'Core-Foundation-Guide', 'it', 'category', 'slug']. The language is at index 2.
		// IT: Le parti del percorso possono essere ['', 'Core-Foundation-Guide', 'it', 'category', 'slug']. La lingua è all'indice 2.
		if (parts.length > 2) {
			parts[2] = newLang; // EN: Replace the old language code with the new one. / IT: Sostituisce il vecchio codice lingua con quello nuovo.
			// EN: If it's a category or post page, reconstruct the full path with the .html extension.
			// IT: Se è una pagina di categoria o di un post, ricostruisce il percorso completo con l'estensione .html.
			if (parts.length > 3) {
				return parts.join('/') + '.html';
			}
			// EN: If it's just a language index page (e.g., /it), create the new language URL.
			// IT: Se è solo una pagina indice di lingua (es. /it), crea il nuovo URL della lingua.
			return `${base}/${newLang}.html`;
		}
		// EN: Fallback for the root page or unexpected paths.
		// IT: Fallback per la pagina radice o percorsi inattesi.
		return `${base}/${newLang}.html`;
	}

	/**
	 * EN: Closes the dropdown menu if a click occurs outside of the component.
	 * IT: Chiude il menu a tendina se si verifica un click all'esterno del componente.
	 * @param {MouseEvent} event The mouse event.
	 */
	function handleClickOutside(event: MouseEvent) {
		if (switcherElement && !switcherElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// EN: This block ensures the event listeners are only added in the browser environment.
	// IT: Questo blocco assicura che gli event listener vengano aggiunti solo nell'ambiente browser.
	if (browser) {
		onMount(() => {
			// EN: Add the event listener when the component is mounted.
			// IT: Aggiunge l'event listener quando il componente viene montato.
			window.addEventListener('click', handleClickOutside);
		});
		onDestroy(() => {
			// EN: Remove the event listener when the component is destroyed to prevent memory leaks.
			// IT: Rimuove l'event listener quando il componente viene distrutto per prevenire memory leak.
			window.removeEventListener('click', handleClickOutside);
		});
	}
</script>

<!-- English: SVG icon for the language switcher button, defined as a reusable symbol. -->
<!-- Italiano: Icona SVG per il pulsante del selettore di lingua, definita come simbolo riutilizzabile. -->
<svg class="hidden">
	<symbol
		id="icon-globe"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<circle cx="12" cy="12" r="10" />
		<line x1="2" y1="12" x2="22" y2="12" />
		<path
			d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
		/>
	</symbol>
</svg>

<!-- EN: The root element of the component, with its position set to relative for the absolute-positioned dropdown. -->
<!-- IT: L'elemento radice del componente, con posizione relativa per il menu a tendina posizionato in modo assoluto. -->
<div bind:this={switcherElement} class="relative">
	<!-- EN: The button that toggles the dropdown menu. -->
	<!-- IT: Il pulsante che apre e chiude il menu a tendina. -->
	<button
		on:click={() => (isOpen = !isOpen)}
		aria-label="Change language"
		class="text-slate-400 transition-colors hover:text-white"
	>
		<svg class="w-6 h-6"><use href="#icon-globe" /></svg>
	</button>

	<!-- EN: The dropdown menu is rendered only when 'isOpen' is true. -->
	<!-- IT: Il menu a tendina viene renderizzato solo quando 'isOpen' è true. -->
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