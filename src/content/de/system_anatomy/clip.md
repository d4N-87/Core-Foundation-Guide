---
title: 'CLIP Text Encoder: Der Prompt-Übersetzer'
category: System Anatomy
sources:
  - text: OpenAIs Original-Paper zu CLIP
    url: 'https://arxiv.org/abs/2103.00020'
  - text: Erklärung von CLIP im Hugging Face-Blog
    url: 'https://huggingface.co/docs/transformers/main/en/model_doc/clip'
  - text: Illustrierter Artikel über die Funktionsweise von Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - prompt
  - tokens
  - conditioning
  - unet
---

**CLIP (Contrastive Language-Image Pre-training)** ist ein von OpenAI entwickeltes neuronales Modell, das die Art und Weise, wie KIs die Beziehung zwischen Text und Bildern "verstehen", revolutioniert hat. [1] Innerhalb eines Diffusionsmodells ist seine Rolle die eines **Universalübersetzers**: Es nimmt Ihren Prompt in menschlicher Sprache und wandelt ihn in eine mathematische Darstellung (genannt *Embedding*) um, die das UNet als Leitfaden verwenden kann. [3]

Die Begriffe "Text Encoder" und "CLIP" werden oft synonym verwendet. Ersterer beschreibt die *Funktion*, letzterer den *Namen* der Komponente, die diese Funktion ausführt.

Ohne CLIP wäre der Prompt "ein Astronaut auf einem Pferd" für das UNet nur eine bedeutungslose Zeichenkette. Dank CLIP wird dieser Satz in eine Reihe von Zahlen umgewandelt, die die Konzepte "Astronaut", "Pferd" und ihre räumliche Beziehung mathematisch "beschreiben".

### Wie funktioniert der "Übersetzungs"-Prozess?

Der `CLIP Text Encode`-Knoten in ComfyUI führt einen mehrstufigen Prozess durch:

1.  **Tokenisierung:**
    Zuerst wird der Prompt in kleinere Teile namens **Token** zerlegt. [2] Ein Token entspricht nicht unbedingt einem Wort. Komplexe Wörter können in mehrere Token aufgeteilt werden, während gebräuchliche Wörter ein einzelnes Token sein können. Jedes CLIP-Modell hat eine maximale Anzahl von Token, die es auf einmal verarbeiten kann (normalerweise 75). Wenn Ihr Prompt länger ist, wird er in mehrere "Chunks" (Teile) aufgeteilt.

2.  **Embedding:**
    Jedes Token wird in einen numerischen Vektor umgewandelt. An diesem Punkt haben wir eine Sequenz von Zahlen, die unseren Prompt darstellt.

3.  **Verarbeitung (Attention):**
    Diese Sequenz von Zahlen wird von einer Transformer-Architektur verarbeitet. [3] Hier geschieht die eigentliche Magie: Der **Attention**-Mechanismus ermöglicht es dem Modell, die Beziehungen zwischen den Wörtern zu verstehen. Es sieht nicht nur "rot" und "Würfel", sondern es versteht, dass es der "Würfel" ist, der "rot" sein soll. Hier wirkt sich das Gewicht aus, das wir den Wörtern im Prompt geben (z. B. `(Wort:1.2)`), indem es dem Aufmerksamkeitsmechanismus sagt, dass er bestimmten Konzepten "mehr Aufmerksamkeit" schenken soll.

Das Endergebnis dieses Prozesses ist das **Conditioning**, eine Ausgabe, die die Embeddings des Prompts enthält, die bereit sind, in das UNet "injiziert" zu werden und die Bilderzeugung zu leiten.

### Verschiedene Modelle, verschiedene CLIPs

- **Stable Diffusion 1.5** verwendet ein einzelnes CLIP-Modell (OpenCLIP).
- **Stable Diffusion XL (SDXL)** verwendet eine Kombination aus zwei verschiedenen CLIP-Modellen (OpenCLIP und CLIP ViT-L), was ihm ermöglicht, Prompts auf eine viel reichhaltigere und nuanciertere Weise zu verstehen. Dies ist einer der Hauptgründe für seine überlegene Qualität.

Dies bedeutet, dass je mehr CLIPs zusammenarbeiten, mit vielen Milliarden von Parametern, desto mehr wird das Ergebnis dem Prompt entsprechen.
