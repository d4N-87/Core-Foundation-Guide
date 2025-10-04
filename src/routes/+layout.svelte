<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  // Commentiamo l'import per assicurarci che non venga caricato
  // import NeuralBackground from '$lib/components/NeuralBackground.svelte';
</script>

<!-- 
  Abbiamo commentato il componente dello sfondo.
  Ora non dovrebbe esserci nulla a coprire il nostro contenuto.
-->
<!-- <NeuralBackground /> -->

<!-- 
  Per questo test, usiamo un main semplice senza classi extra.
  Lo slot renderizzerà la nostra pagina di test.
-->
<main>
  <slot />
</main>