---
title: 'DiT: Die Diffusion Transformers'
category: Advanced Topics
sources:
  - text: 'Original-Paper: Skalierbare Diffusionsmodelle mit Transformern'
    url: 'https://arxiv.org/abs/2212.09748'
  - text: 'Ankündigung von Stable Diffusion 3, basierend auf DiT'
    url: 'https://stability.ai/news/stable-diffusion-3'
  - text: Erklärung der DiT-Architektur - Hugging Face
    url: 'https://huggingface.co/papers/2212.09748'
related:
  - unet
  - llm
  - diffusion_model
  - attention
---

Ein **DiT (Diffusion Transformer)** ist eine neue Architektur für Diffusionsmodelle, die **das traditionelle UNet durch einen Transformer ersetzt**. [1] Es ist eine Weiterentwicklung, die Innovationen aus der Welt der Großen Sprachmodelle (LLMs) entlehnt und sie auf die Bilderzeugung anwendet, was eine größere Skalierbarkeit und Effizienz verspricht.

### Warum das UNet ersetzen?

Das **UNet** war jahrelang die dominierende Architektur, hat aber inhärente Grenzen in seiner Fähigkeit zu "skalieren", d.h. seine Leistung zu verbessern, wenn seine Größe und Rechenleistung zunehmen.

Die **Transformer**-Architektur hat dank ihres **Attention**-Mechanismus in LLMs bewiesen, dass sie unglaublich effektiv bei der Verwaltung und Verknüpfung großer Datenmengen ist. Die Idee hinter den DiTs ist: "Was wäre, wenn wir ein Bild nicht als ein Gitter von Pixeln behandeln, sondern als eine Sequenz von 'Patches' (Stücken), ähnlich wie ein Transformer eine Sequenz von Wörtern behandelt?". [1]

### Wie funktioniert ein DiT?

1.  Das latente Bild wird in eine Reihe von "Patches" (visuelle Token) zerlegt.
2.  Diese Token werden von einem Transformer verarbeitet, der den Attention-Mechanismus verwendet, um die Beziehungen zwischen den verschiedenen Teilen des Bildes zu verstehen.
3.  Der Transformer, der durch den Prompt konditioniert ist, sagt das Rauschen voraus, das von jedem Patch entfernt werden soll.

Dieser Ansatz hat sich als extrem skalierbar erwiesen: Je größer und leistungsfähiger der Transformer, desto besser die Ergebnisse, die die Leistung traditioneller UNets bei gleichen Ressourcen übertreffen. [1]

### Konkrete Beispiele und die Zukunft

- **Sora:** OpenAIs revolutionäres Text-zu-Video-Modell basiert auf einer DiT-Architektur.
- **Stable Diffusion 3:** Die neue Version des Modells von Stability AI verzichtet auf das UNet zugunsten einer DiT-Architektur, genauer gesagt **MMDiT (Multi-Modal DiT)**. [2] Ein MMDiT verwendet zwei verschiedene Transformer, einen zur Verarbeitung von Textdaten und einen für Bilddaten, was ein viel tieferes und genaueres Verständnis des Prompts ermöglicht. [2]

DiTs stellen einen grundlegenden Schritt in Richtung immer leistungsfähigerer, kohärenterer Erzeugungsmodelle dar, die in der Lage sind, die komplexen Nuancen der menschlichen Sprache zu verstehen.
