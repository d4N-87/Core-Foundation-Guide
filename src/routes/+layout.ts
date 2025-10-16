// src/routes/+layout.server.ts
import { translations } from '$lib/translations';

// English: This is the root server load function for the entire application.
//          Data returned from here is available to all pages and layouts.
// Italiano: Questa è la funzione di load server di radice per l'intera applicazione.
//           I dati restituiti da qui sono disponibili a tutte le pagine e i layout.
export const load = async () => {
	// English: We load the translations object here so it can be accessed by any
	//          child `+page.server.ts` or `+layout.server.ts` file via `await parent()`.
	// Italiano: Carichiamo qui l'oggetto delle traduzioni in modo che sia accessibile
	//           da qualsiasi file figlio `+page.server.ts` o `+layout.server.ts` tramite `await parent()`.
	return {
		translations
	};
};

export const prerender = true;