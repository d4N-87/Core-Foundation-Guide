---
title: 'Inferencia: Usar el Modelo Entrenado'
category: Fundamentals
sources:
  - text: ¿Qué es la Inferencia? - Amazon Web Services
    url: 'https://aws.amazon.com/it/what-is/inference/'
  - text: Inferencia vs. Entrenamiento - Google Cloud
    url: 'https://cloud.google.com/discover/inference-vs-training?hl=it'
related:
  - rete_neurale
  - deep_learning
  - checkpoint
---

La **Inferencia** es el proceso de **utilizar una red neuronal ya entrenada** para hacer predicciones sobre datos nuevos y nunca antes vistos. [1]

Si el **entrenamiento** es la fase de "estudio" en la que el modelo aprende de los libros (el conjunto de datos), la **inferencia** es el **examen final** en el que debe aplicar lo que ha aprendido para responder a nuevas preguntas. [2]

### El Proceso de Inferencia en la Práctica

Cuando generamos una imagen con Stable Diffusion, estamos realizando un proceso de inferencia:
1.  **Cargar el Modelo:** Tomamos un punto de control (`.safetensors`), que es el resultado de un largo y costoso proceso de entrenamiento.
2.  **Proporcionar una Entrada:** Le damos al modelo datos nuevos que nunca ha visto durante el estudio (nuestro prompt y una imagen de ruido aleatorio).
3.  **El Modelo "Infiere":** La red neuronal procesa la entrada a través de sus capas, utilizando los pesos que ha aprendido, y produce una salida (la predicción del ruido a eliminar).
4.  **Obtenemos una Salida:** Repitiendo este proceso un cierto número de "pasos", obtenemos la imagen final.

### Inferencia vs. Entrenamiento

| Característica | Entrenamiento | Inferencia |
| :--- | :--- | :--- |
| **Propósito** | Enseñar al modelo, crear los "pesos" | Usar el modelo para obtener resultados |
| **Recursos Requeridos** | Enormes (muchas GPU, semanas de tiempo) | Moderados (una sola GPU, segundos/minutos) |
| **Datos** | Gran conjunto de datos etiquetados | Datos de entrada únicos (por ejemplo, un prompt) |
| **¿Quién lo hace?** | Laboratorios de investigación, empresas, la comunidad | ¡El usuario final (nosotros!) |

En resumen, cada vez que pulsamos el botón "Generar", estamos realizando una **inferencia**.
