---
title: 'Inpainting & Outpainting : Modifier et Étendre les Images'
category: System Anatomy
sources:
  - text: >-
      Article original sur l'Inpainting avec les Modèles de Diffusion (Blended
      Diffusion)
    url: 'https://arxiv.org/abs/2111.14818'
  - text: >-
      Guide pratique de l'Inpainting dans Automatic1111 (les concepts sont
      universels)
    url: 'https://stable-diffusion-art.com/inpainting-a-beginners-guide/'
  - text: Explication de l'Outpainting (ou 'Uncrop')
    url: 'https://stable-diffusion-art.com/outpainting/'
related:
  - denoise
  - vae
  - controlnet
---

L'**Inpainting** et l'**Outpainting** sont deux techniques puissantes qui utilisent des modèles de diffusion non pas pour créer une image à partir de zéro, mais pour **modifier ou étendre des parties spécifiques d'une image existante**. [2] Toutes deux reposent sur le même principe : fournir au modèle une image partielle et lui demander de "remplir" les parties manquantes de manière cohérente.

### Inpainting : Redessiner l'intérieur

L'**Inpainting** consiste à **remplacer une partie d'une image** par quelque chose de nouveau, généré par l'IA. [1]

Le processus est simple :
1.  On part d'une image existante.
2.  On crée un **masque**, c'est-à-dire qu'on "colore" la zone que l'on veut modifier.
3.  On fournit une nouvelle invite qui décrit ce que l'on veut insérer dans la zone masquée.

Le modèle utilisera la zone non masquée comme contexte pour générer le nouveau contenu, en essayant de l'intégrer naturellement en termes de style, de lumières et d'ombres. [2] C'est la technique parfaite pour :
- **Corriger des erreurs :** Supprimer des objets indésirables, réparer des mains déformées.
- **Changer des détails :** Modifier la couleur d'une robe, changer l'expression d'un visage.
- **Ajouter des éléments :** Insérer un nouveau personnage ou un objet dans une scène.

### Outpainting : Étendre l'extérieur

L'**Outpainting** (ou "uncrop") est le processus inverse : au lieu de remplir un trou *à l'intérieur* de l'image, on **étend la toile vers l'extérieur**, en demandant à l'IA d'imaginer et de dessiner ce qui se trouve au-delà des bords d'origine. [3]

Le modèle utilise l'ensemble de l'image d'origine comme contexte pour générer les nouveaux pixels, étendant la scène de manière cohérente. C'est une technique incroyablement utile pour :
- **Changer le format :** Transformer une image verticale en une image horizontale pour une bannière.
- **Corriger les plans serrés :** "Éloigner la caméra" pour montrer plus de contexte autour d'un sujet.
- **Créer des panoramas :** Étendre progressivement une image dans plusieurs directions pour créer de vastes paysages.

### Le rôle clé du `Denoise`

Dans les deux techniques, le paramètre **Denoise** est fondamental. Il contrôle la "puissance" qu'a le modèle pour ignorer les pixels d'origine (s'ils sont présents dans la zone à modifier) et suivre la nouvelle invite.
- Un `denoise` élevé donnera au modèle plus de liberté créative.
- Un `denoise` faible essaiera de préserver davantage la structure et les couleurs de la zone d'origine.
