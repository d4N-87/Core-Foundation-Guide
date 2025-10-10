// src/lib/translations.ts

export type Language = keyof typeof translations;
export type TranslationSet = typeof translations.it;

export const translations = {
  it: {
    category: "Categoria",
    connections: "Collegamenti",
    backToHub: "Torna all'Hub",
    noPostsFound: "Nessun articolo trovato.",
    pageTitleCategory: "Categoria",
    initializing: "Inizializzazione...",
    backToArticles: "Torna agli articoli",
    sources: "Fonti",
    searchPlaceholder: "Cerca articoli...",
  },
  en: {
    category: "Category",
    connections: "Connections",
    backToHub: "Back to Hub",
    noPostsFound: "No articles found.",
    pageTitleCategory: "Category",
    initializing: "Initializing...",
    backToArticles: "Back to articles",
    sources: "Sources",
    searchPlaceholder: "Search articles...",
  }
};

export const fallbackTranslations: TranslationSet = {
  category: "Category",
  connections: "Connections",
  backToHub: "Back to Hub",
  noPostsFound: "No articles found.",
  pageTitleCategory: "Category",
  initializing: "Initializing...",
  backToArticles: "Back to articles",
  sources: "Sources",
  searchPlaceholder: "Search articles...",
};