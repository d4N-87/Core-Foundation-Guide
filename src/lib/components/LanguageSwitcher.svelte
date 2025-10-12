<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { translations } from '$lib/translations';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment'; // 1. Importiamo il flag 'browser'

	const languageNames: Record<string, string> = {
		it: 'Italiano',
		en: 'English'
	};

	const availableLanguages = Object.keys(translations).map((code) => ({
		code,
		name: languageNames[code] || code.toUpperCase()
	}));

	let isOpen = false;
	let switcherElement: HTMLElement;

	function getLanguageUrl(newLang: string): string {
		const currentPathname = $page.url.pathname;
		const parts = currentPathname.split('/');
		parts[1] = newLang;
		return parts.join('/');
	}

	function handleClickOutside(event: MouseEvent) {
		if (switcherElement && !switcherElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// 2. LA CORREZIONE: Eseguiamo questo codice solo nel browser
	if (browser) {
		onMount(() => {
			window.addEventListener('click', handleClickOutside);
		});

		onDestroy(() => {
			window.removeEventListener('click', handleClickOutside);
		});
	}
</script>

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
                   bg-gradient-to-br from-cyan-950/20 to-slate-950/10
                   backdrop-blur-lg p-2 shadow-2xl shadow-black/50"
			transition:fly={{ y: -10, duration: 200, easing: quintOut }}
		>
			<ul class="space-y-1">
				{#each availableLanguages as lang}
					<li>
						<!-- 
              3. CORREZIONE SECONDARIA:
              - Aggiunto 'data-sveltekit-reload' per forzare un ricaricamento completo della pagina.
              Questo è più robusto per il cambio lingua, assicurando che tutti i dati vengano ricaricati.
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