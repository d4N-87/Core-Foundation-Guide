---
title: 'Inférence : Utiliser le Modèle Entraîné'
category: Fundamentals
sources:
  - text: Qu'est-ce que l'Inférence ? - Amazon Web Services
    url: 'https://aws.amazon.com/it/what-is/inference/'
  - text: Inférence vs. Entraînement - Google Cloud
    url: 'https://cloud.google.com/discover/inference-vs-training?hl=it'
related:
  - rete_neurale
  - deep_learning
  - checkpoint
---

L'**Inférence** est le processus d'**utilisation d'un réseau neuronal déjà entraîné** pour faire des prédictions sur des données nouvelles et jamais vues auparavant. [1]

Si l'**entraînement** est la phase d'"étude" où le modèle apprend à partir de livres (l'ensemble de données), l'**inférence** est l'**examen final** où il doit appliquer ce qu'il a appris pour répondre à de nouvelles questions. [2]

### Le Processus d'Inférence en Pratique

Lorsque nous générons une image avec Stable Diffusion, nous effectuons un processus d'inférence :
1.  **Charger le Modèle :** Nous prenons un point de contrôle (`.safetensors`), qui est le résultat d'un processus d'entraînement long et coûteux.
2.  **Fournir une Entrée :** Nous donnons au modèle de nouvelles données qu'il n'a jamais vues pendant l'étude (notre invite et une image de bruit aléatoire).
3.  **Le Modèle "Infére" :** Le réseau neuronal traite l'entrée à travers ses couches, en utilisant les poids qu'il a appris, et produit une sortie (la prédiction du bruit à supprimer).
4.  **Nous Obtenons une Sortie :** En répétant ce processus un certain nombre d'"étapes", nous obtenons l'image finale.

### Inférence vs. Entraînement

| Caractéristique | Entraînement | Inférence |
| :--- | :--- | :--- |
| **Objectif** | Enseigner au modèle, créer les "poids" | Utiliser le modèle pour obtenir des résultats |
| **Ressources Requises** | Énormes (nombreuses GPU, semaines de temps) | Modérées (une seule GPU, secondes/minutes) |
| **Données** | Grand ensemble de données étiquetées | Données d'entrée uniques (par exemple, une invite) |
| **Qui le fait ?** | Laboratoires de recherche, entreprises, la communauté | L'utilisateur final (nous !) |

En résumé, chaque fois que nous appuyons sur le bouton "Générer", nous effectuons une **inférence**.
