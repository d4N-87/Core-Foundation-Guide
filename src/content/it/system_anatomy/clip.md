---
title: "CLIP Text Encoder: Il Traduttore del Prompt"
category: "System Anatomy"
sources:
  - text: "Paper Originale di OpenAI su CLIP"
    url: "https://arxiv.org/abs/2103.00020"
  - text: "Spiegazione di CLIP nel blog di Hugging Face"
    url: "https://huggingface.co/docs/transformers/main/en/model_doc/clip"
  - text: "Articolo illustrato su come funziona Stable Diffusion"
    url: "https://jalammar.github.io/illustrated-stable-diffusion/"
related:
  - "prompt"
  - "tokens"
  - "conditioning"
  - "unet"
---

**CLIP (Contrastive Language-Image Pre-training)** è un modello neurale sviluppato da OpenAI che ha rivoluzionato il modo in cui le AI "comprendono" la relazione tra testo e immagini. [1] All'interno di un modello di diffusione, il suo ruolo è quello di un **traduttore universale**: prende il tuo prompt in linguaggio umano e lo converte in una rappresentazione matematica (chiamata *embedding*) che la UNet può usare come guida. [3]

I termini "Text Encoder" e "CLIP" sono spesso usati in modo intercambiabile. Il primo descrive la *funzione*, il secondo il *nome* del componente che svolge quella funzione.

Senza CLIP, il prompt "un astronauta a cavallo" sarebbe solo una stringa di testo senza senso per la UNet. Grazie a CLIP, quella frase viene trasformata in un insieme di numeri che "descrivono" matematicamente i concetti di "astronauta", "cavallo" e la loro relazione spaziale.

### Come Funziona il Processo di "Traduzione"?

Il nodo `CLIP Text Encode` in ComfyUI esegue un processo in più fasi:

1.  **Tokenizing (Tokenizzazione):**
    Per prima cosa, il prompt viene scomposto in pezzi più piccoli chiamati **Tokens**. [2] Un token non corrisponde necessariamente a una parola. Parole complesse possono essere divise in più token, mentre parole comuni possono essere un singolo token. Ogni modello CLIP ha un limite massimo di token che può processare in una volta (solitamente 75). Se il tuo prompt è più lungo, viene diviso in più "chunk" (pezzi).

2.  **Embedding:**
    Ogni token viene convertito in un vettore numerico. A questo punto, abbiamo una sequenza di numeri che rappresenta il nostro prompt.

3.  **Processing (Attenzione):**
    Questa sequenza di numeri viene processata da un'architettura Transformer. [3] Qui avviene la vera magia: il meccanismo di **Attention (Attenzione)** permette al modello di capire le relazioni tra le parole. Non vede solo "rosso" e "cubo", ma capisce che è il "cubo" a dover essere "rosso". È qui che il peso che diamo alle parole nel prompt (es. `(parola:1.2)`) ha effetto, dicendo al meccanismo di attenzione di "prestare più attenzione" a certi concetti.

Il risultato finale di questo processo è il **Conditioning**, un output che contiene gli embedding del prompt pronti per essere "iniettati" nella UNet e guidare la generazione dell'immagine.

### Modelli Diversi, CLIP Diversi

- **Stable Diffusion 1.5** usa un singolo modello CLIP (OpenCLIP).
- **Stable Diffusion XL (SDXL)** usa una combinazione di due modelli CLIP diversi (OpenCLIP e CLIP ViT-L), permettendogli di comprendere i prompt in modo molto più ricco e sfumato. Questo è uno dei motivi principali della sua superiore qualità.

Questo comporta che più CLIP lavorano insieme, con molti miliardi di parametri e più il risultato sarà in linea col prompt.