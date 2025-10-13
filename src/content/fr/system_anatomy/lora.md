---
title: 'LoRa : Modificateurs de Style Légers'
category: System Anatomy
sources:
  - text: >-
      Article Original : LoRA : Adaptation de rang faible des grands modèles de
      langage
    url: 'https://arxiv.org/abs/2106.09685'
  - text: Guide des LoRa sur Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Explication technique des LoRa sur Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/training/lora'
related:
  - checkpoint
  - unet
  - clip
---

Une **LoRa (Low-Rank Adaptation)** est un petit fichier qui applique des modifications ciblées à un modèle de point de contrôle complet, sans l'altérer de façon permanente. [1] Pensez à une LoRa comme à un **ensemble d'instructions supplémentaires** ou à un **filtre transparent** que vous placez sur le "cerveau" principal (le point de contrôle) pour lui faire adopter un style spécifique, reproduire un personnage ou un concept. [2]

L'avantage principal des LoRa est leur **taille réduite**. Alors qu'un point de contrôle complet peut peser plusieurs gigaoctets, une LoRa ne pèse généralement que quelques mégaoctets (de 2 à 200 Mo). [3] Cela les rend faciles à télécharger, à partager et à utiliser.

### Comment fonctionnent-elles ?

Au lieu de ré-entraîner l'ensemble du modèle (un processus coûteux), une LoRa est entraînée pour "intercepter" et modifier seulement une petite partie des poids de l'UNet et de l'Encodeur de Texte. [3] Lorsque vous appliquez une LoRa, ses petits poids sont ajoutés à ceux du modèle principal pendant la génération, influençant le résultat final.

### Types courants de LoRa

Les LoRa sont incroyablement polyvalentes et peuvent être entraînées à des fins diverses :

1.  **Style (LoRa de Style) :**
    Ces LoRa enseignent au modèle un style artistique spécifique (par exemple, "style Ghibli", "pixel art", "peinture à l'huile baroque"). Elles sont parmi les plus populaires. [2]

2.  **Personnage (LoRa de Personnage) :**
    Entraînées sur des images d'un personnage spécifique (réel ou fictif), elles permettent d'insérer ce personnage dans n'importe quelle scène avec une bonne cohérence.

3.  **Concept (LoRa de Concept) :**
    Elles peuvent enseigner au modèle un concept plus abstrait, comme une pose particulière, un type de vêtement ou un objet spécifique.

### Utilisation dans ComfyUI

Dans ComfyUI, les LoRa sont chargées via un nœud `Load LoRA` qui s'insère généralement entre le `Load Checkpoint` et le `KSampler`. Ce nœud prend en entrée le modèle et le CLIP du point de contrôle et renvoie une version "modifiée" des deux, prête à être utilisée dans le reste du flux de travail.

Il est également possible de **combiner plusieurs LoRa** (un processus appelé *empilement*), en appliquant différents filtres en séquence, bien que cela puisse conduire à des résultats imprévisibles si les LoRa entrent en conflit les unes avec les autres.
