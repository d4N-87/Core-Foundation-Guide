---
title: "Segmentation: Comprendere la Scena"
category: "System Anatomy"
sources:
  - text: "Spiegazione della Image Segmentation - Wikipedia"
    url: "https://en.wikipedia.org/wiki/Image_segmentation"
  - text: "Esempi di Modelli di Segmentazione (es. SAM) - Meta AI"
    url: "https://ai.meta.com/blog/segment-anything-sam-computer-vision-model/"
  - text: "Utilizzo della Segmentazione Semantica in ControlNet"
    url: "https://github.com/lllyasviel/ControlNet-v1-1-nightly#controlnet-11-with-semantic-segmentation"
related:
  - "controlnet"
  - "inpaint"
  - "rete_neurale"
---

La **Segmentazione (Image Segmentation)** è un processo di Computer Vision che consiste nel **partizionare un'immagine in più segmenti o regioni**, associando ogni pixel a una specifica etichetta di classe. [1]

In parole semplici, è il modo in cui un'AI "scompone" un'immagine per capirne il contenuto a un livello molto dettagliato. Invece di vedere solo "una foto di una strada", un modello di segmentazione vede "questi pixel sono 'strada', questi sono 'cielo', questi sono 'albero', e quelli sono 'automobile'".

### Tipi di Segmentazione

Esistono diversi tipi di segmentazione, ma i più comuni sono:
- **Segmentazione Semantica:** A ogni pixel viene assegnata una categoria (es. "persona", "gatto", "erba"). Tutti gli oggetti della stessa categoria hanno lo stesso colore nella mappa di segmentazione. [3]
- **Segmentazione di Istanza:** È più avanzata. Non solo etichetta i pixel come "persona", ma distingue tra "persona 1", "persona 2", etc. Ogni *istanza* di un oggetto viene identificata separatamente.

### Applicazioni nella Generazione di Immagini

La segmentazione è diventata uno strumento potentissimo per il controllo e la modifica delle immagini generate:

1.  **ControlNet con Segmentazione Semantica:**
    È possibile usare una mappa di segmentazione come input per un modello ControlNet. [3] Questo permette di dettare la composizione di una scena in modo molto preciso. Ad esempio, si può fornire una mappa con una zona blu in alto (cielo), una verde in basso (prato) e una marrone al centro (casa), e il modello genererà un'immagine che rispetta esattamente quella disposizione spaziale.

2.  **Inpainting Automatico e Preciso:**
    Modelli avanzati come **SAM (Segment Anything Model)** di Meta AI possono generare maschere di segmentazione incredibilmente precise per qualsiasi oggetto in un'immagine con un solo click. [2] In ComfyUI, questo permette di creare workflow di inpainting potentissimi: clicchi su un oggetto, SAM crea la maschera perfetta per esso, e tu puoi modificarlo o sostituirlo con un prompt, senza dover disegnare la maschera a mano.

In sintesi, la segmentazione è una tecnologia chiave che permette un'interazione e una manipolazione delle immagini a un livello di precisione e intelligenza che prima era impensabile.