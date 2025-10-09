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
    backToArticles: "Torna agli articoli", // 🔹 AGGIUNTO
    sources: "Fonti", // 🔹 AGGIUNTO
  },
  en: {
    category: "Category",
    connections: "Connections",
    backToHub: "Back to Hub",
    noPostsFound: "No articles found.",
    pageTitleCategory: "Category",
    initializing: "Initializing...",
    backToArticles: "Back to articles", // 🔹 AGGIUNTO
    sources: "Sources", // 🔹 AGGIUNTO
  }
};

export const fallbackTranslations: TranslationSet = {
  category: "Category",
  connections: "Connections",
  backToHub: "Back to Hub",
  noPostsFound: "No articles found.",
  pageTitleCategory: "Category",
  initializing: "Initializing...",
  backToArticles: "Back to articles", // 🔹 AGGIUNTO
  sources: "Sources", // 🔹 AGGIUNTO
};