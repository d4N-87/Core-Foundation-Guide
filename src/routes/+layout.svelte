<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import NeuralBackground from '$lib/components/NeuralBackground.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<NeuralBackground />

<!-- L'Header ora è un elemento a sé stante, fuori dal flusso principale -->
<Header />

<!--
  LA MODIFICA CHIAVE:
  - Rimosso il div contenitore con 'flex-col'.
  - Aggiunta la classe 'pt-20' a <main> per creare spazio per l'header fisso.
    L'altezza dell'header è circa 4rem, pt-20 (5rem) dà un po' di respiro.
-->
<main class="relative z-10 isolate pt-20">
	<slot />
</main>