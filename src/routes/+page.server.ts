// Redirect dalla root alla lingua italiana come default
import { redirect } from '@sveltejs/kit';

export const load = async () => {
  throw redirect(308, '/it');
};
