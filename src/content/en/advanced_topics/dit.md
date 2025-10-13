---
title: 'DiT: Diffusion Transformers'
category: Advanced Topics
sources:
  - text: 'Original Paper: Scalable Diffusion Models with Transformers'
    url: 'https://arxiv.org/abs/2212.09748'
  - text: 'Announcement of Stable Diffusion 3, based on DiT'
    url: 'https://stability.ai/news/stable-diffusion-3'
  - text: Explanation of the DiT architecture - Hugging Face
    url: 'https://huggingface.co/papers/2212.09748'
related:
  - unet
  - llm
  - diffusion_model
  - attention
---

A **DiT (Diffusion Transformer)** is a new architecture for diffusion models that **replaces the traditional UNet with a Transformer**. [1] It is an evolution that borrows innovations from the world of Large Language Models (LLMs) and applies them to image generation, promising greater scalability and efficiency.

### Why Replace the UNet?

The **UNet** has been the dominant architecture for years, but it has inherent limitations in its ability to "scale", that is, to improve its performance as its size and computational power increase.

The **Transformer** architecture, thanks to its **Attention** mechanism, has proven in LLMs to be incredibly effective at managing and relating large amounts of data. The idea behind DiTs is: "What if we treat an image not as a grid of pixels, but as a sequence of 'patches' (pieces), similar to how a Transformer treats a sequence of words?". [1]

### How Does a DiT Work?

1.  The latent image is broken down into a series of "patches" (visual tokens).
2.  These tokens are processed by a Transformer, which uses the Attention mechanism to understand the relationships between the different parts of the image.
3.  The Transformer, conditioned by the prompt, predicts the noise to be removed from each patch.

This approach has proven to be extremely scalable: the larger and more powerful the Transformer, the better the results, surpassing the performance of traditional UNets with the same resources. [1]

### Concrete Examples and the Future

- **Sora:** OpenAI's revolutionary text-to-video model is based on a DiT architecture.
- **Stable Diffusion 3:** The new version of Stability AI's model abandons the UNet in favor of a DiT architecture, or more precisely **MMDiT (Multi-Modal DiT)**. [2] An MMDiT uses two different Transformers, one to process text data and one for image data, allowing for a much deeper and more accurate understanding of the prompt. [2]

DiTs represent a fundamental step towards increasingly powerful, coherent generation models capable of understanding the complex nuances of human language.
