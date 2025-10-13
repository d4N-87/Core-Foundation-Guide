---
title: 'Précision : FP32, FP16, FP8, FP4 et le Rôle du GPU'
category: Advanced Topics
sources:
  - text: Explication des types de données à virgule flottante - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic'
  - text: Guide de la Précision Mixte - Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/optimization/fp16'
  - text: Introduction aux formats 8 bits (FP8) - Blog NVIDIA
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  - text: Architecture NVIDIA Ampere (Série 30) et les Tensor Cores de 3e génération
    url: >-
      https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/
related:
  - checkpoint
  - unet
  - gguf
---

La **précision** d'un modèle fait référence au format numérique utilisé pour stocker ses "poids". Ces poids sont des nombres réels, et les ordinateurs les représentent à l'aide d'un système appelé **Virgule Flottante** (d'où l'acronyme **FP**). [1]

Le nombre qui suit l'acronyme (par exemple, FP**32**, FP**16**) indique combien de **bits** de mémoire sont utilisés pour représenter un seul nombre. Plus on utilise de bits, plus le nombre est précis, mais plus il prend de place et plus il est lent à traiter. Le choix de la précision est donc un compromis fondamental entre la qualité, la vitesse et la consommation de mémoire (VRAM).

### Le Lien Indissoluble avec le Matériel (GPU)

Le choix de la précision n'est pas seulement logiciel : les performances dépendent de manière critique du **support matériel natif** de votre GPU. Si une GPU ne prend pas en charge nativement un format à faible précision, elle doit l'émuler par logiciel, ce qui entraîne des performances inférieures. [4]

Les GPU modernes, en particulier celles de NVIDIA, incluent du matériel spécialisé appelé **Tensor Cores**, conçu pour accélérer considérablement les calculs à précision réduite. [4]

### Formats Courants et Support Matériel (Exemples GeForce)

1.  **FP32 (Pleine Précision - 32 bits) :**
    C'est la "qualité maximale". Chaque nombre occupe 32 bits de mémoire. C'est la norme sur laquelle les modèles sont entraînés, mais il est très lourd à exécuter pour l'inférence. [2] Un modèle est rarement utilisé entièrement en FP32 pour générer des images. Toutes les GPU le prennent en charge.

2.  **FP16 (Demi-Précision - 16 bits) :**
    La référence pour l'inférence. Il divise par deux la VRAM et double (ou plus) la vitesse par rapport au FP32, avec une perte de qualité presque imperceptible. [2] La compatibilité dans ce cas peut également être trouvée avec des GPU moins récentes. [4]

3.  **BF16 (Bfloat16 - 16 bits) :**
    Un format alternatif de 16 bits, plus robuste pendant l'entraînement. Pris en charge nativement par les séries **Ampere (RTX 30)** et ultérieures.

### Quantification et Support Matériel Avancé

La **quantification** convertit les poids dans des formats encore plus bas (8 ou 4 bits). Ici, le support matériel devient encore plus critique.

- **FP8 / INT8 (8 bits) :**
    Il représente une énorme avancée en termes d'efficacité. L'accélération matérielle pour le FP8 est une fonctionnalité phare des architectures les plus récentes, comme **Ada Lovelace (RTX 40)** qui introduit le support natif, garantissant une augmentation significative des performances avec ce format. [3] Les cartes plus anciennes peuvent l'exécuter, mais avec une efficacité bien moindre.

    ### Un Regard plus Approfondi sur le FP8

    Le terme `FP8` décrit en fait une famille de formats. La principale différence réside dans la manière dont les 8 bits disponibles sont alloués entre l'**Exposant** (qui détermine la plage de valeurs possibles) et la **Mantisse** (qui détermine la précision entre une valeur et une autre). Les deux normes principales sont :

    - **`E4M3`** : Utilise 4 bits pour l'exposant et 3 pour la mantisse. Il offre un bon équilibre entre la plage et la précision, et est souvent utilisé pour stocker les poids du modèle.
    - **`E5M2`** : Utilise 5 bits pour l'exposant et 2 pour la mantisse. Il a une plage dynamique plus large mais moins de précision. Il est généralement utilisé pour les gradients pendant l'entraînement.

    **FP8 Scaled** n'est pas un format en soi, mais décrit la technique d'utilisation d'un facteur d'échelle pour optimiser la conversion des poids au format FP8, maximisant la précision dans la plage de valeurs la plus importante. Les GPU modernes comme la série RTX 40 gèrent ces facteurs d'échelle de manière très efficace.

- **4 bits (par exemple, NF4) :**
    Une forme de quantification extrême, les performances dépendent fortement des implémentations logicielles optimisées qui tirent le meilleur parti des capacités générales de la GPU. Le support matériel est arrivé avec **Blackwell (RTX 50)**.

