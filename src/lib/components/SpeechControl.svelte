<!-- src/lib/components/SpeechControl.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { type TranslationSet } from '$lib/translations';

	// English: Component props.
	// Italiano: Prop del componente.
	export let text: string; // English: The article text to be spoken. / Italiano: Il testo dell'articolo da leggere.
	export let lang: string; // English: The language code for voice filtering. / Italiano: Il codice della lingua per filtrare le voci.
	export let t: TranslationSet; // English: The translation object for UI labels. / Italiano: L'oggetto di traduzione per le etichette dell'interfaccia.

	let synth: SpeechSynthesis;
	let utterance: SpeechSynthesisUtterance;

	// English: Component's internal state.
	// Italiano: Stato interno del componente.
	let isSupported = false; // English: True if the browser supports Web Speech API. / Italiano: True se il browser supporta la Web Speech API.
	let isSpeaking = false; // English: True if audio is currently playing. / Italiano: True se l'audio è in riproduzione.
	let showSettings = false; // English: Toggles the voice selection panel. / Italiano: Controlla la visibilità del pannello di selezione voce.

	let availableVoices: SpeechSynthesisVoice[] = [];
	let selectedVoiceURI: string | null = null;

	// English: Initializes the SpeechSynthesis API if available in the browser.
	// Italiano: Inizializza l'API SpeechSynthesis se disponibile nel browser.
	function initialize() {
		if (!browser || !('speechSynthesis' in window)) return;
		isSupported = true;
		synth = window.speechSynthesis;
	}

	// English: Fetches and filters the list of available voices based on the article's language.
	// Italiano: Recupera e filtra l'elenco delle voci disponibili in base alla lingua dell'articolo.
	function populateVoiceList() {
		const voices = synth.getVoices();
		availableVoices = voices.filter((voice) => voice.lang.startsWith(lang));

		// English: If no voice is selected, try to find a preferred one or default to the first available.
		// Italiano: Se nessuna voce è selezionata, prova a trovarne una preferita o imposta la prima disponibile.
		if (!selectedVoiceURI && availableVoices.length > 0) {
			const keywords = ['natural', 'online', 'google'];
			let preferredVoice = availableVoices.find((v) =>
				keywords.some((k) => v.name.toLowerCase().includes(k))
			);
			selectedVoiceURI = (preferredVoice || availableVoices[0]).voiceURI;
		}
	}

	// English: Creates a new utterance object with the current text and settings.
	// Italiano: Crea un nuovo oggetto "utterance" con il testo e le impostazioni correnti.
	function createUtterance() {
		utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = lang;

		if (selectedVoiceURI) {
			const selectedVoice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
			if (selectedVoice) utterance.voice = selectedVoice;
		}

		utterance.pitch = 1;
		utterance.rate = 1;

		// English: Update the speaking state when the utterance starts or ends.
		// Italiano: Aggiorna lo stato di riproduzione quando la lettura inizia o finisce.
		utterance.onstart = () => {
			isSpeaking = true;
		};
		utterance.onend = () => {
			isSpeaking = false;
		};
	}

	// English: Starts or resumes playback.
	// Italiano: Avvia o riprende la riproduzione.
	function handlePlay() {
		isSpeaking = true; // English: Set state immediately for responsive UI. / Italiano: Imposta lo stato immediatamente per un'interfaccia reattiva.
		synth.cancel(); // English: Cancel any previous speech. / Italiano: Annulla eventuali letture precedenti.
		createUtterance();
		synth.speak(utterance);
	}

	// English: Stops playback.
	// Italiano: Interrompe la riproduzione.
	function handleStop() {
		isSpeaking = false; // English: Set state immediately. / Italiano: Imposta lo stato immediatamente.
		synth.cancel();
	}

	onMount(() => {
		initialize();
		if (isSupported) {
			// English: Voices are often loaded asynchronously, so we listen for this event.
			// Italiano: Le voci sono spesso caricate in modo asincrono, quindi ascoltiamo questo evento.
			synth.onvoiceschanged = populateVoiceList;
			populateVoiceList(); // English: Also call it once in case they are already available. / Italiano: La chiamo anche una volta nel caso siano già disponibili.
		}
	});

	// English: Ensure speech is stopped when the component is unmounted to prevent memory leaks.
	// Italiano: Assicura che la riproduzione venga interrotta quando il componente viene smontato per evitare memory leak.
	onDestroy(() => {
		if (synth) synth.cancel();
	});

	// English: Reactive statement to stop playback if the text prop changes.
	// Italiano: Dichiarazione reattiva per fermare la riproduzione se la prop 'text' cambia.
	$: if (text && browser && isSupported) {
		handleStop();
	}
</script>

<!-- English: SVG icons defined for use in the component's UI. -->
<!-- Italiano: Icone SVG definite per l'uso nell'interfaccia del componente. -->
<svg class="hidden">
	<symbol id="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></symbol>
	<symbol id="icon-stop" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></symbol>
	<symbol id="icon-settings" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</symbol>
</svg>

{#if isSupported}
	<div class="space-y-3 rounded-lg border border-cyan-900/50 bg-slate-900/30 p-4 backdrop-blur-sm">
		<!-- English: Main playback controls. -->
		<!-- Italiano: Controlli di riproduzione principali. -->
		<div class="flex items-center gap-4">
			{#if !isSpeaking}
				<button on:click={handlePlay} aria-label="Play" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-900 transition-transform hover:scale-110"><svg class="h-6 w-6"><use href="#icon-play" /></svg></button>
			{:else}
				<button on:click={handleStop} aria-label="Stop" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-slate-900 transition-transform hover:scale-110"><svg class="h-6 w-6"><use href="#icon-stop" /></svg></button>
			{/if}

			<div class="text-sm font-semibold text-slate-300">
				{#if isSpeaking}
					<span class="text-cyan-400">{t.playing}</span>
				{:else}
					<span>{t.listenToArticle}</span>
				{/if}
			</div>

			<!-- English: Only show the settings button if there is more than one voice to choose from. -->
			<!-- Italiano: Mostra il pulsante delle impostazioni solo se c'è più di una voce tra cui scegliere. -->
			{#if availableVoices.length > 1}
				<button on:click={() => (showSettings = !showSettings)} aria-label="Audio settings" class="ml-auto shrink-0 text-slate-400 transition-colors hover:text-white"><svg class="h-6 w-6"><use href="#icon-settings" /></svg></button>
			{/if}
		</div>

		<!-- English: Settings panel for voice selection. -->
		<!-- Italiano: Pannello delle impostazioni per la selezione della voce. -->
		{#if showSettings && availableVoices.length > 1}
			<div class="space-y-2 border-t border-cyan-900/50 pt-3">
				<div>
					<label for="voice-select" class="mb-1 block text-xs font-medium text-slate-400">{t.voice}</label>
					<select
						id="voice-select"
						bind:value={selectedVoiceURI}
						on:change={handlePlay}
						class="w-full rounded-md border-2 border-slate-700 bg-slate-900/50 px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
					>
						{#each availableVoices as voice}
							<option value={voice.voiceURI}>{voice.name} ({voice.lang})</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}
	</div>
{/if}