<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	const githubUrl = '#';
</script>

<!--
  LA MODIFICA CHIAVE:
  - Aggiunte le classi 'fixed top-0 left-0 right-0' per fissare l'header in cima alla viewport.
  - Lo z-index z-[60] è ancora valido e importante.
-->
<header
	class="fixed top-0 left-0 right-0 z-[60] w-full border-b border-cyan-900/50 bg-black/30 px-4 py-3 backdrop-blur-md md:px-8"
>
	<div class="mx-auto flex max-w-7xl items-center">
		<a
			href={githubUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Core Foundation Guide GitHub Repository"
			class="transition-transform duration-300 hover:scale-110 focus:scale-110 focus:outline-none"
		>
			<img src="/logo.webp" alt="Logo" class="h-9 w-9 md:h-10 md:w-10" />
		</a>

		<div class="ml-4 text-xl font-bold tracking-wider text-cyan-400 md:text-2xl">
			Core Foundation Guide
		</div>
	</div>
</header>