---
title: 'Sampler: Die Denoising-Technik'
category: Core Concepts
sources:
  - text: Vollständiger Leitfaden zu Samplern auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/samplers/'
  - text: Erklärung und Vergleich von Samplern
    url: 'https://getimg.ai/guides/guide-to-stable-diffusion-samplers'
  - text: Technische Diskussion über Sampler und ihre Familien
    url: >-
      https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/
related:
  - scheduler
  - steps
  - seed
---

Der **Sampler** (oder Abtastmethode) ist der Algorithmus, der den "Denoising"-Prozess (Rauschunterdrückung) bei jedem Schritt materiell ausführt. [1] Wenn das KI-Modell das Gehirn ist, das das zu entfernende Rauschen vorhersagt, ist der Sampler die **spezifische Technik** oder der **Pinselstrichstil**, den der Künstler verwendet, um das Bild zu reinigen. [2]

Stellen Sie sich einen Block rohen Marmors vor (das anfängliche Rauschbild). Verschiedene Bildhauer (die Sampler) werden unterschiedliche Techniken anwenden, um zur endgültigen Statue zu gelangen, auch wenn sie demselben Projekt folgen (dem Prompt). Einige werden schneller und aggressiver sein, andere langsamer und akribischer. Das Endergebnis wird ähnlich sein, aber die Details und die "Textur" können variieren. [3]

### Hauptfamilien von Samplern

Obwohl die Liste in ComfyUI lang ist, lassen sich die Sampler in einige Hauptfamilien einteilen:

- **Ahnen-ODE-Löser (z. B. `Euler`, `Heun`, `LMS`):** Dies sind die klassischsten und einfachsten Methoden. [1] `Euler` ist die einfachste und schnellste. `Heun` ist genauer, aber etwa doppelt so langsam. [1, 2]
- **Ahnen-Sampler (z. B. `Euler a`, `DPM2 a`):** Diese Sampler injizieren bei jedem Schritt eine kleine Menge Rauschen neu. [1] Dies macht sie nicht-deterministisch: Selbst mit demselben Seed kann das endgültige Bild leicht variieren. Sie eignen sich hervorragend für die kreative Erkundung. [1]
- **DPM / DPM++ (Diffusion Probabilistic Model Solvers):** Eine Familie moderner, sehr effizienter und beliebter Sampler. [2] Varianten wie `DPM++ 2M Karras` werden oft empfohlen, da sie in wenigen Schritten (20-30) eine sehr hohe Qualität erreichen und ein hervorragendes Gleichgewicht zwischen Geschwindigkeit und Qualität bieten. [2]
- **DDIM (Denoising Diffusion Implicit Models):** Einer der ersten für Diffusionsmodelle entwickelten Sampler, er ist deterministisch und zuverlässig, wird aber oft in Geschwindigkeit und Effizienz von den neueren DPM++ übertroffen. [1]

### Welchen wählen?

Es gibt keinen "besten" Sampler im absoluten Sinne. die Wahl hängt von dem Modell ab, das Sie verwenden, und dem Ergebnis, das Sie erzielen möchten. Eine gute Strategie ist es, mit einem schnellen und hochwertigen Sampler wie **`DPM++ 2M Karras`** mit 20-30 Schritten zu beginnen. [2]

**Wichtig:** Der Sampler arbeitet eng mit dem **Scheduler** zusammen, der bestimmt, *wie viel* Rauschen bei jedem Schritt entfernt werden soll.
