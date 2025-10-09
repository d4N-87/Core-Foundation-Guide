// src/routes/+layout.server.ts
import { translations } from '$lib/translations';

// 🔹 CORREZIONE: Rimosso l'import di 'LayoutServerLoad' e la tipizzazione esplicita.
// TypeScript capirà automaticamente il tipo corretto.
export const load = async () => {
  return {
    translations
  };
};