---
title: 'GGUF: Quantization for CPU and GPU'
category: Advanced Topics
sources:
  - text: Official GGUF announcement on the Hugging Face blog
    url: 'https://huggingface.co/blog/gguf'
  - text: llama.cpp GitHub repository
    url: 'https://github.com/ggerganov/llama.cpp'
  - text: Example of a workflow in ComfyUI with GGUF Loader
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/llm/'
related:
  - precision
  - llm
  - checkpoint
  - clip
---

**GGUF (Georgi Gerganov Universal Format)** is a file format designed to contain **quantized** neural models, that is, converted into very low-precision formats (like 4 or 8 bits) to drastically reduce their size and memory consumption. [1]

Born from the **`llama.cpp`** project to run Large Language Models (LLMs) on CPUs, its use has recently expanded to the ecosystem of image diffusion models. [2]

### The Main Purpose: Reducing Memory Consumption

The key advantage of GGUF is **quantization**. A model that would occupy 14 GB of VRAM in FP16 format (`.safetensors`), can occupy less than 5 GB in GGUF format quantized to 4-bit (`q4_K_M`). This allows for:
- Running huge models on GPUs with less VRAM.
- Loading more components into memory simultaneously.
- Running models on CPUs efficiently.

### GGUF in the World of LLMs (Classic Use)

The primary use of GGUF is for language models. Interfaces like LM Studio or Ollama use GGUF files to run powerful chatbots (like Llama, Mistral) on consumer hardware, mainly leveraging the CPU. [3]

### GGUF in the World of Diffusion (Modern Use in ComfyUI)

Recently, the community has started to apply the advantages of GGUF quantization to processing components as well. In ComfyUI, through specialized nodes (`Load GGUF Model`), it is possible to load GGUF versions of:
- **Text Encoder (CLIP):** Loading a quantized CLIP significantly reduces its impact on VRAM, freeing up precious resources for the UNet model. This is the most common and effective use.
- **UNet:** There are also experiments to quantize the entire UNet in GGUF format. Although this offers the maximum memory savings, it can lead to a more noticeable loss of quality in the final image compared to using a UNet in FP16 format.

It is a versatile tool for **advanced memory management**, allowing users to run increasingly complex workflows on consumer hardware, skillfully balancing the trade-off between VRAM consumption and output quality.

### Deciphering Quantization Nomenclatures (e.g., `Q4_K_M`)

When downloading a GGUF model, the file name often contains an acronym that describes the quantization method used. Understanding it helps to choose the right balance between size and quality. Here's how to read it:

- **`Q` followed by a number (e.g., `Q4`, `Q5`, `Q8`):** Indicates the number of **bits** used for each weight. `Q8` uses 8 bits (higher quality, larger file), `Q4` uses 4 bits (lower quality, smaller file).
- **`_K`:** Indicates a "K-Quant" variant. It is an improved quantization technique that tries to better preserve the quality of information, especially for the most important weights. `_K` models are often the recommended choice.
- **`_0` or `_1` (e.g., `Q4_0`, `Q5_1`):** Indicate different versions of the same method. `_0` is the "pure" 4-bit version, while `_1` is a mixed version that uses a slightly higher precision (5-bit) for some weights, offering a small quality improvement with a slightly larger file.
- **`_S`, `_M`, `_L` (e.g., `Q4_K_S`):** Indicate the model sizes ("Small", "Medium", "Large"). They do not refer to the quantization itself, but to different "sizes" of the original model.

**Practical Examples:**
- **`Q8_0`:** 8-bit quantization. Highest quality among GGUF versions, but also the heaviest.
- **`Q5_K_M`:** "K-Quant" 5-bit quantization, "Medium" version. An excellent compromise between quality and size.
- **`Q4_0`:** "Pure" 4-bit quantization. The smallest and lightest version, but with the greatest loss of quality. Often used to run huge models on very limited hardware.
