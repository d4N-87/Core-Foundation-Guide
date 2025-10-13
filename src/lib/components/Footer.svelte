<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
	const githubUrl = '#';
	// English: Get the current year dynamically for the copyright notice.
	// Italiano: Ottiene dinamicamente l'anno corrente per la nota di copyright.
	const currentYear = new Date().getFullYear();
</script>

<!-- 
  English: The GitHub SVG icon is defined as a symbol directly within the component. 
           This makes the component self-contained and the icon can be reused with the `<use>` tag.
  Italiano: L'icona SVG di GitHub è definita come simbolo direttamente nel componente. 
            Questo lo rende autonomo e l'icona può essere riutilizzata con il tag `<use>`.
-->
<svg class="hidden">
	<symbol id="icon-github" viewBox="0 0 24 24" fill="currentColor">
		<path
			d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
		/>
	</symbol>
</svg>

<footer
	class="w-full border-t border-cyan-900/50 bg-black/30 px-4 py-6 backdrop-blur-md md:px-8"
>
	<!-- 
    English: Main container that handles the responsive layout: stacks items vertically on small screens (`flex-col`) 
             and places them in a row on larger screens (`sm:flex-row`).
    Italiano: Contenitore principale che gestisce il layout responsivo: impila gli elementi in verticale su schermi piccoli (`flex-col`) 
              e li dispone in riga su schermi più grandi (`sm:flex-row`).
  -->
	<div
		class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row"
	>
		<!-- English: Left side: Copyright information. -->
		<!-- Italiano: Lato sinistro: Informazioni sul copyright. -->
		<p class="text-sm text-slate-400">
			© {currentYear} Core Foundation Guide. An interactive field manual for AI concepts.
		</p>

		<!-- English: Right side: Link to the GitHub repository using the SVG icon. -->
		<!-- Italiano: Lato destro: Link alla repository GitHub che utilizza l'icona SVG. -->
		<a
			href={githubUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub Repository"
			class="text-slate-400 transition-colors hover:text-white"
		>
			<svg class="h-6 w-6"><use href="#icon-github" /></svg>
		</a>
	</div>
</footer>