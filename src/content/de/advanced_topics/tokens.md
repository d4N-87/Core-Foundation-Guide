---
title: 'Token: Die Bausteine der Sprache'
category: Advanced Topics
sources:
  - text: Einführung in die Tokenisierung - Hugging Face
    url: 'https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt'
  - text: Ankündigung des FLUX.1-Modells von Black Forest Labs
    url: 'https://blackforestlabs.ai/announcing-flux/'
  - text: Erklärung von Token im Kontext von Stable Diffusion
    url: 'https://stable-diffusion-art.com/token/'
related:
  - clip
  - prompt
  - attention
---

**Token** sind die grundlegenden Einheiten, in die ein Text zerlegt wird, bevor er von einem Sprachmodell wie CLIP verarbeitet wird. [1] Sie sind die "Bausteine", mit denen das Modell unseren Prompt liest und versteht.

Ein Token ist **nicht unbedingt ein ganzes Wort**. Der Prozess der **Tokenisierung** verwendet ein vordefiniertes Vokabular, um den Text in Teile zu zerlegen, die das Modell kennt. [3]

### Beispiele für die Tokenisierung

Betrachten wir das Wort `unbeschreiblich`. Ein Tokenizer könnte es in mehrere ihm bekannte Token zerlegen:
`un` + `be` + `schreib` + `lich`

- **Häufige Wörter** (z. B. `Katze`, `der`, `ein`) sind oft ein einzelnes Token.
- **Komplexe oder seltene Wörter** werden in Unterwörter zerlegt.
- **Leerzeichen und Satzzeichen** werden als separate Token behandelt.

Dieser Ansatz ermöglicht es dem Modell, ein praktisch unendliches Vokabular aus einer endlichen Anzahl von Token (normalerweise zwischen 30.000 und 50.000) zu verwalten. [1]

### Die Token-Grenze und die Entwicklung der Modelle

Jeder Text-Encoder hat eine **maximale Token-Grenze**, die er in einem einzigen "Chunk" verarbeiten kann. Diese Grenze war lange Zeit eine der Haupteinschränkungen im Prompt-Engineering.

- **Alte Architekturen (z. B. Stable Diffusion 1.5, SDXL):**
  Diese Modelle verwenden Text-Encoder (CLIP) mit einer Grenze von **75 Token** pro Chunk. [3] Wenn ein Prompt länger ist, wird er in mehrere Chunks aufgeteilt, aber das Verständnis des Kontexts zwischen einem Block und dem nächsten ist viel schwächer. Dies hat die Benutzer gezwungen, die wichtigsten Konzepte am Anfang des Prompts zu konzentrieren.

- **Neue Architekturen (z. B. FLUX.1):**
  Modelle der neuen Generation, wie **FLUX.1**, sind darauf ausgelegt, diese Einschränkung zu überwinden. FLUX.1 verwendet einen viel leistungsfähigeren Text-Encoder (basierend auf T5-XXL), der speziell darauf trainiert wurde, lange und komplexe Prompts nativ zu verstehen. [2] Dies ermöglicht einen viel natürlicheren und detaillierteren Ausdruck, ohne sich um die künstliche Grenze von 75 Token kümmern zu müssen.

Das Verständnis des Konzepts der Token und der Einschränkungen der verschiedenen Modelle ist grundlegend, um effektive Prompts zu schreiben und die Fähigkeiten jeder Architektur optimal zu nutzen.
