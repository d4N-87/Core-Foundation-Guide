---
title: 'Checkpoint: The Brain of the Model'
category: System Anatomy
sources:
  - text: What are Stable Diffusion Models? - Stable Diffusion Art
    url: 'https://stablediffusionart.com/models/'
  - text: Explanation of .ckpt and .safetensors formats - Hugging Face
    url: 'https://huggingface.co/docs/safetensors/index'
  - text: Guide to different types of AI models
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Introduction to Distilled Models (SDXL Turbo)
    url: 'https://stability.ai/news/sdxl-turbo'
related:
  - unet
  - clip
  - vae
  - lora
---

The term **Checkpoint** (or *Model*) refers to the files that contain the "weights" of the neural network, that is, the **trained brain** of the artificial intelligence. [1] Loading a checkpoint is the first step of any workflow, but the way it is done reflects two main approaches: monolithic and modular.

### 1. The Monolithic Approach (Traditional)

In this approach, a single checkpoint file (with extension `.ckpt` or `.safetensors`) contains all three key components necessary for generation: [3]
- The **UNet**, the heart of the diffusion model.
- The **Text Encoder** (CLIP), to interpret the prompt.
- The **VAE**, to create the final image.

This method is simple and direct: you load one file and you have everything you need. It is very common for models based on Stable Diffusion 1.5.

### 2. The Modular Approach (Modern)

With the advent of more complex models like FLUX.1 and the flexibility of interfaces like ComfyUI, it has become common to load the components separately. In this scenario, you don't load a single "checkpoint", but its constituent parts:
- A file for the **UNet** (often called "base model" or "diffusion model").
- One or more files for the **CLIP Text Encoder** (FLUX.1 even uses two).
- A file for the **VAE**.

This approach offers enormous flexibility: you can, for example, use the UNet of one model with the VAE of another to correct color problems, or experiment with different Text Encoders. [1]

**So, does it still make sense to talk about Checkpoints?**
Yes. The term "checkpoint" is still commonly used in the community to refer to the main model file, especially the **UNet**. When you download a "finetuned" model from Civitai, you are primarily downloading a modified UNet, which you can use both monolithically (if it contains everything) and modularly, pairing it with CLIP and VAE of your choice.

### The Hierarchy of Models

We can classify models into a sort of hierarchy:

1.  **Base Models:**
    They are the foundations. Released by research labs (e.g., Stability AI, Black Forest Labs), they are trained on huge and generic datasets. They are very powerful but often do not have a defined artistic style. Examples: `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Finetuned Models:**
    These are base models that the community has further trained on smaller and more specific datasets to achieve a particular style (e.g., photorealism, anime, fantasy). The vast majority of models on sites like Civitai fall into this category. [1, 3]

3.  **Custom Models (Merge):**
    These are not trained, but created by **mixing the weights** of two or more finetuned models. It is a very popular technique for combining the styles of different models and creating a new and unique one. It's more of an art than a science, and the results can vary. [3]

4.  **Distilled Models:**
    They are a special category. A "distilled" model is a smaller and faster version of a base model, created with a training process that "distills" the knowledge of the larger model. The most famous example is **SDXL Turbo**, which can generate high-quality images in very few steps (1-4), at the cost of less flexibility. [4] Or even versions like FLUX.1 Dev distilled from the Pro.

### Formats: `.ckpt` vs. `.safetensors`

Regardless of the approach, the files are distributed in two formats:

- **`.ckpt` (Checkpoint):** The original format based on Python's "pickle". Potentially insecure, as it can contain executable code. [2]
- **`.safetensors` (Safe Tensors):** The new standard, safer and faster to load, which contains only the model's data. [2] **It is always recommended to prefer the `.safetensors` format when available.**
