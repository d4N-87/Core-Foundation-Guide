---
title: "Conditioning: Le Istruzioni per la UNet"
category: "System Anatomy"
sources:
  - text: "Paper di ControlNet (che parla di 'conditional control')"
    url: "https://arxiv.org/abs/2302.05543"
  - text: "Spiegazione del Text Conditioning in Stable Diffusion"
    url: "https://jalammar.github.io/illustrated-stable-diffusion/"
  - text: "Documentazione di ComfyUI che mostra i flussi di Conditioning"
    url: "https://comfyanonymous.github.io/ComfyUI_examples/sdxl/"
related:
  - "clip"
  - "unet"
  - "controlnet"
  - "prompt"
---

Il **Conditioning** (condizionamento) è il termine tecnico che descrive i **dati di guida** che vengono forniti alla UNet per influenzare e controllare il processo di generazione dell'immagine. [1]

Pensa alla UNet come a un motore potentissimo ma "cieco". Da sola, saprebbe solo come rimuovere il rumore in modo generico. Il conditioning è l'insieme di **istruzioni e vincoli** che le dicono *come* rimuovere il rumore per ottenere un risultato specifico. [2]

In ComfyUI, il conditioning è rappresentato visivamente dai **fili gialli** che collegano i vari nodi. Questi fili non trasportano immagini, ma questi pacchetti di dati di guida. [3]

### Tipi Principali di Conditioning

Esistono diverse "fonti" di condizionamento che possono essere combinate per un controllo granulare:

1.  **Text Conditioning (Condizionamento Testuale):**
    È la forma più comune di guida. Proviene dal **CLIP Text Encoder**, che trasforma il prompt positivo e negativo in una rappresentazione numerica (embedding). Questo "pacchetto" di dati dice alla UNet quali concetti, oggetti e stili deve rappresentare. [2]

2.  **Image Conditioning (Condizionamento Visivo):**
    Questa guida non deriva dal testo, ma da un'immagine. È il principio su cui si basa **ControlNet**. Un modello ControlNet analizza un'immagine di input (es. una posa, una mappa di profondità) e la trasforma in un conditioning che viene aggiunto a quello del testo. Questo tipo di conditioning impone vincoli strutturali e spaziali molto forti alla UNet. [1]

3.  **Time Conditioning (Condizionamento Temporale):**
    È un tipo di conditioning più "interno". Ad ogni step del campionamento, un'informazione sul "timestep" attuale (es. "siamo allo step 5 di 20") viene passata alla UNet. Questo le permette di sapere a che punto del processo si trova e di regolare di conseguenza la sua aggressività nel rimuovere il rumore.

### Combinare i Conditioning

La potenza di workflow avanzati come quelli in ComfyUI risiede nella capacità di manipolare e combinare questi flussi di dati. Ad esempio, è possibile:
- **Mescolare** il conditioning di due prompt diversi.
- **Applicare** un ControlNet solo a una parte del prompt.
- **Guidare** la generazione con più ControlNet contemporaneamente.

In sintesi, ogni volta che vedi un filo giallo in ComfyUI, stai guardando un canale di comunicazione che porta istruzioni vitali al cuore del modello, la UNet.