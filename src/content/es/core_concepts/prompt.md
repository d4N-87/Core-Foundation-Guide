---
title: 'Prompt: Dialogando con la IA'
category: Core Concepts
sources:
  - text: Guía de Prompting en Stable Diffusion Art
    url: 'https://stablediffusionart.com/prompt-guide/'
  - text: Documentación de ComfyUI sobre la Codificación de Texto
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/prompt/'
  - text: Explicación del Prompt Negativo
    url: 'https://stable-diffusion-art.com/negative-prompt/'
related:
  - clip
  - tokens
  - cfg
---

El **Prompt** es la instrucción textual que le proporcionas al modelo para describir la imagen que quieres crear. Es la forma más directa de dialogar con la inteligencia artificial y guiar su creatividad. [1]

En ComfyUI, y en muchas otras interfaces, el prompt se divide en dos partes complementarias:

### 1. Prompt Positivo

Aquí describes **todo lo que quieres ver** en la imagen. No es solo una lista de objetos, sino un conjunto de instrucciones que pueden incluir:
- **Sujeto:** `un león majestuoso`
- **Estilo:** `al estilo de una pintura de acuarela`
- **Artista:** `de Van Gogh`
- **Detalles y Calidad:** `detalles intrincados, enfoque nítido, 4k, iluminación cinematográfica`
- **Composición:** `plano de cuerpo entero, mirando a la cámara`

**Sintaxis para el Peso (Atención):**
Para dar más importancia a una palabra o frase, puedes aumentar su "peso". La sintaxis común, también utilizada en ComfyUI, es `(palabra:peso)`. [2]
- `(ojos azules:1.3)`: Aumenta la importancia de "ojos azules" en un 30%.
- `(rosa roja:0.8)`: Disminuye la importancia de "rosa roja" en un 20%.
- Los paréntesis `()` son un atajo para aumentar el peso (normalmente en 1.1), mientras que `[]` son un atajo para disminuirlo. [1]

### 2. Prompt Negativo

Aquí describes **todo lo que quieres evitar** en la imagen. Es una herramienta muy potente para corregir errores comunes y mejorar la calidad general. [3]

Ejemplos comunes de prompts negativos incluyen:
- **Corregir Deformidades:** `deformado, mutado, desfigurado, extremidades adicionales, mala anatomía`
- **Mejorar la Calidad:** `borroso, granulado, baja resolución, feo, artefactos jpeg`
- **Eliminar Elementos no Deseados:** `texto, marca de agua, firma, nombre de usuario`
- **Excluir Estilos:** `dibujos animados, anime, render 3d`

Usar un buen prompt negativo es a menudo tan importante como escribir un buen prompt positivo para obtener resultados de alta calidad. [3]
