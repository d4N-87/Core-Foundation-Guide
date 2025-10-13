---
title: 'Pasos: Los Pasos de Muestreo'
category: Core Concepts
sources:
  - text: Explicación en el blog de Stable Diffusion Art
    url: 'https://stablediffusionart.com/steps/'
  - text: Documentación de `DDIMScheduler` en Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim'
related:
  - sampler
  - scheduler
  - denoise
---

Los **Pasos** (o pasos de muestreo) indican cuántas veces el modelo "refina" la imagen a partir del ruido puro. Es uno de los parámetros más importantes para equilibrar la calidad y la velocidad de generación. [1]

Imagina a un pintor que parte de un lienzo completamente caótico. Cada "paso" es una pincelada que añade detalles y coherencia, eliminando un poco de caos (denoising) y acercando la imagen a tu prompt.

### ¿Cómo elegir el número de pasos?

- **Pocos Pasos (por ejemplo, 10-15):** La imagen se genera muy rápidamente, pero puede parecer incompleta, poco detallada o "embarrada". Ideal para vistas previas rápidas.
- **Número Estándar (por ejemplo, 20-30):** Es el punto de equilibrio ideal para la mayoría de los modelos y muestreadores. La imagen es de alta calidad y los tiempos de generación son razonables. [1]
- **Muchos Pasos (por ejemplo, 40-100):** Aumentar aún más los pasos conlleva mejoras mínimas (o a veces nulas), pero aumenta drásticamente el tiempo de generación.

**Nota importante:** El efecto de los pasos depende en gran medida del **Muestreador** elegido. Algunos muestreadores (como `DPM++ 2M Karras`) alcanzan una calidad excelente con solo 20 pasos, mientras que otros pueden necesitar 30 o más. [2]

Últimamente se han extendido modelos y LoRas que permiten obtener excelentes resultados incluso con pocos pasos, como Lightv2x.

Cada modelo suele tener un rango de pasos recomendado.
