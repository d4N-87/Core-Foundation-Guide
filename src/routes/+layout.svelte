<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import '../app.css';
  import NeuralBackground from '$lib/components/NeuralBackground.svelte';
</script>

{#if browser}
  <NeuralBackground />
{/if}

<!-- 
  Il tag <main> ora è solo un contenitore strutturale.
  'relative' e 'z-10' sono ancora necessari per posizionarlo sopra lo sfondo.
-->
<main class="relative z-10 isolate">
  <!-- 
    Spostiamo il padding e gli stili visivi su un div interno.
    Questo div conterrà tutto il contenuto visibile delle pagine.
  -->
  <div class="p-4 md:p-8">
    <slot />
  </div>
</main>