---
title: 'Deep Learning: The Deep Learning'
category: Fundamentals
sources:
  - text: What is Deep Learning? - IBM
    url: 'https://www.ibm.com/it-it/topics/deep-learning'
  - text: 'Deep Learning, a simple explanation - Intel'
    url: 'https://www.intel.it/content/www/it/it/analytics/deep-learning.html'
related:
  - rete_neurale
  - inferenza
---

**Deep Learning** is a subcategory of Machine Learning based on **Deep Artificial Neural Networks**, that is, neural networks with many hidden layers (from tens to hundreds). [1]

The "depth" of the network is what allows it to learn to recognize patterns and hierarchies in the data automatically. [2]

### How Does Learning Work?

Think of a child learning to recognize a cat:
1.  **First Layer (Simple):** Learns to recognize basic elements like lines, edges, and colors.
2.  **Intermediate Layers (Complex):** Combines these simple elements to recognize more complex shapes like pointed ears, whiskers, eyes.
3.  **Final Layers (Abstract):** Combines the complex shapes to arrive at the abstract concept of "cat".

Deep Learning works in a similar way. During **training**, the network analyzes millions of examples (e.g., labeled images) and autonomously adjusts the "weights" of the connections between its neurons to become increasingly better at mapping an input (an image) to a correct output (the "cat" label). [1]

### Deep Learning vs. Traditional Machine Learning

In traditional Machine Learning, a specialist often had to "pre-process" the data and manually extract the important features for the model to analyze. In Deep Learning, the deep neural network learns to extract these features on its own, directly from the raw data. [2]

All the models we talk about in this manual (Stable Diffusion, CLIP, etc.) are the result of extremely advanced applications of Deep Learning.
