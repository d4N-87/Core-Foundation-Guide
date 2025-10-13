---
title: 'Precision: FP32, FP16, FP8, FP4 and the Role of the GPU'
category: Advanced Topics
sources:
  - text: Explanation of floating-point data types - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic'
  - text: Guide to Mixed Precision - Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/optimization/fp16'
  - text: Introduction to 8-bit formats (FP8) - NVIDIA Blog
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  - text: NVIDIA Ampere Architecture (30 Series) and 3rd gen Tensor Cores
    url: >-
      https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/
related:
  - checkpoint
  - unet
  - gguf
---

The **precision** of a model refers to the numerical format used to store its "weights". These weights are real numbers, and computers represent them using a system called **Floating Point** (hence the acronym **FP**). [1]

The number that follows the acronym (e.g., FP**32**, FP**16**) indicates how many **bits** of memory are used to represent a single number. The more bits used, the more precise the number is, but the more space it occupies and the slower it is to process. The choice of precision is therefore a fundamental compromise between quality, speed, and memory consumption (VRAM).

### The Unbreakable Link with Hardware (GPU)

The choice of precision is not just software: performance critically depends on the **native hardware support** of your GPU. If a GPU does not natively support a low-precision format, it must emulate it via software, resulting in lower performance. [4]

Modern GPUs, especially those from NVIDIA, include specialized hardware called **Tensor Cores**, designed to drastically accelerate low-precision calculations. [4]

### Common Formats and Hardware Support (GeForce Examples)

1.  **FP32 (Full Precision - 32-bit):**
    It's the "highest quality". Each number occupies 32 bits of memory. It's the standard on which models are trained, but it's very heavy to run for inference. [2] A model is rarely used entirely in FP32 to generate images. All GPUs support it.

2.  **FP16 (Half Precision - 16-bit):**
    The gold standard for inference. It halves the VRAM and doubles (or more) the speed compared to FP32, with an almost imperceptible loss of quality. [2] Compatibility in this case can also be found with non-recent GPUs. [4]

3.  **BF16 (Bfloat16 - 16-bit):**
    An alternative 16-bit format, more robust during training. Natively supported by the **Ampere (RTX 30)** series and later.

### Quantization and Advanced Hardware Support

**Quantization** converts weights into even lower formats (8 or 4 bits). Here, hardware support becomes even more critical.

- **FP8 / INT8 (8-bit):**
    It represents a huge step forward in terms of efficiency. Hardware acceleration for FP8 is a flagship feature of the latest architectures, such as **Ada Lovelace (RTX 40)** which introduces native support, ensuring a significant performance increase with this format. [3] Older cards can run it, but with much lower efficiency.

    ### A Deeper Look at FP8

    The term `FP8` actually describes a family of formats. The main difference lies in how the 8 available bits are allocated between the **Exponent** (which determines the possible range of values) and the **Mantissa** (which determines the precision between one value and another). The two main standards are:

    - **`E4M3`**: Uses 4 bits for the exponent and 3 for the mantissa. It offers a good balance between range and precision, and is often used to store the model's weights.
    - **`E5M2`**: Uses 5 bits for the exponent and 2 for the mantissa. It has a wider dynamic range but less precision. It is typically used for gradients during training.

    **FP8 Scaled** is not a format in itself, but describes the technique of using a scaling factor to optimize the conversion of weights into FP8 format, maximizing precision in the most important range of values. Modern GPUs like the RTX 40 series handle these scaling factors very efficiently.

- **4-bit (e.g., NF4):**
    An extreme form of quantization, performance strongly depends on optimized software implementations that make the best use of the GPU's general capabilities. Hardware support has arrived with **Blackwell (RTX 50)**.

