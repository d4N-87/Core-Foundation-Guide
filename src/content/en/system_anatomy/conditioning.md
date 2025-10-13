---
title: 'Conditioning: The Instructions for the UNet'
category: System Anatomy
sources:
  - text: ControlNet Paper (which talks about 'conditional control')
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Explanation of Text Conditioning in Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
  - text: ComfyUI documentation showing Conditioning flows
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/sdxl/'
related:
  - clip
  - unet
  - controlnet
  - prompt
---

**Conditioning** is the technical term that describes the **guidance data** that is provided to the UNet to influence and control the image generation process. [1]

Think of the UNet as a powerful but "blind" engine. On its own, it would only know how to remove noise in a generic way. Conditioning is the set of **instructions and constraints** that tell it *how* to remove the noise to achieve a specific result. [2]

In ComfyUI, conditioning is visually represented by the **yellow wires** that connect the various nodes. These wires do not carry images, but these packets of guidance data. [3]

### Main Types of Conditioning

There are several "sources" of conditioning that can be combined for granular control:

1.  **Text Conditioning:**
    It is the most common form of guidance. It comes from the **CLIP Text Encoder**, which transforms the positive and negative prompt into a numerical representation (embedding). This "packet" of data tells the UNet which concepts, objects, and styles it should represent. [2]

2.  **Image Conditioning:**
    This guidance does not come from the text, but from an image. It is the principle on which **ControlNet** is based. A ControlNet model analyzes an input image (e.g., a pose, a depth map) and transforms it into a conditioning that is added to that of the text. This type of conditioning imposes very strong structural and spatial constraints on the UNet. [1]

3.  **Time Conditioning:**
    It is a more "internal" type of conditioning. At each step of the sampling, information about the current "timestep" (e.g., "we are at step 5 of 20") is passed to the UNet. This allows it to know where it is in the process and to adjust its aggressiveness in removing noise accordingly.

### Combining Conditionings

The power of advanced workflows like those in ComfyUI lies in the ability to manipulate and combine these data flows. For example, it is possible to:
- **Mix** the conditioning of two different prompts.
- **Apply** a ControlNet only to a part of the prompt.
- **Guide** the generation with multiple ControlNets simultaneously.

In summary, every time you see a yellow wire in ComfyUI, you are looking at a communication channel that carries vital instructions to the heart of the model, the UNet.
