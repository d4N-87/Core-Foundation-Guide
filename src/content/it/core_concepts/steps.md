---
title: "Steps: I Passaggi di Campionamento"
category: "Core Concepts"
sources:
  - text: "Spiegazione nel blog di Stable Diffusion Art"
    url: "https://stablediffusionart.com/steps/"
  - text: "Documentazione di `DDIMScheduler` su Hugging Face"
    url: "https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim"
related:
  - "sampler"
  - "scheduler"
  - "denoise"
---

Gli **Steps** (o passaggi di campionamento) indicano quante volte il modello "raffina" l'immagine partendo dal puro rumore. È uno dei parametri più importanti per bilanciare qualità e velocità di generazione. [1]

Immagina un pittore che parte da una tela completamente caotica. Ogni "step" è una pennellata che aggiunge dettagli e coerenza, rimuovendo un po' di caos (denoising) e avvicinando l'immagine al tuo prompt.

### Come scegliere il numero di steps?

- **Pochi Steps (es. 10-15):** L'immagine viene generata molto velocemente, ma potrebbe apparire incompleta, poco dettagliata o "fangosa". Ottima per anteprime rapide.
- **Numero Standard (es. 20-30):** È il punto di equilibrio ideale per la maggior parte dei modelli e dei sampler. L'immagine è di alta qualità e i tempi di generazione sono ragionevoli. [1]
- **Molti Steps (es. 40-100):** Aumentare ulteriormente gli steps porta a miglioramenti minimi (o a volte nulli), ma aumenta drasticamente il tempo di generazione.

**Nota importante:** L'effetto degli steps dipende moltissimo dal **Sampler** scelto. Alcuni sampler (come `DPM++ 2M Karras`) raggiungono un'ottima qualità con soli 20 steps, mentre altri potrebbero averne bisogno di 30 o più. [2]

Negli ultimi tempi si sono diffusi modelli e LoRa che permettono di avere ottimi risultati anche con pochi steps, come Lightv2x.

Ogni modello solitamente ha un range di steps consigliati.