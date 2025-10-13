---
title: 'Punto de Control: El Cerebro del Modelo'
category: System Anatomy
sources:
  - text: ¿Qué son los Modelos de Stable Diffusion? - Stable Diffusion Art
    url: 'https://stablediffusionart.com/models/'
  - text: Explicación de los formatos .ckpt y .safetensors - Hugging Face
    url: 'https://huggingface.co/docs/safetensors/index'
  - text: Guía de los diferentes tipos de modelos de IA
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Introducción a los Modelos Destilados (SDXL Turbo)
    url: 'https://stability.ai/news/sdxl-turbo'
related:
  - unet
  - clip
  - vae
  - lora
---

El término **Punto de Control** (o *Modelo*) se refiere a los archivos que contienen los "pesos" de la red neuronal, es decir, el **cerebro entrenado** de la inteligencia artificial. [1] Cargar un punto de control es el primer paso de cualquier flujo de trabajo, pero la forma en que se hace refleja dos enfoques principales: monolítico y modular.

### 1. El Enfoque Monolítico (Tradicional)

En este enfoque, un único archivo de punto de control (con extensión `.ckpt` o `.safetensors`) contiene los tres componentes clave necesarios para la generación: [3]
- La **UNet**, el corazón del modelo de difusión.
- El **Codificador de Texto** (CLIP), para interpretar el prompt.
- El **VAE**, para crear la imagen final.

Este método es simple y directo: cargas un archivo y tienes todo lo que necesitas. Es muy común para los modelos basados en Stable Diffusion 1.5.

### 2. El Enfoque Modular (Moderno)

Con la llegada de modelos más complejos como FLUX.1 y la flexibilidad de interfaces como ComfyUI, se ha vuelto común cargar los componentes por separado. En este escenario, no cargas un único "punto de control", sino sus partes constitutivas:
- Un archivo para la **UNet** (a menudo llamado "modelo base" o "modelo de difusión").
- Uno o más archivos para el **Codificador de Texto CLIP** (FLUX.1 incluso utiliza dos).
- Un archivo para el **VAE**.

Este enfoque ofrece una enorme flexibilidad: puedes, por ejemplo, utilizar la UNet de un modelo con el VAE de otro para corregir problemas de color, o experimentar con diferentes Codificadores de Texto. [1]

**Entonces, ¿sigue teniendo sentido hablar de Puntos de Control?**
Sí. El término "punto de control" todavía se utiliza comúnmente en la comunidad para referirse al archivo principal del modelo, especialmente la **UNet**. Cuando descargas un modelo "afinado" de Civitai, estás descargando principalmente una UNet modificada, que puedes utilizar tanto de forma monolítica (si lo contiene todo) como modular, combinándola con el CLIP y el VAE de tu elección.

### La Jerarquía de los Modelos

Podemos clasificar los modelos en una especie de jerarquía:

1.  **Modelos Base:**
    Son los cimientos. Publicados por laboratorios de investigación (por ejemplo, Stability AI, Black Forest Labs), se entrenan con enormes conjuntos de datos genéricos. Son muy potentes pero a menudo no tienen un estilo artístico definido. Ejemplos: `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Modelos Afinados:**
    Son modelos base que la comunidad ha entrenado aún más con conjuntos de datos más pequeños y específicos para lograr un estilo particular (por ejemplo, fotorrealismo, anime, fantasía). La gran mayoría de los modelos en sitios como Civitai entran en esta categoría. [1, 3]

3.  **Modelos Personalizados (Fusión):**
    Estos no se entrenan, sino que se crean **mezclando los pesos** de dos o más modelos afinados. Es una técnica muy popular para combinar los estilos de diferentes modelos y crear uno nuevo y único. Es más un arte que una ciencia, y los resultados pueden variar. [3]

4.  **Modelos Destilados:**
    Son una categoría especial. Un modelo "destilado" es una versión más pequeña y rápida de un modelo base, creada con un proceso de entrenamiento que "destila" el conocimiento del modelo más grande. El ejemplo más famoso es **SDXL Turbo**, que puede generar imágenes de alta calidad en muy pocos pasos (1-4), a costa de una menor flexibilidad. [4] O incluso versiones como FLUX.1 Dev destilada del Pro.

### Formatos: `.ckpt` vs. `.safetensors`

Independientemente del enfoque, los archivos se distribuyen en dos formatos:

- **`.ckpt` (Punto de Control):** El formato original basado en el "pickle" de Python. Potencialmente inseguro, ya que puede contener código ejecutable. [2]
- **`.safetensors` (Tensores Seguros):** El nuevo estándar, más seguro y rápido de cargar, que solo contiene los datos del modelo. [2] **Siempre se recomienda preferir el formato `.safetensors` cuando esté disponible.**
