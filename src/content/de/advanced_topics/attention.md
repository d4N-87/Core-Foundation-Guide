---
title: 'Attention: Der Fokusmechanismus'
category: Advanced Topics
sources:
  - text: 'Paper ''Attention Is All You Need'', das den Transformer eingeführt hat'
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Illustrierte Erklärung des Attention-Mechanismus
    url: >-
      https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/
related:
  - clip
  - dit
  - tokens
  - prompt
---

**Attention** (oder *Self-Attention*) ist der Rechenmechanismus im Herzen der **Transformer**-Architektur, der sowohl Sprachmodelle (LLMs) als auch in jüngerer Zeit Diffusionsmodelle (DiTs) revolutioniert hat. [1]

Einfach ausgedrückt, ermöglicht Attention einem Modell, die **Bedeutung verschiedener Teile einer Eingabe dynamisch zu gewichten** (wie Wörter in einem Satz oder Patches in einem Bild), um den Kontext und die Beziehungen zwischen ihnen zu verstehen. [2]

### Wie funktioniert es (konzeptionell)?

Stellen Sie sich vor, Sie lesen den Satz: `Eine rote Katze jagt eine graue Maus`.
Wenn das Modell das Wort "rot" verarbeitet, ermöglicht ihm der Attention-Mechanismus zu verstehen, dass "rot" stark mit "Katze" und nicht mit "Maus" verbunden ist. In der Praxis berechnet Attention für jedes Wort einen "Aufmerksamkeits-Score" in Bezug zu allen anderen Wörtern im Satz und "fokussiert" sich auf die wichtigsten Beziehungen. [2]

Dies ist grundlegend, um Mehrdeutigkeiten aufzulösen und die Nuancen der Sprache zu verstehen.

### Attention in der Bilderzeugung

Der Attention-Mechanismus ist an zwei Stellen in unserem Arbeitsablauf entscheidend:

1.  **Im CLIP Text Encoder:**
    Wenn CLIP unseren Prompt verarbeitet, ist Attention das, was ihm ermöglicht zu verstehen, dass in `ein Astronaut auf einem Pferd` der Astronaut auf dem Pferd sein sollte. Es ist auch der Mechanismus, der beeinflusst wird, wenn wir das Gewicht eines Wortes mit der Syntax `(Wort:1.2)` erhöhen und ihm sagen, dass er diesem Konzept "mehr Aufmerksamkeit" schenken soll.

2.  **In Diffusion Transformers (DiTs):**
    In Modellen wie Stable Diffusion 3 wird Attention nicht nur auf den Text, sondern auch auf die "visuellen Token" (die Bild-Patches) angewendet. Dies ermöglicht es dem Modell, komplexe Beziehungen zwischen verschiedenen Teilen des Bildes zu erstellen, was die Kohärenz und Komposition drastisch verbessert. Zum Beispiel kann es sicherstellen, dass eine Reflexion in einem Spiegel korrekt dem reflektierten Objekt entspricht.

Zusammenfassend lässt sich sagen, dass Attention die Technologie ist, die es Modellen ermöglicht hat, von einer einfachen "Assoziation" von Wörtern zu einem echten "Verständnis" von Kontext und Beziehungen überzugehen, sowohl im Text als auch in Bildern.
