---
title: 'DiT : Les Transformers de Diffusion'
category: Advanced Topics
sources:
  - text: 'Article Original : Modèles de Diffusion Évolutifs avec des Transformers'
    url: 'https://arxiv.org/abs/2212.09748'
  - text: 'Annonce de Stable Diffusion 3, basé sur DiT'
    url: 'https://stability.ai/news/stable-diffusion-3'
  - text: Explication de l'architecture DiT - Hugging Face
    url: 'https://huggingface.co/papers/2212.09748'
related:
  - unet
  - llm
  - diffusion_model
  - attention
---

Un **DiT (Diffusion Transformer)** est une nouvelle architecture pour les modèles de diffusion qui **remplace l'UNet traditionnel par un Transformer**. [1] C'est une évolution qui emprunte les innovations du monde des Grands Modèles de Langage (LLM) et les applique à la génération d'images, promettant une plus grande évolutivité et efficacité.

### Pourquoi remplacer l'UNet ?

L'**UNet** a été l'architecture dominante pendant des années, mais elle a des limites inhérentes dans sa capacité à "évoluer", c'est-à-dire à améliorer ses performances à mesure que sa taille et sa puissance de calcul augmentent.

L'architecture **Transformer**, grâce à son mécanisme d'**Attention**, a prouvé dans les LLM qu'elle est incroyablement efficace pour gérer et mettre en relation de grandes quantités de données. L'idée derrière les DiT est : "Et si nous traitions une image non pas comme une grille de pixels, mais comme une séquence de 'patchs' (morceaux), de la même manière qu'un Transformer traite une séquence de mots ?". [1]

### Comment fonctionne un DiT ?

1.  L'image latente est décomposée en une série de "patchs" (jetons visuels).
2.  Ces jetons sont traités par un Transformer, qui utilise le mécanisme d'Attention pour comprendre les relations entre les différentes parties de l'image.
3.  Le Transformer, conditionné par l'invite, prédit le bruit à supprimer de chaque patch.

Cette approche s'est avérée extrêmement évolutive : plus le Transformer est grand et puissant, meilleurs sont les résultats, dépassant les performances des UNet traditionnels avec les mêmes ressources. [1]

### Exemples concrets et l'avenir

- **Sora :** Le modèle révolutionnaire de texte à vidéo d'OpenAI est basé sur une architecture DiT.
- **Stable Diffusion 3 :** La nouvelle version du modèle de Stability AI abandonne l'UNet au profit d'une architecture DiT, ou plus précisément **MMDiT (Multi-Modal DiT)**. [2] Un MMDiT utilise deux Transformers différents, un pour traiter les données textuelles et un pour les données d'image, permettant une compréhension beaucoup plus profonde et précise de l'invite. [2]

Les DiT représentent une étape fondamentale vers des modèles de génération de plus en plus puissants, cohérents et capables de comprendre les nuances complexes du langage humain.
