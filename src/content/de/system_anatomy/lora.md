---
title: 'LoRa: Leichte Stilmodifikatoren'
category: System Anatomy
sources:
  - text: 'Original-Paper: LoRA: Low-Rank Adaptation of Large Language Models'
    url: 'https://arxiv.org/abs/2106.09685'
  - text: Leitfaden zu LoRas auf Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Technische Erklärung von LoRas auf Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/training/lora'
related:
  - checkpoint
  - unet
  - clip
---

Eine **LoRa (Low-Rank Adaptation)** ist eine kleine Datei, die gezielte Änderungen an einem vollständigen Checkpoint-Modell vornimmt, ohne es dauerhaft zu verändern. [1] Stellen Sie sich eine LoRa als einen **zusätzlichen Satz von Anweisungen** oder einen **transparenten Filter** vor, den Sie über das Haupt-"Gehirn" (den Checkpoint) legen, um ihm einen bestimmten Stil zu verleihen, einen Charakter oder ein Konzept zu replizieren. [2]

Der Hauptvorteil von LoRas ist ihre **geringe Größe**. Während ein vollständiger Checkpoint mehrere Gigabyte wiegen kann, wiegt eine LoRa typischerweise nur wenige Megabyte (von 2 bis 200 MB). [3] Dies macht sie einfach herunterzuladen, zu teilen und zu verwenden.

### Wie funktionieren sie?

Anstatt das gesamte Modell neu zu trainieren (ein kostspieliger Prozess), wird eine LoRa darauf trainiert, nur einen kleinen Teil der Gewichte des UNet und des Text-Encoders zu "abzufangen" und zu modifizieren. [3] Wenn Sie eine LoRa anwenden, werden ihre kleinen Gewichte während der Generierung zu denen des Hauptmodells hinzugefügt, was das Endergebnis beeinflusst.

### Gängige Arten von LoRas

LoRas sind unglaublich vielseitig und können für verschiedene Zwecke trainiert werden:

1.  **Stil (Stil-LoRa):**
    Diese LoRas lehren dem Modell einen bestimmten künstlerischen Stil (z. B. "Ghibli-Stil", "Pixel-Art", "barocke Ölmalerei"). Sie gehören zu den beliebtesten. [2]

2.  **Charakter (Charakter-LoRa):**
    Trainiert auf Bildern eines bestimmten Charakters (real oder fiktiv), ermöglichen sie es, diesen Charakter mit guter Konsistenz in jede Szene einzufügen.

3.  **Konzept (Konzept-LoRa):**
    Sie können dem Modell ein abstrakteres Konzept beibringen, wie z. B. eine bestimmte Pose, eine Art von Kleidung oder ein bestimmtes Objekt.

### Verwendung in ComfyUI

In ComfyUI werden LoRas über einen `Load LoRA`-Knoten geladen, der typischerweise zwischen dem `Load Checkpoint` und dem `KSampler` eingefügt wird. Dieser Knoten nimmt das Modell und den CLIP aus dem Checkpoint als Eingabe und gibt eine "modifizierte" Version von beiden zurück, die bereit ist, im Rest des Workflows verwendet zu werden.

Es ist auch möglich, **mehrere LoRas zu kombinieren** (ein Prozess, der *Stacking* genannt wird), indem verschiedene Filter nacheinander angewendet werden, obwohl dies zu unvorhersehbaren Ergebnissen führen kann, wenn die LoRas miteinander in Konflikt stehen.
