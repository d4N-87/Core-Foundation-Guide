---
title: 'Point de Contrôle : Le Cerveau du Modèle'
category: System Anatomy
sources:
  - text: Que sont les Modèles de Stable Diffusion ? - Stable Diffusion Art
    url: 'https://stablediffusionart.com/models/'
  - text: Explication des formats .ckpt et .safetensors - Hugging Face
    url: 'https://huggingface.co/docs/safetensors/index'
  - text: Guide des différents types de modèles d'IA
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Introduction aux Modèles Distillés (SDXL Turbo)
    url: 'https://stability.ai/news/sdxl-turbo'
related:
  - unet
  - clip
  - vae
  - lora
---

Le terme **Point de Contrôle** (ou *Modèle*) fait référence aux fichiers qui contiennent les "poids" du réseau neuronal, c'est-à-dire le **cerveau entraîné** de l'intelligence artificielle. [1] Le chargement d'un point de contrôle est la première étape de tout flux de travail, mais la manière dont il est effectué reflète deux approches principales : monolithique et modulaire.

### 1. L'Approche Monolithique (Traditionnelle)

Dans cette approche, un seul fichier de point de contrôle (avec l'extension `.ckpt` ou `.safetensors`) contient les trois composants clés nécessaires à la génération : [3]
- L'**UNet**, le cœur du modèle de diffusion.
- L'**Encodeur de Texte** (CLIP), pour interpréter l'invite.
- Le **VAE**, pour créer l'image finale.

Cette méthode est simple et directe : vous chargez un fichier et vous avez tout ce dont vous avez besoin. Elle est très courante pour les modèles basés sur Stable Diffusion 1.5.

### 2. L'Approche Modulaire (Moderne)

Avec l'avènement de modèles plus complexes comme FLUX.1 et la flexibilité d'interfaces comme ComfyUI, il est devenu courant de charger les composants séparément. Dans ce scénario, vous ne chargez pas un seul "point de contrôle", mais ses parties constitutives :
- Un fichier pour l'**UNet** (souvent appelé "modèle de base" ou "modèle de diffusion").
- Un ou plusieurs fichiers pour l'**Encodeur de Texte CLIP** (FLUX.1 en utilise même deux).
- Un fichier pour le **VAE**.

Cette approche offre une flexibilité énorme : vous pouvez, par exemple, utiliser l'UNet d'un modèle avec le VAE d'un autre pour corriger les problèmes de couleurs, ou expérimenter avec différents Encodeurs de Texte. [1]

**Alors, est-ce que ça a encore un sens de parler de Points de Contrôle ?**
Oui. Le terme "point de contrôle" est encore couramment utilisé dans la communauté pour désigner le fichier principal du modèle, en particulier l'**UNet**. Lorsque vous téléchargez un modèle "affiné" depuis Civitai, vous téléchargez principalement une UNet modifiée, que vous pouvez utiliser de manière monolithique (si elle contient tout) ou modulaire, en l'associant à un CLIP et un VAE de votre choix.

### La Hiérarchie des Modèles

Nous pouvons classer les modèles dans une sorte de hiérarchie :

1.  **Modèles de Base :**
    Ce sont les fondations. Publiés par des laboratoires de recherche (par exemple, Stability AI, Black Forest Labs), ils sont entraînés sur d'énormes ensembles de données génériques. Ils sont très puissants mais n'ont souvent pas de style artistique défini. Exemples : `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Modèles Affinés :**
    Ce sont des modèles de base que la communauté a entraînés davantage sur des ensembles de données plus petits et plus spécifiques pour obtenir un style particulier (par exemple, photoréalisme, anime, fantasy). La grande majorité des modèles sur des sites comme Civitai entrent dans cette catégorie. [1, 3]

3.  **Modèles Personnalisés (Fusion) :**
    Ceux-ci ne sont pas entraînés, mais créés en **mélangeant les poids** de deux ou plusieurs modèles affinés. C'est une technique très populaire pour combiner les styles de différents modèles et en créer un nouveau et unique. C'est plus un art qu'une science, et les résultats peuvent varier. [3]

4.  **Modèles Distillés :**
    Ils constituent une catégorie spéciale. Un modèle "distillé" est une version plus petite et plus rapide d'un modèle de base, créée par un processus d'entraînement qui "distille" les connaissances du modèle plus grand. L'exemple le plus célèbre est **SDXL Turbo**, qui peut générer des images de haute qualité en très peu d'étapes (1-4), au détriment d'une moindre flexibilité. [4] Ou encore des versions comme FLUX.1 Dev distillé à partir du Pro.

### Formats : `.ckpt` vs. `.safetensors`

Quelle que soit l'approche, les fichiers sont distribués dans deux formats :

- **`.ckpt` (Point de Contrôle) :** Le format original basé sur le "pickle" de Python. Potentiellement non sécurisé, car il peut contenir du code exécutable. [2]
- **`.safetensors` (Tenseurs Sûrs) :** La nouvelle norme, plus sûre et plus rapide à charger, qui ne contient que les données du modèle. [2] **Il est toujours recommandé de préférer le format `.safetensors` lorsqu'il est disponible.**
