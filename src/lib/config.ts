// src/lib/config.ts

// English: This file centralizes project-wide configuration variables for easy management.
// Italiano: Questo file centralizza le variabili di configurazione a livello di progetto per una gestione semplificata.

// English: Associates a color name with each category slug. Ensure the slugs here match your folder names.
// Italiano: Associa un nome di colore a ogni slug di categoria. Assicurati che gli slug qui corrispondano ai nomi delle tue cartelle.
export const categoryColors: { [key: string]: string } = {
	'advanced-topics': 'cyan',
	'core-concepts': 'amber',
	fundamentals: 'sky',
	'system-anatomy': 'teal'
	// English: Add more categories and colors here / Italiano: Aggiungi altre categorie e colori qui
};

// English: A fallback color to use if a category's slug is not found in the map above.
// Italiano: Un colore di fallback da usare se lo slug di una categoria non viene trovato nella mappa soprastante.
export const defaultCategoryColor = 'slate';