---
title: 'GGUF : Quantification pour CPU et GPU'
category: Advanced Topics
sources:
  - text: Annonce officielle de GGUF sur le blog de Hugging Face
    url: 'https://huggingface.co/blog/gguf'
  - text: Dépôt GitHub de llama.cpp
    url: 'https://github.com/ggerganov/llama.cpp'
  - text: Exemple de flux de travail dans ComfyUI avec GGUF Loader
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/llm/'
related:
  - precision
  - llm
  - checkpoint
  - clip
---

**GGUF (Georgi Gerganov Universal Format)** est un format de fichier conçu pour contenir des modèles neuronaux **quantifiés**, c'est-à-dire convertis dans des formats à très basse précision (comme 4 ou 8 bits) pour réduire considérablement leur taille et leur consommation de mémoire. [1]

Né du projet **`llama.cpp`** pour exécuter des Grands Modèles de Langage (LLM) sur des processeurs, son utilisation s'est récemment étendue à l'écosystème des modèles de diffusion d'images. [2]

### L'objectif principal : réduire la consommation de mémoire

L'avantage clé de GGUF est la **quantification**. Un modèle qui occuperait 14 Go de VRAM au format FP16 (`.safetensors`), peut occuper moins de 5 Go au format GGUF quantifié en 4 bits (`q4_K_M`). Cela permet de :
- Exécuter d'énormes modèles sur des GPU avec moins de VRAM.
- Charger plus de composants en mémoire simultanément.
- Exécuter des modèles sur des processeurs de manière efficace.

### GGUF dans le monde des LLM (utilisation classique)

L'utilisation principale de GGUF est pour les modèles de langage. Des interfaces comme LM Studio ou Ollama utilisent des fichiers GGUF pour faire fonctionner des chatbots puissants (comme Llama, Mistral) sur du matériel grand public, en exploitant principalement le processeur. [3]

### GGUF dans le monde de la diffusion (utilisation moderne dans ComfyUI)

La communauté a récemment commencé à appliquer les avantages de la quantification GGUF également aux composants de traitement. Dans ComfyUI, grâce à des nœuds spécialisés (`Load GGUF Model`), il est possible de charger des versions GGUF de :
- **Encodeur de texte (CLIP) :** Le chargement d'un CLIP quantifié réduit considérablement son impact sur la VRAM, libérant des ressources précieuses pour le modèle UNet. C'est l'utilisation la plus courante et la plus efficace.
- **UNet :** Il existe également des expériences pour quantifier l'ensemble de l'UNet au format GGUF. Bien que cela offre une économie de mémoire maximale, cela peut entraîner une perte de qualité plus évidente dans l'image finale par rapport à l'utilisation d'une UNet au format FP16.

C'est un outil polyvalent pour la **gestion avancée de la mémoire**, permettant aux utilisateurs d'exécuter des flux de travail de plus en plus complexes sur du matériel grand public, en équilibrant habilement le compromis entre la consommation de VRAM et la qualité de la sortie.

### Décrypter les nomenclatures de quantification (par exemple, `Q4_K_M`)

Lors du téléchargement d'un modèle GGUF, le nom du fichier contient souvent un acronyme qui décrit la méthode de quantification utilisée. Le comprendre aide à choisir le bon équilibre entre taille et qualité. Voici comment le lire :

- **`Q` suivi d'un nombre (par exemple, `Q4`, `Q5`, `Q8`) :** Indique le nombre de **bits** utilisés pour chaque poids. `Q8` utilise 8 bits (qualité supérieure, fichier plus grand), `Q4` utilise 4 bits (qualité inférieure, fichier plus petit).
- **`_K` :** Indique une variante "K-Quant". C'est une technique de quantification améliorée qui tente de mieux préserver la qualité de l'information, en particulier pour les poids les plus importants. Les modèles `_K` sont souvent le choix recommandé.
- **`_0` ou `_1` (par exemple, `Q4_0`, `Q5_1`) :** Indiquent différentes versions de la même méthode. `_0` est la version "pure" à 4 bits, tandis que `_1` est une version mixte qui utilise une précision légèrement supérieure (5 bits) pour certains poids, offrant une petite amélioration de la qualité avec un fichier légèrement plus grand.
- **`_S`, `_M`, `_L` (par exemple, `Q4_K_S`) :** Indiquent les tailles du modèle ("Small", "Medium", "Large"). Ils ne se réfèrent pas à la quantification elle-même, mais à différentes "tailles" du modèle original.

**Exemples pratiques :**
- **`Q8_0` :** Quantification à 8 bits. Qualité la plus élevée parmi les versions GGUF, mais aussi la plus lourde.
- **`Q5_K_M` :** Quantification "K-Quant" à 5 bits, version "Medium". Un excellent compromis entre qualité et taille.
- **`Q4_0` :** Quantification "pure" à 4 bits. La version la plus petite et la plus légère, mais avec la plus grande perte de qualité. Souvent utilisée pour faire fonctionner d'énormes modèles sur du matériel très limité.
