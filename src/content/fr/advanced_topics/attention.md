---
title: 'Attention : Le Mécanisme de Focalisation'
category: Advanced Topics
sources:
  - text: Article 'Attention Is All You Need' qui a introduit le Transformer
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explication illustrée du mécanisme d'Attention
    url: >-
      https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/
related:
  - clip
  - dit
  - tokens
  - prompt
---

L'**Attention** (ou *Self-Attention*) est le mécanisme de calcul au cœur de l'architecture **Transformer**, qui a révolutionné à la fois les modèles de langage (LLM) et, plus récemment, les modèles de diffusion (DiT). [1]

En termes simples, l'Attention permet à un modèle de **pondérer dynamiquement l'importance des différentes parties d'une entrée** (comme les mots dans une phrase ou les patchs dans une image) pour comprendre le contexte et les relations entre elles. [2]

### Comment ça marche (conceptuellement) ?

Imaginez que vous lisiez la phrase : `Un chat rouge poursuit une souris grise`.
Lorsque le modèle traite le mot "rouge", le mécanisme d'Attention lui permet de comprendre que "rouge" est fortement lié à "chat" et non à "souris". En pratique, pour chaque mot, l'Attention calcule un "score d'attention" par rapport à tous les autres mots de la phrase, en se "focalisant" sur les relations les plus importantes. [2]

Ceci est fondamental pour résoudre les ambiguïtés et comprendre les nuances du langage.

### L'Attention dans la Génération d'Images

Le mécanisme d'Attention est crucial à deux moments de notre flux de travail :

1.  **Dans l'Encodeur de Texte CLIP :**
    Lorsque CLIP traite notre invite, l'Attention est ce qui lui permet de comprendre que dans `un astronaute à cheval`, c'est l'astronaute qui doit être sur le cheval. C'est aussi le mécanisme qui est influencé lorsque nous augmentons le poids d'un mot avec la syntaxe `(mot:1.2)`, lui disant de "prêter plus d'attention" à ce concept.

2.  **Dans les Transformers de Diffusion (DiT) :**
    Dans les modèles comme Stable Diffusion 3, l'Attention n'est pas seulement appliquée au texte mais aussi aux "jetons visuels" (les patchs de l'image). Cela permet au modèle de créer des relations complexes entre les différentes parties de l'image, améliorant considérablement la cohérence et la composition. Par exemple, il peut s'assurer qu'un reflet dans un miroir correspond correctement à l'objet reflété.

En résumé, l'Attention est la technologie qui a permis aux modèles de passer d'une simple "association" de mots à une véritable "compréhension" du contexte et des relations, tant dans le texte que dans les images.
