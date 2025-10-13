<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import NeuralBackground from '$lib/components/NeuralBackground.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<!-- English: Renders the animated neural network background, which is positioned behind all other content. -->
<!-- Italiano: Renderizza lo sfondo animato a rete neurale, che è posizionato dietro a tutti gli altri contenuti. -->
<NeuralBackground />

<!-- 
  English: Main wrapper for the page content. 'isolate' creates a new stacking context, 
           ensuring the z-index works correctly with the background.
  Italiano: Wrapper principale per il contenuto della pagina. 'isolate' crea un nuovo contesto di stacking, 
            assicurando che lo z-index funzioni correttamente con lo sfondo.
-->
<div class="relative z-10 isolate">
	<Header />

	<!-- 
    English: This container ensures a "sticky footer" layout. 
             'min-h-screen' makes it at least as tall as the viewport.
             'pt-20' adds top padding to prevent content from being hidden under the fixed Header.
    Italiano: Questo contenitore assicura un layout "sticky footer".
              'min-h-screen' lo rende alto almeno quanto la finestra.
              'pt-20' aggiunge padding superiore per evitare che il contenuto venga nascosto dall'Header fisso.
  -->
	<div class="flex min-h-screen flex-col pt-20">
		<!-- 
      English: The main content area. 'flex-grow' allows it to expand and push the Footer to the bottom.
      Italiano: L'area del contenuto principale. 'flex-grow' le permette di espandersi e spingere il Footer in basso.
    -->
		<main class="flex-grow">
			<slot />
		</main>

		<Footer />
	</div>
</div>