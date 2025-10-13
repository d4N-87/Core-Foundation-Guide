---
title: 'Checkpoint: Das Gehirn des Modells'
category: System Anatomy
sources:
  - text: Was sind Stable Diffusion-Modelle? - Stable Diffusion Art
    url: 'https://stablediffusionart.com/models/'
  - text: Erklärung der Formate .ckpt und .safetensors - Hugging Face
    url: 'https://huggingface.co/docs/safetensors/index'
  - text: Leitfaden zu verschiedenen Arten von KI-Modellen
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Einführung in destillierte Modelle (SDXL Turbo)
    url: 'https://stability.ai/news/sdxl-turbo'
related:
  - unet
  - clip
  - vae
  - lora
---

Der Begriff **Checkpoint** (oder *Modell*) bezieht sich auf die Dateien, die die "Gewichte" des neuronalen Netzes enthalten, d.h. das **trainierte Gehirn** der künstlichen Intelligenz. [1] Das Laden eines Checkpoints ist der erste Schritt eines jeden Workflows, aber die Art und Weise, wie dies geschieht, spiegelt zwei Hauptansätze wider: monolithisch und modular.

### 1. Der monolithische Ansatz (traditionell)

Bei diesem Ansatz enthält eine einzelne Checkpoint-Datei (mit der Erweiterung `.ckpt` oder `.safetensors`) alle drei Schlüsselkomponenten, die für die Generierung erforderlich sind: [3]
- Das **UNet**, das Herzstück des Diffusionsmodells.
- Der **Text Encoder** (CLIP), um den Prompt zu interpretieren.
- Das **VAE**, um das endgültige Bild zu erstellen.

Diese Methode ist einfach und direkt: Sie laden eine Datei und haben alles, was Sie brauchen. Sie ist sehr verbreitet für Modelle, die auf Stable Diffusion 1.5 basieren.

### 2. Der modulare Ansatz (modern)

Mit dem Aufkommen komplexerer Modelle wie FLUX.1 und der Flexibilität von Schnittstellen wie ComfyUI ist es üblich geworden, die Komponenten separat zu laden. In diesem Szenario laden Sie nicht einen einzelnen "Checkpoint", sondern seine Bestandteile:
- Eine Datei für das **UNet** (oft als "Basismodell" oder "Diffusionsmodell" bezeichnet).
- Eine oder mehrere Dateien für den **CLIP Text Encoder** (FLUX.1 verwendet sogar zwei).
- Eine Datei für das **VAE**.

Dieser Ansatz bietet eine enorme Flexibilität: Sie können beispielsweise das UNet eines Modells mit dem VAE eines anderen verwenden, um Farbprobleme zu korrigieren, oder mit verschiedenen Text Encodern experimentieren. [1]

**Also, macht es noch Sinn, von Checkpoints zu sprechen?**
Ja. Der Begriff "Checkpoint" wird in der Community immer noch häufig verwendet, um sich auf die Hauptmodelldatei zu beziehen, insbesondere auf das **UNet**. Wenn Sie ein "feinabgestimmtes" Modell von Civitai herunterladen, laden Sie hauptsächlich ein modifiziertes UNet herunter, das Sie sowohl monolithisch (wenn es alles enthält) als auch modular verwenden können, indem Sie es mit CLIP und VAE Ihrer Wahl kombinieren.

### Die Hierarchie der Modelle

Wir können Modelle in eine Art Hierarchie einteilen:

1.  **Basismodelle:**
    Sie sind die Grundlagen. Sie werden von Forschungslabors (z. B. Stability AI, Black Forest Labs) veröffentlicht und auf riesigen und generischen Datensätzen trainiert. Sie sind sehr leistungsstark, haben aber oft keinen definierten künstlerischen Stil. Beispiele: `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Feinabgestimmte Modelle:**
    Dies sind Basismodelle, die die Community auf kleineren und spezifischeren Datensätzen weiter trainiert hat, um einen bestimmten Stil zu erzielen (z. B. Fotorealismus, Anime, Fantasy). Die überwiegende Mehrheit der Modelle auf Websites wie Civitai fällt in diese Kategorie. [1, 3]

3.  **Benutzerdefinierte Modelle (Merge):**
    Diese werden nicht trainiert, sondern durch **Mischen der Gewichte** von zwei oder mehr feinabgestimmten Modellen erstellt. Es ist eine sehr beliebte Technik, um die Stile verschiedener Modelle zu kombinieren und ein neues und einzigartiges zu schaffen. Es ist mehr eine Kunst als eine Wissenschaft, und die Ergebnisse können variieren. [3]

4.  **Destillierte Modelle:**
    Sie sind eine besondere Kategorie. Ein "destilliertes" Modell ist eine kleinere und schnellere Version eines Basismodells, die durch einen Trainingsprozess erstellt wird, der das Wissen des größeren Modells "destilliert". Das berühmteste Beispiel ist **SDXL Turbo**, das qualitativ hochwertige Bilder in sehr wenigen Schritten (1-4) erzeugen kann, auf Kosten einer geringeren Flexibilität. [4] Oder auch Versionen wie FLUX.1 Dev, die aus der Pro-Version destilliert wurden.

### Formate: `.ckpt` vs. `.safetensors`

Unabhängig vom Ansatz werden die Dateien in zwei Formaten verteilt:

- **`.ckpt` (Checkpoint):** Das ursprüngliche Format, das auf dem "Pickle" von Python basiert. Potenziell unsicher, da es ausführbaren Code enthalten kann. [2]
- **`.safetensors` (Sichere Tensoren):** Der neue Standard, sicherer und schneller zu laden, der nur die Daten des Modells enthält. [2] **Es wird immer empfohlen, das `.safetensors`-Format zu bevorzugen, wenn es verfügbar ist.**
