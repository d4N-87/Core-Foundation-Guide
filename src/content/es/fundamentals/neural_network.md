---
title: 'Red Neuronal: El Cerebro Artificial'
category: Fundamentals
sources:
  - text: ¿Qué es una Red Neuronal? - IBM
    url: 'https://www.ibm.com/it-it/topics/neural-networks'
  - text: Explicación de las Redes Neuronales - Wikipedia
    url: 'https://it.wikipedia.org/wiki/Rete_neurale_artificiale'
related:
  - deep_learning
  - inferenza
  - unet
---

Una **Red Neuronal Artificial** es un modelo computacional inspirado en la estructura y el funcionamiento del cerebro humano. [1] Es el bloque de construcción fundamental de casi todos los sistemas modernos de inteligencia artificial, incluidos los modelos que generan imágenes.

Piensa en una red neuronal como un sistema de **neuronas artificiales** (llamadas "nodos") organizadas en **capas**. [2]

### ¿Cómo funciona (de forma sencilla)?

1.  **Capa de Entrada:** Recibe los datos iniciales. En nuestro caso, podría ser la representación numérica de un prompt o los píxeles de una imagen.
2.  **Capas Ocultas:** Son las capas intermedias donde tiene lugar el verdadero "procesamiento". Cada neurona recibe señales de las neuronas de la capa anterior, realiza un pequeño cálculo y pasa su resultado a las de la capa siguiente. Durante el entrenamiento, la red aprende a ajustar las "conexiones" (los "pesos") entre estas neuronas para reconocer patrones cada vez más complejos. [1]
3.  **Capa de Salida:** Produce el resultado final. Por ejemplo, la predicción del ruido a eliminar de una imagen.

Una red con muchas capas ocultas se denomina **Red Neuronal Profunda**, y el campo que la estudia es el **Aprendizaje Profundo**. [1]

Los modelos que utilizamos, como la **UNet** o **CLIP**, son ejemplos extremadamente grandes y complejos de redes neuronales, con miles de millones de conexiones optimizadas para sus tareas específicas.
