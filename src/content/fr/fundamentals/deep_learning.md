---
title: 'Apprentissage Profond : L''Apprentissage Profond'
category: Fundamentals
sources:
  - text: Qu'est-ce que l'Apprentissage Profond ? - IBM
    url: 'https://www.ibm.com/it-it/topics/deep-learning'
  - text: 'L''Apprentissage Profond, une explication simple - Intel'
    url: 'https://www.intel.it/content/www/it/it/analytics/deep-learning.html'
related:
  - rete_neurale
  - inferenza
---

L'**Apprentissage Profond** (Deep Learning) est une sous-catégorie de l'Apprentissage Automatique basée sur des **Réseaux Neuronaux Artificiels Profonds**, c'est-à-dire des réseaux neuronaux avec de nombreuses couches cachées (de dizaines à des centaines). [1]

La "profondeur" du réseau est ce qui lui permet d'apprendre à reconnaître automatiquement des motifs et des hiérarchies dans les données. [2]

### Comment fonctionne l'apprentissage ?

Pensez à un enfant qui apprend à reconnaître un chat :
1.  **Première Couche (Simple) :** Il apprend à reconnaître des éléments de base comme les lignes, les bords et les couleurs.
2.  **Couches Intermédiaires (Complexe) :** Il combine ces éléments simples pour reconnaître des formes plus complexes comme des oreilles pointues, des moustaches, des yeux.
3.  **Couches Finales (Abstrait) :** Il combine les formes complexes pour arriver au concept abstrait de "chat".

L'Apprentissage Profond fonctionne de manière similaire. Pendant l'**entraînement**, le réseau analyse des millions d'exemples (par exemple, des images étiquetées) et ajuste de manière autonome les "poids" des connexions entre ses neurones pour devenir de plus en plus performant dans la mise en correspondance d'une entrée (une image) avec une sortie correcte (l'étiquette "chat"). [1]

### Apprentissage Profond vs. Apprentissage Automatique Traditionnel

Dans l'Apprentissage Automatique traditionnel, un spécialiste devait souvent "prétraiter" les données et extraire manuellement les caractéristiques importantes à faire analyser par le modèle. Dans l'Apprentissage Profond, le réseau neuronal profond apprend à extraire ces caractéristiques par lui-même, directement à partir des données brutes. [2]

Tous les modèles dont nous parlons dans ce manuel (Stable Diffusion, CLIP, etc.) sont le résultat d'applications extrêmement avancées de l'Apprentissage Profond.
