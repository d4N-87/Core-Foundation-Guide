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
		listenToArticle: 'Listen to this article',
		playing: 'Playing...',
		paused: 'Paused',
		voice: 'Voice'
	},
	fr: {
		category: 'Catégorie',
		connections: 'Connexions',
		backToHub: "Retour à l'accueil",
		noPostsFound: 'Aucun article trouvé.',
		pageTitleCategory: 'Catégorie',
		initializing: 'Initialisation...',
		backToArticles: 'Retour aux articles',
		sources: 'Sources',
		searchPlaceholder: 'Rechercher des articles...',
		showMap: 'Afficher la carte du contenu',
		hideMap: 'Masquer la carte',
		listenToArticle: 'Écouter cet article',
		playing: 'Lecture en cours...',
		paused: 'En pause',
		voice: 'Voix'
	},
	es: {
		category: 'Categoría',
		connections: 'Conexiones',
		backToHub: 'Volver al inicio',
		noPostsFound: 'No se encontraron artículos.',
		pageTitleCategory: 'Categoría',
		initializing: 'Inicializando...',
		backToArticles: 'Volver a los artículos',
		sources: 'Fuentes',
		searchPlaceholder: 'Buscar artículos...',
		showMap: 'Mostrar mapa de contenido',
		hideMap: 'Ocultar mapa',
		listenToArticle: 'Escuchar este artículo',
		playing: 'Reproduciendo...',
		paused: 'En pausa',
		voice: 'Voz'
	},
	de: {
		category: 'Kategorie',
		connections: 'Verbindungen',
		backToHub: 'Zurück zum Hub',
		noPostsFound: 'Keine Artikel gefunden.',
		pageTitleCategory: 'Kategorie',
		initializing: 'Initialisiere...',
		backToArticles: 'Zurück zu den Artikeln',
		sources: 'Quellen',
		searchPlaceholder: 'Artikel suchen...',
		showMap: 'Inhaltsverzeichnis anzeigen',
		hideMap: 'Verzeichnis ausblenden',
		listenToArticle: 'Diesen Artikel anhören',
		playing: 'Wiedergabe...',
		paused: 'Pausiert',
		voice: 'Stimme'
	},
	// --- NUOVA SEZIONE ---
	pt: {
		category: 'Categoria',
		connections: 'Conexões',
		backToHub: 'Voltar ao início',
		noPostsFound: 'Nenhum artigo encontrado.',
		pageTitleCategory: 'Categoria',
		initializing: 'Inicializando...',
		backToArticles: 'Voltar aos artigos',
		sources: 'Fontes',
		searchPlaceholder: 'Pesquisar artigos...',
		showMap: 'Mostrar mapa de conteúdo',
		hideMap: 'Ocultar mapa',
		listenToArticle: 'Ouvir este artigo',
		playing: 'Reproduzindo...',
		paused: 'Em pausa',
		voice: 'Voz'
	}
};

// Il fallback rimane in inglese, non c'è bisogno di modificarlo
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