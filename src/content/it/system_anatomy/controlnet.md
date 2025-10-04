---
title: "ControlNet: Guidare l'AI con le Immagini"
category: "System Anatomy"
sources:
  - text: "Paper Originale: Adding Conditional Control to Text-to-Image Diffusion Models"
    url: "https://arxiv.org/abs/2302.05543"
  - text: "Guida illustrata a ControlNet"
    url: "https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/"
  - text: "Repository GitHub Ufficiale con i modelli"
    url: "https://github.com/lllyasviel/ControlNet"
related:
  - "checkpoint"
  - "unet"
  - "conditioning"
---

**ControlNet** è una architettura di rete neurale che permette di **condizionare e controllare i modelli di diffusione usando un input visivo**, come un'immagine o una mappa di dati. [1] In parole semplici, è un sistema che si affianca al modello principale (la UNet) e gli fornisce una "guida visiva" extra, molto più precisa e diretta di un semplice prompt testuale. [2]

Pensa al modello di diffusione come a un artista talentuoso ma a cui puoi dare solo istruzioni verbali. ControlNet è come dargli un **tracciato** o uno **schizzo preparatorio**: l'artista manterrà la sua creatività e il suo stile, ma seguirà fedelmente la composizione, la posa o la struttura che gli hai fornito. [2]

### Il Workflow di ControlNet

Un tipico workflow con ControlNet si svolge in due fasi principali:

1.  **Preprocessing (Pre-elaborazione):**
    Si parte da un'immagine di input. Questa immagine viene processata da un **preprocessore**, un algoritmo che ne estrae una "mappa" di informazioni specifiche. Questa mappa è ciò che verrà usato come guida. Esistono molti tipi di preprocessori, ognuno specializzato in un tipo di controllo diverso. [3]

2.  **Applicazione del Modello ControlNet:**
    La mappa generata viene passata a un modello ControlNet specifico, addestrato per "capire" quel tipo di mappa. Questo modello ControlNet lavora in parallelo alla UNet del checkpoint principale, iniettando la sua guida visiva ad ogni step del processo di denoising per forzare il risultato a rispettare la mappa. [1]

### Esempi di Preprocessori e Modelli Comuni

- **Canny:**
    È un algoritmo di **rilevamento dei bordi** (edge detection). Il preprocessore `Canny` prende un'immagine e la trasforma in un disegno al tratto in bianco e nero, evidenziando solo i contorni degli oggetti. [3] È estremamente utile per replicare la composizione esatta di una foto o di un disegno.

- **Depth (Profondità):**
    Il preprocessore `Depth` analizza un'immagine e crea una **mappa di profondità**, dove i colori (solitamente dal bianco al nero) indicano quali oggetti sono più vicini o più lontani dalla "camera". [3] Questo permette di trasferire la disposizione 3D di una scena a un'immagine completamente diversa.

- **OpenPose:**
    Questo preprocessore rileva lo "scheletro" di una o più persone in un'immagine, creando una mappa con la **posa esatta** di ogni figura. È lo strumento definitivo per controllare la postura e la posizione dei personaggi.

- **Scribble / Sketch:**
    Permette di usare un semplice scarabocchio o un disegno fatto a mano come guida per la composizione generale dell'immagine.

ControlNet ha aperto la porta a un livello di controllo e coerenza prima impensabile, diventando uno strumento indispensabile per l'animazione, il design e qualsiasi applicazione che richieda risultati precisi e riproducibili.