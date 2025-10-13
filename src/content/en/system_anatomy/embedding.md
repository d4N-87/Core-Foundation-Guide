---
title: 'Embedding (Textual Inversion): Teaching New Concepts'
category: System Anatomy
sources:
  - text: 'Original Paper: An Image is Worth One Word (Textual Inversion)'
    url: 'https://arxiv.org/abs/2208.01618'
  - text: Explanation of Embeddings on Stable Diffusion Art
    url: 'https://stablediffusionart.com/embedding/'
  - text: Guide to Embeddings (TI) on Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
related:
  - clip
  - prompt
  - tokens
  - lora
---

An **Embedding**, also known as **Textual Inversion**, is a small file that teaches the model a **new visual concept** by associating it with a specific keyword. [1]

Think of the CLIP model as a huge dictionary that links words to visual ideas. An embedding is as if you could **add a new word to that dictionary**. [2] For example, you can train an embedding on 5-10 photos of your cat and associate it with the keyword `ohwx-cat`. From that moment on, every time you write `ohwx-cat` in your prompt, the model will know exactly which cat you are referring to.

### How Does It Work?

Unlike a LoRa that modifies the weights of the UNet (the "painter"), an embedding only modifies the weights of the Text Encoder (the "translator"). [3] It doesn't teach the model to draw in a new style, but it teaches it the meaning of a new "word" (token). [1] The file of an embedding is extremely small, often only a few kilobytes.

### Embedding vs. LoRa

| Feature | Embedding (Textual Inversion) | LoRa |
| :--- | :--- | :--- |
| **Purpose** | Teach a new **concept** (object, character) | Teach a new **style** or a complex character |
| **Component Modified** | Text Encoder (CLIP) | UNet (and sometimes the Text Encoder) |
| **File Size** | Very small (KB) | Small (MB) |
| **Flexibility** | Less flexible, "injects" a concept | More flexible, can alter the entire style |

### Common Types of Embeddings

- **Style:** Although less common than LoRas for this purpose, some embeddings can replicate simple artistic styles.
- **Character/Object:** The most common use. Perfect for creating consistent images of a specific person, animal, or object.
- **Negative Embedding:** A special type of embedding trained on low-quality images (e.g., with deformed hands, ugly, etc.). By inserting the keyword of this embedding in the *negative prompt*, the overall quality of the image is greatly improved. Famous examples are `EasyNegative` or `bad-hands`. [2]

In ComfyUI, embeddings are usually loaded into a specific folder and then recalled simply by writing their keyword (the file name) directly in the prompt.
