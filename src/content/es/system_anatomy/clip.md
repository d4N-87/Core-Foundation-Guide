---
title: 'Codificador de Texto CLIP: El Traductor del Prompt'
category: System Anatomy
sources:
  - text: Artículo Original de OpenAI sobre CLIP
    url: 'https://arxiv.org/abs/2103.00020'
  - text: Explicación de CLIP en el blog de Hugging Face
    url: 'https://huggingface.co/docs/transformers/main/en/model_doc/clip'
  - text: Artículo ilustrado sobre cómo funciona Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - prompt
  - tokens
  - conditioning
  - unet
---

**CLIP (Contrastive Language-Image Pre-training)** es un modelo neuronal desarrollado por OpenAI que ha revolucionado la forma en que las IA "entienden" la relación entre el texto y las imágenes. [1] Dentro de un modelo de difusión, su papel es el de un **traductor universal**: toma tu prompt en lenguaje humano y lo convierte en una representación matemática (llamada *embedding*) que la UNet puede utilizar como guía. [3]

Los términos "Codificador de Texto" y "CLIP" se utilizan a menudo de forma intercambiable. El primero describe la *función*, el segundo el *nombre* del componente que realiza esa función.

Sin CLIP, el prompt "un astronauta a caballo" sería solo una cadena de texto sin sentido para la UNet. Gracias a CLIP, esa frase se transforma en un conjunto de números que "describen" matemáticamente los conceptos de "astronauta", "caballo" y su relación espacial.

### ¿Cómo funciona el proceso de "traducción"?

El nodo `CLIP Text Encode` en ComfyUI realiza un proceso de varias etapas:

1.  **Tokenización:**
    En primer lugar, el prompt se descompone en trozos más pequeños llamados **Tokens**. [2] Un token no corresponde necesariamente a una palabra. Las palabras complejas pueden dividirse en varios tokens, mientras que las palabras comunes pueden ser un único token. Cada modelo CLIP tiene un número máximo de tokens que puede procesar a la vez (normalmente 75). Si tu prompt es más largo, se divide en varios "trozos".

2.  **Embedding:**
    Cada token se convierte en un vector numérico. En este punto, tenemos una secuencia de números que representa nuestro prompt.

3.  **Procesamiento (Atención):**
    Esta secuencia de números es procesada por una arquitectura Transformer. [3] Aquí es donde ocurre la verdadera magia: el mecanismo de **Atención** permite al modelo comprender las relaciones entre las palabras. No solo ve "rojo" y "cubo", sino que entiende que es el "cubo" el que debe ser "rojo". Aquí es donde el peso que le damos a las palabras en el prompt (por ejemplo, `(palabra:1.2)`) tiene efecto, diciéndole al mecanismo de atención que "preste más atención" a ciertos conceptos.

El resultado final de este proceso es el **Acondicionamiento**, una salida que contiene los embeddings del prompt listos para ser "inyectados" en la UNet y guiar la generación de la imagen.

### Diferentes Modelos, Diferentes CLIPs

- **Stable Diffusion 1.5** utiliza un único modelo CLIP (OpenCLIP).
- **Stable Diffusion XL (SDXL)** utiliza una combinación de dos modelos CLIP diferentes (OpenCLIP y CLIP ViT-L), lo que le permite comprender los prompts de una manera mucho más rica y matizada. Esta es una de las principales razones de su calidad superior.

Esto implica que cuantos más CLIPs trabajen juntos, con muchos miles de millones de parámetros, más se ajustará el resultado al prompt.
