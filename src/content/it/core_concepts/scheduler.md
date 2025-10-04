---
title: "Scheduler: Il Piano di Denoising"
category: "Core Concepts"
sources:
  - text: "Documentazione ufficiale degli Scheduler su Hugging Face Diffusers"
    url: "https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview"
  - text: "Spiegazione della relazione tra Sampler e Scheduler"
    url: "https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/"
  - text: "Discussione in ComfyUI sulla differenza tra gli Scheduler"
    url: "https://github.com/comfyanonymous/ComfyUI/discussions/227"
related:
  - "sampler"
  - "steps"
  - "karras"
---

Lo **Scheduler** (pianificatore) è l'algoritmo che definisce la **strategia** e il **ritmo** del processo di denoising. [1] Se il Sampler è la *tecnica* con cui l'artista dipinge, lo scheduler è il suo *piano di lavoro*: decide **quanto rumore rimuovere e a quale step**. [2]

Pensa di nuovo allo scultore. Lo scheduler è la sua strategia: "Nei primi 10 passaggi, userò uno scalpello grande per rimuovere grossi pezzi di marmo e sbozzare la forma (rimuovere molto rumore). Nei successivi 10, passerò a uno scalpello più piccolo per definire i dettagli (rimuovere meno rumore, ma in modo più preciso)." [2]

Questo piano non lineare è cruciale: rimuovere grandi quantità di rumore all'inizio accelera il processo, mentre concentrarsi sui dettagli alla fine migliora la qualità dell'immagine. [1]

### Tipi di Scheduler Comuni in ComfyUI

In ComfyUI, la scelta dello scheduler è separata da quella del sampler, offrendo un controllo più granulare. [3] I più comuni sono:

- **Normal:** È lo scheduler standard, con una progressione lineare del denoising.
- **Karras:** Proposto dal ricercatore Tero Karras, questo scheduler è molto popolare. [3] Utilizza una progressione non lineare che concentra più "lavoro di fino" verso gli ultimi steps. [1] Questo spesso si traduce in immagini con dettagli più fini e una migliore percezione della qualità. [3]
- **Simple:** Uno scheduler molto semplice che, come dice il creatore di ComfyUI, funziona sorprendentemente bene in alcuni scenari. [3]
- **DDIM Uniform:** Uno scheduler specifico da usare in coppia con il sampler `ddim` per replicare il suo comportamento originale. [3]

**In sintesi:** Il **Sampler** è il *come* si rimuove il rumore, lo **Scheduler** è il *quando* e *quanto*. La loro combinazione determina l'efficienza e la qualità del risultato finale.