---
title: 'Embedding (Textuelle Inversion): Neue Konzepte lehren'
category: System Anatomy
sources:
  - text: 'Original-Paper: Ein Bild ist ein Wort wert (Textuelle Inversion)'
    url: 'https://arxiv.org/abs/2208.01618'
  - text: Erklärung von Embeddings auf Stable Diffusion Art
    url: 'https://stablediffusionart.com/embedding/'
  - text: Leitfaden zu Embeddings (TI) auf Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
related:
  - clip
  - prompt
  - tokens
  - lora
---

Ein **Embedding**, auch bekannt als **Textuelle Inversion**, ist eine kleine Datei, die dem Modell ein **neues visuelles Konzept** beibringt, indem sie es mit einem bestimmten Schlüsselwort verknüpft. [1]

Stellen Sie sich das CLIP-Modell als ein riesiges Wörterbuch vor, das Wörter mit visuellen Ideen verknüpft. Ein Embedding ist, als ob Sie **diesem Wörterbuch ein neues Wort hinzufügen** könnten. [2] Sie können beispielsweise ein Embedding mit 5-10 Fotos Ihrer Katze trainieren und es mit dem Schlüsselwort `ohwx-cat` verknüpfen. Von diesem Moment an weiß das Modell jedes Mal, wenn Sie `ohwx-cat` in Ihren Prompt schreiben, genau, auf welche Katze Sie sich beziehen.

### Wie funktioniert es?

Im Gegensatz zu einer LoRa, die die Gewichte des UNet (des "Malers") modifiziert, modifiziert ein Embedding nur die Gewichte des Text-Encoders (des "Übersetzers"). [3] Es lehrt das Modell nicht, in einem neuen Stil zu zeichnen, sondern es lehrt ihm die Bedeutung eines neuen "Wortes" (Tokens). [1] Die Datei eines Embeddings ist extrem klein, oft nur wenige Kilobyte.

### Embedding vs. LoRa

| Merkmal | Embedding (Textuelle Inversion) | LoRa |
| :--- | :--- | :--- |
| **Zweck** | Ein neues **Konzept** lehren (Objekt, Charakter) | Einen neuen **Stil** oder einen komplexen Charakter lehren |
| **Modifizierte Komponente** | Text-Encoder (CLIP) | UNet (und manchmal der Text-Encoder) |
| **Dateigröße** | Sehr klein (KB) | Klein (MB) |
| **Flexibilität** | Weniger flexibel, "injiziert" ein Konzept | Flexibler, kann den gesamten Stil ändern |

### Gängige Arten von Embeddings

- **Stil:** Obwohl für diesen Zweck weniger verbreitet als LoRas, können einige Embeddings einfache künstlerische Stile replizieren.
- **Charakter/Objekt:** Die häufigste Verwendung. Perfekt, um konsistente Bilder einer bestimmten Person, eines Tieres oder eines Objekts zu erstellen.
- **Negatives Embedding:** Eine besondere Art von Embedding, das mit Bildern von geringer Qualität trainiert wurde (z. B. mit deformierten Händen, hässlich usw.). Durch Einfügen des Schlüsselworts dieses Embeddings in den *negativen Prompt* wird die Gesamtqualität des Bildes erheblich verbessert. Berühmte Beispiele sind `EasyNegative` oder `bad-hands`. [2]

In ComfyUI werden Embeddings normalerweise in einen bestimmten Ordner geladen und dann einfach durch Eingabe ihres Schlüsselworts (des Dateinamens) direkt im Prompt aufgerufen.
