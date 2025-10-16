<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/translations';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { base } from '$app/paths'; // <-- Importa 'base'

	const languageNames: Record<string, string> = {
		it: 'Italiano',
		en: 'English',
		fr: 'Français',
		es: 'Español',
		de: 'Deutsch',
		pt: 'Português'
	};

	const availableLanguages = Object.keys(translations).map((code) => ({
		code,
		name: languageNames[code] || code.toUpperCase()
	}));

	let isOpen = false;
	let switcherElement: HTMLElement;

	// ▼▼▼ FUNZIONE 'getLanguageUrl' CORRETTA E ROBUSTA ▼▼▼
	function getLanguageUrl(newLang: string): string {
		const currentPath = $page.url.pathname.replace(/\.html$/, '');
		const parts = currentPath.split('/');

		// L'array è ['', 'Core-Foundation-Guide', 'it', 'category', 'slug']
		// L'indice [2] è la lingua.
		if (parts.length > 2) {
			parts[2] = newLang;
			// Se siamo in una pagina di post o categoria, ricostruisci il link .html
			if (parts.length > 3) {
				return parts.join('/') + '.html';
			}
			// Se siamo in una pagina di lingua (es. /it), il link sarà /en.html
			return `${base}/${newLang}.html`;
		}
		// Fallback per la root
		return `${base}/${newLang}.html`;
	}

	function handleClickOutside(event: MouseEvent) {
		if (switcherElement && !switcherElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

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