---
title: "Prompt: Dialogare con l'AI"
category: "Core Concepts"
sources:
  - text: "Guida al Prompting su Stable Diffusion Art"
    url: "https://stablediffusionart.com/prompt-guide/"
  - text: "Documentazione di ComfyUI sul Text Encode"
    url: "https://comfyanonymous.github.io/ComfyUI_examples/prompt/"
  - text: "Spiegazione del Negative Prompt"
    url: "https://stable-diffusion-art.com/negative-prompt/"
related:
  - "clip"
  - "tokens"
  - "cfg"
---

Il **Prompt** è l'istruzione testuale che fornisci al modello per descrivere l'immagine che vuoi creare. È il modo più diretto per dialogare con l'intelligenza artificiale e guidare la sua creatività. [1]

In ComfyUI, e in molte altre interfacce, il prompt è diviso in due parti complementari:

### 1. Positive Prompt (Prompt Positivo)

Qui descrivi **tutto ciò che vuoi vedere** nell'immagine. Non è solo una lista di oggetti, ma un insieme di istruzioni che possono includere:
- **Soggetto:** `a majestic lion` (un leone maestoso)
- **Stile:** `in the style of a watercolor painting` (nello stile di un dipinto ad acquerello)
- **Artista:** `by Van Gogh` (di Van Gogh)
- **Dettagli e Qualità:** `intricate details, sharp focus, 4k, cinematic lighting` (dettagli intricati, messa a fuoco nitida, 4k, illuminazione cinematografica)
- **Composizione:** `full body shot, looking at the camera` (inquadratura a corpo intero, che guarda verso la camera)

**Sintassi per il Peso (Attention):**
Per dare più importanza a una parola o a una frase, puoi aumentarne il "peso". La sintassi comune, usata anche in ComfyUI, è `(parola:peso)`. [2]
- `(blue eyes:1.3)`: Aumenta l'importanza di "occhi blu" del 30%.
- `(red rose:0.8)`: Diminuisce l'importanza di "rosa rossa" del 20%.
- Le parentesi `()` sono una scorciatoia per aumentare il peso (solitamente di 1.1), mentre `[]` sono una scorciatoia per diminuirlo. [1]

### 2. Negative Prompt (Prompt Negativo)

Qui descrivi **tutto ciò che vuoi evitare** nell'immagine. È uno strumento potentissimo per correggere errori comuni e migliorare la qualità generale. [3]

Esempi comuni di prompt negativi includono:
- **Correggere Deformità:** `deformed, mutated, disfigured, extra limbs, bad anatomy` (deforme, mutato, sfigurato, arti extra, anatomia errata)
- **Migliorare la Qualità:** `blurry, grainy, low resolution, ugly, jpeg artifacts` (sfocato, sgranato, bassa risoluzione, brutto, artefatti jpeg)
- **Rimuovere Elementi Indesiderati:** `text, watermark, signature, username` (testo, watermark, firma, nome utente)
- **Escludere Stili:** `cartoon, anime, 3d render` (cartone, anime, rendering 3d)

Usare un buon prompt negativo è spesso tanto importante quanto scrivere un buon prompt positivo per ottenere risultati di alta qualità. [3]