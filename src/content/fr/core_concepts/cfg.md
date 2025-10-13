---
title: 'CFG : L''Échelle de Guidage'
category: Core Concepts
sources:
  - text: Explication technique sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/what-is-cfg-scale/'
  - text: 'Article Original : Guidage de Diffusion sans Classifieur'
    url: 'https://arxiv.org/abs/2207.12598'
related:
  - prompt
  - sampler
  - conditioning
---

L'**Échelle CFG (Classifier-Free Guidance)** est l'un des paramètres les plus puissants à votre disposition. En termes simples, c'est un bouton qui contrôle **avec quelle fidélité** le modèle doit suivre les instructions de votre invite. [1]

Pensez à l'invite comme à une carte et au modèle comme à un explorateur. Le CFG est le niveau de discipline de l'explorateur :
- **Une valeur faible** lui dit : "Voici la carte, mais n'hésitez pas à explorer les environs si vous trouvez quelque chose d'intéressant". Le résultat sera plus créatif, mais il pourrait ignorer des parties de l'invite.
- **Une valeur élevée** lui ordonne : "Suivez cette carte à la lettre, sans déviations !". Le résultat sera beaucoup plus fidèle à l'invite, mais il pourrait perdre de sa naturalité.

### Pourquoi s'appelle-t-il "Classifier-Free" ?

Le nom technique vient du fait que cette méthode n'a pas besoin d'un modèle "classifieur" externe pour guider la génération, contrairement aux techniques plus anciennes. [2] Le guidage est intégré dans le modèle de diffusion lui-même, ce qui le rend plus efficace.

### Guide pratique des valeurs de CFG

- **CFG faible (1-6) :** Liberté créative maximale.
- **CFG moyen (7-12) :** Le point d'équilibre idéal. La plupart des interfaces utilisent une valeur par défaut d'environ 7. [1]
- **CFG élevé (13-20+) :** Adhérence très stricte à l'invite. À des valeurs trop élevées, l'image risque de devenir "brûlée", avec des couleurs et un contraste excessifs. [1]

Les modèles distillés ont un CFG de 1, une condition qui rend l'invite négative inutilisable.

Chaque modèle a généralement sa propre valeur CFG recommandée.
