---
title: 'Denoise : La Force de la Transformation'
category: Core Concepts
sources:
  - text: Guide de la Force de Débruitage sur Stable Diffusion Art
    url: 'https://stablediffusionart.com/denoising-strength/'
  - text: Explication du Denoise dans le contexte de Img2Img
    url: >-
      https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/
related:
  - steps
  - sampler
  - inpaint
---

Le paramètre **Denoise** (ou *force de débruitage*) est un bouton qui contrôle **quelle partie de l'image de départ doit être transformée** pendant le processus de génération. Sa valeur va de 0.0 (aucun changement) à 1.0 (changement complet). [1]

Pensez à un restaurateur travaillant sur un vieux tableau. Le `denoise` est sa directive :
- **Denoise = 0.1 :** "Rafraîchissez juste légèrement les couleurs, ne touchez pas au dessin." (Changements minimes)
- **Denoise = 0.7 :** "Conservez la composition générale, mais repeignez complètement les détails et le style." (Transformation significative)
- **Denoise = 1.0 :** "Ignorez le vieux tableau et peignez-en un entièrement nouveau sur la même toile." (Création à partir de zéro)

### Deux scénarios d'utilisation fondamentaux

Le comportement du `denoise` change en fonction du point de départ :

1.  **Génération à partir de zéro (Texte-à-Image) :**
    Dans un flux de travail standard, on part d'une image latente vide, qui est à 100% de bruit. Pour créer une image entièrement nouvelle, le `denoise` doit être réglé sur **1.0**. Cela dit à l'échantillonneur : "Prenez 100% du bruit et transformez-le en une image en suivant l'invite". [1]

2.  **Modification d'une image (Image-à-Image, Inpainting, Upscaling) :**
    Ici, le `denoise` devient un outil créatif fondamental. On part d'une image existante (ou d'une version à basse résolution) et on demande au modèle de la "redessiner".
    - **Valeurs faibles (0.1 - 0.4) :** Idéales pour l'upscaling ou pour appliquer de légers changements de style, en préservant presque tous les détails originaux. [2]
    - **Valeurs moyennes (0.5 - 0.75) :** La plage la plus courante pour l'img2img. Elle permet au modèle de changer considérablement le style et les détails, tout en conservant la composition et les formes principales de l'image de départ. [2]
    - **Valeurs élevées (0.8 - 0.99) :** L'image originale n'est utilisée que comme un vague guide pour la composition. Le résultat sera très différent. [1]

Dans ComfyUI, le `denoise` est un paramètre explicite du `KSampler`, ce qui rend son rôle très clair à chaque étape de la génération.
