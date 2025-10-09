// src/lib/transitionStore.ts
import { writable } from 'svelte/store';

// 🔹 CORREZIONE: Definiamo un tipo per i dati della transizione
export interface TransitionData {
  rect: DOMRect;
  scrollY: number;
}

// Lo store ora conterrà un oggetto TransitionData o null
export const transitionStore = writable<TransitionData | null>(null);