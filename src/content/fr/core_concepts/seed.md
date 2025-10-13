---
title: 'Graine : Le Contrôle de l''Aléatoire'
category: Core Concepts
sources:
  - text: Guide de la Graine sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/seed/'
  - text: Documentation de PyTorch sur la génération de nombres aléatoires
    url: 'https://pytorch.org/docs/stable/notes/randomness.html'
related:
  - steps
  - sampler
---

La **Graine** (en anglais "Seed") est un nombre qui initialise l'état d'aléa pour la génération d'une image. Pensez-y comme au **code d'identification unique** d'une image. [1]

Le processus de diffusion part d'une image de pur bruit aléatoire. La graine est le nombre qui détermine le motif exact de ce bruit initial. Si tous les autres paramètres (invite, étapes, CFG, etc.) restent identiques, l'utilisation de la même graine produira **exactement la même image**. [1, 2]

### À quoi sert la Graine ?

1.  **Reproductibilité :** C'est l'outil fondamental pour obtenir des résultats cohérents. Si vous trouvez une image qui vous plaît, enregistrer sa graine vous permet de la recréer ou de la modifier à partir d'une base certaine.
2.  **Variation Contrôlée :** En changeant la graine d'un seul chiffre (par exemple, de 100 à 101), vous obtiendrez une image complètement différente, tout en conservant le même "style" général dicté par les autres paramètres.
3.  **Débogage et Comparaison :** Pour comparer l'effet de deux échantillonneurs différents ou d'un CFG différent, il est essentiel d'utiliser la même graine. De cette façon, vous êtes sûr que les différences que vous voyez sont causées uniquement par le paramètre que vous avez modifié et non par le hasard.

**Valeur Spéciale : -1**
Dans la plupart des interfaces (y compris ComfyUI), régler la graine sur `-1` a une signification spéciale : "choisir une graine aléatoire pour chaque génération". [1] C'est utile lorsque vous souhaitez explorer de nombreuses variations différentes d'une invite.
