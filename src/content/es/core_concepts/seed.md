---
title: 'Semilla: El Control de la Aleatoriedad'
category: Core Concepts
sources:
  - text: Guía de la Semilla en Stable Diffusion Art
    url: 'https://stablediffusionart.com/seed/'
  - text: Documentación de PyTorch sobre la generación de números aleatorios
    url: 'https://pytorch.org/docs/stable/notes/randomness.html'
related:
  - steps
  - sampler
---

La **Semilla** (en inglés "Seed") es un número que inicializa el estado de aleatoriedad para la generación de una imagen. Piénsalo como el **código de identificación único** de una imagen. [1]

El proceso de difusión comienza a partir de una imagen de puro ruido aleatorio. La semilla es el número que determina el patrón exacto de ese ruido inicial. Si todos los demás parámetros (prompt, pasos, CFG, etc.) permanecen idénticos, usar la misma semilla producirá **exactamente la misma imagen**. [1, 2]

### ¿Para qué sirve la Semilla?

1.  **Reproducibilidad:** Es la herramienta fundamental para obtener resultados consistentes. Si encuentras una imagen que te gusta, guardar su semilla te permite recrearla o modificarla partiendo de una base segura.
2.  **Variación Controlada:** Cambiando la semilla en un solo dígito (por ejemplo, de 100 a 101), obtendrás una imagen completamente diferente, manteniendo el mismo "estilo" general dictado por los demás parámetros.
3.  **Depuración y Comparación:** Para comparar el efecto de dos muestreadores diferentes o de un CFG diferente, es esencial usar la misma semilla. De esta manera, estás seguro de que las diferencias que ves son causadas solo por el parámetro que has cambiado y no por la aleatoriedad.

**Valor Especial: -1**
En la mayoría de las interfaces (incluida ComfyUI), establecer la semilla en `-1` tiene un significado especial: "elegir una semilla aleatoria para cada generación". [1] Esto es útil cuando quieres explorar muchas variaciones diferentes de un prompt.
