---
title: 'UNet: El Corazón del Denoising'
category: System Anatomy
sources:
  - text: Artículo original que introdujo la UNet (para imágenes biomédicas)
    url: 'https://arxiv.org/abs/1505.04597'
  - text: Explicación de la UNet en el contexto de Stable Diffusion - Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-unet'
  - text: Artículo ilustrado sobre la arquitectura de Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - checkpoint
  - diffusion_model
  - conditioning
  - clip
---

La **UNet** es el componente central y más importante de un modelo de difusión como Stable Diffusion. Es la red neuronal que aprende a **eliminar progresivamente el ruido** de una imagen latente, guiada por las instrucciones del prompt. [2, 3]

Si el punto de control es el "cerebro", la UNet es el **lóbulo parietal**, la parte que procesa la información sensorial (el prompt) para crear una representación espacial coherente (la imagen).

### ¿Por qué se llama "U-Net"?

El nombre proviene de su arquitectura, que tiene una característica forma de "U". [1] El proceso de elaboración dentro de la UNet se desarrolla en dos fases principales:

1.  **Codificador (El Descenso):**
    La imagen ruidosa entra en la primera parte de la "U". En cada paso hacia abajo, la red **comprime la imagen**, reduciendo su resolución pero aumentando el número de canales de información. En la práctica, está tratando de "comprender" el contenido de la imagen a un nivel cada vez más abstracto, ignorando los detalles finos para captar las formas y los conceptos principales. [3]

2.  **Decodificador (El Ascenso):**
    Llegada al fondo de la "U" (el *cuello de botella*), la información comprimida comienza a ascender. En cada paso hacia arriba, la red **descomprime la imagen**, aumentando su resolución y utilizando la información abstracta aprendida antes para reconstruir los detalles de forma coherente. Gracias a las "conexiones de salto" que conectan directamente los niveles del descenso con los del ascenso, la red no "olvida" los detalles de baja resolución mientras reconstruye la imagen. [1, 3]

### El papel del acondicionamiento

La UNet no trabaja a ciegas. En cada paso de su proceso, recibe dos entradas fundamentales que la guían (un proceso llamado **acondicionamiento**):
- **El Prompt:** La información proveniente del Codificador de Texto (CLIP) se "inyecta" en la UNet para decirle *qué* dibujar.
- **El Paso de Tiempo:** Un número que indica en qué paso del proceso de denoising se encuentra. Esto permite a la UNet ser más agresiva al principio (cuando hay mucho ruido) y más delicada al final. [2]

En resumen, cuando cargas un modelo base o un punto de control en ComfyUI, la parte más grande e importante de ese archivo es precisamente la UNet.
