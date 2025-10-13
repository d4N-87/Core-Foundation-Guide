---
title: 'Denoise: La Fuerza de la Transformación'
category: Core Concepts
sources:
  - text: Guía de la Fuerza de Denoising en Stable Diffusion Art
    url: 'https://stablediffusionart.com/denoising-strength/'
  - text: Explicación de Denoise en el contexto de Img2Img
    url: >-
      https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/
related:
  - steps
  - sampler
  - inpaint
---

El parámetro **Denoise** (o *fuerza de denoising*) es un mando que controla **cuánta parte de la imagen de partida debe ser transformada** durante el proceso de generación. Su valor va de 0.0 (sin cambios) a 1.0 (cambio completo). [1]

Piensa en un restaurador que trabaja en un cuadro antiguo. El `denoise` es su directiva:
- **Denoise = 0.1:** "Solo dale un ligero retoque a los colores, no toques el dibujo." (Cambios mínimos)
- **Denoise = 0.7:** "Mantén la composición general, pero repinta por completo los detalles y el estilo." (Transformación significativa)
- **Denoise = 1.0:** "Ignora el cuadro antiguo y pinta uno completamente nuevo en el mismo lienzo." (Creación desde cero)

### Dos escenarios de uso fundamentales

El comportamiento del `denoise` cambia según el punto de partida:

1.  **Generación desde cero (Texto a Imagen):**
    En un flujo de trabajo estándar, se parte de una imagen latente vacía, que es 100% ruido. Para crear una imagen completamente nueva, el `denoise` debe establecerse en **1.0**. Esto le dice al muestreador: "Toma el 100% del ruido y transfórmalo en una imagen siguiendo el prompt". [1]

2.  **Modificación de una imagen (Imagen a Imagen, Inpainting, Upscaling):**
    Aquí el `denoise` se convierte en una herramienta creativa fundamental. Se parte de una imagen existente (o de una versión de baja resolución) y se le dice al modelo que la "redibuje".
    - **Valores bajos (0.1 - 0.4):** Ideales para el upscaling o para aplicar ligeros cambios de estilo, conservando casi todos los detalles originales. [2]
    - **Valores medios (0.5 - 0.75):** El rango más común para img2img. Permite al modelo cambiar significativamente el estilo y los detalles, pero manteniendo la composición y las formas principales de la imagen de partida. [2]
    - **Valores altos (0.8 - 0.99):** La imagen original se utiliza solo como una guía vaga para la composición. El resultado será muy diferente. [1]

En ComfyUI, el `denoise` es un parámetro explícito del `KSampler`, lo que deja muy claro su papel en cada paso de la generación.
