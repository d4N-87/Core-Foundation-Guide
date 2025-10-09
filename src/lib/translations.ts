// src/lib/translations.ts

// 🔹 1. Definiamo un tipo che può essere solo 'it' o 'en'
export type Language = keyof typeof translations;

export const translations = {
  it: {
    category: "Categoria",
    connections: "Collegamenti",
    backToHub: "Torna all'Hub",
    noPostsFound: "Nessun articolo trovato.",
    pageTitleCategory: "Categoria",
    initializing: "Inizializzazione...",
  },
  en: {
    category: "Category",
    connections: "Connections",
    backToHub: "Back to Hub",
    noPostsFound: "No articles found.",
    pageTitleCategory: "Category",
    initializing: "Initializing...",
  }
};