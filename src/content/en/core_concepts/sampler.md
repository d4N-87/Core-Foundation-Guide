---
title: 'Sampler: The Denoising Technique'
category: Core Concepts
sources:
  - text: Complete guide to Samplers on Stable Diffusion Art
    url: 'https://stablediffusionart.com/samplers/'
  - text: Explanation and comparison of Samplers
    url: 'https://getimg.ai/guides/guide-to-stable-diffusion-samplers'
  - text: Technical discussion on Samplers and their families
    url: >-
      https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/
related:
  - scheduler
  - steps
  - seed
---

The **Sampler** is the algorithm that actually performs the "denoising" process at each step. [1] If the AI model is the brain that predicts the noise to be removed, the sampler is the **specific technique** or **brushstroke style** that the artist uses to clean the image. [2]

Think of a block of raw marble (the initial noise image). Different sculptors (the samplers) will use different techniques to arrive at the final statue, even following the same project (the prompt). Some will be faster and more aggressive, others slower and more meticulous. The final result will be similar, but the details and "texture" may vary. [3]

### Main Sampler Families

Although the list in ComfyUI is long, the samplers can be grouped into a few main families:

- **Ancestral ODE Solvers (e.g., `Euler`, `Heun`, `LMS`):** These are the most classic and simple methods. [1] `Euler` is the simplest and fastest. `Heun` is more accurate but about twice as slow. [1, 2]
- **Ancestral Samplers (e.g., `Euler a`, `DPM2 a`):** These samplers re-inject a small amount of noise at each step. [1] This makes them non-deterministic: even with the same seed, the final image can vary slightly. They are great for creative exploration. [1]
- **DPM / DPM++ (Diffusion Probabilistic Model Solvers):** A family of modern, very efficient, and popular samplers. [2] Variants like `DPM++ 2M Karras` are often recommended because they achieve very high quality in a few steps (20-30), offering an excellent balance between speed and quality. [2]
- **DDIM (Denoising Diffusion Implicit Models):** One of the first samplers developed for diffusion models, it is deterministic and reliable, but often surpassed in speed and efficiency by the more recent DPM++. [1]

### Which one to choose?

There is no "best" sampler in absolute terms. The choice depends on the model you are using and the result you want to achieve. A good strategy is to start with a fast, high-quality sampler like **`DPM++ 2M Karras`** with 20-30 steps. [2]

**Important:** The Sampler works in close collaboration with the **Scheduler**, which determines *how much* noise to remove at each step.
