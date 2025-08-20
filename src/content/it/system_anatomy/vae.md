---
title: "VAE: Il Decodificatore Visivo"
category: "System Anatomy"
sources:
  - text: "Paper Originale: Auto-Encoding Variational Bayes"
    url: "https://arxiv.org/abs/1312.6114"
  - text: "Spiegazione su Hugging Face"
    url: "https://huggingface.co/docs/diffusers/main/en/api/models/autoencoderkl"
related:
  - "latent_space"
  - "checkpoint"
---

Il **VAE (Variational Autoencoder)** è il decodificatore finale del tuo sistema.

Immagina che il modello AI non "pensi" con immagini, ma in un linguaggio matematico astratto, uno **spazio latente**. È come un compositore che scrive uno spartito: lo spartito non è musica, sono simboli su un foglio.

Il VAE è l'orchestra che legge quello spartito e lo trasforma nella sinfonia visiva che vedi sullo schermo. Senza di lui, ti rimarrebbe in mano solo lo spartito (rumore incomprensibile) e non la musica (l'immagine finale).

### A cosa serve concretamente?

- **Da Latenza a Pixel:** La sua funzione primaria è convertire la rappresentazione astratta (tensore latente) generata dal modello in un'immagine reale, con pixel e colori.
- **Compressione:** Può anche fare il contrario, comprimendo un'immagine esistente nella sua rappresentazione latente (processo di encoding).