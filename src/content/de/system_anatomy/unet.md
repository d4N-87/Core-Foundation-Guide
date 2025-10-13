---
title: 'UNet: Das Herz des Denoising'
category: System Anatomy
sources:
  - text: 'Original-Paper, das das UNet eingeführt hat (für biomedizinische Bilder)'
    url: 'https://arxiv.org/abs/1505.04597'
  - text: Erklärung des UNet im Kontext von Stable Diffusion - Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-unet'
  - text: Illustrierter Artikel über die Architektur von Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - checkpoint
  - diffusion_model
  - conditioning
  - clip
---

Das **UNet** ist die zentrale und wichtigste Komponente eines Diffusionsmodells wie Stable Diffusion. Es ist das neuronale Netz, das lernt, **Rauschen schrittweise** aus einem latenten Bild zu **entfernen**, geleitet von den Anweisungen des Prompts. [2, 3]

Wenn der Checkpoint das "Gehirn" ist, ist das UNet der **Parietallappen**, der Teil, der sensorische Informationen (den Prompt) verarbeitet, um eine kohärente räumliche Darstellung (das Bild) zu erstellen.

### Warum heißt es "U-Net"?

Der Name leitet sich von seiner Architektur ab, die eine charakteristische "U"-Form hat. [1] Der Verarbeitungsprozess innerhalb des UNet findet in zwei Hauptphasen statt:

1.  **Encoder (Der Abstieg):**
    Das verrauschte Bild tritt in den ersten Teil des "U" ein. Bei jedem Schritt nach unten **komprimiert das Netz das Bild**, reduziert seine Auflösung, erhöht aber die Anzahl der Informationskanäle. In der Praxis versucht es, den Inhalt des Bildes auf einer immer abstrakteren Ebene zu "verstehen", indem es die feinen Details ignoriert, um die Hauptformen und -konzepte zu erfassen. [3]

2.  **Decoder (Der Aufstieg):**
    Am unteren Ende des "U" (dem *Flaschenhals*) angekommen, beginnt die komprimierte Information wieder aufzusteigen. Bei jedem Schritt nach oben **dekomprimiert das Netz das Bild**, erhöht seine Auflösung und verwendet die zuvor gelernten abstrakten Informationen, um die Details kohärent zu rekonstruieren. Dank "Skip-Verbindungen", die die Ebenen des Abstiegs direkt mit denen des Aufstiegs verbinden, "vergisst" das Netz die niedrig aufgelösten Details nicht, während es das Bild rekonstruiert. [1, 3]

### Die Rolle des Conditionings

Das UNet arbeitet nicht blind. Bei jedem Schritt seines Prozesses erhält es zwei grundlegende Eingaben, die es leiten (ein Prozess, der **Conditioning** genannt wird):
- **Der Prompt:** Die Informationen aus dem Text-Encoder (CLIP) werden in das UNet "injiziert", um ihm zu sagen, *was* es zeichnen soll.
- **Der Zeitschritt:** Eine Zahl, die angibt, bei welchem Schritt des Denoising-Prozesses man sich befindet. Dies ermöglicht es dem UNet, am Anfang (wenn viel Rauschen vorhanden ist) aggressiver und am Ende sanfter zu sein. [2]

Zusammenfassend lässt sich sagen, dass, wenn Sie ein Basismodell oder einen Checkpoint in ComfyUI laden, der größte und wichtigste Teil dieser Datei genau das UNet ist.
