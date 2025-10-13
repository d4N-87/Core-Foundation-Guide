---
title: 'UNet: The Heart of Denoising'
category: System Anatomy
sources:
  - text: Original paper that introduced the UNet (for biomedical images)
    url: 'https://arxiv.org/abs/1505.04597'
  - text: Explanation of the UNet in the context of Stable Diffusion - Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-unet'
  - text: Illustrated article on the architecture of Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - checkpoint
  - diffusion_model
  - conditioning
  - clip
---

The **UNet** is the central and most important component of a diffusion model like Stable Diffusion. It is the neural network that learns to **progressively remove noise** from a latent image, guided by the instructions of the prompt. [2, 3]

If the checkpoint is the "brain", the UNet is the **parietal lobe**, the part that processes sensory information (the prompt) to create a coherent spatial representation (the image).

### Why is it called "U-Net"?

The name comes from its architecture, which has a characteristic "U" shape. [1] The processing within the UNet takes place in two main phases:

1.  **Encoder (The Descent):**
    The noisy image enters the first part of the "U". With each step down, the network **compresses the image**, reducing its resolution but increasing the number of information channels. In practice, it is trying to "understand" the content of the image at an increasingly abstract level, ignoring the fine details to grasp the main shapes and concepts. [3]

2.  **Decoder (The Ascent):**
    Having reached the bottom of the "U" (the *bottleneck*), the compressed information begins to ascend. With each step up, the network **decomposes the image**, increasing its resolution and using the abstract information learned before to reconstruct the details coherently. Thanks to "skip connections" that directly link the descent levels with those of the ascent, the network does not "forget" the low-resolution details while reconstructing the image. [1, 3]

### The Role of Conditioning

The UNet does not work blindly. At each step of its process, it receives two fundamental inputs that guide it (a process called **conditioning**):
- **The Prompt:** The information from the Text Encoder (CLIP) is "injected" into the UNet to tell it *what* to draw.
- **The Timestep:** A number that indicates which step of the denoising process it is at. This allows the UNet to be more aggressive at the beginning (when there is a lot of noise) and more delicate at the end. [2]

In summary, when you load a base model or a checkpoint in ComfyUI, the largest and most important part of that file is precisely the UNet.
