---
title: 'ControlNet : Guider l''IA avec des Images'
category: System Anatomy
sources:
  - text: >-
      Article Original : Ajout d'un Contrôle Conditionnel aux Modèles de
      Diffusion Texte-Image
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Guide illustré de ControlNet
    url: >-
      https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/
  - text: Dépôt GitHub Officiel avec les modèles
    url: 'https://github.com/lllyasviel/ControlNet'
related:
  - checkpoint
  - unet
  - conditioning
---

**ControlNet** est une architecture de réseau neuronal qui permet de **conditionner et de contrôler les modèles de diffusion à l'aide d'une entrée visuelle**, comme une image ou une carte de données. [1] En termes simples, c'est un système qui fonctionne aux côtés du modèle principal (l'UNet) et lui fournit un "guidage visuel" supplémentaire, beaucoup plus précis et direct qu'une simple invite textuelle. [2]

Pensez au modèle de diffusion comme à un artiste talentueux à qui vous ne pouvez donner que des instructions verbales. ControlNet, c'est comme lui donner un **calque** ou un **croquis préparatoire** : l'artiste conservera sa créativité et son style, mais suivra fidèlement la composition, la pose ou la structure que vous lui avez fournie. [2]

### Le flux de travail de ControlNet

Un flux de travail typique avec ControlNet se déroule en deux phases principales :

1.  **Prétraitement :**
    On part d'une image d'entrée. Cette image est traitée par un **prétraitement**, un algorithme qui en extrait une "carte" d'informations spécifiques. Cette carte est ce qui sera utilisé comme guide. Il existe de nombreux types de prétraitements, chacun spécialisé dans un type de contrôle différent. [3]

2.  **Application du modèle ControlNet :**
    La carte générée est transmise à un modèle ControlNet spécifique, entraîné pour "comprendre" ce type de carte. Ce modèle ControlNet fonctionne en parallèle avec l'UNet du point de contrôle principal, injectant son guidage visuel à chaque étape du processus de débruitage pour forcer le résultat à respecter la carte. [1]

### Exemples de prétraitements et de modèles courants

- **Canny :**
    C'est un algorithme de **détection de contours**. Le prétraitement `Canny` prend une image et la transforme en un dessin au trait en noir et blanc, ne mettant en évidence que les contours des objets. [3] C'est extrêmement utile pour reproduire la composition exacte d'une photo ou d'un dessin.

- **Profondeur :**
    Le prétraitement `Profondeur` analyse une image et crée une **carte de profondeur**, où les couleurs (généralement du blanc au noir) indiquent quels objets sont plus proches ou plus éloignés de la "caméra". [3] Cela permet de transférer la disposition 3D d'une scène à une image complètement différente.

- **OpenPose :**
    Ce prétraitement détecte le "squelette" d'une ou plusieurs personnes dans une image, créant une carte avec la **pose exacte** de chaque silhouette. C'est l'outil ultime pour contrôler la posture et la position des personnages.

- **Gribouillage / Croquis :**
    Il permet d'utiliser un simple gribouillage ou un dessin fait à la main comme guide pour la composition générale de l'image.

ControlNet a ouvert la porte à un niveau de contrôle et de cohérence auparavant impensable, devenant un outil indispensable pour l'animation, le design et toute application nécessitant des résultats précis et reproductibles.
