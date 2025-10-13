---
title: 'ControlNet: Die KI mit Bildern leiten'
category: System Anatomy
sources:
  - text: >-
      Original-Paper: Hinzufügen von bedingter Kontrolle zu
      Text-zu-Bild-Diffusionsmodellen
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Illustrierter Leitfaden zu ControlNet
    url: >-
      https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/
  - text: Offizielles GitHub-Repository mit den Modellen
    url: 'https://github.com/lllyasviel/ControlNet'
related:
  - checkpoint
  - unet
  - conditioning
---

**ControlNet** ist eine neuronale Netzwerkarchitektur, die es ermöglicht, **Diffusionsmodelle mithilfe einer visuellen Eingabe**, wie einem Bild oder einer Datenkarte, zu **konditionieren und zu steuern**. [1] Einfach ausgedrückt, ist es ein System, das neben dem Hauptmodell (dem UNet) arbeitet und ihm eine zusätzliche "visuelle Führung" bietet, die viel präziser und direkter ist als ein einfacher Text-Prompt. [2]

Stellen Sie sich das Diffusionsmodell als einen talentierten Künstler vor, dem Sie nur verbale Anweisungen geben können. ControlNet ist wie das Geben einer **Pauszeichnung** oder einer **Vorbereitungsskizze**: Der Künstler behält seine Kreativität und seinen Stil bei, folgt aber treu der Komposition, Pose oder Struktur, die Sie ihm vorgegeben haben. [2]

### Der ControlNet-Workflow

Ein typischer Workflow mit ControlNet findet in zwei Hauptphasen statt:

1.  **Vorverarbeitung:**
    Man beginnt mit einem Eingangsbild. Dieses Bild wird von einem **Vorprozessor** verarbeitet, einem Algorithmus, der eine "Karte" spezifischer Informationen daraus extrahiert. Diese Karte wird als Führung verwendet. Es gibt viele Arten von Vorprozessoren, von denen jeder auf eine andere Art von Kontrolle spezialisiert ist. [3]

2.  **Anwendung des ControlNet-Modells:**
    Die generierte Karte wird an ein spezifisches ControlNet-Modell übergeben, das darauf trainiert ist, diese Art von Karte zu "verstehen". Dieses ControlNet-Modell arbeitet parallel zum UNet des Haupt-Checkpoints und injiziert seine visuelle Führung bei jedem Schritt des Denoising-Prozesses, um das Ergebnis zu zwingen, die Karte zu respektieren. [1]

### Beispiele für gängige Vorprozessoren und Modelle

- **Canny:**
    Es ist ein **Kantenerkennungs**-Algorithmus. Der `Canny`-Vorprozessor nimmt ein Bild und wandelt es in eine Schwarz-Weiß-Strichzeichnung um, wobei nur die Umrisse der Objekte hervorgehoben werden. [3] Es ist äußerst nützlich, um die genaue Komposition eines Fotos oder einer Zeichnung zu replizieren.

- **Tiefe:**
    Der `Tiefe`-Vorprozessor analysiert ein Bild und erstellt eine **Tiefenkarte**, bei der die Farben (normalerweise von Weiß nach Schwarz) angeben, welche Objekte näher oder weiter von der "Kamera" entfernt sind. [3] Dies ermöglicht es, die 3D-Anordnung einer Szene auf ein völlig anderes Bild zu übertragen.

- **OpenPose:**
    Dieser Vorprozessor erkennt das "Skelett" von einer oder mehreren Personen in einem Bild und erstellt eine Karte mit der **genauen Pose** jeder Figur. Es ist das definitive Werkzeug zur Steuerung der Haltung und Position von Charakteren.

- **Kritzelei / Skizze:**
    Es ermöglicht die Verwendung einer einfachen Kritzelei oder einer handgezeichneten Skizze als Leitfaden für die allgemeine Komposition des Bildes.

ControlNet hat die Tür zu einem bisher undenkbaren Maß an Kontrolle und Konsistenz geöffnet und ist zu einem unverzichtbaren Werkzeug für Animation, Design und jede Anwendung geworden, die präzise und reproduzierbare Ergebnisse erfordert.
