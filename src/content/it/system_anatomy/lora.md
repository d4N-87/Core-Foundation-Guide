---
title: "LoRa: Modificatori Leggeri di Stile"
category: "System Anatomy"
sources:
  - text: "Paper Originale: LoRA: Low-Rank Adaptation of Large Language Models"
    url: "https://arxiv.org/abs/2106.09685"
  - text: "Guida alle LoRa su Civitai"
    url: "https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types"
  - text: "Spiegazione tecnica delle LoRa su Hugging Face"
    url: "https://huggingface.co/docs/diffusers/main/en/training/lora"
related:
  - "checkpoint"
  - "unet"
  - "clip"
---

Una **LoRa (Low-Rank Adaptation)** è un piccolo file che applica modifiche mirate a un modello checkpoint completo, senza alterarlo permanentemente. [1] Pensa a una LoRa come a un **set di istruzioni aggiuntive** o a un **filtro trasparente** che metti sopra il "cervello" principale (il checkpoint) per fargli adottare uno stile specifico, replicare un personaggio o un concetto. [2]

Il vantaggio principale delle LoRa è la loro **dimensione ridotta**. Mentre un checkpoint completo può pesare diversi gigabyte, una LoRa pesa tipicamente solo pochi megabyte (da 2 a 200 MB). [3] Questo le rende facili da scaricare, condividere e utilizzare.

### Come Funzionano?

Invece di riaddestrare l'intero modello (un processo costoso), una LoRa viene addestrata per "intercettare" e modificare solo una piccola parte dei pesi della UNet e del Text Encoder. [3] Quando applichi una LoRa, i suoi piccoli pesi vengono aggiunti a quelli del modello principale durante la generazione, influenzando il risultato finale.

### Tipi Comuni di LoRa

Le LoRa sono incredibilmente versatili e possono essere addestrate per diversi scopi:

1.  **Stile (Style LoRa):**
    Queste LoRa insegnano al modello uno stile artistico specifico (es. "stile Ghibli", "pixel art", "pittura a olio barocca"). Sono tra le più popolari. [2]

2.  **Personaggio (Character LoRa):**
    Addestrate su immagini di un personaggio specifico (reale o di finzione), permettono di inserire quel personaggio in qualsiasi scena con una buona coerenza.

3.  **Concetto (Concept LoRa):**
    Possono insegnare al modello un concetto più astratto, come una particolare posa, un tipo di abbigliamento o un oggetto specifico.

### Utilizzo in ComfyUI

In ComfyUI, le LoRa vengono caricate tramite un nodo `Load LoRA` che si inserisce tipicamente tra il `Load Checkpoint` e il `KSampler`. Questo nodo prende in input il modello e il CLIP dal checkpoint e restituisce una versione "modificata" di entrambi, pronta per essere usata nel resto del workflow.

È possibile anche **combinare più LoRa** (un processo chiamato *stacking*), applicando diversi filtri in sequenza, anche se questo può portare a risultati imprevedibili se le LoRa sono in conflitto tra loro.