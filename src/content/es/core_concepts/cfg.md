---
title: 'CFG: La Escala de Guía'
category: Core Concepts
sources:
  - text: Explicación técnica en Stable Diffusion Art
    url: 'https://stablediffusionart.com/what-is-cfg-scale/'
  - text: 'Artículo Original: Guía de Difusión sin Clasificador'
    url: 'https://arxiv.org/abs/2207.12598'
related:
  - prompt
  - sampler
  - conditioning
---

La **Escala CFG (Classifier-Free Guidance)** es uno de los parámetros más potentes a tu disposición. En términos sencillos, es un mando que controla **con qué fidelidad** debe seguir el modelo las instrucciones de tu prompt. [1]

Piensa en el prompt como un mapa y en el modelo como un explorador. El CFG es el nivel de disciplina del explorador:
- **Un valor bajo** le dice: "Aquí tienes el mapa, pero siéntete libre de explorar los alrededores si encuentras algo interesante". El resultado será más creativo, pero podría ignorar partes del prompt.
- **Un valor alto** le ordena: "¡Sigue este mapa al pie de la letra, sin desviaciones!". El resultado será mucho más fiel al prompt, pero podría perder naturalidad.

### ¿Por qué se llama "Classifier-Free"?

El nombre técnico proviene del hecho de que este método no necesita un modelo "clasificador" externo para guiar la generación, a diferencia de técnicas más antiguas. [2] La guía está integrada en el propio modelo de difusión, lo que lo hace más eficiente.

### Guía práctica de los valores de CFG

- **CFG bajo (1-6):** Máxima libertad creativa.
- **CFG medio (7-12):** El punto de equilibrio ideal. La mayoría de las interfaces utilizan un valor por defecto de alrededor de 7. [1]
- **CFG alto (13-20+):** Adherencia muy estricta al prompt. A valores demasiado altos, la imagen corre el riesgo de "quemarse", con colores y contraste excesivos. [1]

Los modelos destilados tienen un CFG de 1, una condición que hace que el prompt negativo sea inutilizable.

Cada modelo suele tener su propio valor de CFG recomendado.
