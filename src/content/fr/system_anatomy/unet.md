---
title: 'UNet : Le Cœur du Débruitage'
category: System Anatomy
sources:
  - text: Article original qui a introduit l'UNet (pour les images biomédicales)
    url: 'https://arxiv.org/abs/1505.04597'
  - text: Explication de l'UNet dans le contexte de Stable Diffusion - Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-unet'
  - text: Article illustré sur l'architecture de Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - checkpoint
  - diffusion_model
  - conditioning
  - clip
---

L'**UNet** est le composant central et le plus important d'un modèle de diffusion comme Stable Diffusion. C'est le réseau neuronal qui apprend à **supprimer progressivement le bruit** d'une image latente, guidé par les instructions de l'invite. [2, 3]

Si le point de contrôle est le "cerveau", l'UNet est le **lobe pariétal**, la partie qui traite les informations sensorielles (l'invite) pour créer une représentation spatiale cohérente (l'image).

### Pourquoi s'appelle-t-il "U-Net" ?

Le nom vient de son architecture, qui a une forme caractéristique en "U". [1] Le processus de traitement à l'intérieur de l'UNet se déroule en deux phases principales :

1.  **Encodeur (La Descente) :**
    L'image bruitée entre dans la première partie du "U". À chaque pas vers le bas, le réseau **compresse l'image**, réduisant sa résolution mais augmentant le nombre de canaux d'information. En pratique, il essaie de "comprendre" le contenu de l'image à un niveau de plus en plus abstrait, en ignorant les détails fins pour saisir les formes et les concepts principaux. [3]

2.  **Décodeur (La Montée) :**
    Arrivée au fond du "U" (le *goulot d'étranglement*), l'information compressée commence à remonter. À chaque pas vers le haut, le réseau **décompose l'image**, augmentant sa résolution et utilisant les informations abstraites apprises auparavant pour reconstruire les détails de manière cohérente. Grâce à des "connexions résiduelles" qui relient directement les niveaux de la descente à ceux de la montée, le réseau ne "oublie" pas les détails à basse résolution tout en reconstruisant l'image. [1, 3]

### Le rôle du conditionnement

L'UNet ne travaille pas à l'aveugle. À chaque étape de son processus, elle reçoit deux entrées fondamentales qui la guident (un processus appelé **conditionnement**) :
- **L'invite :** Les informations provenant de l'encodeur de texte (CLIP) sont "injectées" dans l'UNet pour lui dire *quoi* dessiner.
- **Le pas de temps :** Un nombre qui indique à quelle étape du processus de débruitage on se trouve. Cela permet à l'UNet d'être plus agressive au début (quand il y a beaucoup de bruit) et plus délicate à la fin. [2]

En résumé, lorsque vous chargez un modèle de base ou un point de contrôle dans ComfyUI, la partie la plus grande et la plus importante de ce fichier est précisément l'UNet.
