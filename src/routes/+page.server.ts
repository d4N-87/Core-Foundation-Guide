// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Language } from '$lib/translations'; // 🔹 Importiamo il nostro nuovo tipo

export const load: PageServerLoad = async ({ request }) => {
  // 🔹 Dichiariamo che defaultLang è di tipo Language
  const defaultLang: Language = 'it'; 

  return {
    defaultLang,
  };
};