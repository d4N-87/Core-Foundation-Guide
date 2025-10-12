<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import NeuralBackground from '$lib/components/NeuralBackground.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<NeuralBackground />

<!-- 
  LA CORREZIONE È QUI:
  - Abbiamo ripristinato la struttura precedente che si è dimostrata robusta.
  - L'header è un elemento a sé stante.
  - Il 'main' ha di nuovo il 'padding-top' necessario per creare spazio per l'header fisso.
-->
<div class="relative z-10 isolate">
	<Header />

	<!-- 
    Il 'min-h-screen' qui assicura che il contenitore del contenuto occupi almeno
    l'intera altezza dello schermo, spingendo il footer in fondo.
    'flex' e 'flex-col' sono necessari per far funzionare 'flex-grow'.
  -->
	<div class="flex min-h-screen flex-col pt-20">
		<main class="flex-grow">
			<slot />
		</main>

		<Footer />
	</div>
</div>