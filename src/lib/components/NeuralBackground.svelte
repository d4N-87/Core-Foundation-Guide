<!-- src/lib/components/NeuralBackground.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { loadP5 } from '$lib/utils/p5loader';

	let container!: HTMLDivElement;
	let p5Instance: any;

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
			this.isAccent = p.random(1) < 0.1;
		}

		update() {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.edges();
		}

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

	// ▼▼▼ QUESTA È LA VERSIONE CORRETTA ▼▼▼
	onMount(async () => {
		const p5 = await loadP5();
		const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		const sketch = (p: any) => {
			let particles: Particle[] = [];
			const numParticles = isMobile ? 30 : 60;
			const connectDistance = isMobile ? 100 : 130;

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight).parent(container);
				for (let i = 0; i < numParticles; i++) particles.push(new Particle(p));
				if (isMobile) p.frameRate(30);
			};

			p.draw = () => {
				p.background('#0a0a0a');
				particles.forEach((particle) => {
					particle.update();
					particle.show();
				});
				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const d = p.dist(
							particles[i].pos.x,
							particles[i].pos.y,
							particles[j].pos.x,
							particles[j].pos.y
						);
						if (d < connectDistance) {
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

			p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p5Instance = new p5(sketch, container);

		// NON RESTITUIAMO PIÙ LA FUNZIONE DI CLEANUP
	});
</script>

<!-- 
  English: The container for the p5.js canvas. It's fixed to the background and has a negative z-index.
  Italiano: Il contenitore per la canvas di p5.js. È fissato sullo sfondo e ha uno z-index negativo.
-->
<div bind:this={container} class="fixed top-0 left-0 w-full h-full -z-10"></div>