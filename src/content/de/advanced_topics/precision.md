---
title: 'Präzision: FP32, FP16, FP8, FP4 und die Rolle der GPU'
category: Advanced Topics
sources:
  - text: Erklärung von Gleitkomma-Datentypen - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic'
  - text: Leitfaden zur gemischten Präzision - Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/optimization/fp16'
  - text: Einführung in 8-Bit-Formate (FP8) - NVIDIA-Blog
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  - text: NVIDIA Ampere-Architektur (30er-Serie) und Tensor Cores der 3. Generation
    url: >-
      https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/
related:
  - checkpoint
  - unet
  - gguf
---

Die **Präzision** eines Modells bezieht sich auf das numerische Format, das zum Speichern seiner "Gewichte" verwendet wird. Diese Gewichte sind reelle Zahlen, und Computer stellen sie mit einem System namens **Gleitkomma** (daher das Akronym **FP**) dar. [1]

Die Zahl, die auf das Akronym folgt (z. B. FP**32**, FP**16**), gibt an, wie viele **Bits** an Speicher verwendet werden, um eine einzelne Zahl darzustellen. Je mehr Bits verwendet werden, desto präziser ist die Zahl, aber desto mehr Platz nimmt sie ein und desto langsamer ist sie zu verarbeiten. Die Wahl der Präzision ist daher ein grundlegender Kompromiss zwischen Qualität, Geschwindigkeit und Speicherverbrauch (VRAM).

### Die unzertrennliche Verbindung mit der Hardware (GPU)

Die Wahl der Präzision ist nicht nur eine Frage der Software: Die Leistung hängt entscheidend von der **nativen Hardware-Unterstützung** Ihrer GPU ab. Wenn eine GPU ein Format mit geringer Präzision nicht nativ unterstützt, muss sie es per Software emulieren, was zu einer geringeren Leistung führt. [4]

Moderne GPUs, insbesondere die von NVIDIA, enthalten spezielle Hardware namens **Tensor Cores**, die entwickelt wurden, um Berechnungen mit reduzierter Präzision drastisch zu beschleunigen. [4]

### Gängige Formate und Hardware-Unterstützung (GeForce-Beispiele)

1.  **FP32 (Volle Präzision - 32-Bit):**
    Es ist die "höchste Qualität". Jede Zahl belegt 32 Bit Speicher. Es ist der Standard, auf dem Modelle trainiert werden, aber es ist sehr aufwendig, es für die Inferenz auszuführen. [2] Ein Modell wird selten vollständig in FP32 verwendet, um Bilder zu erzeugen. Alle GPUs unterstützen es.

2.  **FP16 (Halbe Präzision - 16-Bit):**
    Der Goldstandard für die Inferenz. Es halbiert den VRAM und verdoppelt (oder mehr) die Geschwindigkeit im Vergleich zu FP32, mit einem fast unmerklichen Qualitätsverlust. [2] Die Kompatibilität ist in diesem Fall auch mit nicht ganz neuen GPUs gegeben. [4]

3.  **BF16 (Bfloat16 - 16-Bit):**
    Ein alternatives 16-Bit-Format, das während des Trainings robuster ist. Wird nativ von der **Ampere (RTX 30)**-Serie und neueren unterstützt.

### Quantisierung und erweiterte Hardware-Unterstützung

Die **Quantisierung** wandelt Gewichte in noch niedrigere Formate (8 oder 4 Bit) um. Hier wird die Hardware-Unterstützung noch kritischer.

- **FP8 / INT8 (8-Bit):**
    Es stellt einen großen Fortschritt in Bezug auf die Effizienz dar. Die Hardware-Beschleunigung für FP8 ist ein Hauptmerkmal der neuesten Architekturen, wie **Ada Lovelace (RTX 40)**, die native Unterstützung einführt und eine signifikante Leistungssteigerung mit diesem Format gewährleistet. [3] Ältere Karten können es ausführen, aber mit viel geringerer Effizienz.

    ### Ein genauerer Blick auf FP8

    Der Begriff `FP8` beschreibt eigentlich eine Familie von Formaten. Der Hauptunterschied liegt darin, wie die 8 verfügbaren Bits zwischen dem **Exponenten** (der den möglichen Wertebereich bestimmt) und der **Mantisse** (die die Präzision zwischen einem Wert und dem nächsten bestimmt) aufgeteilt werden. Die beiden Hauptstandards sind:

    - **`E4M3`**: Verwendet 4 Bits für den Exponenten und 3 für die Mantisse. Es bietet ein gutes Gleichgewicht zwischen Bereich und Präzision und wird oft zum Speichern der Modellgewichte verwendet.
    - **`E5M2`**: Verwendet 5 Bits für den Exponenten und 2 für die Mantisse. Es hat einen größeren Dynamikbereich, aber weniger Präzision. Es wird typischerweise für Gradienten während des Trainings verwendet.

    **FP8 Scaled** ist kein eigenständiges Format, sondern beschreibt die Technik, einen Skalierungsfaktor zu verwenden, um die Konvertierung von Gewichten in das FP8-Format zu optimieren und die Präzision im wichtigsten Wertebereich zu maximieren. Moderne GPUs wie die RTX 40-Serie verwalten diese Skalierungsfaktoren sehr effizient.

- **4-Bit (z. B. NF4):**
    Eine extreme Form der Quantisierung, die Leistung hängt stark von optimierten Software-Implementierungen ab, die die allgemeinen Fähigkeiten der GPU optimal nutzen. Die Hardware-Unterstützung kam mit **Blackwell (RTX 50)**.

