---
title: 'Acondicionamiento: Las Instrucciones para la UNet'
category: System Anatomy
sources:
  - text: Artículo de ControlNet (que habla de 'control condicional')
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Explicación del Acondicionamiento de Texto en Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
  - text: Documentación de ComfyUI que muestra los flujos de Acondicionamiento
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/sdxl/'
related:
  - clip
  - unet
  - controlnet
  - prompt
---

El **Acondicionamiento** es el término técnico que describe los **datos de guía** que se proporcionan a la UNet para influir y controlar el proceso de generación de imágenes. [1]

Piensa en la UNet como un motor potente pero "ciego". Por sí sola, solo sabría cómo eliminar el ruido de forma genérica. El acondicionamiento es el conjunto de **instrucciones y restricciones** que le dicen *cómo* eliminar el ruido para obtener un resultado específico. [2]

En ComfyUI, el acondicionamiento se representa visualmente mediante los **cables amarillos** que conectan los distintos nodos. Estos cables no transportan imágenes, sino estos paquetes de datos de guía. [3]

### Principales tipos de acondicionamiento

Existen varias "fuentes" de acondicionamiento que se pueden combinar para un control granular:

1.  **Acondicionamiento Textual:**
    Es la forma más común de guía. Proviene del **Codificador de Texto CLIP**, que transforma el prompt positivo y negativo en una representación numérica (embedding). Este "paquete" de datos le dice a la UNet qué conceptos, objetos y estilos debe representar. [2]

2.  **Acondicionamiento de Imagen:**
    Esta guía no proviene del texto, sino de una imagen. Es el principio en el que se basa **ControlNet**. Un modelo de ControlNet analiza una imagen de entrada (por ejemplo, una pose, un mapa de profundidad) y la transforma en un acondicionamiento que se añade al del texto. Este tipo de acondicionamiento impone restricciones estructurales y espaciales muy fuertes a la UNet. [1]

3.  **Acondicionamiento Temporal:**
    Es un tipo de acondicionamiento más "interno". En cada paso del muestreo, se pasa a la UNet información sobre el "paso de tiempo" actual (por ejemplo, "estamos en el paso 5 de 20"). Esto le permite saber en qué punto del proceso se encuentra y ajustar su agresividad al eliminar el ruido en consecuencia.

### Combinación de acondicionamientos

La potencia de los flujos de trabajo avanzados como los de ComfyUI reside en la capacidad de manipular y combinar estos flujos de datos. Por ejemplo, es posible:
- **Mezclar** el acondicionamiento de dos prompts diferentes.
- **Aplicar** un ControlNet solo a una parte del prompt.
- **Guiar** la generación con varios ControlNets simultáneamente.

En resumen, cada vez que ves un cable amarillo en ComfyUI, estás viendo un canal de comunicación que lleva instrucciones vitales al corazón del modelo, la UNet.
