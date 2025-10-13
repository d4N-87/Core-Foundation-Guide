---
title: 'Segmentation : Comprendre la Scène'
category: System Anatomy
sources:
  - text: Explication de la Segmentation d'Image - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Image_segmentation'
  - text: 'Exemples de Modèles de Segmentation (par exemple, SAM) - Meta AI'
    url: 'https://ai.meta.com/blog/segment-anything-sam-computer-vision-model/'
  - text: Utilisation de la Segmentation Sémantique dans ControlNet
    url: >-
      https://github.com/lllyasviel/ControlNet-v1-1-nightly#controlnet-11-with-semantic-segmentation
related:
  - controlnet
  - inpaint
  - rete_neurale
---

La **Segmentation d'Image** est un processus de Vision par Ordinateur qui consiste à **partitionner une image en plusieurs segments ou régions**, en associant chaque pixel à une étiquette de classe spécifique. [1]

En termes simples, c'est la manière dont une IA "décompose" une image pour en comprendre le contenu à un niveau très détaillé. Au lieu de voir simplement "une photo d'une rue", un modèle de segmentation voit "ces pixels sont 'route', ceux-ci sont 'ciel', ceux-là sont 'arbre', et ceux-là sont 'voiture'".

### Types de segmentation

Il existe plusieurs types de segmentation, mais les plus courants sont :
- **Segmentation Sémantique :** À chaque pixel est attribuée une catégorie (par exemple, "personne", "chat", "herbe"). Tous les objets de la même catégorie ont la même couleur dans la carte de segmentation. [3]
- **Segmentation d'Instance :** Elle est plus avancée. Elle n'étiquette pas seulement les pixels comme "personne", mais distingue entre "personne 1", "personne 2", etc. Chaque *instance* d'un objet est identifiée séparément.

### Applications dans la génération d'images

La segmentation est devenue un outil puissant pour le contrôle et la modification des images générées :

1.  **ControlNet avec Segmentation Sémantique :**
    Il est possible d'utiliser une carte de segmentation comme entrée pour un modèle ControlNet. [3] Cela permet de dicter la composition d'une scène de manière très précise. Par exemple, on peut fournir une carte avec une zone bleue en haut (ciel), une verte en bas (prairie) et une marron au milieu (maison), et le modèle générera une image qui respecte exactement cette disposition spatiale.

2.  **Inpainting Automatique et Précis :**
    Des modèles avancés comme le **SAM (Segment Anything Model)** de Meta AI peuvent générer des masques de segmentation incroyablement précis pour n'importe quel objet d'une image en un seul clic. [2] Dans ComfyUI, cela permet de créer des flux de travail d'inpainting puissants : vous cliquez sur un objet, SAM crée le masque parfait pour celui-ci, et vous pouvez le modifier ou le remplacer par une invite, sans avoir à dessiner le masque à la main.

En résumé, la segmentation est une technologie clé qui permet une interaction et une manipulation des images à un niveau de précision et d'intelligence auparavant impensable.
