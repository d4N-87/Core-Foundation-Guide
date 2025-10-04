---
title: "UNet: Il Cuore del Denoising"
category: "System Anatomy"
sources:
  - text: "Paper originale che ha introdotto la UNet (per immagini biomediche)"
    url: "https://arxiv.org/abs/1505.04597"
  - text: "Spiegazione della UNet nel contesto di Stable Diffusion - Hugging Face"
    url: "https://huggingface.co/blog/stable_diffusion#the-unet"
  - text: "Articolo illustrato sull'architettura di Stable Diffusion"
    url: "https://jalammar.github.io/illustrated-stable-diffusion/"
related:
  - "checkpoint"
  - "diffusion_model"
  - "conditioning"
  - "clip"
---

La **UNet** è il componente centrale e più importante di un modello di diffusione come Stable Diffusion. È la rete neurale che impara a **rimuovere progressivamente il rumore** da un'immagine latente, guidata dalle istruzioni del prompt. [2, 3]

Se il checkpoint è il "cervello", la UNet è il **lobo parietale**, la parte che elabora le informazioni sensoriali (il prompt) per creare una rappresentazione spaziale coerente (l'immagine).

### Perché si chiama "U-Net"?

Il nome deriva dalla sua architettura, che ha una caratteristica forma a "U". [1] Il processo di elaborazione all'interno della UNet avviene in due fasi principali:

1.  **Encoder (La Discesa):**
    L'immagine rumorosa entra nella prima parte della "U". Ad ogni passo verso il basso, la rete **comprime l'immagine**, riducendone la risoluzione ma aumentando il numero di canali informativi. In pratica, sta cercando di "capire" il contenuto dell'immagine a un livello sempre più astratto, ignorando i dettagli fini per cogliere le forme e i concetti principali. [3]

2.  **Decoder (La Risalita):**
    Arrivata al fondo della "U" (il *bottleneck*), l'informazione compressa inizia a risalire. Ad ogni passo verso l'alto, la rete **decompone l'immagine**, aumentandone la risoluzione e usando le informazioni astratte apprese prima per ricostruire i dettagli in modo coerente. Grazie a delle "skip connections" che collegano direttamente i livelli della discesa con quelli della risalita, la rete non "dimentica" i dettagli a bassa risoluzione mentre ricostruisce l'immagine. [1, 3]

### Il Ruolo del Conditioning

La UNet non lavora alla cieca. Ad ogni passo del suo processo, riceve due input fondamentali che la guidano (un processo chiamato **conditioning**):
- **Il Prompt:** Le informazioni provenienti dal Text Encoder (CLIP) vengono "iniettate" nella UNet per dirle *cosa* disegnare.
- **Il Timestep:** Un numero che indica a quale step del processo di denoising ci si trova. Questo permette alla UNet di essere più aggressiva all'inizio (quando c'è molto rumore) e più delicata alla fine. [2]

In sintesi, quando carichi un modello base o un checkpoint in ComfyUI, la parte più grande e importante di quel file è proprio la UNet.