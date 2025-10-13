---
title: 'Aprendizaje Profundo: El Aprendizaje Profundo'
category: Fundamentals
sources:
  - text: ¿Qué es el Aprendizaje Profundo? - IBM
    url: 'https://www.ibm.com/it-it/topics/deep-learning'
  - text: 'Aprendizaje Profundo, una explicación sencilla - Intel'
    url: 'https://www.intel.it/content/www/it/it/analytics/deep-learning.html'
related:
  - rete_neurale
  - inferenza
---

El **Aprendizaje Profundo** (Deep Learning) es una subcategoría del Aprendizaje Automático basada en **Redes Neuronales Artificiales Profundas**, es decir, redes neuronales con muchas capas ocultas (de decenas a cientos). [1]

La "profundidad" de la red es lo que le permite aprender a reconocer patrones y jerarquías en los datos de forma automática. [2]

### ¿Cómo funciona el aprendizaje?

Piensa en un niño que aprende a reconocer un gato:
1.  **Primera Capa (Sencilla):** Aprende a reconocer elementos básicos como líneas, bordes y colores.
2.  **Capas Intermedias (Complejas):** Combina estos elementos sencillos para reconocer formas más complejas como orejas puntiagudas, bigotes, ojos.
3.  **Capas Finales (Abstractas):** Combina las formas complejas para llegar al concepto abstracto de "gato".

El Aprendizaje Profundo funciona de manera similar. Durante el **entrenamiento**, la red analiza millones de ejemplos (por ejemplo, imágenes etiquetadas) y ajusta de forma autónoma los "pesos" de las conexiones entre sus neuronas para ser cada vez mejor en la correspondencia de una entrada (una imagen) con una salida correcta (la etiqueta "gato"). [1]

### Aprendizaje Profundo vs. Aprendizaje Automático Tradicional

En el Aprendizaje Automático tradicional, un especialista a menudo tenía que "preprocesar" los datos y extraer manualmente las características importantes para que el modelo las analizara. En el Aprendizaje Profundo, la red neuronal profunda aprende a extraer estas características por sí misma, directamente de los datos brutos. [2]

Todos los modelos de los que hablamos en este manual (Stable Diffusion, CLIP, etc.) son el resultado de aplicaciones extremadamente avanzadas del Aprendizaje Profundo.
