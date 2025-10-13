---
title: 'Inpainting & Outpainting: Bilder modifizieren und erweitern'
category: System Anatomy
sources:
  - text: Original-Paper zu Inpainting mit Diffusionsmodellen (Blended Diffusion)
    url: 'https://arxiv.org/abs/2111.14818'
  - text: >-
      Praktischer Leitfaden zu Inpainting in Automatic1111 (die Konzepte sind
      universell)
    url: 'https://stable-diffusion-art.com/inpainting-a-beginners-guide/'
  - text: Erklärung von Outpainting (oder 'Uncrop')
    url: 'https://stable-diffusion-art.com/outpainting/'
related:
  - denoise
  - vae
  - controlnet
---

**Inpainting** und **Outpainting** sind zwei leistungsstarke Techniken, die Diffusionsmodelle nicht verwenden, um ein Bild von Grund auf neu zu erstellen, sondern um **bestimmte Teile eines vorhandenen Bildes zu modifizieren oder zu erweitern**. [2] Beide basieren auf demselben Prinzip: dem Modell ein Teilbild zur Verfügung zu stellen und es zu bitten, die fehlenden Teile kohärent "auszufüllen".

### Inpainting: Das Innere neu zeichnen

**Inpainting** besteht darin, **einen Teil eines Bildes** durch etwas Neues zu **ersetzen**, das von der KI generiert wird. [1]

Der Prozess ist einfach:
1.  Man beginnt mit einem vorhandenen Bild.
2.  Man erstellt eine **Maske**, d.h. man "färbt" den Bereich, den man ändern möchte.
3.  Man gibt einen neuen Prompt an, der beschreibt, was man in den maskierten Bereich einfügen möchte.

Das Modell verwendet den nicht maskierten Bereich als Kontext, um den neuen Inhalt zu generieren, und versucht, ihn in Bezug auf Stil, Licht und Schatten natürlich zu integrieren. [2] Es ist die perfekte Technik für:
- **Fehlerkorrektur:** Unerwünschte Objekte entfernen, deformierte Hände reparieren.
- **Details ändern:** Die Farbe eines Kleides ändern, den Ausdruck eines Gesichts ändern.
- **Elemente hinzufügen:** Einen neuen Charakter oder ein Objekt in eine Szene einfügen.

### Outpainting: Das Äußere erweitern

**Outpainting** (oder "Uncrop") ist der umgekehrte Prozess: Anstatt ein Loch *im* Bild zu füllen, **erweitert man die Leinwand nach außen** und bittet die KI, sich vorzustellen und zu zeichnen, was sich jenseits der ursprünglichen Ränder befindet. [3]

Das Modell verwendet das gesamte Originalbild als Kontext, um die neuen Pixel zu generieren und die Szene kohärent zu erweitern. Es ist eine unglaublich nützliche Technik für:
- **Formatänderung:** Ein vertikales Bild in ein horizontales für ein Banner umwandeln.
- **Enge Aufnahmen korrigieren:** "Die Kamera herauszoomen", um mehr Kontext um ein Motiv herum zu zeigen.
- **Panoramen erstellen:** Ein Bild schrittweise in mehrere Richtungen erweitern, um weite Landschaften zu schaffen.

### Die Schlüsselrolle von `Denoise`

In beiden Techniken ist der Parameter **Denoise** von grundlegender Bedeutung. Er steuert, wie viel "Macht" das Modell hat, die ursprünglichen Pixel zu ignorieren (sofern sie im zu ändernden Bereich vorhanden sind) und dem neuen Prompt zu folgen.
- Ein hoher `Denoise` gibt dem Modell mehr kreative Freiheit.
- Ein niedriger `Denoise` versucht, die Struktur und die Farben des ursprünglichen Bereichs stärker zu erhalten.
