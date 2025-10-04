---
title: "Latent Space: Il Mondo Compresso delle Immagini"
category: "System Anatomy"
sources:
  - text: "Paper originale di Stable Diffusion (High-Resolution Image Synthesis with Latent Diffusion Models)"
    url: "https://arxiv.org/abs/2112.10752"
  - text: "Spiegazione dello Spazio Latente nel blog di Hugging Face"
    url: "https://huggingface.co/blog/stable_diffusion#the-latent-space"
  - text: "Articolo illustrato su Stable Diffusion"
    url: "https://jalammar.github.io/illustrated-stable-diffusion/"
related:
  - "vae"
  - "unet"
  - "diffusion_model"
---

Lo **Spazio Latente (Latent Space)** è una rappresentazione compressa e a bassa risoluzione di un'immagine. È un "mondo" intermedio in cui i modelli di diffusione come Stable Diffusion eseguono la maggior parte del loro lavoro. [1]

Pensa a un'immagine ad alta risoluzione come a una cartella piena di migliaia di file. Lavorare su ogni singolo file sarebbe lento e dispendioso. Lo spazio latente è come un **file ZIP** di quella cartella: contiene tutte le informazioni essenziali, ma in un formato molto più piccolo e leggero. [2]

Il processo di diffusione (il "denoising" fatto dalla UNet) non avviene sui pixel dell'immagine finale, ma su questa versione compressa, la "rappresentazione latente". [3]

### Perché Lavorare nello Spazio Latente?

Il motivo è uno solo: **efficienza**. [1]
- **Velocità:** Eseguire il processo di denoising su una piccola rappresentazione latente (es. 64x64) è **ordini di grandezza più veloce** che farlo su un'immagine a piena risoluzione (es. 512x512).
- **Meno Risorse:** Richiede molta meno memoria (VRAM) e potenza di calcolo.

Questa è stata l'innovazione chiave dei "Latent Diffusion Models" (LDM), la famiglia di modelli a cui appartiene Stable Diffusion. [1] Hanno reso possibile eseguire modelli potentissimi su hardware consumer.

### Il Ruolo del VAE

Come si passa dal mondo dei pixel al mondo latente e viceversa? Qui entra in gioco il **VAE (Variational Autoencoder)**:

1.  **Encoder del VAE:** Quando si usa un'immagine di input (img2img), l'encoder del VAE prende l'immagine in pixel e la **comprime** nella sua rappresentazione latente.
2.  **Decoder del VAE:** Al termine del processo di denoising, il decoder del VAE prende la rappresentazione latente "pulita" e la **decompone** nell'immagine finale in pixel che noi vediamo. [3]

In ComfyUI, il nodo `Empty Latent Image` crea un punto di partenza vuoto in questo spazio latente, pronto per essere processato dalla UNet.

In sintesi, lo spazio latente è l'ingegnoso "ufficio" in cui la UNet lavora in modo rapido ed efficiente, lasciando al VAE il compito di fare da "portiere" tra questo ufficio e il mondo esterno dei pixel.