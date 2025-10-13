---
title: 'Neuronales Netz: Das künstliche Gehirn'
category: Fundamentals
sources:
  - text: Was ist ein neuronales Netz? - IBM
    url: 'https://www.ibm.com/it-it/topics/neural-networks'
  - text: Erklärung neuronaler Netze - Wikipedia
    url: 'https://it.wikipedia.org/wiki/Rete_neurale_artificiale'
related:
  - deep_learning
  - inferenza
  - unet
---

Ein **Künstliches Neuronales Netz** ist ein Rechenmodell, das von der Struktur und Funktionsweise des menschlichen Gehirns inspiriert ist. [1] Es ist der grundlegende Baustein fast aller modernen Systeme der künstlichen Intelligenz, einschließlich der Modelle, die Bilder erzeugen.

Stellen Sie sich ein neuronales Netz als ein System von **künstlichen Neuronen** (genannt "Knoten") vor, die in **Schichten** (Layers) organisiert sind. [2]

### Wie funktioniert es (einfach ausgedrückt)?

1.  **Eingabeschicht (Input Layer):** Empfängt die Anfangsdaten. In unserem Fall könnte dies die numerische Darstellung eines Prompts oder die Pixel eines Bildes sein.
2.  **Versteckte Schichten (Hidden Layers):** Dies sind die Zwischenschichten, in denen die eigentliche "Verarbeitung" stattfindet. Jedes Neuron empfängt Signale von den Neuronen der vorhergehenden Schicht, führt eine kleine Berechnung durch und leitet sein Ergebnis an die der nächsten Schicht weiter. Während des Trainings lernt das Netz, die "Verbindungen" (die "Gewichte") zwischen diesen Neuronen anzupassen, um immer komplexere Muster zu erkennen. [1]
3.  **Ausgabeschicht (Output Layer):** Erzeugt das Endergebnis. Zum Beispiel die Vorhersage des Rauschens, das aus einem Bild entfernt werden soll.

Ein Netz mit vielen versteckten Schichten wird als **Tiefes Neuronales Netz (Deep Neural Network)** bezeichnet, und das Feld, das es untersucht, ist das **Deep Learning**. [1]

Die von uns verwendeten Modelle, wie das **UNet** oder **CLIP**, sind extrem große und komplexe Beispiele für neuronale Netze mit Milliarden von Verbindungen, die für ihre spezifischen Aufgaben optimiert sind.
