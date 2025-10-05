// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async () => {
  // Reindirizza permanentemente (codice 308) alla versione italiana come default.
  throw redirect(308, '/it');
};