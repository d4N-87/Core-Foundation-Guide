---
title: 'LLM: Los Grandes Modelos de Lenguaje'
category: Advanced Topics
sources:
  - text: >-
      Artículo que introdujo la arquitectura Transformer: Attention Is All You
      Need
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explicación de los LLM por NVIDIA
    url: 'https://www.nvidia.com/it-it/glossary/large-language-models/'
  - text: ¿Qué es un LLM? - IBM
    url: 'https://www.ibm.com/it-it/topics/large-language-models'
related:
  - gguf
  - clip
  - dit
  - tokens
---

Un **LLM (Large Language Model)**, o Gran Modelo de Lenguaje, es un tipo de red neuronal entrenada con enormes cantidades de datos de texto (libros, artículos, código, conversaciones) con el propósito de **comprender y generar lenguaje humano** de manera coherente y contextualmente relevante. [2, 3]

Ejemplos famosos de LLM incluyen la serie **GPT** de OpenAI (la base de ChatGPT), **Llama** de Meta, **Gemini** de Google y **Claude** de Anthropic.

### ¿Cómo funcionan a nivel conceptual?

En su núcleo, un LLM es un potente **motor de predicción de la siguiente palabra**. [3] Cuando se le proporciona un texto de entrada (un "prompt"), el modelo calcula la probabilidad de qué palabra (o "token") debería venir a continuación, basándose en los patrones lingüísticos que ha aprendido durante el entrenamiento. Repitiendo este proceso miles de veces, es capaz de generar frases, párrafos y documentos enteros.

### La arquitectura clave: el Transformer

La revolución de los LLM fue posible gracias a la invención de la arquitectura **Transformer** en 2017. [1] Su componente fundamental, el mecanismo de **Atención**, permite al modelo ponderar la importancia de las diferentes palabras en el texto de entrada, comprendiendo las relaciones y el contexto incluso a largas distancias. Esto es lo que da a los LLM su extraordinaria capacidad para seguir conversaciones, traducir idiomas y escribir código.

### LLM y generación de imágenes

Aunque están especializados en texto, los LLM están estrechamente relacionados con el mundo de la generación de imágenes de dos maneras:

1.  **El codificador de texto (CLIP):** El componente que interpreta nuestros prompts en los modelos de difusión es, a todos los efectos, un tipo de modelo de lenguaje basado en la arquitectura Transformer. [1]
2.  **Arquitecturas híbridas (DiT):** Las innovaciones en el campo de los LLM, en particular la arquitectura Transformer, también se están adoptando para la generación de imágenes, lo que ha llevado al nacimiento de nuevos y potentes modelos como los **Transformadores de difusión (DiT)**.

Para ejecutar LLM en hardware de consumo, a menudo se utilizan formatos de archivo cuantizados como **GGUF**, que reducen drásticamente su tamaño y consumo de memoria.
