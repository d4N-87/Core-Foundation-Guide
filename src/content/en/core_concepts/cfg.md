---
title: 'CFG: The Guidance Scale'
category: Core Concepts
sources:
  - text: Technical explanation on Stable Diffusion Art
    url: 'https://stablediffusionart.com/what-is-cfg-scale/'
  - text: 'Original Paper: Classifier-Free Diffusion Guidance'
    url: 'https://arxiv.org/abs/2207.12598'
related:
  - prompt
  - sampler
  - conditioning
---

The **CFG (Classifier-Free Guidance) Scale** is one of the most powerful parameters at your disposal. In simple terms, it's a knob that controls **how faithfully** the model should follow the instructions in your prompt. [1]

Think of the prompt as a map and the model as an explorer. The CFG is the explorer's level of discipline:
- **A low value** tells it: "Here's the map, but feel free to explore the surroundings if you find something interesting". The result will be more creative, but it might ignore parts of the prompt.
- **A high value** orders it: "Follow this map to the letter, no deviations!". The result will be much more adherent to the prompt, but it might lose its naturalness.

### Why is it called "Classifier-Free"?

The technical name comes from the fact that this method does not need an external "classifier" model to guide the generation, unlike older techniques. [2] The guidance is integrated into the diffusion model itself, making it more efficient.

### Practical Guide to CFG Values

- **Low CFG (1-6):** Maximum creative freedom.
- **Medium CFG (7-12):** The ideal balance point. Most interfaces use a default value around 7. [1]
- **High CFG (13-20+):** Very strict adherence to the prompt. At values that are too high, the image risks becoming "burnt", with excessive colors and contrast. [1]

Distilled models have a CFG of 1, a condition that makes the negative prompt unusable.

Each model usually has its own recommended CFG value.
