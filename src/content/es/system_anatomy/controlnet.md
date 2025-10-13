---
title: 'ControlNet: Guiando a la IA con Imágenes'
category: System Anatomy
sources:
  - text: >-
      Artículo Original: Añadiendo Control Condicional a los Modelos de Difusión
      de Texto a Imagen
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Guía ilustrada de ControlNet
    url: >-
      https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/
  - text: Repositorio Oficial de GitHub con los modelos
    url: 'https://github.com/lllyasviel/ControlNet'
related:
  - checkpoint
  - unet
  - conditioning
---

**ControlNet** es una arquitectura de red neuronal que permite **condicionar y controlar los modelos de difusión utilizando una entrada visual**, como una imagen o un mapa de datos. [1] En términos sencillos, es un sistema que funciona junto al modelo principal (la UNet) y le proporciona una "guía visual" adicional, mucho más precisa y directa que un simple prompt de texto. [2]

Piensa en el modelo de difusión como un artista talentoso al que solo puedes darle instrucciones verbales. ControlNet es como darle un **calco** o un **boceto preparatorio**: el artista mantendrá su creatividad y su estilo, pero seguirá fielmente la composición, la pose o la estructura que le has proporcionado. [2]

### El flujo de trabajo de ControlNet

Un flujo de trabajo típico con ControlNet se desarrolla en dos fases principales:

1.  **Preprocesamiento:**
    Se parte de una imagen de entrada. Esta imagen es procesada por un **preprocesador**, un algoritmo que extrae de ella un "mapa" de información específica. Este mapa es lo que se utilizará como guía. Existen muchos tipos de preprocesadores, cada uno especializado en un tipo de control diferente. [3]

2.  **Aplicación del modelo ControlNet:**
    El mapa generado se pasa a un modelo de ControlNet específico, entrenado para "entender" ese tipo de mapa. Este modelo de ControlNet trabaja en paralelo con la UNet del punto de control principal, inyectando su guía visual en cada paso del proceso de denoising para forzar al resultado a respetar el mapa. [1]

### Ejemplos de preprocesadores y modelos comunes

- **Canny:**
    Es un algoritmo de **detección de bordes**. El preprocesador `Canny` toma una imagen y la transforma en un dibujo de líneas en blanco y negro, resaltando solo los contornos de los objetos. [3] Es extremadamente útil para replicar la composición exacta de una foto o un dibujo.

- **Profundidad:**
    El preprocesador `Profundidad` analiza una imagen y crea un **mapa de profundidad**, donde los colores (generalmente de blanco a negro) indican qué objetos están más cerca o más lejos de la "cámara". [3] Esto permite transferir la disposición 3D de una escena a una imagen completamente diferente.

- **OpenPose:**
    Este preprocesador detecta el "esqueleto" de una o más personas en una imagen, creando un mapa con la **pose exacta** de cada figura. Es la herramienta definitiva para controlar la postura y la posición de los personajes.

- **Garabato / Boceto:**
    Permite utilizar un simple garabato o un dibujo hecho a mano como guía para la composición general de la imagen.

ControlNet ha abierto la puerta a un nivel de control y coherencia antes impensable, convirtiéndose en una herramienta indispensable para la animación, el diseño y cualquier aplicación que requiera resultados precisos y reproducibles.
