---
title: 'Segmentierung: Die Szene verstehen'
category: System Anatomy
sources:
  - text: Erklärung der Bildsegmentierung - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Image_segmentation'
  - text: Beispiele für Segmentierungsmodelle (z. B. SAM) - Meta AI
    url: 'https://ai.meta.com/blog/segment-anything-sam-computer-vision-model/'
  - text: Verwendung der semantischen Segmentierung in ControlNet
    url: >-
      https://github.com/lllyasviel/ControlNet-v1-1-nightly#controlnet-11-with-semantic-segmentation
related:
  - controlnet
  - inpaint
  - rete_neurale
---

Die **Bildsegmentierung** ist ein Prozess der Computer Vision, der darin besteht, **ein Bild in mehrere Segmente oder Regionen zu unterteilen**, wobei jedem Pixel ein bestimmtes Klassenlabel zugeordnet wird. [1]

Einfach ausgedrückt, ist es die Art und Weise, wie eine KI ein Bild "zerlegt", um seinen Inhalt auf einer sehr detaillierten Ebene zu verstehen. Anstatt nur "ein Foto einer Straße" zu sehen, sieht ein Segmentierungsmodell "diese Pixel sind 'Straße', diese sind 'Himmel', diese sind 'Baum' und jene sind 'Auto'".

### Arten der Segmentierung

Es gibt verschiedene Arten der Segmentierung, aber die häufigsten sind:
- **Semantische Segmentierung:** Jedem Pixel wird eine Kategorie zugewiesen (z. B. "Person", "Katze", "Gras"). Alle Objekte derselben Kategorie haben dieselbe Farbe in der Segmentierungskarte. [3]
- **Instanzsegmentierung:** Sie ist fortgeschrittener. Sie kennzeichnet Pixel nicht nur als "Person", sondern unterscheidet zwischen "Person 1", "Person 2" usw. Jede *Instanz* eines Objekts wird separat identifiziert.

### Anwendungen in der Bilderzeugung

Die Segmentierung ist zu einem leistungsstarken Werkzeug für die Steuerung und Modifikation von generierten Bildern geworden:

1.  **ControlNet mit semantischer Segmentierung:**
    Es ist möglich, eine Segmentierungskarte als Eingabe für ein ControlNet-Modell zu verwenden. [3] Dies ermöglicht es, die Komposition einer Szene sehr präzise zu diktieren. Zum Beispiel kann man eine Karte mit einem blauen Bereich oben (Himmel), einem grünen unten (Wiese) und einem braunen in der Mitte (Haus) bereitstellen, und das Modell wird ein Bild generieren, das genau diese räumliche Anordnung respektiert.

2.  **Automatisches und präzises Inpainting:**
    Fortgeschrittene Modelle wie **SAM (Segment Anything Model)** von Meta AI können unglaublich präzise Segmentierungsmasken für jedes Objekt in einem Bild mit einem einzigen Klick generieren. [2] In ComfyUI ermöglicht dies die Erstellung leistungsstarker Inpainting-Workflows: Sie klicken auf ein Objekt, SAM erstellt die perfekte Maske dafür, und Sie können es mit einem Prompt modifizieren oder ersetzen, ohne die Maske von Hand zeichnen zu müssen.

Zusammenfassend lässt sich sagen, dass die Segmentierung eine Schlüsseltechnologie ist, die eine Interaktion und Manipulation von Bildern auf einem bisher unvorstellbaren Niveau an Präzision und Intelligenz ermöglicht.
