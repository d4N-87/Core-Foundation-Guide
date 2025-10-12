// src/lib/translations.ts

export type Language = keyof typeof translations;
export type TranslationSet = typeof translations.it;

export const translations = {
	it: {
		category: 'Categoria',
		connections: 'Collegamenti',
		backToHub: "Torna all'Hub",
		noPostsFound: 'Nessun articolo trovato.',
		pageTitleCategory: 'Categoria',
		initializing: 'Inizializzazione...',
		backToArticles: 'Torna agli articoli',
		sources: 'Fonti',
		searchPlaceholder: 'Cerca articoli...',
		showMap: 'Mostra Mappa Contenuti',
		hideMap: 'Nascondi Mappa',
		// NUOVE CHIAVI PER IL PLAYER AUDIO
		listenToArticle: 'Ascolta questo articolo',
		playing: 'In riproduzione...',
		paused: 'In pausa',
		voice: 'Voce'
	},
	en: {
		category: 'Category',
		connections: 'Connections',
		backToHub: 'Back to Hub',
		noPostsFound: 'No articles found.',
		pageTitleCategory: 'Category',
		initializing: 'Initializing...',
		backToArticles: 'Back to articles',
		sources: 'Sources',
		searchPlaceholder: 'Search articles...',
		showMap: 'Show Content Map',
		hideMap: 'Hide Map',
		// NUOVE CHIAVI PER IL PLAYER AUDIO
		listenToArticle: 'Listen to this article',
		playing: 'Playing...',
		paused: 'Paused',
		voice: 'Voice'
	}
};

// Aggiungiamo le nuove chiavi anche al fallback
export const fallbackTranslations: TranslationSet = {
	category: 'Category',
	connections: 'Connections',
	backToHub: 'Back to Hub',
	noPostsFound: 'No articles found.',
	pageTitleCategory: 'Category',
	initializing: 'Initializing...',
	backToArticles: 'Back to articles',
	sources: 'Sources',
	searchPlaceholder: 'Search articles...',
	showMap: 'Show Content Map',
	hideMap: 'Hide Map',
	listenToArticle: 'Listen to this article',
	playing: 'Playing...',
	paused: 'Paused',
	voice: 'Voice'
};