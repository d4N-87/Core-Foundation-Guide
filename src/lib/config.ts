// src/lib/config.ts

// Qui associamo un colore di Tailwind a ogni slug di categoria.
// Assicurati che gli slug qui corrispondano ai nomi delle tue cartelle (convertiti in slug).
export const categoryColors: { [key: string]: string } = {
  'advanced-topics': 'cyan',
  'core-concepts': 'amber',
  'fundamentals': 'sky',
  'system-anatomy': 'teal',
  // Aggiungi altre categorie e colori qui
};

// Un colore di default nel caso una categoria non sia nella lista
export const defaultCategoryColor = 'slate';