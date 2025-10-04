---
title: "Denoise: La Forza della Trasformazione"
category: "Core Concepts"
sources:
  - text: "Guida al Denoising Strength su Stable Diffusion Art"
    url: "https://stablediffusionart.com/denoising-strength/"
  - text: "Spiegazione di Denoise nel contesto di Img2Img"
    url: "https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/"
related:
  - "steps"
  - "sampler"
  - "inpaint"
---

Il parametro **Denoise** (o *denoising strength*) è una manopola che controlla **quanta parte dell'immagine di partenza deve essere trasformata** durante il processo di generazione. Il suo valore va da 0.0 (nessun cambiamento) a 1.0 (cambiamento completo). [1]

Pensa a un restauratore che lavora su un vecchio quadro. Il `denoise` è la sua direttiva:
- **Denoise = 0.1:** "Dai solo una leggera rinfrescata ai colori, non toccare il disegno." (Cambiamenti minimi)
- **Denoise = 0.7:** "Mantieni la composizione generale, ma ridipingi completamente i dettagli e lo stile." (Trasformazione significativa)
- **Denoise = 1.0:** "Ignora il vecchio quadro e dipingine uno completamente nuovo sulla stessa tela." (Creazione da zero)

### Due Scenari d'Uso Fondamentali

Il comportamento del `denoise` cambia a seconda del punto di partenza:

1.  **Generazione da Zero (Text-to-Image):**
    In un workflow standard, si parte da un'immagine latente vuota, che è 100% rumore. Per creare un'immagine completamente nuova, il `denoise` deve essere impostato a **1.0**. Questo dice al sampler: "Prendi il 100% del rumore e trasformalo in un'immagine seguendo il prompt". [1]

2.  **Modifica di un'Immagine (Image-to-Image, Inpainting, Upscaling):**
    Qui il `denoise` diventa uno strumento creativo fondamentale. Si parte da un'immagine esistente (o da una versione a bassa risoluzione) e si dice al modello di "ridisegnarla".
    - **Valori Bassi (0.1 - 0.4):** Ideali per upscaling o per applicare lievi cambi di stile, preservando quasi tutti i dettagli originali. [2]
    - **Valori Medi (0.5 - 0.75):** Il range più comune per l'img2img. Permette al modello di cambiare significativamente lo stile e i dettagli, mantenendo però la composizione e le forme principali dell'immagine di partenza. [2]
    - **Valori Alti (0.8 - 0.99):** L'immagine originale viene usata solo come una vaga guida per la composizione. Il risultato sarà molto diverso. [1]

In ComfyUI, il `denoise` è un parametro esplicito del `KSampler`, rendendo chiarissimo il suo ruolo in ogni passaggio della generazione.