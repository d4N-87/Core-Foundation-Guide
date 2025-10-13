---
title: 'VAE: El Decodificador Visual'
category: System Anatomy
sources:
  - text: 'Artículo Original: Auto-Codificador Variacional de Bayes'
    url: 'https://arxiv.org/abs/1312.6114'
  - text: Explicación en Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/models/autoencoderkl'
related:
  - latent_space
  - checkpoint
---

El **VAE (Autoencoder Variacional)** es el decodificador final de tu sistema. [1, 2]

Imagina que el modelo de IA no "piensa" con imágenes, sino en un lenguaje matemático abstracto, un **espacio latente**. Es como un compositor que escribe una partitura: la partitura no es música, son símbolos en una hoja.

El VAE es la orquesta que lee esa partitura y la transforma en la sinfonía visual que ves en la pantalla. Sin él, solo te quedaría la partitura (ruido incomprensible) y no la música (la imagen final).

### ¿Para qué sirve en concreto?

- **De Latencia a Píxeles:** Su función principal es convertir la representación abstracta (tensor latente) generada por el modelo en una imagen real, con píxeles y colores. [2]
- **Compresión:** También puede hacer lo contrario, comprimiendo una imagen existente en su representación latente (proceso de codificación).
