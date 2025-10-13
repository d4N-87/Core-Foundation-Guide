---
title: 'CFG: Die Führungsskala'
category: Core Concepts
sources:
  - text: Technische Erklärung auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/what-is-cfg-scale/'
  - text: 'Original-Paper: Classifier-Free Diffusion Guidance'
    url: 'https://arxiv.org/abs/2207.12598'
related:
  - prompt
  - sampler
  - conditioning
---

Die **CFG (Classifier-Free Guidance) Skala** ist einer der mächtigsten Parameter, die Ihnen zur Verfügung stehen. Einfach ausgedrückt, ist es ein Regler, der steuert, **wie genau** das Modell den Anweisungen in Ihrem Prompt folgen soll. [1]

Stellen Sie sich den Prompt als eine Karte und das Modell als einen Entdecker vor. Die CFG ist das Disziplinniveau des Entdeckers:
- **Ein niedriger Wert** sagt ihm: "Hier ist die Karte, aber fühlen Sie sich frei, die Umgebung zu erkunden, wenn Sie etwas Interessantes finden". Das Ergebnis wird kreativer sein, könnte aber Teile des Prompts ignorieren.
- **Ein hoher Wert** befiehlt ihm: "Folgen Sie dieser Karte buchstabengetreu, ohne Abweichungen!". Das Ergebnis wird viel mehr dem Prompt entsprechen, könnte aber an Natürlichkeit verlieren.

### Warum heißt es "Classifier-Free"?

Der technische Name leitet sich von der Tatsache ab, dass diese Methode im Gegensatz zu älteren Techniken kein externes "Klassifikator"-Modell benötigt, um die Generierung zu leiten. [2] Die Führung ist in das Diffusionsmodell selbst integriert, was es effizienter macht.

### Praktischer Leitfaden zu den CFG-Werten

- **Niedriger CFG (1-6):** Maximale kreative Freiheit.
- **Mittlerer CFG (7-12):** Der ideale Gleichgewichtspunkt. Die meisten Schnittstellen verwenden einen Standardwert von etwa 7. [1]
- **Hoher CFG (13-20+):** Sehr strikte Einhaltung des Prompts. Bei zu hohen Werten besteht die Gefahr, dass das Bild "ausbrennt", mit übermäßigen Farben und Kontrasten. [1]

Destillierte Modelle haben einen CFG von 1, eine Bedingung, die den negativen Prompt unbrauchbar macht.

Jedes Modell hat normalerweise seinen eigenen empfohlenen CFG-Wert.
