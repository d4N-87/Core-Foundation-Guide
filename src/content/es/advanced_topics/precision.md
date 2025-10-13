---
title: 'Precisión: FP32, FP16, FP8, FP4 y el Papel de la GPU'
category: Advanced Topics
sources:
  - text: Explicación de los tipos de datos de punto flotante - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic'
  - text: Guía de Precisión Mixta - Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/optimization/fp16'
  - text: Introducción a los formatos de 8 bits (FP8) - Blog de NVIDIA
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  - text: Arquitectura NVIDIA Ampere (Serie 30) y los Tensor Cores de 3ª generación
    url: >-
      https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/
related:
  - checkpoint
  - unet
  - gguf
---

La **precisión** de un modelo se refiere al formato numérico utilizado para almacenar sus "pesos". Estos pesos son números reales, y las computadoras los representan utilizando un sistema llamado **Punto Flotante** (de ahí el acrónimo **FP**). [1]

El número que sigue al acrónimo (por ejemplo, FP**32**, FP**16**) indica cuántos **bits** de memoria se utilizan para representar un solo número. Cuantos más bits se utilicen, más preciso será el número, pero más espacio ocupará y más lento será de procesar. La elección de la precisión es, por lo tanto, un compromiso fundamental entre la calidad, la velocidad y el consumo de memoria (VRAM).

### El Vínculo Indisoluble con el Hardware (GPU)

La elección de la precisión no es solo software: el rendimiento depende críticamente del **soporte de hardware nativo** de tu GPU. Si una GPU no admite de forma nativa un formato de baja precisión, debe emularlo por software, lo que resulta en un menor rendimiento. [4]

Las GPU modernas, especialmente las de NVIDIA, incluyen hardware especializado llamado **Tensor Cores**, diseñado para acelerar drásticamente los cálculos de precisión reducida. [4]

### Formatos Comunes y Soporte de Hardware (Ejemplos de GeForce)

1.  **FP32 (Precisión Completa - 32 bits):**
    Es la "máxima calidad". Cada número ocupa 32 bits de memoria. Es el estándar con el que se entrenan los modelos, pero es muy pesado de ejecutar para la inferencia. [2] Un modelo rara vez se utiliza por completo en FP32 para generar imágenes. Todas las GPU lo admiten.

2.  **FP16 (Media Precisión - 16 bits):**
    El estándar de oro para la inferencia. Reduce a la mitad la VRAM y duplica (o más) la velocidad en comparación con FP32, con una pérdida de calidad casi imperceptible. [2] La compatibilidad en este caso también se puede encontrar con GPU no tan recientes. [4]

3.  **BF16 (Bfloat16 - 16 bits):**
    Un formato alternativo de 16 bits, más robusto durante el entrenamiento. Soportado de forma nativa por las series **Ampere (RTX 30)** y posteriores.

### Cuantización y Soporte de Hardware Avanzado

La **cuantización** convierte los pesos a formatos aún más bajos (8 o 4 bits). Aquí, el soporte de hardware se vuelve aún más crítico.

- **FP8 / INT8 (8 bits):**
    Representa un gran avance en términos de eficiencia. La aceleración de hardware para FP8 es una característica principal de las arquitecturas más recientes, como **Ada Lovelace (RTX 40)** que introduce soporte nativo, garantizando un aumento significativo del rendimiento con este formato. [3] Las tarjetas más antiguas pueden ejecutarlo, pero con una eficiencia mucho menor.

    ### Una Mirada más Profunda a FP8

    El término `FP8` en realidad describe una familia de formatos. La principal diferencia radica en cómo se asignan los 8 bits disponibles entre el **Exponente** (que determina el rango de valores posibles) y la **Mantisa** (que determina la precisión entre un valor y otro). Los dos estándares principales son:

    - **`E4M3`**: Utiliza 4 bits para el exponente y 3 para la mantisa. Ofrece un buen equilibrio entre rango y precisión, y a menudo se utiliza para almacenar los pesos del modelo.
    - **`E5M2`**: Utiliza 5 bits para el exponente y 2 para la mantisa. Tiene un rango dinámico más amplio pero menos precisión. Se utiliza normalmente para los gradientes durante el entrenamiento.

    **FP8 Scaled** no es un formato en sí mismo, sino que describe la técnica de utilizar un factor de escala para optimizar la conversión de los pesos a formato FP8, maximizando la precisión en el rango de valores más importante. Las GPU modernas como la serie RTX 40 gestionan estos factores de escala de manera muy eficiente.

- **4 bits (por ejemplo, NF4):**
    Una forma de cuantización extrema, el rendimiento depende en gran medida de las implementaciones de software optimizadas que aprovechan al máximo las capacidades generales de la GPU. El soporte de hardware llegó con **Blackwell (RTX 50)**.

