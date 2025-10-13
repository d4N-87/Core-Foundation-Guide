---
title: 'CLIP Text Encoder: The Prompt Translator'
category: System Anatomy
sources:
  - text: OpenAI's Original Paper on CLIP
    url: 'https://arxiv.org/abs/2103.00020'
  - text: Explanation of CLIP in the Hugging Face blog
    url: 'https://huggingface.co/docs/transformers/main/en/model_doc/clip'
  - text: Illustrated article on how Stable Diffusion works
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - prompt
  - tokens
  - conditioning
  - unet
---

**CLIP (Contrastive Language-Image Pre-training)** is a neural model developed by OpenAI that has revolutionized how AIs "understand" the relationship between text and images. [1] Within a diffusion model, its role is that of a **universal translator**: it takes your prompt in human language and converts it into a mathematical representation (called an *embedding*) that the UNet can use as a guide. [3]

The terms "Text Encoder" and "CLIP" are often used interchangeably. The former describes the *function*, the latter the *name* of the component that performs that function.

Without CLIP, the prompt "an astronaut on a horse" would just be a meaningless string of text for the UNet. Thanks to CLIP, that sentence is transformed into a set of numbers that mathematically "describe" the concepts of "astronaut", "horse", and their spatial relationship.

### How Does the "Translation" Process Work?

The `CLIP Text Encode` node in ComfyUI performs a multi-step process:

1.  **Tokenizing:**
    First, the prompt is broken down into smaller pieces called **Tokens**. [2] A token does not necessarily correspond to a word. Complex words can be divided into multiple tokens, while common words can be a single token. Each CLIP model has a maximum number of tokens it can process at once (usually 75). If your prompt is longer, it is divided into multiple "chunks".

2.  **Embedding:**
    Each token is converted into a numerical vector. At this point, we have a sequence of numbers that represents our prompt.

3.  **Processing (Attention):**
    This sequence of numbers is processed by a Transformer architecture. [3] This is where the real magic happens: the **Attention** mechanism allows the model to understand the relationships between words. It doesn't just see "red" and "cube", but it understands that it's the "cube" that should be "red". This is where the weight we give to words in the prompt (e.g., `(word:1.2)`) has an effect, telling the attention mechanism to "pay more attention" to certain concepts.

The final result of this process is the **Conditioning**, an output that contains the prompt's embeddings ready to be "injected" into the UNet and guide the image generation.

### Different Models, Different CLIPs

- **Stable Diffusion 1.5** uses a single CLIP model (OpenCLIP).
- **Stable Diffusion XL (SDXL)** uses a combination of two different CLIP models (OpenCLIP and CLIP ViT-L), allowing it to understand prompts in a much richer and more nuanced way. This is one of the main reasons for its superior quality.

This means that the more CLIPs work together, with many billions of parameters, the more the result will be in line with the prompt.
