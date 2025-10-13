---
title: 'Tokens: The Building Blocks of Language'
category: Advanced Topics
sources:
  - text: Introduction to Tokenizing - Hugging Face
    url: 'https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt'
  - text: Announcement of the FLUX.1 model by Black Forest Labs
    url: 'https://blackforestlabs.ai/announcing-flux/'
  - text: Explanation of Tokens in the context of Stable Diffusion
    url: 'https://stable-diffusion-art.com/token/'
related:
  - clip
  - prompt
  - attention
---

**Tokens** are the fundamental units into which a text is broken down before being processed by a language model like CLIP. [1] They are the "building blocks" with which the model reads and understands our prompt.

A token **is not necessarily a whole word**. The process of **Tokenizing** uses a predefined vocabulary to break down the text into pieces that the model knows. [3]

### Examples of Tokenization

Let's consider the word `indescribably`. A tokenizer might break it down into several tokens it knows:
`inde` + `scrib` + `ably`

- **Common words** (e.g., `cat`, `the`, `a`) are often a single token.
- **Complex or rare words** are broken down into sub-words.
- **Spaces and punctuation** are handled as separate tokens.

This approach allows the model to handle a virtually infinite vocabulary starting from a finite number of tokens (usually between 30,000 and 50,000). [1]

### The Token Limit and the Evolution of Models

Each Text Encoder has a **maximum token limit** that it can process in a single "chunk". This limit has long been one of the main restrictions in prompt engineering.

- **Old Architectures (e.g., Stable Diffusion 1.5, SDXL):**
  These models use Text Encoders (CLIP) with a limit of **75 tokens** per chunk. [3] If a prompt is longer, it is divided into multiple chunks, but the understanding of the context between one block and another is much weaker. This has forced users to concentrate the most important concepts at the beginning of the prompt.

- **New Architectures (e.g., FLUX.1):**
  New generation models, such as **FLUX.1**, are designed to overcome this limitation. FLUX.1 uses a much more powerful Text Encoder (based on T5-XXL) that has been specifically trained to understand long and complex prompts natively. [2] This allows for a much more natural and detailed expression, without having to worry about the artificial limit of 75 tokens.

Understanding the concept of tokens and the limitations of different models is fundamental to writing effective prompts and making the most of each architecture's capabilities.
