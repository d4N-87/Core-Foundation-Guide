---
title: 'LoRa: Modificadores de Estilo Ligeros'
category: System Anatomy
sources:
  - text: >-
      Artículo Original: LoRA: Adaptación de Bajo Rango de Grandes Modelos de
      Lenguaje
    url: 'https://arxiv.org/abs/2106.09685'
  - text: Guía de las LoRa en Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Explicación técnica de las LoRa en Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/training/lora'
related:
  - checkpoint
  - unet
  - clip
---

Una **LoRa (Adaptación de Bajo Rango)** es un pequeño archivo que aplica modificaciones específicas a un modelo de punto de control completo, sin alterarlo permanentemente. [1] Piensa en una LoRa como un **conjunto de instrucciones adicionales** o un **filtro transparente** que pones sobre el "cerebro" principal (el punto de control) para que adopte un estilo específico, replique un personaje o un concepto. [2]

La principal ventaja de las LoRa es su **tamaño reducido**. Mientras que un punto de control completo puede pesar varios gigabytes, una LoRa suele pesar solo unos pocos megabytes (de 2 a 200 MB). [3] Esto las hace fáciles de descargar, compartir y utilizar.

### ¿Cómo funcionan?

En lugar de reentrenar todo el modelo (un proceso costoso), una LoRa se entrena para "interceptar" y modificar solo una pequeña parte de los pesos de la UNet y del Codificador de Texto. [3] Cuando aplicas una LoRa, sus pequeños pesos se suman a los del modelo principal durante la generación, influyendo en el resultado final.

### Tipos comunes de LoRa

Las LoRa son increíblemente versátiles y pueden entrenarse para diferentes propósitos:

1.  **Estilo (LoRa de Estilo):**
    Estas LoRa enseñan al modelo un estilo artístico específico (por ejemplo, "estilo Ghibli", "pixel art", "pintura al óleo barroca"). Son de las más populares. [2]

2.  **Personaje (LoRa de Personaje):**
    Entrenadas con imágenes de un personaje específico (real o de ficción), permiten insertar ese personaje en cualquier escena con una buena consistencia.

3.  **Concepto (LoRa de Concepto):**
    Pueden enseñar al modelo un concepto más abstracto, como una pose particular, un tipo de ropa o un objeto específico.

### Uso en ComfyUI

En ComfyUI, las LoRa se cargan a través de un nodo `Load LoRA` que normalmente se inserta entre el `Load Checkpoint` y el `KSampler`. Este nodo toma como entrada el modelo y el CLIP del punto de control y devuelve una versión "modificada" de ambos, lista para ser utilizada en el resto del flujo de trabajo.

También es posible **combinar varias LoRa** (un proceso llamado *apilamiento*), aplicando diferentes filtros en secuencia, aunque esto puede llevar a resultados impredecibles si las LoRa entran en conflicto entre sí.
