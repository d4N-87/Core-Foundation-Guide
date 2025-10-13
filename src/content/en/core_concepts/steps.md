---
title: 'Steps: The Sampling Steps'
category: Core Concepts
sources:
  - text: Explanation in the Stable Diffusion Art blog
    url: 'https://stablediffusionart.com/steps/'
  - text: Documentation of `DDIMScheduler` on Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim'
related:
  - sampler
  - scheduler
  - denoise
---

**Steps** (or sampling steps) indicate how many times the model "refines" the image starting from pure noise. It is one of the most important parameters for balancing quality and generation speed. [1]

Imagine a painter starting from a completely chaotic canvas. Each "step" is a brushstroke that adds details and coherence, removing a bit of chaos (denoising) and bringing the image closer to your prompt.

### How to choose the number of steps?

- **Few Steps (e.g., 10-15):** The image is generated very quickly, but it may appear incomplete, not very detailed, or "muddy". Great for quick previews.
- **Standard Number (e.g., 20-30):** It's the ideal balance point for most models and samplers. The image is of high quality and the generation times are reasonable. [1]
- **Many Steps (e.g., 40-100):** Further increasing the steps leads to minimal improvements (or sometimes none), but drastically increases the generation time.

**Important note:** The effect of the steps depends very much on the **Sampler** chosen. Some samplers (like `DPM++ 2M Karras`) achieve excellent quality with only 20 steps, while others may need 30 or more. [2]

Recently, models and LoRas have become widespread that allow for excellent results even with few steps, such as Lightv2x.

Each model usually has a recommended range of steps.
