// English: Extends the global Window interface to inform TypeScript about the `p5` property,
//          which is added when the p5.js script is loaded.
// Italiano: Estende l'interfaccia globale Window per informare TypeScript della proprietà `p5`,
//           che viene aggiunta quando lo script p5.js è caricato.
declare global {
	interface Window {
		p5: any;
	}
}

/**
 * English: Dynamically loads the p5.js library from the local vendor directory.
 *          This ensures it's only loaded on the client-side and when needed,
 *          improving initial page load performance.
 * Italiano: Carica dinamicamente la libreria p5.js dalla cartella vendor locale.
 *           Questo assicura che venga caricata solo sul lato client e quando necessario,
 *           migliorando le prestazioni di caricamento iniziale della pagina.
 * @returns A promise that resolves to the global p5 instance.
 */
export async function loadP5() {
	// English: Import the library from a local file to avoid relying on external CDNs.
	// Italiano: Importa la libreria da un file locale per evitare di dipendere da CDN esterni.
	const module = await import('$lib/vendor/p5.min.js');

	// English: Returns the p5 instance. It checks for `module.default` first
	//          and falls back to the global `window.p5` for compatibility.
	// Italiano: Restituisce l'istanza di p5. Controlla prima `module.default`
	//           e utilizza come fallback `window.p5` per compatibilità.
	return module.default || window.p5;
}