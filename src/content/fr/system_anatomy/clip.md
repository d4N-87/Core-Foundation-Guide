---
title: 'Encodeur de Texte CLIP : Le Traducteur d''Invite'
category: System Anatomy
sources:
  - text: Article Original d'OpenAI sur CLIP
    url: 'https://arxiv.org/abs/2103.00020'
  - text: Explication de CLIP dans le blog de Hugging Face
    url: 'https://huggingface.co/docs/transformers/main/en/model_doc/clip'
  - text: Article illustré sur le fonctionnement de Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - prompt
  - tokens
  - conditioning
  - unet
---

**CLIP (Contrastive Language-Image Pre-training)** est un modèle neuronal développé par OpenAI qui a révolutionné la manière dont les IA "comprennent" la relation entre le texte et les images. [1] Au sein d'un modèle de diffusion, son rôle est celui d'un **traducteur universel** : il prend votre invite en langage humain et la convertit en une représentation mathématique (appelée *embedding*) que l'UNet peut utiliser comme guide. [3]

Les termes "Encodeur de Texte" et "CLIP" sont souvent utilisés de manière interchangeable. Le premier décrit la *fonction*, le second le *nom* du composant qui remplit cette fonction.

Sans CLIP, l'invite "un astronaute à cheval" ne serait qu'une chaîne de texte sans signification pour l'UNet. Grâce à CLIP, cette phrase est transformée en un ensemble de nombres qui "décrivent" mathématiquement les concepts d'"astronaute", de "cheval" et leur relation spatiale.

### Comment fonctionne le processus de "traduction" ?

Le nœud `CLIP Text Encode` dans ComfyUI exécute un processus en plusieurs étapes :

1.  **Tokenisation :**
    D'abord, l'invite est décomposée en plus petits morceaux appelés **Jetons**. [2] Un jeton ne correspond pas nécessairement à un mot. Les mots complexes peuvent être divisés en plusieurs jetons, tandis que les mots courants peuvent être un seul jeton. Chaque modèle CLIP a un nombre maximum de jetons qu'il peut traiter en une seule fois (généralement 75). Si votre invite est plus longue, elle est divisée en plusieurs "morceaux".

2.  **Embedding :**
    Chaque jeton est converti en un vecteur numérique. À ce stade, nous avons une séquence de nombres qui représente notre invite.

3.  **Traitement (Attention) :**
    Cette séquence de nombres est traitée par une architecture Transformer. [3] C'est là que la vraie magie opère : le mécanisme d'**Attention** permet au modèle de comprendre les relations entre les mots. Il ne voit pas seulement "rouge" et "cube", mais il comprend que c'est le "cube" qui doit être "rouge". C'est là que le poids que nous donnons aux mots dans l'invite (par exemple, `(mot:1.2)`) a un effet, en disant au mécanisme d'attention de "prêter plus d'attention" à certains concepts.

Le résultat final de ce processus est le **Conditionnement**, une sortie qui contient les embeddings de l'invite prêts à être "injectés" dans l'UNet et à guider la génération de l'image.

### Différents Modèles, Différents CLIPs

- **Stable Diffusion 1.5** utilise un seul modèle CLIP (OpenCLIP).
- **Stable Diffusion XL (SDXL)** utilise une combinaison de deux modèles CLIP différents (OpenCLIP et CLIP ViT-L), ce qui lui permet de comprendre les invites de manière beaucoup plus riche et nuancée. C'est l'une des principales raisons de sa qualité supérieure.

Cela signifie que plus il y a de CLIPs qui travaillent ensemble, avec plusieurs milliards de paramètres, plus le résultat sera conforme à l'invite.
