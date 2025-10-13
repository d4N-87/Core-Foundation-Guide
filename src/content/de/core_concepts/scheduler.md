---
title: 'Scheduler: Der Denoising-Plan'
category: Core Concepts
sources:
  - text: Offizielle Dokumentation der Scheduler auf Hugging Face Diffusers
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview'
  - text: Erklärung der Beziehung zwischen Sampler und Scheduler
    url: >-
      https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/
  - text: Diskussion in ComfyUI über den Unterschied zwischen den Schedulern
    url: 'https://github.com/comfyanonymous/ComfyUI/discussions/227'
related:
  - sampler
  - steps
  - karras
---

Der **Scheduler** (Planer) ist der Algorithmus, der die **Strategie** und das **Tempo** des Denoising-Prozesses definiert. [1] Wenn der Sampler die *Technik* ist, mit der der Künstler malt, ist der Scheduler sein *Arbeitsplan*: er entscheidet, **wie viel Rauschen zu entfernen ist und bei welchem Schritt**. [2]

Denken Sie noch einmal an den Bildhauer. Der Scheduler ist seine Strategie: "In den ersten 10 Schritten werde ich einen großen Meißel verwenden, um große Marmorstücke zu entfernen und die Form grob zu bearbeiten (viel Rauschen entfernen). In den nächsten 10 Schritten werde ich zu einem kleineren Meißel wechseln, um die Details zu definieren (weniger Rauschen entfernen, aber präziser)." [2]

Dieser nichtlineare Plan ist entscheidend: Das Entfernen großer Rauschmengen am Anfang beschleunigt den Prozess, während die Konzentration auf Details am Ende die Bildqualität verbessert. [1]

### Gängige Scheduler-Typen in ComfyUI

In ComfyUI ist die Wahl des Schedulers von der des Samplers getrennt, was eine granularere Kontrolle ermöglicht. [3] Die gebräuchlichsten sind:

- **Normal:** Es ist der Standard-Scheduler mit einer linearen Progression des Denoising.
- **Karras:** Vorgeschlagen von dem Forscher Tero Karras, ist dieser Scheduler sehr beliebt. [3] Er verwendet eine nichtlineare Progression, die mehr "Feinarbeit" auf die letzten Schritte konzentriert. [1] Dies führt oft zu Bildern mit feineren Details und einer besseren Qualitätswahrnehmung. [3]
- **Simple:** Ein sehr einfacher Scheduler, der, wie der Schöpfer von ComfyUI sagt, in einigen Szenarien überraschend gut funktioniert. [3]
- **DDIM Uniform:** Ein spezieller Scheduler, der zusammen mit dem `ddim`-Sampler verwendet wird, um sein ursprüngliches Verhalten zu replizieren. [3]

**Zusammenfassend:** Der **Sampler** ist das *Wie* das Rauschen entfernt wird, der **Scheduler** ist das *Wann* und *Wie viel*. Ihre Kombination bestimmt die Effizienz und Qualität des Endergebnisses.
