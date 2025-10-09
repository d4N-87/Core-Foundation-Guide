<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import NeuralBackground from '$lib/components/NeuralBackground.svelte';
  
  // Riceviamo i dati caricati dal +layout.server.ts
  export let data;
</script>

<NeuralBackground />

<main class="relative z-10 isolate">
  <div class="p-4 md:p-8">
    <!-- 
      Passiamo i dati (incluse le traduzioni) a tutte le pagine renderizzate nello slot.
      In questo modo, ogni pagina potrà accedere a data.translations.
    -->
    <slot {...data} />
  </div>
</main>

<!-- Il CSS di debug per le transizioni può rimanere per ora -->
<style>
  :global(::view-transition-old(*)),
  :global(::view-transition-new(*)) {
    animation-duration: 2s;
  }
</style>