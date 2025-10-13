---
title: 'Embedding (Inversión Textual): Enseñando Nuevos Conceptos'
category: System Anatomy
sources:
  - text: 'Artículo Original: Una Imagen Vale una Palabra (Inversión Textual)'
    url: 'https://arxiv.org/abs/2208.01618'
  - text: Explicación de los Embeddings en Stable Diffusion Art
    url: 'https://stablediffusionart.com/embedding/'
  - text: Guía de los Embeddings (TI) en Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
related:
  - clip
  - prompt
  - tokens
  - lora
---

Un **Embedding**, también conocido como **Inversión Textual**, es un pequeño archivo que enseña al modelo un **nuevo concepto visual** asociándolo a una palabra clave específica. [1]

Piense en el modelo CLIP como un enorme diccionario que vincula palabras con ideas visuales. Un embedding es como si pudiera **añadir una nueva palabra a ese diccionario**. [2] Por ejemplo, puede entrenar un embedding con 5-10 fotos de su gato y asociarlo a la palabra clave `ohwx-cat`. A partir de ese momento, cada vez que escriba `ohwx-cat` en su prompt, el modelo sabrá exactamente a qué gato se refiere.

### ¿Cómo funciona?

A diferencia de una LoRa que modifica los pesos de la UNet (el "pintor"), un embedding solo modifica los pesos del Codificador de Texto (el "traductor"). [3] No le enseña al modelo a dibujar con un nuevo estilo, sino que le enseña el significado de una nueva "palabra" (token). [1] El archivo de un embedding es extremadamente pequeño, a menudo de solo unos pocos kilobytes.

### Embedding vs. LoRa

| Característica | Embedding (Inversión Textual) | LoRa |
| :--- | :--- | :--- |
| **Propósito** | Enseñar un nuevo **concepto** (objeto, personaje) | Enseñar un nuevo **estilo** o un personaje complejo |
| **Componente Modificado** | Codificador de Texto (CLIP) | UNet (y a veces el Codificador de Texto) |
| **Tamaño del Archivo** | Muy pequeño (KB) | Pequeño (MB) |
| **Flexibilidad** | Menos flexible, "inyecta" un concepto | Más flexible, puede alterar todo el estilo |

### Tipos comunes de embeddings

- **Estilo:** Aunque menos comunes que las LoRas para este propósito, algunos embeddings pueden replicar estilos artísticos simples.
- **Personaje/Objeto:** El uso más común. Perfectos para crear imágenes consistentes de una persona, un animal o un objeto específico.
- **Embedding Negativo:** Un tipo especial de embedding entrenado con imágenes de baja calidad (por ejemplo, con manos deformes, feas, etc.). Al insertar la palabra clave de este embedding en el *prompt negativo*, la calidad general de la imagen mejora notablemente. Ejemplos famosos son `EasyNegative` o `bad-hands`. [2]

En ComfyUI, los embeddings suelen cargarse en una carpeta específica y luego se invocan simplemente escribiendo su palabra clave (el nombre del archivo) directamente en el prompt.
