---
title: 'GGUF: Cuantización para CPU y GPU'
category: Advanced Topics
sources:
  - text: Anuncio oficial de GGUF en el blog de Hugging Face
    url: 'https://huggingface.co/blog/gguf'
  - text: Repositorio de GitHub de llama.cpp
    url: 'https://github.com/ggerganov/llama.cpp'
  - text: Ejemplo de un flujo de trabajo en ComfyUI con GGUF Loader
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/llm/'
related:
  - precision
  - llm
  - checkpoint
  - clip
---

**GGUF (Georgi Gerganov Universal Format)** es un formato de archivo diseñado para contener modelos neuronales **cuantizados**, es decir, convertidos a formatos de muy baja precisión (como 4 u 8 bits) para reducir drásticamente su tamaño y consumo de memoria. [1]

Nacido del proyecto **`llama.cpp`** para ejecutar Grandes Modelos de Lenguaje (LLM) en CPU, su uso se ha expandido recientemente al ecosistema de los modelos de difusión de imágenes. [2]

### El propósito principal: reducir el consumo de memoria

La ventaja clave de GGUF es la **cuantización**. Un modelo que en formato FP16 (`.safetensors`) ocuparía 14 GB de VRAM, en formato GGUF cuantizado a 4 bits (`q4_K_M`) puede ocupar menos de 5 GB. Esto permite:
- Ejecutar modelos enormes en GPU con menos VRAM.
- Cargar más componentes en la memoria simultáneamente.
- Ejecutar modelos en CPU de manera eficiente.

### GGUF en el mundo de los LLM (uso clásico)

El uso principal de GGUF es para los modelos de lenguaje. Interfaces como LM Studio u Ollama utilizan archivos GGUF para ejecutar potentes chatbots (como Llama, Mistral) en hardware de consumo, aprovechando principalmente la CPU. [3]

### GGUF en el mundo de la difusión (uso moderno en ComfyUI)

Recientemente, la comunidad ha comenzado a aplicar las ventajas de la cuantización GGUF también a los componentes de procesamiento. En ComfyUI, a través de nodos especializados (`Load GGUF Model`), es posible cargar versiones GGUF de:
- **Codificador de texto (CLIP):** Cargar un CLIP cuantizado reduce significativamente su impacto en la VRAM, liberando recursos preciosos para el modelo UNet. Este es el uso más común y eficaz.
- **UNet:** También existen experimentos para cuantizar toda la UNet en formato GGUF. Aunque esto ofrece el máximo ahorro de memoria, puede llevar a una pérdida de calidad más notable en la imagen final en comparación con el uso de una UNet en formato FP16.

Es una herramienta versátil para la **gestión avanzada de la memoria**, que permite a los usuarios ejecutar flujos de trabajo cada vez más complejos en hardware de consumo, equilibrando hábilmente el compromiso entre el consumo de VRAM y la calidad de la salida.

### Descifrando las nomenclaturas de cuantización (por ejemplo, `Q4_K_M`)

Al descargar un modelo GGUF, el nombre del archivo a menudo contiene un acrónimo que describe el método de cuantización utilizado. Entenderlo ayuda a elegir el equilibrio adecuado entre tamaño y calidad. A continuación se explica cómo leerlo:

- **`Q` seguido de un número (por ejemplo, `Q4`, `Q5`, `Q8`):** Indica el número de **bits** utilizados para cada peso. `Q8` utiliza 8 bits (mayor calidad, archivo más grande), `Q4` utiliza 4 bits (menor calidad, archivo más pequeño).
- **`_K`:** Indica una variante "K-Quant". Es una técnica de cuantización mejorada que intenta preservar mejor la calidad de la información, especialmente para los pesos más importantes. Los modelos `_K` suelen ser la opción recomendada.
- **`_0` o `_1` (por ejemplo, `Q4_0`, `Q5_1`):** Indican diferentes versiones del mismo método. `_0` es la versión "pura" de 4 bits, mientras que `_1` es una versión mixta que utiliza una precisión ligeramente mayor (5 bits) para algunos pesos, ofreciendo una pequeña mejora de calidad con un archivo ligeramente más grande.
- **`_S`, `_M`, `_L` (por ejemplo, `Q4_K_S`):** Indican los tamaños del modelo ("Pequeño", "Mediano", "Grande"). No se refieren a la cuantización en sí, sino a diferentes "tamaños" del modelo original.

**Ejemplos prácticos:**
- **`Q8_0`:** Cuantización de 8 bits. La más alta calidad entre las versiones GGUF, pero también la más pesada.
- **`Q5_K_M`:** Cuantización "K-Quant" de 5 bits, versión "Mediana". Un excelente compromiso entre calidad y tamaño.
- **`Q4_0`:** Cuantización "pura" de 4 bits. La versión más pequeña y ligera, pero con la mayor pérdida de calidad. A menudo se utiliza para ejecutar modelos enormes en hardware muy limitado.
