<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import type { Language } from '$lib/translations'; // 🔹 Importiamo il tipo

  export let data: PageData;
  // 🔹 Ora possiamo usare 'as Language' per essere espliciti con TypeScript
  const defaultLang = data.defaultLang as Language;
  const { translations } = data;

  // Ora questa riga è sicura e non darà più errori
  const t = translations[defaultLang] || translations.it;

  onMount(() => {
    goto(`/${defaultLang}`, { replaceState: true });
  });
</script>

<div class="min-h-screen w-full flex items-center justify-center">
  <p class="text-white">{t.initializing || 'Initializing...'}</p>
</div>