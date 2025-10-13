---
title: 'Segmentación: Comprendiendo la Escena'
category: System Anatomy
sources:
  - text: Explicación de la Segmentación de Imágenes - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Image_segmentation'
  - text: 'Ejemplos de Modelos de Segmentación (por ejemplo, SAM) - Meta AI'
    url: 'https://ai.meta.com/blog/segment-anything-sam-computer-vision-model/'
  - text: Uso de la Segmentación Semántica en ControlNet
    url: >-
      https://github.com/lllyasviel/ControlNet-v1-1-nightly#controlnet-11-with-semantic-segmentation
related:
  - controlnet
  - inpaint
  - rete_neurale
---

La **Segmentación de Imágenes** es un proceso de Visión por Computadora que consiste en **dividir una imagen en múltiples segmentos o regiones**, asociando cada píxel a una etiqueta de clase específica. [1]

En términos sencillos, es la forma en que una IA "descompone" una imagen para comprender su contenido a un nivel muy detallado. En lugar de ver simplemente "una foto de una calle", un modelo de segmentación ve "estos píxeles son 'carretera', estos son 'cielo', estos son 'árbol' y aquellos son 'automóvil'".

### Tipos de segmentación

Existen varios tipos de segmentación, pero los más comunes son:
- **Segmentación Semántica:** A cada píxel se le asigna una categoría (por ejemplo, "persona", "gato", "hierba"). Todos los objetos de la misma categoría tienen el mismo color en el mapa de segmentación. [3]
- **Segmentación de Instancia:** Es más avanzada. No solo etiqueta los píxeles como "persona", sino que distingue entre "persona 1", "persona 2", etc. Cada *instancia* de un objeto se identifica por separado.

### Aplicaciones en la generación de imágenes

La segmentación se ha convertido en una herramienta muy potente para el control y la modificación de las imágenes generadas:

1.  **ControlNet con Segmentación Semántica:**
    Es posible utilizar un mapa de segmentación como entrada para un modelo de ControlNet. [3] Esto permite dictar la composición de una escena de forma muy precisa. Por ejemplo, se puede proporcionar un mapa con una zona azul en la parte superior (cielo), una verde en la parte inferior (prado) y una marrón en el centro (casa), y el modelo generará una imagen que respete exactamente esa disposición espacial.

2.  **Inpainting Automático y Preciso:**
    Modelos avanzados como el **SAM (Segment Anything Model)** de Meta AI pueden generar máscaras de segmentación increíblemente precisas para cualquier objeto de una imagen con un solo clic. [2] En ComfyUI, esto permite crear flujos de trabajo de inpainting muy potentes: haces clic en un objeto, SAM crea la máscara perfecta para él y puedes modificarlo o reemplazarlo con un prompt, sin tener que dibujar la máscara a mano.

En resumen, la segmentación es una tecnología clave que permite una interacción y manipulación de las imágenes a un nivel de precisión e inteligencia que antes era impensable.
