---
title: "Sampler: La Tecnica di Denoising"
category: "Core Concepts"
sources:
  - text: "Guida completa ai Sampler su Stable Diffusion Art"
    url: "https://stablediffusionart.com/samplers/"
  - text: "Spiegazione e confronto dei Sampler"
    url: "https://getimg.ai/guides/guide-to-stable-diffusion-samplers"
  - text: "Discussione tecnica sui Sampler e le loro famiglie"
    url: "https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/"
related:
  - "scheduler"
  - "steps"
  - "seed"
---

Il **Sampler** (o metodo di campionamento) è l'algoritmo che esegue materialmente il processo di "denoising" (rimozione del rumore) ad ogni step. [1] Se il modello AI è il cervello che predice il rumore da rimuovere, il sampler è la **tecnica specifica** o lo **stile di pennellata** che l'artista usa per pulire l'immagine. [2]

Pensa a un blocco di marmo grezzo (l'immagine di rumore iniziale). Diversi scultori (i sampler) useranno tecniche diverse per arrivare alla statua finale, anche seguendo lo stesso progetto (il prompt). Alcuni saranno più veloci e aggressivi, altri più lenti e meticolosi. Il risultato finale sarà simile, ma i dettagli e la "texture" potrebbero variare. [3]

### Famiglie di Sampler Principali

Anche se la lista in ComfyUI è lunga, i sampler si possono raggruppare in alcune famiglie principali:

- **Solutori ODE Antenati (es. `Euler`, `Heun`, `LMS`):** Sono i metodi più classici e semplici. [1] `Euler` è il più semplice e veloce. `Heun` è più accurato ma circa due volte più lento. [1, 2]
- **Sampler Ancestrali (es. `Euler a`, `DPM2 a`):** Questi sampler re-iniettano una piccola quantità di rumore ad ogni step. [1] Questo li rende non-deterministici: anche con lo stesso seed, l'immagine finale può variare leggermente. Sono ottimi per l'esplorazione creativa. [1]
- **DPM / DPM++ (Diffusion Probabilistic Model Solvers):** Una famiglia di sampler moderni, molto efficienti e popolari. [2] Varianti come `DPM++ 2M Karras` sono spesso raccomandate perché raggiungono un'altissima qualità in pochi steps (20-30), offrendo un eccellente equilibrio tra velocità e qualità. [2]
- **DDIM (Denoising Diffusion Implicit Models):** Uno dei primi sampler sviluppati per i modelli a diffusione, è deterministico e affidabile, ma spesso superato in velocità ed efficienza dai più recenti DPM++. [1]

### Quale scegliere?

Non esiste un "miglior" sampler in assoluto. La scelta dipende dal modello che stai usando e dal risultato che vuoi ottenere. Una buona strategia è iniziare con un sampler veloce e di alta qualità come **`DPM++ 2M Karras`** con 20-30 steps. [2]

**Importante:** Il Sampler lavora in stretta collaborazione con lo **Scheduler**, che determina *quanto* rumore rimuovere ad ogni step.