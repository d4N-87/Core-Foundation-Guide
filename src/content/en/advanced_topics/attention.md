---
title: 'Attention: The Focusing Mechanism'
category: Advanced Topics
sources:
  - text: Paper 'Attention Is All You Need' that introduced the Transformer
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Illustrated explanation of the Attention mechanism
    url: >-
      https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/
related:
  - clip
  - dit
  - tokens
  - prompt
---

**Attention** (or *Self-Attention*) is the computational mechanism at the heart of the **Transformer** architecture, which has revolutionized both language models (LLMs) and, more recently, diffusion models (DiTs). [1]

In simple terms, Attention allows a model to **dynamically weigh the importance of different parts of an input** (like words in a sentence or patches in an image) to understand the context and the relationships between them. [2]

### How Does It Work (Conceptually)?

Imagine reading the sentence: `A red cat chases a gray mouse`.
When the model processes the word "red", the Attention mechanism allows it to understand that "red" is strongly connected to "cat" and not to "mouse". In practice, for each word, Attention calculates an "attention score" with respect to all other words in the sentence, "focusing" on the most important relationships. [2]

This is fundamental for resolving ambiguities and understanding the nuances of language.

### Attention in Image Generation

The Attention mechanism is crucial at two points in our workflow:

1.  **In the CLIP Text Encoder:**
    When CLIP processes our prompt, Attention is what allows it to understand that in `an astronaut on a horse`, it's the astronaut who should be on the horse. It's also the mechanism that is influenced when we increase the weight of a word with the syntax `(word:1.2)`, telling it to "pay more attention" to that concept.

2.  **In Diffusion Transformers (DiTs):**
    In models like Stable Diffusion 3, Attention is not only applied to the text but also to the "visual tokens" (the image patches). This allows the model to create complex relationships between different parts of the image, drastically improving coherence and composition. For example, it can ensure that a reflection in a mirror correctly corresponds to the reflected object.

In summary, Attention is the technology that has allowed models to move from a simple "association" of words to a true "understanding" of context and relationships, both in text and in images.
