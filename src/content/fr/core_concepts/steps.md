---
title: 'Étapes : Les Étapes d''Échantillonnage'
category: Core Concepts
sources:
  - text: Explication dans le blog de Stable Diffusion Art
    url: 'https://stablediffusionart.com/steps/'
  - text: Documentation de `DDIMScheduler` sur Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim'
related:
  - sampler
  - scheduler
  - denoise
---

Les **Étapes** (ou étapes d'échantillonnage) indiquent combien de fois le modèle "affine" l'image en partant du bruit pur. C'est l'un des paramètres les plus importants pour équilibrer la qualité et la vitesse de génération. [1]

Imaginez un peintre qui part d'une toile complètement chaotique. Chaque "étape" est un coup de pinceau qui ajoute des détails et de la cohérence, en supprimant un peu de chaos (débruitage) et en rapprochant l'image de votre invite.

### Comment choisir le nombre d'étapes ?

- **Peu d'Étapes (par exemple, 10-15) :** L'image est générée très rapidement, mais elle peut paraître incomplète, peu détaillée ou "boueuse". Idéal pour des aperçus rapides.
- **Nombre Standard (par exemple, 20-30) :** C'est le point d'équilibre idéal pour la plupart des modèles et des échantillonneurs. L'image est de haute qualité et les temps de génération sont raisonnables. [1]
- **Beaucoup d'Étapes (par exemple, 40-100) :** Augmenter davantage les étapes n'apporte que des améliorations minimes (voire nulles), mais augmente considérablement le temps de génération.

**Note importante :** L'effet des étapes dépend énormément de l'**Échantillonneur** choisi. Certains échantillonneurs (comme `DPM++ 2M Karras`) atteignent une excellente qualité avec seulement 20 étapes, tandis que d'autres peuvent en avoir besoin de 30 ou plus. [2]

Ces derniers temps, des modèles et des LoRas se sont répandus qui permettent d'obtenir d'excellents résultats même avec peu d'étapes, comme Lightv2x.

Chaque modèle a généralement une plage d'étapes recommandée.
