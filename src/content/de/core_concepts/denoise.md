---
title: 'Denoise: Die Stärke der Transformation'
category: Core Concepts
sources:
  - text: Leitfaden zur Denoising-Stärke auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/denoising-strength/'
  - text: Erklärung von Denoise im Kontext von Img2Img
    url: >-
      https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/
related:
  - steps
  - sampler
  - inpaint
---

Der Parameter **Denoise** (oder *Denoising-Stärke*) ist ein Regler, der steuert, **wie viel des Ausgangsbildes** während des Generierungsprozesses **transformiert werden soll**. Sein Wert reicht von 0,0 (keine Änderung) bis 1,0 (vollständige Änderung). [1]

Stellen Sie sich einen Restaurator vor, der an einem alten Gemälde arbeitet. Der `Denoise` ist seine Anweisung:
- **Denoise = 0,1:** "Frischen Sie nur die Farben leicht auf, fassen Sie die Zeichnung nicht an." (Minimale Änderungen)
- **Denoise = 0,7:** "Behalten Sie die Gesamtkomposition bei, aber malen Sie die Details und den Stil komplett neu." (Signifikante Transformation)
- **Denoise = 1,0:** "Ignorieren Sie das alte Gemälde und malen Sie ein völlig neues auf dieselbe Leinwand." (Erstellung von Grund auf neu)

### Zwei grundlegende Anwendungsszenarien

Das Verhalten von `Denoise` ändert sich je nach Ausgangspunkt:

1.  **Generierung von Grund auf neu (Text-zu-Bild):**
    In einem Standard-Workflow beginnt man mit einem leeren latenten Bild, das zu 100 % aus Rauschen besteht. Um ein völlig neues Bild zu erstellen, muss der `Denoise` auf **1,0** eingestellt werden. Dies sagt dem Sampler: "Nimm 100 % des Rauschens und wandle es in ein Bild um, das dem Prompt folgt". [1]

2.  **Bildmodifikation (Bild-zu-Bild, Inpainting, Upscaling):**
    Hier wird `Denoise` zu einem grundlegenden kreativen Werkzeug. Man beginnt mit einem vorhandenen Bild (oder einer niedrig aufgelösten Version) und sagt dem Modell, es solle es "neu zeichnen".
    - **Niedrige Werte (0,1 - 0,4):** Ideal für das Upscaling oder das Anwenden leichter Stiländerungen, wobei fast alle ursprünglichen Details erhalten bleiben. [2]
    - **Mittlere Werte (0,5 - 0,75):** Der häufigste Bereich für img2img. Es ermöglicht dem Modell, den Stil und die Details erheblich zu ändern, während die Hauptkomposition und die Formen des Ausgangsbildes erhalten bleiben. [2]
    - **Hohe Werte (0,8 - 0,99):** Das Originalbild wird nur als vage Orientierung für die Komposition verwendet. Das Ergebnis wird sehr unterschiedlich sein. [1]

In ComfyUI ist `Denoise` ein expliziter Parameter des `KSampler`, was seine Rolle in jedem Schritt der Generierung sehr deutlich macht.
