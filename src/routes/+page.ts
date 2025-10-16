// src/routes/+page.ts
import type { Language } from '$lib/translations';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const defaultLang: Language = 'it';
	return { defaultLang };
};