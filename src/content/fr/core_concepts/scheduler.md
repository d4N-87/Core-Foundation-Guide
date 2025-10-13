---
title: 'Planificateur : Le Plan de Débruitage'
category: Core Concepts
sources:
  - text: Documentation officielle des Planificateurs sur Hugging Face Diffusers
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview'
  - text: Explication de la relation entre l'Échantillonneur et le Planificateur
    url: >-
      https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/
  - text: Discussion dans ComfyUI sur la différence entre les Planificateurs
    url: 'https://github.com/comfyanonymous/ComfyUI/discussions/227'
related:
  - sampler
  - steps
  - karras
---

Le **Planificateur** est l'algorithme qui définit la **stratégie** et le **rythme** du processus de débruitage. [1] Si l'Échantillonneur est la *technique* avec laquelle l'artiste peint, le planificateur est son *plan de travail* : il décide **de la quantité de bruit à supprimer et à quelle étape**. [2]

Pensez à nouveau au sculpteur. Le planificateur est sa stratégie : "Dans les 10 premières passes, j'utiliserai un grand ciseau pour enlever de gros morceaux de marbre et dégrossir la forme (enlever beaucoup de bruit). Dans les 10 suivantes, je passerai à un ciseau plus petit pour définir les détails (enlever moins de bruit, mais de manière plus précise)." [2]

Ce plan non linéaire est crucial : enlever de grandes quantités de bruit au début accélère le processus, tandis que se concentrer sur les détails à la fin améliore la qualité de l'image. [1]

### Types de Planificateurs Courants dans ComfyUI

Dans ComfyUI, le choix du planificateur est séparé de celui de l'échantillonneur, offrant un contrôle plus granulaire. [3] Les plus courants sont :

- **Normal :** C'est le planificateur standard, avec une progression linéaire du débruitage.
- **Karras :** Proposé par le chercheur Tero Karras, ce planificateur est très populaire. [3] Il utilise une progression non linéaire qui concentre plus de "travail de finition" vers les dernières étapes. [1] Cela se traduit souvent par des images avec des détails plus fins et une meilleure perception de la qualité. [3]
- **Simple :** Un planificateur très simple qui, comme le dit le créateur de ComfyUI, fonctionne étonnamment bien dans certains scénarios. [3]
- **DDIM Uniform :** Un planificateur spécifique à utiliser en tandem avec l'échantillonneur `ddim` pour répliquer son comportement d'origine. [3]

**En résumé :** L'**Échantillonneur** est le *comment* le bruit est supprimé, le **Planificateur** est le *quand* et *combien*. Leur combinaison détermine l'efficacité et la qualité du résultat final.
