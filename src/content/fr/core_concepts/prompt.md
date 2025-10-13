---
title: 'Invite : Dialoguer avec l''IA'
category: Core Concepts
sources:
  - text: Guide de l'Invitation sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/prompt-guide/'
  - text: Documentation de ComfyUI sur l'Encodage de Texte
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/prompt/'
  - text: Explication de l'Invite Négative
    url: 'https://stable-diffusion-art.com/negative-prompt/'
related:
  - clip
  - tokens
  - cfg
---

L'**Invite** est l'instruction textuelle que vous fournissez au modèle pour décrire l'image que vous souhaitez créer. C'est le moyen le plus direct de dialoguer avec l'intelligence artificielle et de guider sa créativité. [1]

Dans ComfyUI, et dans de nombreuses autres interfaces, l'invite est divisée en deux parties complémentaires :

### 1. Invite Positive

Ici, vous décrivez **tout ce que vous voulez voir** dans l'image. Ce n'est pas seulement une liste d'objets, mais un ensemble d'instructions qui peuvent inclure :
- **Sujet :** `un lion majestueux`
- **Style :** `dans le style d'une peinture à l'aquarelle`
- **Artiste :** `par Van Gogh`
- **Détails et Qualité :** `détails complexes, mise au point nette, 4k, éclairage cinématographique`
- **Composition :** `plan en pied, regardant la caméra`

**Syntaxe pour le Poids (Attention) :**
Pour donner plus d'importance à un mot ou à une phrase, vous pouvez augmenter son "poids". La syntaxe courante, également utilisée dans ComfyUI, est `(mot:poids)`. [2]
- `(yeux bleus:1.3)` : Augmente l'importance de "yeux bleus" de 30 %.
- `(rose rouge:0.8)` : Diminue l'importance de "rose rouge" de 20 %.
- Les parenthèses `()` sont un raccourci pour augmenter le poids (généralement de 1.1), tandis que `[]` sont un raccourci pour le diminuer. [1]

### 2. Invite Négative

Ici, vous décrivez **tout ce que vous voulez éviter** dans l'image. C'est un outil puissant pour corriger les erreurs courantes et améliorer la qualité générale. [3]

Voici des exemples courants d'invites négatives :
- **Corriger les Déformations :** `déformé, muté, défiguré, membres supplémentaires, mauvaise anatomie`
- **Améliorer la Qualité :** `flou, granuleux, basse résolution, laid, artefacts jpeg`
- **Supprimer les Éléments Indésirables :** `texte, filigrane, signature, nom d'utilisateur`
- **Exclure les Styles :** `dessin animé, anime, rendu 3d`

Utiliser une bonne invite négative est souvent aussi important que d'écrire une bonne invite positive pour obtenir des résultats de haute qualité. [3]
