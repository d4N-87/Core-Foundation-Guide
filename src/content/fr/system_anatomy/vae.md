---
title: 'VAE : Le Décodeur Visuel'
category: System Anatomy
sources:
  - text: 'Article Original : Auto-Encodeur Variationnel Bayes'
    url: 'https://arxiv.org/abs/1312.6114'
  - text: Explication sur Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/models/autoencoderkl'
related:
  - latent_space
  - checkpoint
---

Le **VAE (Variational Autoencoder)** est le décodeur final de votre système. [1, 2]

Imaginez que le modèle d'IA ne "pense" pas avec des images, mais dans un langage mathématique abstrait, un **espace latent**. C'est comme un compositeur qui écrit une partition : la partition n'est pas de la musique, ce sont des symboles sur une feuille.

Le VAE est l'orchestre qui lit cette partition et la transforme en la symphonie visuelle que vous voyez à l'écran. Sans lui, il ne vous resterait que la partition (un bruit incompréhensible) et non la musique (l'image finale).

### À quoi sert-il concrètement ?

- **De la Latence aux Pixels :** Sa fonction principale est de convertir la représentation abstraite (tenseur latent) générée par le modèle en une image réelle, avec des pixels et des couleurs. [2]
- **Compression :** Il peut également faire le contraire, en compressant une image existante dans sa représentation latente (processus d'encodage).
