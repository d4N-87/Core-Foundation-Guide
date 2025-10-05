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
  LA CORREZIONE È QUI:
  Abbiamo rimosso la classe 'prose' dal tag <main>.
  Ora occuperà di nuovo tutta la larghezza disponibile, permettendo
  al contenitore della griglia con 'mx-auto' di centrarsi correttamente.
-->
<main class="relative z-10 isolate">
  <div class="p-4 md:p-8">
    <slot />
  </div>
</main>