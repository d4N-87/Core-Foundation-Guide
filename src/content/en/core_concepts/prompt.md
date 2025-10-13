---
title: 'Prompt: Dialoguing with the AI'
category: Core Concepts
sources:
  - text: Guide to Prompting on Stable Diffusion Art
    url: 'https://stablediffusionart.com/prompt-guide/'
  - text: ComfyUI documentation on Text Encode
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/prompt/'
  - text: Explanation of the Negative Prompt
    url: 'https://stable-diffusion-art.com/negative-prompt/'
related:
  - clip
  - tokens
  - cfg
---

The **Prompt** is the textual instruction you provide to the model to describe the image you want to create. It's the most direct way to dialogue with the artificial intelligence and guide its creativity. [1]

In ComfyUI, and in many other interfaces, the prompt is divided into two complementary parts:

### 1. Positive Prompt

Here you describe **everything you want to see** in the image. It's not just a list of objects, but a set of instructions that can include:
- **Subject:** `a majestic lion`
- **Style:** `in the style of a watercolor painting`
- **Artist:** `by Van Gogh`
- **Details and Quality:** `intricate details, sharp focus, 4k, cinematic lighting`
- **Composition:** `full body shot, looking at the camera`

**Syntax for Weight (Attention):**
To give more importance to a word or phrase, you can increase its "weight". The common syntax, also used in ComfyUI, is `(word:weight)`. [2]
- `(blue eyes:1.3)`: Increases the importance of "blue eyes" by 30%.
- `(red rose:0.8)`: Decreases the importance of "red rose" by 20%.
- Parentheses `()` are a shortcut to increase the weight (usually by 1.1), while `[]` are a shortcut to decrease it. [1]

### 2. Negative Prompt

Here you describe **everything you want to avoid** in the image. It's a powerful tool for correcting common errors and improving the overall quality. [3]

Common examples of negative prompts include:
- **Correcting Deformities:** `deformed, mutated, disfigured, extra limbs, bad anatomy`
- **Improving Quality:** `blurry, grainy, low resolution, ugly, jpeg artifacts`
- **Removing Unwanted Elements:** `text, watermark, signature, username`
- **Excluding Styles:** `cartoon, anime, 3d render`

Using a good negative prompt is often as important as writing a good positive prompt to get high-quality results. [3]
