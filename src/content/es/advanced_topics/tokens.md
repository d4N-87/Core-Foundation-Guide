---
title: 'Tokens: Los Bloques de Construcción del Lenguaje'
category: Advanced Topics
sources:
  - text: Introducción a la Tokenización - Hugging Face
    url: 'https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt'
  - text: Anuncio del modelo FLUX.1 por Black Forest Labs
    url: 'https://blackforestlabs.ai/announcing-flux/'
  - text: Explicación de los Tokens en el contexto de Stable Diffusion
    url: 'https://stable-diffusion-art.com/token/'
related:
  - clip
  - prompt
  - attention
---

Los **Tokens** son las unidades fundamentales en las que se descompone un texto antes de ser procesado por un modelo de lenguaje como CLIP. [1] Son los "bloques de construcción" con los que el modelo lee y comprende nuestro prompt.

Un token **no es necesariamente una palabra completa**. El proceso de **Tokenización** utiliza un vocabulario predefinido para dividir el texto en trozos que el modelo conoce. [3]

### Ejemplos de Tokenización

Consideremos la palabra `indescriptiblemente`. Un tokenizador podría descomponerla en varios tokens que conoce:
`in` + `descript` + `ible` + `mente`

- Las **palabras comunes** (por ejemplo, `gato`, `el`, `un`) suelen ser un único token.
- Las **palabras complejas o raras** se descomponen en sub-palabras.
- Los **espacios y la puntuación** se manejan como tokens separados.

Este enfoque permite al modelo manejar un vocabulario prácticamente infinito a partir de un número finito de tokens (generalmente entre 30.000 y 50.000). [1]

### El Límite de Tokens y la Evolución de los Modelos

Cada Codificador de Texto tiene un **límite máximo de tokens** que puede procesar en un solo "trozo". Este límite ha sido durante mucho tiempo una de las principales restricciones en la ingeniería de prompts.

- **Arquitecturas Antiguas (por ejemplo, Stable Diffusion 1.5, SDXL):**
  Estos modelos utilizan Codificadores de Texto (CLIP) con un límite de **75 tokens** por trozo. [3] Si un prompt es más largo, se divide en varios trozos, pero la comprensión del contexto entre un bloque y otro es mucho más débil. Esto ha obligado a los usuarios a concentrar los conceptos más importantes al principio del prompt.

- **Nuevas Arquitecturas (por ejemplo, FLUX.1):**
  Los modelos de nueva generación, como **FLUX.1**, están diseñados para superar esta limitación. FLUX.1 utiliza un Codificador de Texto mucho más potente (basado en T5-XXL) que ha sido entrenado específicamente para comprender prompts largos y complejos de forma nativa. [2] Esto permite una expresión mucho más natural y detallada, sin tener que preocuparse por el límite artificial de 75 tokens.

Comprender el concepto de tokens y las limitaciones de los diferentes modelos es fundamental para escribir prompts eficaces y aprovechar al máximo las capacidades de cada arquitectura.
