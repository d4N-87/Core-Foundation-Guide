---
title: 'Espace Latent : Le Monde Comprimé des Images'
category: System Anatomy
sources:
  - text: >-
      Article original de Stable Diffusion (Synthèse d'Images à Haute Résolution
      avec des Modèles de Diffusion Latents)
    url: 'https://arxiv.org/abs/2112.10752'
  - text: Explication de l'Espace Latent dans le blog de Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-latent-space'
  - text: Article illustré sur Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - vae
  - unet
  - diffusion_model
---

L'**Espace Latent** est une représentation compressée et à basse résolution d'une image. C'est un "monde" intermédiaire dans lequel les modèles de diffusion comme Stable Diffusion effectuent la plupart de leur travail. [1]

Pensez à une image haute résolution comme à un dossier rempli de milliers de fichiers. Travailler sur chaque fichier individuel serait lent et coûteux. L'espace latent est comme un **fichier ZIP** de ce dossier : il contient toutes les informations essentielles, mais dans un format beaucoup plus petit et plus léger. [2]

Le processus de diffusion (le "débruitage" effectué par l'UNet) ne se produit pas sur les pixels de l'image finale, mais sur cette version compressée, la "représentation latente". [3]

### Pourquoi travailler dans l'espace latent ?

La raison est unique : l'**efficacité**. [1]
- **Vitesse :** Effectuer le processus de débruitage sur une petite représentation latente (par exemple, 64x64) est **des ordres de grandeur plus rapide** que de le faire sur une image en pleine résolution (par exemple, 512x512).
- **Moins de ressources :** Il nécessite beaucoup moins de mémoire (VRAM) et de puissance de calcul.

Ce fut l'innovation clé des "Modèles de Diffusion Latents" (LDM), la famille de modèles à laquelle appartient Stable Diffusion. [1] Ils ont rendu possible l'exécution de modèles puissants sur du matériel grand public.

### Le rôle du VAE

Comment passe-t-on du monde des pixels au monde latent et vice versa ? C'est là qu'intervient le **VAE (Variational Autoencoder)** :

1.  **Encodeur du VAE :** Lorsqu'on utilise une image d'entrée (img2img), l'encodeur du VAE prend l'image en pixels et la **compresse** dans sa représentation latente.
2.  **Décodeur du VAE :** À la fin du processus de débruitage, le décodeur du VAE prend la représentation latente "propre" et la **décompose** dans l'image finale en pixels que nous voyons. [3]

Dans ComfyUI, le nœud `Empty Latent Image` crée un point de départ vide dans cet espace latent, prêt à être traité par l'UNet.

En résumé, l'espace latent est le "bureau" ingénieux dans lequel l'UNet travaille rapidement et efficacement, laissant au VAE le soin de faire office de "portier" entre ce bureau et le monde extérieur des pixels.
