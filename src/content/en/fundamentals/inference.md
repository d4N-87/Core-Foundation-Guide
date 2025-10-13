---
title: 'Inference: Using the Trained Model'
category: Fundamentals
sources:
  - text: What is Inference? - Amazon Web Services
    url: 'https://aws.amazon.com/it/what-is/inference/'
  - text: Inference vs. Training - Google Cloud
    url: 'https://cloud.google.com/discover/inference-vs-training?hl=it'
related:
  - rete_neurale
  - deep_learning
  - checkpoint
---

**Inference** is the process of **using an already trained neural network** to make predictions on new and unseen data. [1]

If **training** is the "study" phase where the model learns from books (the dataset), **inference** is the **final exam** where it must apply what it has learned to answer new questions. [2]

### The Inference Process in Practice

When we generate an image with Stable Diffusion, we are performing an inference process:
1.  **Load the Model:** We take a checkpoint (`.safetensors`), which is the result of a long and expensive training process.
2.  **Provide an Input:** We give the model new data that it has never seen during the study (our prompt and a random noise image).
3.  **The Model "Infers":** The neural network processes the input through its layers, using the weights it has learned, and produces an output (the prediction of the noise to be removed).
4.  **We Get an Output:** By repeating this process for a certain number of "steps", we get the final image.

### Inference vs. Training

| Feature | Training | Inference |
| :--- | :--- | :--- |
| **Purpose** | Teach the model, create the "weights" | Use the model to get results |
| **Resources Required** | Huge (many GPUs, weeks of time) | Moderate (a single GPU, seconds/minutes) |
| **Data** | Large labeled dataset | Single input data (e.g., a prompt) |
| **Who does it?** | Research labs, companies, the community | The end user (us!) |

In summary, every time we press the "Generate" button, we are performing **inference**.
