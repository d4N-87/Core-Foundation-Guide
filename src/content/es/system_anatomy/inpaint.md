---
title: 'Inpainting y Outpainting: Modificando y Extendiendo Imágenes'
category: System Anatomy
sources:
  - text: >-
      Artículo original sobre Inpainting con Modelos de Difusión (Blended
      Diffusion)
    url: 'https://arxiv.org/abs/2111.14818'
  - text: >-
      Guía práctica de Inpainting en Automatic1111 (los conceptos son
      universales)
    url: 'https://stable-diffusion-art.com/inpainting-a-beginners-guide/'
  - text: Explicación de Outpainting (o 'Uncrop')
    url: 'https://stable-diffusion-art.com/outpainting/'
related:
  - denoise
  - vae
  - controlnet
---

**Inpainting** y **Outpainting** son dos técnicas muy potentes que utilizan modelos de difusión no para crear una imagen desde cero, sino para **modificar o extender partes específicas de una imagen existente**. [2] Ambas se basan en el mismo principio: proporcionar al modelo una imagen parcial y pedirle que "rellene" las partes que faltan de forma coherente.

### Inpainting: Redibujando el interior

El **Inpainting** consiste en **reemplazar una porción de una imagen** por algo nuevo, generado por la IA. [1]

El proceso es sencillo:
1.  Se parte de una imagen existente.
2.  Se crea una **máscara**, es decir, se "colorea" la zona que se quiere modificar.
3.  Se proporciona un nuevo prompt que describe lo que se quiere insertar en la zona enmascarada.

El modelo utilizará la zona no enmascarada como contexto para generar el nuevo contenido, intentando integrarlo de forma natural en cuanto a estilo, luces y sombras. [2] Es la técnica perfecta para:
- **Corregir errores:** Eliminar objetos no deseados, arreglar manos deformes.
- **Cambiar detalles:** Modificar el color de un vestido, cambiar la expresión de un rostro.
- **Añadir elementos:** Insertar un nuevo personaje o un objeto en una escena.

### Outpainting: Expandiendo el exterior

El **Outpainting** (o "uncrop") es el proceso inverso: en lugar de rellenar un hueco *dentro* de la imagen, se **expande el lienzo hacia el exterior**, pidiendo a la IA que imagine y dibuje lo que hay más allá de los bordes originales. [3]

El modelo utiliza toda la imagen original como contexto para generar los nuevos píxeles, extendiendo la escena de forma coherente. Es una técnica increíblemente útil para:
- **Cambiar el formato:** Transformar una imagen vertical en una horizontal para un banner.
- **Corregir encuadres cerrados:** "Alejar la cámara" para mostrar más contexto alrededor de un sujeto.
- **Crear panorámicas:** Extender progresivamente una imagen en varias direcciones para crear paisajes extensos.

### El papel clave del `Denoise`

En ambas técnicas, el parámetro **Denoise** es fundamental. Controla cuánta "potencia" tiene el modelo para ignorar los píxeles originales (si están presentes en la zona a modificar) y seguir el nuevo prompt.
- Un `denoise` alto dará al modelo más libertad creativa.
- Un `denoise` bajo intentará preservar más la estructura y los colores de la zona original.
