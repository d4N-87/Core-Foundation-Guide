---
title: 'Embedding (Inversion Textuelle) : Enseigner de Nouveaux Concepts'
category: System Anatomy
sources:
  - text: 'Article Original : Une Image vaut un Mot (Inversion Textuelle)'
    url: 'https://arxiv.org/abs/2208.01618'
  - text: Explication des Embeddings sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/embedding/'
  - text: Guide des Embeddings (TI) sur Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
related:
  - clip
  - prompt
  - tokens
  - lora
---

Un **Embedding**, également connu sous le nom d'**Inversion Textuelle**, est un petit fichier qui enseigne au modèle un **nouveau concept visuel** en l'associant à un mot-clé spécifique. [1]

Pensez au modèle CLIP comme à un immense dictionnaire qui relie les mots à des idées visuelles. Un embedding, c'est comme si vous pouviez **ajouter un nouveau mot à ce dictionnaire**. [2] Par exemple, vous pouvez entraîner un embedding sur 5 à 10 photos de votre chat et l'associer au mot-clé `ohwx-cat`. À partir de ce moment, chaque fois que vous écrirez `ohwx-cat` dans votre invite, le modèle saura exactement à quel chat vous faites référence.

### Comment ça marche ?

Contrairement à une LoRa qui modifie les poids de l'UNet (le "peintre"), un embedding ne modifie que les poids de l'Encodeur de Texte (le "traducteur"). [3] Il n'apprend pas au modèle à dessiner dans un nouveau style, mais il lui apprend le sens d'un nouveau "mot" (jeton). [1] Le fichier d'un embedding est extrêmement petit, souvent de quelques kilo-octets seulement.

### Embedding vs. LoRa

| Caractéristique | Embedding (Inversion Textuelle) | LoRa |
| :--- | :--- | :--- |
| **Objectif** | Enseigner un nouveau **concept** (objet, personnage) | Enseigner un nouveau **style** ou un personnage complexe |
| **Composant Modifié** | Encodeur de Texte (CLIP) | UNet (et parfois l'Encodeur de Texte) |
| **Taille du Fichier** | Très petite (Ko) | Petite (Mo) |
| **Flexibilité** | Moins flexible, "injecte" un concept | Plus flexible, peut modifier tout le style |

### Types courants d'embeddings

- **Style :** Bien que moins courants que les LoRas à cette fin, certains embeddings peuvent reproduire des styles artistiques simples.
- **Personnage/Objet :** L'utilisation la plus courante. Parfait pour créer des images cohérentes d'une personne, d'un animal ou d'un objet spécifique.
- **Embedding Négatif :** Un type spécial d'embedding entraîné sur des images de mauvaise qualité (par exemple, avec des mains déformées, laides, etc.). En insérant le mot-clé de cet embedding dans l' *invite négative*, la qualité générale de l'image est considérablement améliorée. Des exemples célèbres sont `EasyNegative` ou `bad-hands`. [2]

Dans ComfyUI, les embeddings sont généralement chargés dans un dossier spécifique, puis rappelés simplement en écrivant leur mot-clé (le nom du fichier) directement dans l'invite.
