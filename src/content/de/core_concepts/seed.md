---
title: 'Seed: Die Kontrolle des Zufalls'
category: Core Concepts
sources:
  - text: Leitfaden zum Seed auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/seed/'
  - text: PyTorch-Dokumentation zur Generierung von Zufallszahlen
    url: 'https://pytorch.org/docs/stable/notes/randomness.html'
related:
  - steps
  - sampler
---

Der **Seed** (auf Deutsch "Samen") ist eine Zahl, die den Zufallszustand für die Generierung eines Bildes initialisiert. Stellen Sie ihn sich als den **eindeutigen Identifikationscode** eines Bildes vor. [1]

Der Diffusionsprozess beginnt mit einem Bild aus reinem Zufallsrauschen. Der Seed ist die Zahl, die das genaue Muster dieses anfänglichen Rauschens bestimmt. Wenn alle anderen Parameter (Prompt, Schritte, CFG usw.) identisch bleiben, wird die Verwendung desselben Seeds **genau dasselbe Bild** erzeugen. [1, 2]

### Wozu dient der Seed?

1.  **Reproduzierbarkeit:** Es ist das grundlegende Werkzeug, um konsistente Ergebnisse zu erzielen. Wenn Sie ein Bild finden, das Ihnen gefällt, können Sie es durch Speichern seines Seeds neu erstellen oder von einer sicheren Basis aus ändern.
2.  **Kontrollierte Variation:** Wenn Sie den Seed nur um eine Ziffer ändern (z. B. von 100 auf 101), erhalten Sie ein völlig anderes Bild, während der allgemeine "Stil", der durch die anderen Parameter vorgegeben wird, beibehalten wird.
3.  **Debuggen und Vergleichen:** Um die Wirkung von zwei verschiedenen Samplern oder einem anderen CFG zu vergleichen, ist es wichtig, denselben Seed zu verwenden. Auf diese Weise können Sie sicher sein, dass die Unterschiede, die Sie sehen, nur durch den geänderten Parameter und nicht durch den Zufall verursacht werden.

**Sonderwert: -1**
In den meisten Schnittstellen (einschließlich ComfyUI) hat das Setzen des Seeds auf `-1` eine besondere Bedeutung: "Wähle für jede Generierung einen zufälligen Seed". [1] Dies ist nützlich, wenn Sie viele verschiedene Variationen eines Prompts untersuchen möchten.
