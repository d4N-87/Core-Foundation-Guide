// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Language } from '$lib/translations';

// English: This is the server-side load function for the absolute root page (`/`).
//          Its sole purpose is to provide a default language for the initial redirect.
// Italiano: Questa è la funzione di load lato server per la pagina radice assoluta (`/`).
//           Il suo unico scopo è fornire una lingua predefinita per il reindirizzamento iniziale.
export const load: PageServerLoad = async ({ request }) => {
	// English: Sets the default language for the site to Italian ('it').
	//          This value will be used by the corresponding `+page.svelte` to redirect the user.
	// Italiano: Imposta la lingua predefinita del sito su italiano ('it').
	//           Questo valore verrà usato dal `+page.svelte` corrispondente per reindirizzare l'utente.
	const defaultLang: Language = 'it';

	return {
		defaultLang
	};
};