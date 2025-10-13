---
title: 'LLM: Large Language Models'
category: Advanced Topics
sources:
  - text: >-
      Paper that introduced the Transformer architecture: Attention Is All You
      Need
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explanation of LLMs by NVIDIA
    url: 'https://www.nvidia.com/it-it/glossary/large-language-models/'
  - text: What is an LLM? - IBM
    url: 'https://www.ibm.com/it-it/topics/large-language-models'
related:
  - gguf
  - clip
  - dit
  - tokens
---

An **LLM (Large Language Model)** is a type of neural network trained on massive amounts of text data (books, articles, code, conversations) with the purpose of **understanding and generating human language** in a coherent and contextually relevant way. [2, 3]

Famous examples of LLMs include OpenAI's **GPT** series (the basis of ChatGPT), Meta's **Llama**, Google's **Gemini**, and Anthropic's **Claude**.

### How Do They Work Conceptually?

At its core, an LLM is a powerful **next-word prediction engine**. [3] When given an input text (a "prompt"), the model calculates the probability of which word (or "token") should come next, based on the linguistic patterns it learned during training. By repeating this process thousands of times, it is able to generate sentences, paragraphs, and entire documents.

### The Key Architecture: the Transformer

The LLM revolution was made possible by the invention of the **Transformer** architecture in 2017. [1] Its fundamental component, the **Attention** mechanism, allows the model to weigh the importance of different words in the input text, understanding relationships and context even over long distances. This is what gives LLMs their extraordinary ability to follow conversations, translate languages, and write code.

### LLMs and Image Generation

Although they specialize in text, LLMs are closely related to the world of image generation in two ways:

1.  **The Text Encoder (CLIP):** The component that interprets our prompts in diffusion models is, for all intents and purposes, a type of language model based on the Transformer architecture. [1]
2.  **Hybrid Architectures (DiT):** Innovations in the field of LLMs, particularly the Transformer architecture, are also being adopted for image generation, leading to the birth of new and powerful models like **Diffusion Transformers (DiT)**.

To run LLMs on consumer hardware, quantized file formats like **GGUF** are often used, which drastically reduce their size and memory consumption.
