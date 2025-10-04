---
title: "DiT: I Diffusion Transformers"
category: "Advanced Topics"
sources:
  - text: "Paper Originale: Scalable Diffusion Models with Transformers"
    url: "https://arxiv.org/abs/2212.09748"
  - text: "Annuncio di Stable Diffusion 3, basato su DiT"
    url: "https://stability.ai/news/stable-diffusion-3"
  - text: "Spiegazione dell'architettura DiT - Hugging Face"
    url: "https://huggingface.co/papers/2212.09748"
related:
  - "unet"
  - "llm"
  - "diffusion_model"
  - "attention"
---

Un **DiT (Diffusion Transformer)** è una nuova architettura per i modelli di diffusione che **sostituisce la tradizionale UNet con un Transformer**. [1] È un'evoluzione che prende in prestito le innovazioni del mondo dei Large Language Models (LLM) e le applica alla generazione di immagini, promettendo maggiore scalabilità ed efficienza.

### Perché Sostituire la UNet?

La **UNet** è stata l'architettura dominante per anni, ma ha dei limiti intrinseci nella sua capacità di "scalare", ovvero di migliorare le sue performance all'aumentare delle dimensioni e della potenza di calcolo.

L'architettura **Transformer**, grazie al suo meccanismo di **Attention**, ha dimostrato negli LLM di essere incredibilmente efficace nel gestire e mettere in relazione grandi quantità di dati. L'idea alla base dei DiT è: "E se trattassimo un'immagine non come una griglia di pixel, ma come una sequenza di 'patch' (pezzi), in modo simile a come un Transformer tratta una sequenza di parole?". [1]

### Come Funziona un DiT?

1.  L'immagine latente viene scomposta in una serie di "patch" (token visivi).
2.  Questi token vengono processati da un Transformer, che usa il meccanismo di Attention per capire le relazioni tra le diverse parti dell'immagine.
3.  Il Transformer, condizionato dal prompt, predice il rumore da rimuovere da ogni patch.

Questo approccio si è dimostrato estremamente scalabile: più grande e potente è il Transformer, migliori sono i risultati, superando le performance delle UNet tradizionali a parità di risorse. [1]

### Esempi Concreti e il Futuro

- **Sora:** Il rivoluzionario modello text-to-video di OpenAI è basato su un'architettura DiT.
- **Stable Diffusion 3:** La nuova versione del modello di Stability AI abbandona la UNet in favore di un'architettura DiT, o più precisamente **MMDiT (Multi-Modal DiT)**. [2] Un MMDiT usa due Transformer diversi, uno per elaborare i dati del testo e uno per i dati dell'immagine, permettendo una comprensione molto più profonda e accurata del prompt. [2]

I DiT rappresentano un passo fondamentale verso modelli di generazione sempre più potenti, coerenti e capaci di comprendere le sfumature complesse del linguaggio umano.