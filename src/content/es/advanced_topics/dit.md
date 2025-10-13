---
title: 'DiT: Los Transformadores de Difusión'
category: Advanced Topics
sources:
  - text: 'Artículo Original: Modelos de Difusión Escalables con Transformadores'
    url: 'https://arxiv.org/abs/2212.09748'
  - text: 'Anuncio de Stable Diffusion 3, basado en DiT'
    url: 'https://stability.ai/news/stable-diffusion-3'
  - text: Explicación de la arquitectura DiT - Hugging Face
    url: 'https://huggingface.co/papers/2212.09748'
related:
  - unet
  - llm
  - diffusion_model
  - attention
---

Un **DiT (Diffusion Transformer)** es una nueva arquitectura para los modelos de difusión que **reemplaza la UNet tradicional por un Transformer**. [1] Es una evolución que toma prestadas las innovaciones del mundo de los Grandes Modelos de Lenguaje (LLM) y las aplica a la generación de imágenes, prometiendo una mayor escalabilidad y eficiencia.

### ¿Por qué reemplazar la UNet?

La **UNet** ha sido la arquitectura dominante durante años, pero tiene limitaciones intrínsecas en su capacidad de "escalar", es decir, de mejorar su rendimiento a medida que aumentan su tamaño y su potencia de cálculo.

La arquitectura **Transformer**, gracias a su mecanismo de **Atención**, ha demostrado en los LLM ser increíblemente eficaz en la gestión y relación de grandes cantidades de datos. La idea detrás de los DiT es: "¿Y si tratamos una imagen no como una cuadrícula de píxeles, sino como una secuencia de 'parches' (trozos), de forma similar a como un Transformer trata una secuencia de palabras?". [1]

### ¿Cómo funciona un DiT?

1.  La imagen latente se descompone en una serie de "parches" (tokens visuales).
2.  Estos tokens son procesados por un Transformer, que utiliza el mecanismo de Atención para comprender las relaciones entre las diferentes partes de la imagen.
3.  El Transformer, condicionado por el prompt, predice el ruido que se debe eliminar de cada parche.

Este enfoque ha demostrado ser extremadamente escalable: cuanto más grande y potente es el Transformer, mejores son los resultados, superando el rendimiento de las UNet tradicionales con los mismos recursos. [1]

### Ejemplos concretos y el futuro

- **Sora:** El revolucionario modelo de texto a vídeo de OpenAI se basa en una arquitectura DiT.
- **Stable Diffusion 3:** La nueva versión del modelo de Stability AI abandona la UNet en favor de una arquitectura DiT, o más precisamente **MMDiT (Multi-Modal DiT)**. [2] Un MMDiT utiliza dos Transformadores diferentes, uno para procesar los datos de texto y otro para los datos de imagen, lo que permite una comprensión mucho más profunda y precisa del prompt. [2]

Los DiT representan un paso fundamental hacia modelos de generación cada vez más potentes, coherentes y capaces de comprender los complejos matices del lenguaje humano.
