// src/lib/transitionStore.ts
import { writable } from 'svelte/store';

// English: Defines the data structure for the transition.
//          `rect` holds the element's position and dimensions (from getBoundingClientRect).
// Italiano: Definisce la struttura dei dati per la transizione.
//           `rect` contiene la posizione e le dimensioni dell'elemento (da getBoundingClientRect).
export interface TransitionData {
	rect: DOMRect;
	scrollY: number;
}

// English: A writable Svelte store that temporarily holds an element's position data.
//          It's used to orchestrate a "shared element" transition between pages.
//          A component sets the data before navigation, and the destination component reads it, then clears it.
// Italiano: Uno store Svelte scrivibile che memorizza temporaneamente i dati di posizione di un elemento.
//           Viene usato per orchestrare una transizione "shared element" tra le pagine.
//           Un componente imposta i dati prima della navigazione, e il componente di destinazione li legge, per poi pulirli.
export const transitionStore = writable<TransitionData | null>(null);