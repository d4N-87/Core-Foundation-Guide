---
title: 'Muestreador: La Técnica de Denoising'
category: Core Concepts
sources:
  - text: Guía completa de Muestreadores en Stable Diffusion Art
    url: 'https://stablediffusionart.com/samplers/'
  - text: Explicación y comparación de Muestreadores
    url: 'https://getimg.ai/guides/guide-to-stable-diffusion-samplers'
  - text: Discusión técnica sobre Muestreadores y sus familias
    url: >-
      https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/
related:
  - scheduler
  - steps
  - seed
---

El **Muestreador** (o método de muestreo) es el algoritmo que realiza materialmente el proceso de "denoising" (eliminación de ruido) en cada paso. [1] Si el modelo de IA es el cerebro que predice el ruido a eliminar, el muestreador es la **técnica específica** o el **estilo de pincelada** que el artista utiliza para limpiar la imagen. [2]

Piensa en un bloque de mármol en bruto (la imagen de ruido inicial). Diferentes escultores (los muestreadores) utilizarán diferentes técnicas para llegar a la estatua final, incluso siguiendo el mismo proyecto (el prompt). Algunos serán más rápidos y agresivos, otros más lentos y meticulosos. El resultado final será similar, pero los detalles y la "textura" podrían variar. [3]

### Principales familias de muestreadores

Aunque la lista en ComfyUI es larga, los muestreadores se pueden agrupar en algunas familias principales:

- **Solucionadores de EDO Ancestros (por ejemplo, `Euler`, `Heun`, `LMS`):** Son los métodos más clásicos y sencillos. [1] `Euler` es el más sencillo y rápido. `Heun` es más preciso pero aproximadamente el doble de lento. [1, 2]
- **Muestreadores Ancestrales (por ejemplo, `Euler a`, `DPM2 a`):** Estos muestreadores reinyectan una pequeña cantidad de ruido en cada paso. [1] Esto los hace no deterministas: incluso con la misma semilla, la imagen final puede variar ligeramente. Son excelentes para la exploración creativa. [1]
- **DPM / DPM++ (Solucionadores de Modelos Probabilísticos de Difusión):** Una familia de muestreadores modernos, muy eficientes y populares. [2] Variantes como `DPM++ 2M Karras` suelen recomendarse porque alcanzan una calidad muy alta en pocos pasos (20-30), ofreciendo un excelente equilibrio entre velocidad y calidad. [2]
- **DDIM (Modelos Implícitos de Difusión con Denoising):** Uno de los primeros muestreadores desarrollados para los modelos de difusión, es determinista y fiable, pero a menudo superado en velocidad y eficiencia por los más recientes DPM++. [1]

### ¿Cuál elegir?

No existe un "mejor" muestreador en términos absolutos. La elección depende del modelo que estés utilizando y del resultado que quieras obtener. Una buena estrategia es empezar con un muestreador rápido y de alta calidad como **`DPM++ 2M Karras`** con 20-30 pasos. [2]

**Importante:** El Muestreador trabaja en estrecha colaboración con el **Planificador**, que determina *cuánto* ruido eliminar en cada paso.
