---
title: "Checkpoint: Il Cervello del Modello"
category: "System Anatomy"
sources:
  - text: "Cosa sono i Modelli di Stable Diffusion? - Stable Diffusion Art"
    url: "https://stablediffusionart.com/models/"
  - text: "Spiegazione dei formati .ckpt e .safetensors - Hugging Face"
    url: "https://huggingface.co/docs/safetensors/index"
  - text: "Guida ai diversi tipi di modelli AI"
    url: "https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types"
  - text: "Introduzione ai Modelli Distillati (SDXL Turbo)"
    url: "https://stability.ai/news/sdxl-turbo"
related:
  - "unet"
  - "clip"
  - "vae"
  - "lora"
---

Il termine **Checkpoint** (o *Modello*) si riferisce ai file che contengono i "pesi" della rete neurale, ovvero il **cervello addestrato** dell'intelligenza artificiale. [1] Caricare un checkpoint è il primo passo di ogni workflow, ma il modo in cui viene fatto riflette due approcci principali: monolitico e modulare.

### 1. L'Approccio Monolitico (Tradizionale)

In questo approccio, un singolo file di checkpoint (con estensione `.ckpt` o `.safetensors`) contiene tutti e tre i componenti chiave necessari per la generazione: [3]
- La **UNet**, il cuore del modello di diffusione.
- Il **Text Encoder** (CLIP), per interpretare il prompt.
- Il **VAE**, per creare l'immagine finale.

Questo metodo è semplice e diretto: carichi un file e hai tutto ciò che ti serve. È molto comune per i modelli basati su Stable Diffusion 1.5.

### 2. L'Approccio Modulare (Moderno)

Con l'avvento di modelli più complessi come FLUX.1 e la flessibilità di interfacce come ComfyUI, è diventato comune caricare i componenti separatamente. In questo scenario, non carichi un singolo "checkpoint", ma i suoi pezzi costitutivi:
- Un file per la **UNet** (spesso chiamato "modello base" o "diffusion model").
- Uno o più file per il **CLIP Text Encoder** (FLUX.1 ne usa addirittura due).
- Un file per il **VAE**.

Questo approccio offre una flessibilità enorme: puoi, ad esempio, usare la UNet di un modello con il VAE di un altro per correggere problemi di colori, o sperimentare con diversi Text Encoder. [1]

**Quindi, ha ancora senso parlare di Checkpoint?**
Sì. Il termine "checkpoint" è ancora usato comunemente nella community per riferirsi al file principale del modello, specialmente la **UNet**. Quando scarichi un modello "finetuned" da Civitai, stai scaricando principalmente una UNet modificata, che potrai usare sia in modo monolitico (se contiene tutto) sia in modo modulare, abbinandola a CLIP e VAE a tua scelta.

### La Gerarchia dei Modelli

Possiamo classificare i modelli in una sorta di gerarchia:

1.  **Modelli Base (Base Models):**
    Sono le fondamenta. Rilasciati da laboratori di ricerca (es. Stability AI, Black Forest Labs), sono addestrati su dataset enormi e generici. Sono potentissimi ma spesso non hanno uno stile artistico definito. Esempi: `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Modelli Finetuned (Finetuned Models):**
    Sono modelli base che la community ha ulteriormente addestrato su dataset più piccoli e specifici per ottenere uno stile particolare (es. fotorealismo, anime, fantasy). La stragrande maggioranza dei modelli su siti come Civitai rientra in questa categoria. [1, 3]

3.  **Modelli Custom (Merge):**
    Questi non sono addestrati, ma creati **mescolando i pesi** di due o più modelli finetuned. È una tecnica molto popolare per combinare gli stili di diversi modelli e crearne uno nuovo e unico. È più un'arte che una scienza, e i risultati possono variare. [3]

4.  **Modelli Distillati (Distilled Models):**
    Sono una categoria speciale. Un modello "distillato" è una versione più piccola e veloce di un modello base, creata con un processo di addestramento che "distilla" la conoscenza del modello più grande. L'esempio più famoso è **SDXL Turbo**, che può generare immagini di alta qualità in pochissimi steps (1-4), a scapito di una minore flessibilità. [4] O anche versioni come FLUX.1 Dev distillata dalla Pro.

### Formati: `.ckpt` vs. `.safetensors`

Indipendentemente dall'approccio, i file sono distribuiti in due formati:

- **`.ckpt` (Checkpoint):** Il formato originale basato su "pickle" di Python. Potenzialmente insicuro, in quanto può contenere codice eseguibile. [2]
- **`.safetensors` (Safe Tensors):** Il nuovo standard, più sicuro e veloce da caricare, che contiene solo i dati del modello. [2] **È sempre raccomandabile preferire il formato `.safetensors` quando disponibile.**