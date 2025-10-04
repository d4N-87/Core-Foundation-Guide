<!-- svelte-ignore perf_avoid_nested_class -->
<!-- src/lib/components/NeuralBackground.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';

  let container: HTMLElement;

  onMount(() => {
    let p5Instance: any;

    async function initializeSketch() {
      const p5 = (await import('p5')).default;
      const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      const sketch = (p: any) => {
        // La tua classe Particle, con i colori del nostro nuovo tema
        class Particle {
          p: any; pos: any; vel: any; acc: any; maxSpeed = 1; isAccent: boolean;
          constructor(p: any) {
            this.p = p;
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.constructor.Vector.random2D();
            this.vel.setMag(p.random(0.5, 1.5));
            this.acc = p.createVector(0, 0);
            this.isAccent = p.random(1) < 0.1; // 10% di particelle sono "accent"
          }
          update() { this.vel.add(this.acc); this.vel.limit(this.maxSpeed); this.pos.add(this.vel); this.acc.mult(0); this.edges(); }
          edges() { if (this.pos.x > this.p.width) this.pos.x = 0; if (this.pos.x < 0) this.pos.x = this.p.width; if (this.pos.y > this.p.height) this.pos.y = 0; if (this.pos.y < 0) this.pos.y = this.p.height; }
          show() {
            this.p.noStroke();
            // Colori del nostro Design System
            if (this.isAccent) {
              this.p.fill('rgba(250, 204, 21, 0.7)'); // --color-accent-yellow
            } else {
              this.p.fill('rgba(34, 211, 238, 0.5)'); // --color-accent-cyan
            }
            this.p.circle(this.pos.x, this.pos.y, 4);
          }
        }

        let particles: Particle[] = [];
        const numParticles = isMobile ? 30 : 60;
        const connectDistance = isMobile ? 100 : 130;

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent(container);
          for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p));
          }
          if (isMobile) p.frameRate(30);
        };

        p.draw = () => {
          p.background('#0a0a0a'); // --color-background
          particles.forEach((particle) => {
            particle.update();
            particle.show();
          });
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const d = p.dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
              if (d < connectDistance) {
                const alpha = p.map(d, 0, connectDistance, 0.2, 0);
                p.stroke(`rgba(224, 224, 224, ${alpha})`); // --color-text con alpha
                p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
              }
            }
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      p5Instance = new p5(sketch, container);
    }

    initializeSketch();

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  });
</script>

<div bind:this={container} class="fixed top-0 left-0 w-full h-full -z-10"></div>