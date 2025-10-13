---
title: 'Réseau Neuronal : Le Cerveau Artificiel'
category: Fundamentals
sources:
  - text: Qu'est-ce qu'un Réseau Neuronal ? - IBM
    url: 'https://www.ibm.com/it-it/topics/neural-networks'
  - text: Explication des Réseaux Neuronaux - Wikipedia
    url: 'https://it.wikipedia.org/wiki/Rete_neurale_artificiale'
related:
  - deep_learning
  - inferenza
  - unet
---

Un **Réseau Neuronal Artificiel** est un modèle de calcul inspiré de la structure et du fonctionnement du cerveau humain. [1] C'est la brique de base de presque tous les systèmes d'intelligence artificielle modernes, y compris les modèles qui génèrent des images.

Pensez à un réseau neuronal comme à un système de **neurones artificiels** (appelés "nœuds") organisés en **couches**. [2]

### Comment ça marche (simplement) ?

1.  **Couche d'Entrée :** Reçoit les données initiales. Dans notre cas, il pourrait s'agir de la représentation numérique d'une invite ou des pixels d'une image.
2.  **Couches Cachées :** Ce sont les couches intermédiaires où se déroule le véritable "traitement". Chaque neurone reçoit des signaux des neurones de la couche précédente, effectue un petit calcul et transmet son résultat à ceux de la couche suivante. Pendant l'entraînement, le réseau apprend à ajuster les "connexions" (les "poids") entre ces neurones pour reconnaître des motifs de plus en plus complexes. [1]
3.  **Couche de Sortie :** Produit le résultat final. Par exemple, la prédiction du bruit à supprimer d'une image.

Un réseau avec de nombreuses couches cachées est appelé un **Réseau Neuronal Profond**, et le domaine qui l'étudie est l'**Apprentissage Profond**. [1]

Les modèles que nous utilisons, comme l'**UNet** ou **CLIP**, sont des exemples extrêmement grands et complexes de réseaux neuronaux, avec des milliards de connexions optimisées pour leurs tâches spécifiques.
