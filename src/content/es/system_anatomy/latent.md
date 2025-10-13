---
title: 'Espacio Latente: El Mundo Comprimido de las Imágenes'
category: System Anatomy
sources:
  - text: >-
      Artículo original de Stable Diffusion (Síntesis de Imágenes de Alta
      Resolución con Modelos de Difusión Latente)
    url: 'https://arxiv.org/abs/2112.10752'
  - text: Explicación del Espacio Latente en el blog de Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-latent-space'
  - text: Artículo ilustrado sobre Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - vae
  - unet
  - diffusion_model
---

El **Espacio Latente** es una representación comprimida y de baja resolución de una imagen. Es un "mundo" intermedio en el que los modelos de difusión como Stable Diffusion realizan la mayor parte de su trabajo. [1]

Piensa en una imagen de alta resolución como una carpeta llena de miles de archivos. Trabajar en cada archivo individual sería lento y costoso. El espacio latente es como un **archivo ZIP** de esa carpeta: contiene toda la información esencial, pero en un formato mucho más pequeño y ligero. [2]

El proceso de difusión (el "denoising" realizado por la UNet) no se produce en los píxeles de la imagen final, sino en esta versión comprimida, la "representación latente". [3]

### ¿Por qué trabajar en el espacio latente?

La razón es una sola: la **eficiencia**. [1]
- **Velocidad:** Realizar el proceso de denoising en una pequeña representación latente (por ejemplo, 64x64) es **órdenes de magnitud más rápido** que hacerlo en una imagen de resolución completa (por ejemplo, 512x512).
- **Menos recursos:** Requiere mucha menos memoria (VRAM) y potencia de cálculo.

Esta fue la innovación clave de los "Modelos de Difusión Latente" (LDM), la familia de modelos a la que pertenece Stable Diffusion. [1] Hicieron posible ejecutar modelos potentes en hardware de consumo.

### El papel del VAE

¿Cómo se pasa del mundo de los píxeles al mundo latente y viceversa? Aquí es donde entra en juego el **VAE (Autoencoder Variacional)**:

1.  **Codificador del VAE:** Cuando se utiliza una imagen de entrada (img2img), el codificador del VAE toma la imagen en píxeles y la **comprime** en su representación latente.
2.  **Decodificador del VAE:** Al final del proceso de denoising, el decodificador del VAE toma la representación latente "limpia" y la **descomprime** en la imagen final en píxeles que vemos. [3]

En ComfyUI, el nodo `Empty Latent Image` crea un punto de partida vacío en este espacio latente, listo para ser procesado por la UNet.

En resumen, el espacio latente es la ingeniosa "oficina" en la que la UNet trabaja de forma rápida y eficiente, dejando al VAE la tarea de hacer de "portero" entre esta oficina y el mundo exterior de los píxeles.
