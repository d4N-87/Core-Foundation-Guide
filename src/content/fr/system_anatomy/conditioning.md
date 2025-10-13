---
title: 'Conditionnement : Les Instructions pour l''UNet'
category: System Anatomy
sources:
  - text: Article de ControlNet (qui parle de 'contrôle conditionnel')
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Explication du Conditionnement de Texte dans Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
  - text: Documentation de ComfyUI montrant les flux de Conditionnement
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/sdxl/'
related:
  - clip
  - unet
  - controlnet
  - prompt
---

Le **Conditionnement** est le terme technique qui décrit les **données de guidage** qui sont fournies à l'UNet pour influencer et contrôler le processus de génération d'images. [1]

Pensez à l'UNet comme à un moteur puissant mais "aveugle". Seule, elle ne saurait que comment supprimer le bruit de manière générique. Le conditionnement est l'ensemble d'**instructions et de contraintes** qui lui disent *comment* supprimer le bruit pour obtenir un résultat spécifique. [2]

Dans ComfyUI, le conditionnement est représenté visuellement par les **fils jaunes** qui relient les différents nœuds. Ces fils ne transportent pas d'images, mais ces paquets de données de guidage. [3]

### Principaux types de conditionnement

Il existe plusieurs "sources" de conditionnement qui peuvent être combinées pour un contrôle granulaire :

1.  **Conditionnement Textuel :**
    C'est la forme de guidage la plus courante. Il provient de l'**Encodeur de Texte CLIP**, qui transforme l'invite positive et négative en une représentation numérique (embedding). Ce "paquet" de données indique à l'UNet quels concepts, objets et styles elle doit représenter. [2]

2.  **Conditionnement d'Image :**
    Ce guidage ne provient pas du texte, mais d'une image. C'est le principe sur lequel repose **ControlNet**. Un modèle ControlNet analyse une image d'entrée (par exemple, une pose, une carte de profondeur) et la transforme en un conditionnement qui est ajouté à celui du texte. Ce type de conditionnement impose des contraintes structurelles et spatiales très fortes à l'UNet. [1]

3.  **Conditionnement Temporel :**
    C'est un type de conditionnement plus "interne". À chaque étape de l'échantillonnage, une information sur le "pas de temps" actuel (par exemple, "nous sommes à l'étape 5 sur 20") est transmise à l'UNet. Cela lui permet de savoir où elle en est dans le processus et d'ajuster son agressivité dans la suppression du bruit en conséquence.

### Combinaison des conditionnements

La puissance des flux de travail avancés comme ceux de ComfyUI réside dans la capacité à manipuler et à combiner ces flux de données. Par exemple, il est possible de :
- **Mélanger** le conditionnement de deux invites différentes.
- **Appliquer** un ControlNet uniquement à une partie de l'invite.
- **Guider** la génération avec plusieurs ControlNets simultanément.

En résumé, chaque fois que vous voyez un fil jaune dans ComfyUI, vous regardez un canal de communication qui transporte des instructions vitales au cœur du modèle, l'UNet.
