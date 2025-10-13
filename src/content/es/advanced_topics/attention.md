---
title: 'Atención: El Mecanismo de Enfoque'
category: Advanced Topics
sources:
  - text: Artículo 'Attention Is All You Need' que introdujo el Transformer
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explicación ilustrada del mecanismo de Atención
    url: >-
      https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/
related:
  - clip
  - dit
  - tokens
  - prompt
---

La **Atención** (o *Autoatención*) es el mecanismo computacional en el corazón de la arquitectura **Transformer**, que ha revolucionado tanto los modelos de lenguaje (LLM) como, más recientemente, los modelos de difusión (DiT). [1]

En términos simples, la Atención permite a un modelo **ponderar dinámicamente la importancia de las diferentes partes de una entrada** (como las palabras en una oración o los parches en una imagen) para comprender el contexto y las relaciones entre ellas. [2]

### ¿Cómo funciona (conceptualmente)?

Imagina que lees la frase: `Un gato rojo persigue a un ratón gris`.
Cuando el modelo procesa la palabra "rojo", el mecanismo de Atención le permite entender que "rojo" está fuertemente conectado a "gato" y no a "ratón". En la práctica, para cada palabra, la Atención calcula una "puntuación de atención" con respecto a todas las demás palabras de la frase, "enfocándose" en las relaciones más importantes. [2]

Esto es fundamental para resolver ambigüedades y comprender los matices del lenguaje.

### La Atención en la Generación de Imágenes

El mecanismo de Atención es crucial en dos puntos de nuestro flujo de trabajo:

1.  **En el Codificador de Texto CLIP:**
    Cuando CLIP procesa nuestro prompt, la Atención es lo que le permite entender que en `un astronauta a caballo`, es el astronauta quien debe estar sobre el caballo. También es el mecanismo que se ve influenciado cuando aumentamos el peso de una palabra con la sintaxis `(palabra:1.2)`, diciéndole que "preste más atención" a ese concepto.

2.  **En los Transformadores de Difusión (DiT):**
    En modelos como Stable Diffusion 3, la Atención no solo se aplica al texto, sino también a los "tokens visuales" (los parches de la imagen). Esto permite al modelo crear relaciones complejas entre las diferentes partes de la imagen, mejorando drásticamente la coherencia y la composición. Por ejemplo, puede asegurarse de que un reflejo en un espejo corresponda correctamente al objeto reflejado.

En resumen, la Atención es la tecnología que ha permitido a los modelos pasar de una simple "asociación" de palabras a una verdadera "comprensión" del contexto y las relaciones, tanto en el texto como en las imágenes.
