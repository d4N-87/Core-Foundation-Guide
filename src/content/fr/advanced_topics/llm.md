---
title: 'LLM : Les Grands Modèles de Langage'
category: Advanced Topics
sources:
  - text: >-
      Article qui a introduit l'architecture Transformer : Attention Is All You
      Need
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explication des LLM par NVIDIA
    url: 'https://www.nvidia.com/it-it/glossary/large-language-models/'
  - text: Qu'est-ce qu'un LLM ? - IBM
    url: 'https://www.ibm.com/it-it/topics/large-language-models'
related:
  - gguf
  - clip
  - dit
  - tokens
---

Un **LLM (Large Language Model)**, ou Grand Modèle de Langage, est un type de réseau neuronal entraîné sur d'énormes quantités de données textuelles (livres, articles, code, conversations) dans le but de **comprendre et de générer du langage humain** de manière cohérente et contextuellement pertinente. [2, 3]

Des exemples célèbres de LLM incluent la série **GPT** d'OpenAI (à la base de ChatGPT), **Llama** de Meta, **Gemini** de Google et **Claude** d'Anthropic.

### Comment fonctionnent-ils au niveau conceptuel ?

À la base, un LLM est un puissant **moteur de prédiction du mot suivant**. [3] Lorsqu'on lui fournit un texte d'entrée (une "invite"), le modèle calcule la probabilité du mot (ou "jeton") qui devrait suivre, en se basant sur les modèles linguistiques qu'il a appris pendant l'entraînement. En répétant ce processus des milliers de fois, il est capable de générer des phrases, des paragraphes et des documents entiers.

### L'architecture clé : le Transformer

La révolution des LLM a été rendue possible par l'invention de l'architecture **Transformer** en 2017. [1] Son composant fondamental, le mécanisme d'**Attention**, permet au modèle de pondérer l'importance des différents mots dans le texte d'entrée, en comprenant les relations et le contexte même sur de longues distances. C'est ce qui donne aux LLM leur extraordinaire capacité à suivre des conversations, à traduire des langues et à écrire du code.

### LLM et génération d'images

Bien qu'ils soient spécialisés dans le texte, les LLM sont étroitement liés au monde de la génération d'images de deux manières :

1.  **L'encodeur de texte (CLIP) :** Le composant qui interprète nos invites dans les modèles de diffusion est, à toutes fins utiles, un type de modèle de langage basé sur l'architecture Transformer. [1]
2.  **Architectures hybrides (DiT) :** Les innovations dans le domaine des LLM, en particulier l'architecture Transformer, sont également adoptées pour la génération d'images, ce qui a conduit à la naissance de nouveaux et puissants modèles comme les **Transformers de diffusion (DiT)**.

Pour exécuter des LLM sur du matériel grand public, des formats de fichiers quantifiés comme **GGUF** sont souvent utilisés, ce qui réduit considérablement leur taille et leur consommation de mémoire.
