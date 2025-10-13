---
title: 'GGUF: Quantisierung für CPU und GPU'
category: Advanced Topics
sources:
  - text: Offizielle GGUF-Ankündigung im Hugging Face-Blog
    url: 'https://huggingface.co/blog/gguf'
  - text: GitHub-Repository von llama.cpp
    url: 'https://github.com/ggerganov/llama.cpp'
  - text: Beispiel für einen Workflow in ComfyUI mit GGUF Loader
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/llm/'
related:
  - precision
  - llm
  - checkpoint
  - clip
---

**GGUF (Georgi Gerganov Universal Format)** ist ein Dateiformat, das entwickelt wurde, um **quantisierte** neuronale Modelle zu enthalten, d.h. in Formate mit sehr geringer Präzision (wie 4 oder 8 Bit) konvertiert, um ihre Größe und ihren Speicherverbrauch drastisch zu reduzieren. [1]

Entstanden aus dem Projekt **`llama.cpp`** zur Ausführung von Großen Sprachmodellen (LLMs) auf CPUs, hat sich seine Verwendung kürzlich auch auf das Ökosystem der Bilddiffusionsmodelle ausgeweitet. [2]

### Der Hauptzweck: Reduzierung des Speicherverbrauchs

Der Hauptvorteil von GGUF ist die **Quantisierung**. Ein Modell, das im FP16-Format (`.safetensors`) 14 GB VRAM belegen würde, kann im GGUF-Format, das auf 4 Bit quantisiert ist (`q4_K_M`), weniger als 5 GB belegen. Dies ermöglicht:
- Das Ausführen riesiger Modelle auf GPUs mit weniger VRAM.
- Das gleichzeitige Laden mehrerer Komponenten in den Speicher.
- Das effiziente Ausführen von Modellen auf CPUs.

### GGUF in der Welt der LLMs (klassische Verwendung)

Die primäre Verwendung von GGUF ist für Sprachmodelle. Schnittstellen wie LM Studio oder Ollama verwenden GGUF-Dateien, um leistungsstarke Chatbots (wie Llama, Mistral) auf Consumer-Hardware auszuführen, wobei hauptsächlich die CPU genutzt wird. [3]

### GGUF in der Welt der Diffusion (moderne Verwendung in ComfyUI)

In jüngerer Zeit hat die Community begonnen, die Vorteile der GGUF-Quantisierung auch auf Verarbeitungskomponenten anzuwenden. In ComfyUI ist es über spezielle Knoten (`Load GGUF Model`) möglich, GGUF-Versionen von Folgendem zu laden:
- **Text Encoder (CLIP):** Das Laden eines quantisierten CLIP reduziert seinen Einfluss auf den VRAM erheblich und gibt wertvolle Ressourcen für das UNet-Modell frei. Dies ist die häufigste und effektivste Verwendung.
- **UNet:** Es gibt auch Experimente, um das gesamte UNet im GGUF-Format zu quantisieren. Obwohl dies die maximale Speichereinsparung bietet, kann es zu einem deutlicheren Qualitätsverlust im endgültigen Bild führen, verglichen mit der Verwendung eines UNet im FP16-Format.

Es ist ein vielseitiges Werkzeug für die **fortgeschrittene Speicherverwaltung**, das es Benutzern ermöglicht, immer komplexere Workflows auf Consumer-Hardware auszuführen und dabei den Kompromiss zwischen VRAM-Verbrauch und Ausgabequalität geschickt auszubalancieren.

### Entschlüsselung der Quantisierungsnomenklaturen (z. B. `Q4_K_M`)

Beim Herunterladen eines GGUF-Modells enthält der Dateiname oft ein Akronym, das die verwendete Quantisierungsmethode beschreibt. Das Verständnis hilft, das richtige Gleichgewicht zwischen Größe und Qualität zu wählen. So wird es gelesen:

- **`Q` gefolgt von einer Zahl (z. B. `Q4`, `Q5`, `Q8`):** Gibt die Anzahl der **Bits** an, die für jedes Gewicht verwendet werden. `Q8` verwendet 8 Bits (höhere Qualität, größere Datei), `Q4` verwendet 4 Bits (niedrigere Qualität, kleinere Datei).
- **`_K`:** Gibt eine "K-Quant"-Variante an. Es ist eine verbesserte Quantisierungstechnik, die versucht, die Qualität der Informationen besser zu erhalten, insbesondere bei den wichtigsten Gewichten. `_K`-Modelle sind oft die empfohlene Wahl.
- **`_0` oder `_1` (z. B. `Q4_0`, `Q5_1`):** Geben verschiedene Versionen derselben Methode an. `_0` ist die "reine" 4-Bit-Version, während `_1` eine gemischte Version ist, die eine etwas höhere Präzision (5-Bit) für einige Gewichte verwendet und eine kleine Qualitätsverbesserung bei einer etwas größeren Datei bietet.
- **`_S`, `_M`, `_L` (z. B. `Q4_K_S`):** Geben die Modellgrößen an ("Small", "Medium", "Large"). Sie beziehen sich nicht auf die Quantisierung selbst, sondern auf verschiedene "Größen" des ursprünglichen Modells.

**Praktische Beispiele:**
- **`Q8_0`:** 8-Bit-Quantisierung. Höchste Qualität unter den GGUF-Versionen, aber auch die schwerste.
- **`Q5_K_M`:** "K-Quant" 5-Bit-Quantisierung, "Medium"-Version. Ein ausgezeichneter Kompromiss zwischen Qualität und Größe.
- **`Q4_0`:** "Reine" 4-Bit-Quantisierung. Die kleinste und leichteste Version, aber mit dem größten Qualitätsverlust. Wird oft verwendet, um riesige Modelle auf sehr begrenzter Hardware auszuführen.
