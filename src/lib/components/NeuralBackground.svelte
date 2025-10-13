<!-- src/lib/components/NeuralBackground.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { loadP5 } from '$lib/utils/p5loader';

	let container!: HTMLDivElement;
	let p5Instance: any;

	// English: Defines a single particle with position, velocity, and drawing logic.
	// Italiano: Definisce una singola particella con posizione, velocità e logica di disegno.
	class Particle {
		p: any;
		pos: any;
		vel: any;
		acc: any;
		maxSpeed = 1;
		isAccent: boolean;

		constructor(p: any) {
			this.p = p;
			this.pos = p.createVector(p.random(p.width), p.random(p.height));
			this.vel = p.constructor.Vector.random2D();
			this.vel.setMag(p.random(0.5, 1.5));
			this.acc = p.createVector(0, 0);
			// English: A small chance for a particle to be an 'accent' color (amber).
			// Italiano: Una piccola probabilità che una particella sia di colore 'accento' (ambra).
			this.isAccent = p.random(1) < 0.1;
		}

		update() {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.edges();
		}

		// English: Wraps the particle around the screen edges if it goes off-screen.
		// Italiano: Fa "riapparire" la particella sul lato opposto se esce dallo schermo.
		edges() {
			if (this.pos.x > this.p.width) this.pos.x = 0;
			if (this.pos.x < 0) this.pos.x = this.p.width;
			if (this.pos.y > this.p.height) this.pos.y = 0;
			if (this.pos.y < 0) this.pos.y = this.p.height;
		}

		show() {
			this.p.noStroke();
			this.p.fill(this.isAccent ? 'rgba(250, 204, 21, 0.7)' : 'rgba(34, 211, 238, 0.5)');
			this.p.circle(this.pos.x, this.pos.y, 4);
		}
	}

	onMount(async () => {
		// English: Dynamically load p5.js on the client-side to avoid SSR issues and reduce initial load.
		// Italiano: Carica dinamicamente p5.js sul lato client per evitare problemi di SSR e ridurre il caricamento iniziale.
		const p5 = await loadP5();
		// English: Detect if the device is mobile to apply performance optimizations.
		// Italiano: Rileva se il dispositivo è mobile per applicare ottimizzazioni delle prestazioni.
		const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		const sketch = (p: any) => {
			let particles: Particle[] = [];
			// English: Use fewer particles and a smaller connection distance on mobile for better performance.
			// Italiano: Usa meno particelle e una distanza di connessione minore su mobile per prestazioni migliori.
			const numParticles = isMobile ? 30 : 60;
			const connectDistance = isMobile ? 100 : 130;

			// English: p5.js setup function, runs once at the beginning.
			// Italiano: Funzione di setup di p5.js, eseguita una volta all'inizio.
			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight).parent(container);
				for (let i = 0; i < numParticles; i++) particles.push(new Particle(p));
				if (isMobile) p.frameRate(30); // English: Lower framerate on mobile. / Italiano: Framerate più basso su mobile.
			};

			// English: p5.js draw function, runs continuously in a loop.
			// Italiano: Funzione di draw di p5.js, eseguita continuamente in un loop.
			p.draw = () => {
				p.background('#0a0a0a');
				particles.forEach((particle) => {
					particle.update();
					particle.show();
				});
				// English: Check the distance between every pair of particles to draw connecting lines.
				// Italiano: Controlla la distanza tra ogni coppia di particelle per disegnare le linee di connessione.
				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const d = p.dist(
							particles[i].pos.x,
							particles[i].pos.y,
							particles[j].pos.x,
							particles[j].pos.y
						);
						if (d < connectDistance) {
							// English: The line's opacity is inversely proportional to the distance.
							// Italiano: L'opacità della linea è inversamente proporzionale alla distanza.
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

			// English: Makes the canvas responsive to window resizing.
			// Italiano: Rende la canvas responsiva al ridimensionamento della finestra.
			p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p5Instance = new p5(sketch, container);

		// English: Cleanup function to remove the p5.js instance when the component is destroyed, preventing memory leaks.
		// Italiano: Funzione di pulizia per rimuovere l'istanza p5.js quando il componente viene distrutto, evitando memory leak.
		return () => {
			if (p5Instance) p5Instance.remove();
		};
	});
</script>

<!-- 
  English: The container for the p5.js canvas. It's fixed to the background and has a negative z-index.
  Italiano: Il contenitore per la canvas di p5.js. È fissato sullo sfondo e ha uno z-index negativo.
-->
<div bind:this={container} class="fixed top-0 left-0 w-full h-full -z-10"></div>