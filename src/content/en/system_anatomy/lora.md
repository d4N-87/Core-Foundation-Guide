---
title: 'LoRa: Lightweight Style Modifiers'
category: System Anatomy
sources:
  - text: 'Original Paper: LoRA: Low-Rank Adaptation of Large Language Models'
    url: 'https://arxiv.org/abs/2106.09685'
  - text: Guide to LoRas on Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Technical explanation of LoRas on Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/training/lora'
related:
  - checkpoint
  - unet
  - clip
---

A **LoRa (Low-Rank Adaptation)** is a small file that applies targeted modifications to a full checkpoint model, without permanently altering it. [1] Think of a LoRa as an **additional set of instructions** or a **transparent filter** that you put over the main "brain" (the checkpoint) to make it adopt a specific style, replicate a character, or a concept. [2]

The main advantage of LoRas is their **small size**. While a full checkpoint can weigh several gigabytes, a LoRa typically weighs only a few megabytes (from 2 to 200 MB). [3] This makes them easy to download, share, and use.

### How Do They Work?

Instead of retraining the entire model (an expensive process), a LoRa is trained to "intercept" and modify only a small part of the weights of the UNet and the Text Encoder. [3] When you apply a LoRa, its small weights are added to those of the main model during generation, influencing the final result.

### Common Types of LoRas

LoRas are incredibly versatile and can be trained for different purposes:

1.  **Style LoRa:**
    These LoRas teach the model a specific artistic style (e.g., "Ghibli style", "pixel art", "baroque oil painting"). They are among the most popular. [2]

2.  **Character LoRa:**
    Trained on images of a specific character (real or fictional), they allow that character to be inserted into any scene with good consistency.

3.  **Concept LoRa:**
    They can teach the model a more abstract concept, such as a particular pose, a type of clothing, or a specific object.

### Usage in ComfyUI

In ComfyUI, LoRas are loaded via a `Load LoRA` node that is typically inserted between the `Load Checkpoint` and the `KSampler`. This node takes the model and the CLIP from the checkpoint as input and returns a "modified" version of both, ready to be used in the rest of the workflow.

It is also possible to **combine multiple LoRas** (a process called *stacking*), applying different filters in sequence, although this can lead to unpredictable results if the LoRas conflict with each other.
