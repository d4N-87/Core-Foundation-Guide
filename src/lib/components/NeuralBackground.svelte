<!-- src/lib/components/NeuralBackground.svelte -->
<script lang="ts">
	// EN: Import Svelte's onMount lifecycle function to initialize the animation after the component is added to the DOM.
	// IT: Importa la funzione del ciclo di vita onMount di Svelte per inizializzare l'animazione dopo che il componente è stato aggiunto al DOM.
	import { onMount } from 'svelte';

	// EN: Import the custom p5.js loader utility.
	// IT: Importa l'utility personalizzata per il caricamento di p5.js.
	import { loadP5 } from '$lib/utils/p5loader';

	// EN: A variable to hold the reference to the container div element, bound using `bind:this`.
	// IT: Una variabile per mantenere il riferimento all'elemento div del contenitore, collegata tramite `bind:this`.
	let container!: HTMLDivElement;

	// EN: A variable to hold the p5.js instance, allowing for potential interaction or cleanup later.
	// IT: Una variabile per mantenere l'istanza di p5.js, permettendo potenziali interazioni o pulizie future.
	let p5Instance: any;

	/**
	 * EN: Represents a single particle in the animation. It manages its own position, velocity, and appearance.
	 * IT: Rappresenta una singola particella nell'animazione. Gestisce la propria posizione, velocità e aspetto.
	 */
	class Particle {
		p: any; // EN: The p5 instance, passed for drawing context. / IT: L'istanza di p5, passata per il contesto di disegno.
		pos: any; // EN: p5.Vector for position. / IT: p5.Vector per la posizione.
		vel: any; // EN: p5.Vector for velocity. / IT: p5.Vector per la velocità.
		acc: any; // EN: p5.Vector for acceleration. / IT: p5.Vector per l'accelerazione.
		maxSpeed = 1; // EN: Maximum speed limit for the particle. / IT: Limite massimo di velocità per la particella.
		isAccent: boolean; // EN: A flag to give some particles a different, accent color. / IT: Un flag per dare ad alcune particelle un colore d'accento diverso.

		constructor(p: any) {
			this.p = p;
			// EN: Initialize at a random position on the canvas.
			// IT: Inizializza in una posizione casuale sulla canvas.
			this.pos = p.createVector(p.random(p.width), p.random(p.height));
			// EN: Give it a random initial velocity.
			// IT: Assegna una velocità iniziale casuale.
			this.vel = p.constructor.Vector.random2D();
			this.vel.setMag(p.random(0.5, 1.5));
			this.acc = p.createVector(0, 0);
			// EN: 10% chance to be an accent particle.
			// IT: 10% di probabilità di essere una particella d'accento.
			this.isAccent = p.random(1) < 0.1;
		}

		// EN: Updates the particle's position based on its velocity.
		// IT: Aggiorna la posizione della particella in base alla sua velocità.
		update() {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			this.pos.add(this.vel);
			this.acc.mult(0); // EN: Reset acceleration each frame. / IT: Resetta l'accelerazione ad ogni frame.
			this.edges();
		}

		// EN: Implements a screen wrap-around effect. If a particle goes off one edge, it reappears on the opposite one.
		// IT: Implementa un effetto "wrap-around". Se una particella esce da un bordo, riappare su quello opposto.
		edges() {
			if (this.pos.x > this.p.width) this.pos.x = 0;
			if (this.pos.x < 0) this.pos.x = this.p.width;
			if (this.pos.y > this.p.height) this.pos.y = 0;
			if (this.pos.y < 0) this.pos.y = this.p.height;
		}

		// EN: Draws the particle on the canvas.
		// IT: Disegna la particella sulla canvas.
		show() {
			this.p.noStroke();
			// EN: Use the accent color if `isAccent` is true, otherwise use the default color.
			// IT: Usa il colore d'accento se `isAccent` è true, altrimenti usa il colore predefinito.
			this.p.fill(this.isAccent ? 'rgba(250, 204, 21, 0.7)' : 'rgba(34, 211, 238, 0.5)');
			this.p.circle(this.pos.x, this.pos.y, 4);
		}
	}

	// ▼▼▼ QUESTA È LA VERSIONE CORRETTA ▼▼▼
	onMount(async () => {
		// EN: Asynchronously load the p5.js library. The sketch will not run until it's ready.
		// IT: Carica asincronamente la libreria p5.js. Lo sketch non partirà finché non sarà pronta.
		const p5 = await loadP5();

		// EN: Detect if the user is on a mobile device to apply performance optimizations.
		// IT: Rileva se l'utente si trova su un dispositivo mobile per applicare ottimizzazioni delle performance.
		const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		// EN: The main p5.js sketch function.
		// IT: La funzione principale dello sketch p5.js.
		const sketch = (p: any) => {
			let particles: Particle[] = [];
			// EN: Use fewer particles and a shorter connection distance on mobile to save resources.
			// IT: Usa meno particelle e una distanza di connessione inferiore su mobile per risparmiare risorse.
			const numParticles = isMobile ? 30 : 60;
			const connectDistance = isMobile ? 100 : 130;

			// EN: The setup function runs once when the sketch starts.
			// IT: La funzione di setup viene eseguita una volta all'avvio dello sketch.
			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight).parent(container);
				for (let i = 0; i < numParticles; i++) particles.push(new Particle(p));
				// EN: Lower the frame rate on mobile for better performance.
				// IT: Abbassa il frame rate su mobile per performance migliori.
				if (isMobile) p.frameRate(30);
			};

			// EN: The draw function runs continuously in a loop, rendering each frame of the animation.
			// IT: La funzione di draw viene eseguita continuamente in un loop, renderizzando ogni frame dell'animazione.
			p.draw = () => {
				p.background('#0a0a0a'); // EN: Clear the background on each frame. / IT: Pulisce lo sfondo ad ogni frame.

				// EN: Update and display each particle.
				// IT: Aggiorna e mostra ogni particella.
				particles.forEach((particle) => {
					particle.update();
					particle.show();
				});

				// EN: This nested loop checks the distance between every pair of particles.
				// IT: Questo ciclo annidato controlla la distanza tra ogni coppia di particelle.
				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const d = p.dist(
							particles[i].pos.x,
							particles[i].pos.y,
							particles[j].pos.x,
							particles[j].pos.y
						);

						// EN: If two particles are close enough, draw a line between them.
						// IT: Se due particelle sono abbastanza vicine, disegna una linea tra di loro.
						if (d < connectDistance) {
							// EN: The line's opacity is inversely proportional to the distance.
							// IT: L'opacità della linea è inversamente proporzionale alla distanza.
							const alpha = p.map(d, 0, connectDistance, 0.2, 0);
							p.stroke(`rgba(224, 224, 224, ${alpha})`);
							p.line(
								particles[i].pos.x,
								particles[i].pos.y,
								particles[j].pos.x,
								particles[j].pos.y
							);
						}
					}
				}
			};

			// EN: A p5.js event handler that resizes the canvas whenever the browser window is resized.
			// IT: Un gestore di eventi di p5.js che ridimensiona la canvas ogni volta che la finestra del browser viene ridimensionata.
			p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		// EN: Create a new p5 instance, passing the sketch function and the container element.
		// IT: Crea una nuova istanza di p5, passando la funzione dello sketch e l'elemento contenitore.
		p5Instance = new p5(sketch, container);

		// NON RESTITUIAMO PIÙ LA FUNZIONE DI CLEANUP
	});
</script>

<!-- 
  English: The container for the p5.js canvas. It's fixed to the background and has a negative z-index.
  Italiano: Il contenitore per la canvas di p5.js. È fissato sullo sfondo e ha uno z-index negativo.
-->
<div bind:this={container} class="fixed top-0 left-0 w-full h-full -z-10"></div>