---
title: "Inpainting & Outpainting: Modificare e Estendere le Immagini"
category: "System Anatomy"
sources:
  - text: "Paper originale sull'Inpainting con i Diffusion Models (Blended Diffusion)"
    url: "https://arxiv.org/abs/2111.14818"
  - text: "Guida pratica all'Inpainting in Automatic1111 (i concetti sono universali)"
    url: "https://stable-diffusion-art.com/inpainting-a-beginners-guide/"
  - text: "Spiegazione dell'Outpainting (o 'Uncrop')"
    url: "https://stable-diffusion-art.com/outpainting/"
related:
  - "denoise"
  - "vae"
  - "controlnet"
---

**Inpainting** e **Outpainting** sono due tecniche potentissime che usano i modelli di diffusione non per creare un'immagine da zero, ma per **modificare o estendere parti specifiche di un'immagine esistente**. [2] Entrambe si basano sullo stesso principio: fornire al modello un'immagine parziale e chiedergli di "riempire" le parti mancanti in modo coerente.

### Inpainting: Ridisegnare l'Interno

L'**Inpainting** (letteralmente "dipingere dentro") consiste nel **sostituire una porzione di un'immagine** con qualcosa di nuovo, generato dall'AI. [1]

Il processo è semplice:
1.  Si parte da un'immagine esistente.
2.  Si crea una **maschera**, ovvero si "colora" l'area che si vuole modificare.
3.  Si fornisce un nuovo prompt che descrive cosa si vuole inserire nell'area mascherata.

Il modello userà l'area non mascherata come contesto per generare il nuovo contenuto, cercando di integrarlo in modo naturale per stile, luci e ombre. [2] È la tecnica perfetta per:
- **Correggere errori:** Rimuovere oggetti indesiderati, sistemare mani deformi.
- **Cambiare dettagli:** Modificare il colore di un vestito, cambiare l'espressione di un volto.
- **Aggiungere elementi:** Inserire un nuovo personaggio o un oggetto in una scena.

### Outpainting: Espandere l'Esterno

L'**Outpainting** (o "uncrop") è il processo inverso: invece di riempire un buco *dentro* l'immagine, si **espande la tela verso l'esterno**, chiedendo all'AI di immaginare e disegnare ciò che c'è oltre i bordi originali. [3]

Il modello usa l'intera immagine originale come contesto per generare i nuovi pixel, estendendo la scena in modo coerente. È una tecnica incredibilmente utile per:
- **Cambiare il formato:** Trasformare un'immagine verticale in una orizzontale per un banner.
- **Correggere inquadrature strette:** "Allontanare la camera" per mostrare più contesto attorno a un soggetto.
- **Creare panorami:** Estendere progressivamente un'immagine in più direzioni per creare paesaggi vasti.

### Il Ruolo Chiave del `Denoise`

In entrambe le tecniche, il parametro **Denoise** è fondamentale. Controlla quanto "potere" ha il modello di ignorare i pixel originali (se presenti nell'area da modificare) e seguire il nuovo prompt.
- Un `denoise` alto darà al modello più libertà creativa.
- Un `denoise` basso cercherà di preservare maggiormente la struttura e i colori dell'area originale.