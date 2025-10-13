---
title: 'Échantillonneur : La Technique de Débruitage'
category: Core Concepts
sources:
  - text: Guide complet des Échantillonneurs sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/samplers/'
  - text: Explication et comparaison des Échantillonneurs
    url: 'https://getimg.ai/guides/guide-to-stable-diffusion-samplers'
  - text: Discussion technique sur les Échantillonneurs et leurs familles
    url: >-
      https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/
related:
  - scheduler
  - steps
  - seed
---

L'**Échantillonneur** (ou méthode d'échantillonnage) est l'algorithme qui exécute matériellement le processus de "débruitage" à chaque étape. [1] Si le modèle d'IA est le cerveau qui prédit le bruit à supprimer, l'échantillonneur est la **technique spécifique** ou le **style de coup de pinceau** que l'artiste utilise pour nettoyer l'image. [2]

Pensez à un bloc de marbre brut (l'image de bruit initiale). Différents sculpteurs (les échantillonneurs) utiliseront des techniques différentes pour arriver à la statue finale, même en suivant le même projet (l'invite). Certains seront plus rapides et plus agressifs, d'autres plus lents et plus méticuleux. Le résultat final sera similaire, mais les détails et la "texture" pourraient varier. [3]

### Principales familles d'échantillonneurs

Bien que la liste dans ComfyUI soit longue, les échantillonneurs peuvent être regroupés en quelques familles principales :

- **Solveurs EDO Ancêtres (par exemple, `Euler`, `Heun`, `LMS`) :** Ce sont les méthodes les plus classiques et les plus simples. [1] `Euler` est le plus simple et le plus rapide. `Heun` est plus précis mais environ deux fois plus lent. [1, 2]
- **Échantillonneurs Ancestraux (par exemple, `Euler a`, `DPM2 a`) :** Ces échantillonneurs réinjectent une petite quantité de bruit à chaque étape. [1] Cela les rend non déterministes : même avec la même graine, l'image finale peut varier légèrement. Ils sont parfaits pour l'exploration créative. [1]
- **DPM / DPM++ (Diffusion Probabilistic Model Solvers) :** Une famille d'échantillonneurs modernes, très efficaces et populaires. [2] Des variantes comme `DPM++ 2M Karras` sont souvent recommandées car elles atteignent une très haute qualité en quelques étapes (20-30), offrant un excellent équilibre entre vitesse et qualité. [2]
- **DDIM (Denoising Diffusion Implicit Models) :** L'un des premiers échantillonneurs développés pour les modèles à diffusion, il est déterministe et fiable, mais souvent dépassé en vitesse et en efficacité par les plus récents DPM++. [1]

### Lequel choisir ?

Il n'y a pas de "meilleur" échantillonneur en termes absolus. Le choix dépend du modèle que vous utilisez et du résultat que vous souhaitez obtenir. Une bonne stratégie consiste à commencer avec un échantillonneur rapide et de haute qualité comme **`DPM++ 2M Karras`** avec 20-30 étapes. [2]

**Important :** L'échantillonneur travaille en étroite collaboration avec le **Planificateur**, qui détermine *la quantité* de bruit à supprimer à chaque étape.
