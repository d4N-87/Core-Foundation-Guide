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
		// NUOVE CHIAVI
		showMap: 'Mostra Mappa Contenuti',
		hideMap: 'Nascondi Mappa'
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
		// NUOVE CHIAVI
		showMap: 'Show Content Map',
		hideMap: 'Hide Map'
	}
};

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
	// NUOVE CHIAVI
	showMap: 'Show Content Map',
	hideMap: 'Hide Map'
};