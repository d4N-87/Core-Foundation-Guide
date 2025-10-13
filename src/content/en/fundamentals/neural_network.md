---
title: 'Neural Network: The Artificial Brain'
category: Fundamentals
sources:
  - text: What is a Neural Network? - IBM
    url: 'https://www.ibm.com/it-it/topics/neural-networks'
  - text: Explanation of Neural Networks - Wikipedia
    url: 'https://it.wikipedia.org/wiki/Rete_neurale_artificiale'
related:
  - deep_learning
  - inferenza
  - unet
---

An **Artificial Neural Network** is a computational model inspired by the structure and functioning of the human brain. [1] It is the fundamental building block of almost all modern artificial intelligence systems, including the models that generate images.

Think of a neural network as a system of **artificial neurons** (called "nodes") organized in **layers**. [2]

### How Does It Work (in a simple way)?

1.  **Input Layer:** Receives the initial data. In our case, it could be the numerical representation of a prompt or the pixels of an image.
2.  **Hidden Layers:** These are the intermediate layers where the real "processing" takes place. Each neuron receives signals from the neurons of the previous layer, performs a small calculation, and passes its result to those of the next layer. During training, the network learns to adjust the "connections" (the "weights") between these neurons to recognize increasingly complex patterns. [1]
3.  **Output Layer:** Produces the final result. For example, the prediction of the noise to be removed from an image.

A network with many hidden layers is called a **Deep Neural Network**, and the field that studies it is **Deep Learning**. [1]

The models we use, such as the **UNet** or **CLIP**, are extremely large and complex examples of neural networks, with billions of connections optimized for their specific tasks.
