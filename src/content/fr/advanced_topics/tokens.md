---
title: 'Jetons : Les Briques du Langage'
category: Advanced Topics
sources:
  - text: Introduction à la Tokenisation - Hugging Face
    url: 'https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt'
  - text: Annonce du modèle FLUX.1 par Black Forest Labs
    url: 'https://blackforestlabs.ai/announcing-flux/'
  - text: Explication des Jetons dans le contexte de Stable Diffusion
    url: 'https://stable-diffusion-art.com/token/'
related:
  - clip
  - prompt
  - attention
---

Les **Jetons** sont les unités fondamentales dans lesquelles un texte est décomposé avant d'être traité par un modèle de langage comme CLIP. [1] Ce sont les "briques" avec lesquelles le modèle lit et comprend notre invite.

Un jeton **n'est pas nécessairement un mot entier**. Le processus de **Tokenisation** utilise un vocabulaire prédéfini pour décomposer le texte en morceaux que le modèle connaît. [3]

### Exemples de Tokenisation

Considérons le mot `indescriptiblement`. Un tokeniseur pourrait le décomposer en plusieurs jetons qu'il connaît :
`inde` + `script` + `ible` + `ment`

- Les **mots courants** (par exemple, `chat`, `le`, `un`) sont souvent un seul jeton.
- Les **mots complexes ou rares** sont décomposés en sous-mots.
- Les **espaces et la ponctuation** sont traités comme des jetons séparés.

Cette approche permet au modèle de gérer un vocabulaire pratiquement infini à partir d'un nombre fini de jetons (généralement entre 30 000 et 50 000). [1]

### La Limite de Jetons et l'Évolution des Modèles

Chaque Encodeur de Texte a une **limite maximale de jetons** qu'il peut traiter en un seul "morceau". Cette limite a longtemps été l'une des principales restrictions dans l'ingénierie des invites.

- **Anciennes Architectures (par exemple, Stable Diffusion 1.5, SDXL) :**
  Ces modèles utilisent des Encodeurs de Texte (CLIP) avec une limite de **75 jetons** par morceau. [3] Si une invite est plus longue, elle est divisée en plusieurs morceaux, mais la compréhension du contexte entre un bloc et un autre est beaucoup plus faible. Cela a obligé les utilisateurs à concentrer les concepts les plus importants au début de l'invite.

- **Nouvelles Architectures (par exemple, FLUX.1) :**
  Les modèles de nouvelle génération, tels que **FLUX.1**, sont conçus pour surmonter cette limitation. FLUX.1 utilise un Encodeur de Texte beaucoup plus puissant (basé sur T5-XXL) qui a été spécifiquement entraîné pour comprendre nativement les invites longues et complexes. [2] Cela permet une expression beaucoup plus naturelle et détaillée, sans avoir à se soucier de la limite artificielle de 75 jetons.

Comprendre le concept de jetons et les limitations des différents modèles est fondamental pour écrire des invites efficaces et tirer le meilleur parti des capacités de chaque architecture.
