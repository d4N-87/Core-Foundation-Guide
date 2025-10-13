---
title: 'Latent Space: The Compressed World of Images'
category: System Anatomy
sources:
  - text: >-
      Original paper of Stable Diffusion (High-Resolution Image Synthesis with
      Latent Diffusion Models)
    url: 'https://arxiv.org/abs/2112.10752'
  - text: Explanation of the Latent Space in the Hugging Face blog
    url: 'https://huggingface.co/blog/stable_diffusion#the-latent-space'
  - text: Illustrated article on Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - vae
  - unet
  - diffusion_model
---

The **Latent Space** is a compressed and low-resolution representation of an image. It is an intermediate "world" in which diffusion models like Stable Diffusion perform most of their work. [1]

Think of a high-resolution image as a folder full of thousands of files. Working on each individual file would be slow and expensive. The latent space is like a **ZIP file** of that folder: it contains all the essential information, but in a much smaller and lighter format. [2]

The diffusion process (the "denoising" done by the UNet) does not happen on the pixels of the final image, but on this compressed version, the "latent representation". [3]

### Why Work in the Latent Space?

The reason is one: **efficiency**. [1]
- **Speed:** Performing the denoising process on a small latent representation (e.g., 64x64) is **orders of magnitude faster** than doing it on a full-resolution image (e.g., 512x512).
- **Fewer Resources:** It requires much less memory (VRAM) and computational power.

This was the key innovation of the "Latent Diffusion Models" (LDM), the family of models to which Stable Diffusion belongs. [1] They made it possible to run powerful models on consumer hardware.

### The Role of the VAE

How do you go from the world of pixels to the latent world and vice versa? This is where the **VAE (Variational Autoencoder)** comes in:

1.  **VAE Encoder:** When using an input image (img2img), the VAE's encoder takes the image in pixels and **compresses** it into its latent representation.
2.  **VAE Decoder:** At the end of the denoising process, the VAE's decoder takes the "clean" latent representation and **decomposes** it into the final image in pixels that we see. [3]

In ComfyUI, the `Empty Latent Image` node creates an empty starting point in this latent space, ready to be processed by the UNet.

In summary, the latent space is the ingenious "office" in which the UNet works quickly and efficiently, leaving the VAE the task of acting as a "doorman" between this office and the outside world of pixels.
