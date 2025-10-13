---
title: 'Scheduler: The Denoising Plan'
category: Core Concepts
sources:
  - text: Official documentation of Schedulers on Hugging Face Diffusers
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview'
  - text: Explanation of the relationship between Sampler and Scheduler
    url: >-
      https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/
  - text: Discussion in ComfyUI on the difference between Schedulers
    url: 'https://github.com/comfyanonymous/ComfyUI/discussions/227'
related:
  - sampler
  - steps
  - karras
---

The **Scheduler** is the algorithm that defines the **strategy** and **pace** of the denoising process. [1] If the Sampler is the *technique* with which the artist paints, the scheduler is their *work plan*: it decides **how much noise to remove and at which step**. [2]

Think of the sculptor again. The scheduler is their strategy: "In the first 10 steps, I'll use a large chisel to remove large pieces of marble and rough out the shape (remove a lot of noise). In the next 10, I'll switch to a smaller chisel to define the details (remove less noise, but more precisely)." [2]

This non-linear plan is crucial: removing large amounts of noise at the beginning speeds up the process, while focusing on details at the end improves the quality of the image. [1]

### Common Types of Schedulers in ComfyUI

In ComfyUI, the choice of scheduler is separate from that of the sampler, offering more granular control. [3] The most common are:

- **Normal:** It is the standard scheduler, with a linear progression of denoising.
- **Karras:** Proposed by researcher Tero Karras, this scheduler is very popular. [3] It uses a non-linear progression that concentrates more "fine work" towards the last steps. [1] This often results in images with finer details and a better perception of quality. [3]
- **Simple:** A very simple scheduler that, as the creator of ComfyUI says, works surprisingly well in some scenarios. [3]
- **DDIM Uniform:** A specific scheduler to be used in pair with the `ddim` sampler to replicate its original behavior. [3]

**In summary:** The **Sampler** is *how* the noise is removed, the **Scheduler** is *when* and *how much*. Their combination determines the efficiency and quality of the final result.
