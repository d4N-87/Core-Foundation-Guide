---
title: 'Schritte: Die Abtastschritte'
category: Core Concepts
sources:
  - text: Erklärung im Stable Diffusion Art Blog
    url: 'https://stablediffusionart.com/steps/'
  - text: Dokumentation von `DDIMScheduler` auf Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim'
related:
  - sampler
  - scheduler
  - denoise
---

**Schritte** (oder Abtastschritte) geben an, wie oft das Modell das Bild aus reinem Rauschen "verfeinert". Es ist einer der wichtigsten Parameter, um Qualität und Generierungsgeschwindigkeit auszugleichen. [1]

Stellen Sie sich einen Maler vor, der mit einer völlig chaotischen Leinwand beginnt. Jeder "Schritt" ist ein Pinselstrich, der Details und Kohärenz hinzufügt, ein wenig Chaos entfernt (Denoising) und das Bild Ihrem Prompt annähert.

### Wie wählt man die Anzahl der Schritte?

- **Wenige Schritte (z. B. 10-15):** Das Bild wird sehr schnell generiert, kann aber unvollständig, wenig detailliert oder "matschig" erscheinen. Ideal für schnelle Vorschauen.
- **Standardanzahl (z. B. 20-30):** Es ist der ideale Gleichgewichtspunkt für die meisten Modelle und Sampler. Das Bild ist von hoher Qualität und die Generierungszeiten sind angemessen. [1]
- **Viele Schritte (z. B. 40-100):** Eine weitere Erhöhung der Schritte führt zu minimalen (oder manchmal gar keinen) Verbesserungen, erhöht aber die Generierungszeit drastisch.

**Wichtiger Hinweis:** Die Wirkung der Schritte hängt stark vom gewählten **Sampler** ab. Einige Sampler (wie `DPM++ 2M Karras`) erreichen mit nur 20 Schritten eine ausgezeichnete Qualität, während andere möglicherweise 30 oder mehr benötigen. [2]

In letzter Zeit haben sich Modelle und LoRas verbreitet, die auch mit wenigen Schritten hervorragende Ergebnisse ermöglichen, wie z. B. Lightv2x.

Jedes Modell hat normalerweise einen empfohlenen Bereich von Schritten.
