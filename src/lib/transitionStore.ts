// src/lib/transitionStore.ts
import { writable } from 'svelte/store';

// Questo store conterrà le coordinate (il bounding box)
// della card su cui abbiamo cliccato.
export const transitionStore = writable<DOMRect | null>(null);