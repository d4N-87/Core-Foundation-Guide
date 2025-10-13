---
title: 'Seed: The Control of Randomness'
category: Core Concepts
sources:
  - text: Guide to Seed on Stable Diffusion Art
    url: 'https://stablediffusionart.com/seed/'
  - text: PyTorch documentation on random number generation
    url: 'https://pytorch.org/docs/stable/notes/randomness.html'
related:
  - steps
  - sampler
---

The **Seed** is a number that initializes the state of randomness for the generation of an image. Think of it as the **unique identification code** of an image. [1]

The diffusion process starts from an image of pure random noise. The seed is the number that determines the exact pattern of that initial noise. If all other parameters (prompt, steps, CFG, etc.) remain identical, using the same seed will produce **exactly the same image**. [1, 2]

### What is the Seed for?

1.  **Reproducibility:** It is the fundamental tool for obtaining consistent results. If you find an image you like, saving its seed allows you to recreate it or modify it starting from a certain base.
2.  **Controlled Variation:** By changing the seed by just one digit (e.g., from 100 to 101), you will get a completely different image, while maintaining the same general "style" dictated by the other parameters.
3.  **Debug and Comparison:** To compare the effect of two different samplers or a different CFG, it is essential to use the same seed. This way, you are sure that the differences you see are caused only by the parameter you changed and not by randomness.

**Special Value: -1**
In most interfaces (including ComfyUI), setting the seed to `-1` has a special meaning: "choose a random seed for each generation". [1] This is useful when you want to explore many different variations of a prompt.
