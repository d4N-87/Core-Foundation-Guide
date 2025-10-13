---
title: 'LLM: Große Sprachmodelle'
category: Advanced Topics
sources:
  - text: >-
      Paper, das die Transformer-Architektur eingeführt hat: Attention Is All
      You Need
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Erklärung von LLMs durch NVIDIA
    url: 'https://www.nvidia.com/it-it/glossary/large-language-models/'
  - text: Was ist ein LLM? - IBM
    url: 'https://www.ibm.com/it-it/topics/large-language-models'
related:
  - gguf
  - clip
  - dit
  - tokens
---

Ein **LLM (Large Language Model)**, oder Großes Sprachmodell, ist eine Art von neuronalem Netzwerk, das auf riesigen Mengen von Textdaten (Bücher, Artikel, Code, Konversationen) trainiert wurde, mit dem Ziel, **menschliche Sprache** kohärent und kontextuell relevant zu **verstehen und zu generieren**. [2, 3]

Berühmte Beispiele für LLMs sind die **GPT**-Serie von OpenAI (die Grundlage von ChatGPT), **Llama** von Meta, **Gemini** von Google und **Claude** von Anthropic.

### Wie funktionieren sie konzeptionell?

Im Kern ist ein LLM eine leistungsstarke **Engine zur Vorhersage des nächsten Wortes**. [3] Wenn ihm ein Eingabetext (ein "Prompt") gegeben wird, berechnet das Modell die Wahrscheinlichkeit, welches Wort (oder "Token") als nächstes kommen sollte, basierend auf den sprachlichen Mustern, die es während des Trainings gelernt hat. Durch die tausendfache Wiederholung dieses Prozesses ist es in der Lage, Sätze, Absätze und ganze Dokumente zu generieren.

### Die Schlüsselarchitektur: der Transformer

Die LLM-Revolution wurde durch die Erfindung der **Transformer**-Architektur im Jahr 2017 ermöglicht. [1] Ihre grundlegende Komponente, der **Attention**-Mechanismus, ermöglicht es dem Modell, die Bedeutung verschiedener Wörter im Eingabetext zu gewichten und so Beziehungen und Kontext auch über große Entfernungen hinweg zu verstehen. Das ist es, was LLMs ihre außergewöhnliche Fähigkeit verleiht, Konversationen zu folgen, Sprachen zu übersetzen und Code zu schreiben.

### LLMs und Bilderzeugung

Obwohl sie auf Text spezialisiert sind, sind LLMs auf zwei Arten eng mit der Welt der Bilderzeugung verbunden:

1.  **Der Text-Encoder (CLIP):** Die Komponente, die unsere Prompts in Diffusionsmodellen interpretiert, ist im Grunde genommen eine Art von Sprachmodell, das auf der Transformer-Architektur basiert. [1]
2.  **Hybrid-Architekturen (DiT):** Innovationen im Bereich der LLMs, insbesondere die Transformer-Architektur, werden auch für die Bilderzeugung übernommen, was zur Entstehung neuer und leistungsstarker Modelle wie den **Diffusion Transformers (DiT)** führt.

Um LLMs auf Consumer-Hardware auszuführen, werden oft quantisierte Dateiformate wie **GGUF** verwendet, die ihre Größe und ihren Speicherverbrauch drastisch reduzieren.
