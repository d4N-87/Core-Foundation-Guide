---
title: 'Denoise: The Strength of Transformation'
category: Core Concepts
sources:
  - text: Guide to Denoising Strength on Stable Diffusion Art
    url: 'https://stablediffusionart.com/denoising-strength/'
  - text: Explanation of Denoise in the context of Img2Img
    url: >-
      https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/
related:
  - steps
  - sampler
  - inpaint
---

The **Denoise** (or *denoising strength*) parameter is a knob that controls **how much of the starting image should be transformed** during the generation process. Its value ranges from 0.0 (no change) to 1.0 (complete change). [1]

Think of a restorer working on an old painting. The `denoise` is their directive:
- **Denoise = 0.1:** "Just give the colors a light refresh, don't touch the drawing." (Minimal changes)
- **Denoise = 0.7:** "Keep the overall composition, but completely repaint the details and style." (Significant transformation)
- **Denoise = 1.0:** "Ignore the old painting and paint a completely new one on the same canvas." (Creation from scratch)

### Two Fundamental Use Scenarios

The behavior of `denoise` changes depending on the starting point:

1.  **Generation from Scratch (Text-to-Image):**
    In a standard workflow, you start with an empty latent image, which is 100% noise. To create a completely new image, the `denoise` must be set to **1.0**. This tells the sampler: "Take 100% of the noise and transform it into an image following the prompt". [1]

2.  **Image Modification (Image-to-Image, Inpainting, Upscaling):**
    Here `denoise` becomes a fundamental creative tool. You start with an existing image (or a low-resolution version) and tell the model to "redraw" it.
    - **Low Values (0.1 - 0.4):** Ideal for upscaling or applying slight style changes, preserving almost all original details. [2]
    - **Medium Values (0.5 - 0.75):** The most common range for img2img. It allows the model to significantly change the style and details, while maintaining the main composition and shapes of the starting image. [2]
    - **High Values (0.8 - 0.99):** The original image is used only as a vague guide for the composition. The result will be very different. [1]

In ComfyUI, `denoise` is an explicit parameter of the `KSampler`, making its role in each step of the generation very clear.
