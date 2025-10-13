---
title: 'Planificador: El Plan de Denoising'
category: Core Concepts
sources:
  - text: Documentación oficial de los Planificadores en Hugging Face Diffusers
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview'
  - text: Explicación de la relación entre el Muestreador y el Planificador
    url: >-
      https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/
  - text: Discusión en ComfyUI sobre la diferencia entre los Planificadores
    url: 'https://github.com/comfyanonymous/ComfyUI/discussions/227'
related:
  - sampler
  - steps
  - karras
---

El **Planificador** es el algoritmo que define la **estrategia** y el **ritmo** del proceso de denoising. [1] Si el Muestreador es la *técnica* con la que el artista pinta, el planificador es su *plan de trabajo*: decide **cuánto ruido eliminar y en qué paso**. [2]

Piensa de nuevo en el escultor. El planificador es su estrategia: "En los primeros 10 pasos, usaré un cincel grande para quitar grandes trozos de mármol y desbastar la forma (quitar mucho ruido). En los siguientes 10, pasaré a un cincel más pequeño para definir los detalles (quitar menos ruido, pero de forma más precisa)." [2]

Este plan no lineal es crucial: quitar grandes cantidades de ruido al principio acelera el proceso, mientras que centrarse en los detalles al final mejora la calidad de la imagen. [1]

### Tipos de Planificadores Comunes en ComfyUI

En ComfyUI, la elección del planificador es independiente de la del muestreador, lo que ofrece un control más granular. [3] Los más comunes son:

- **Normal:** Es el planificador estándar, con una progresión lineal del denoising.
- **Karras:** Propuesto por el investigador Tero Karras, este planificador es muy popular. [3] Utiliza una progresión no lineal que concentra más "trabajo fino" hacia los últimos pasos. [1] Esto a menudo se traduce en imágenes con detalles más finos y una mejor percepción de la calidad. [3]
- **Simple:** Un planificador muy simple que, como dice el creador de ComfyUI, funciona sorprendentemente bien en algunos escenarios. [3]
- **DDIM Uniform:** Un planificador específico para usar en pareja con el muestreador `ddim` para replicar su comportamiento original. [3]

**En resumen:** El **Muestreador** es el *cómo* se elimina el ruido, el **Planificador** es el *cuándo* y *cuánto*. Su combinación determina la eficiencia y la calidad del resultado final.
