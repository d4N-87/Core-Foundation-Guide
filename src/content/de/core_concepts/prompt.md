---
title: 'Prompt: Dialog mit der KI'
category: Core Concepts
sources:
  - text: Leitfaden zum Prompting auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/prompt-guide/'
  - text: ComfyUI-Dokumentation zu Text Encode
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/prompt/'
  - text: Erklärung des negativen Prompts
    url: 'https://stable-diffusion-art.com/negative-prompt/'
related:
  - clip
  - tokens
  - cfg
---

Der **Prompt** ist die textliche Anweisung, die Sie dem Modell geben, um das Bild zu beschreiben, das Sie erstellen möchten. Es ist der direkteste Weg, um mit der künstlichen Intelligenz zu dialogieren und ihre Kreativität zu lenken. [1]

In ComfyUI und in vielen anderen Schnittstellen ist der Prompt in zwei komplementäre Teile unterteilt:

### 1. Positiver Prompt

Hier beschreiben Sie **alles, was Sie im Bild sehen möchten**. Es ist nicht nur eine Liste von Objekten, sondern eine Reihe von Anweisungen, die Folgendes umfassen können:
- **Subjekt:** `ein majestätischer Löwe`
- **Stil:** `im Stil eines Aquarellgemäldes`
- **Künstler:** `von Van Gogh`
- **Details und Qualität:** `komplizierte Details, scharfer Fokus, 4k, filmische Beleuchtung`
- **Komposition:** `Ganzkörperaufnahme, Blick in die Kamera`

**Syntax für das Gewicht (Attention):**
Um einem Wort oder einer Phrase mehr Bedeutung zu verleihen, können Sie ihr "Gewicht" erhöhen. Die gebräuchliche Syntax, die auch in ComfyUI verwendet wird, ist `(Wort:Gewicht)`. [2]
- `(blaue Augen:1.3)`: Erhöht die Bedeutung von "blauen Augen" um 30 %.
- `(rote Rose:0.8)`: Verringert die Bedeutung von "roter Rose" um 20 %.
- Klammern `()` sind eine Abkürzung, um das Gewicht zu erhöhen (normalerweise um 1,1), während `[]` eine Abkürzung sind, um es zu verringern. [1]

### 2. Negativer Prompt

Hier beschreiben Sie **alles, was Sie im Bild vermeiden möchten**. Es ist ein leistungsstarkes Werkzeug, um häufige Fehler zu korrigieren und die Gesamtqualität zu verbessern. [3]

Übliche Beispiele für negative Prompts sind:
- **Deformitäten korrigieren:** `deformiert, mutiert, entstellt, zusätzliche Gliedmaßen, schlechte Anatomie`
- **Qualität verbessern:** `verschwommen, körnig, niedrige Auflösung, hässlich, JPEG-Artefakte`
- **Unerwünschte Elemente entfernen:** `Text, Wasserzeichen, Signatur, Benutzername`
- **Stile ausschließen:** `Cartoon, Anime, 3D-Render`

Die Verwendung eines guten negativen Prompts ist oft genauso wichtig wie das Schreiben eines guten positiven Prompts, um qualitativ hochwertige Ergebnisse zu erzielen. [3]
