---
title: 'Conditioning: Die Anweisungen für das UNet'
category: System Anatomy
sources:
  - text: ControlNet-Paper (das von 'bedingter Kontrolle' spricht)
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Erklärung des Text-Conditioning in Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
  - text: 'ComfyUI-Dokumentation, die Conditioning-Flüsse zeigt'
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/sdxl/'
related:
  - clip
  - unet
  - controlnet
  - prompt
---

**Conditioning** (Konditionierung) ist der Fachbegriff, der die **Leitdaten** beschreibt, die dem UNet zur Verfügung gestellt werden, um den Bilderzeugungsprozess zu beeinflussen und zu steuern. [1]

Stellen Sie sich das UNet als einen leistungsstarken, aber "blinden" Motor vor. Allein wüsste es nur, wie man Rauschen auf generische Weise entfernt. Das Conditioning ist der Satz von **Anweisungen und Einschränkungen**, die ihm sagen, *wie* es das Rauschen entfernen soll, um ein bestimmtes Ergebnis zu erzielen. [2]

In ComfyUI wird das Conditioning visuell durch die **gelben Drähte** dargestellt, die die verschiedenen Knoten verbinden. Diese Drähte transportieren keine Bilder, sondern diese Pakete von Leitdaten. [3]

### Haupttypen des Conditionings

Es gibt mehrere "Quellen" des Conditionings, die für eine granulare Kontrolle kombiniert werden können:

1.  **Text-Conditioning:**
    Es ist die häufigste Form der Führung. Es stammt vom **CLIP Text Encoder**, der den positiven und negativen Prompt in eine numerische Darstellung (Embedding) umwandelt. Dieses "Datenpaket" teilt dem UNet mit, welche Konzepte, Objekte und Stile es darstellen soll. [2]

2.  **Bild-Conditioning:**
    Diese Führung stammt nicht aus dem Text, sondern aus einem Bild. Es ist das Prinzip, auf dem **ControlNet** basiert. Ein ControlNet-Modell analysiert ein Eingangsbild (z. B. eine Pose, eine Tiefenkarte) und wandelt es in ein Conditioning um, das dem des Textes hinzugefügt wird. Diese Art von Conditioning legt dem UNet sehr starke strukturelle und räumliche Einschränkungen auf. [1]

3.  **Zeit-Conditioning:**
    Es ist eine eher "interne" Art von Conditioning. Bei jedem Schritt des Samplings wird eine Information über den aktuellen "Zeitschritt" (z. B. "wir sind bei Schritt 5 von 20") an das UNet übergeben. Dies ermöglicht es ihm zu wissen, wo es sich im Prozess befindet, und seine Aggressivität bei der Rauschentfernung entsprechend anzupassen.

### Kombination von Conditionings

Die Stärke fortgeschrittener Workflows wie denen in ComfyUI liegt in der Fähigkeit, diese Datenflüsse zu manipulieren und zu kombinieren. Zum Beispiel ist es möglich:
- Das Conditioning von zwei verschiedenen Prompts zu **mischen**.
- Ein ControlNet nur auf einen Teil des Prompts **anzuwenden**.
- Die Generierung mit mehreren ControlNets gleichzeitig zu **leiten**.

Zusammenfassend lässt sich sagen, dass Sie jedes Mal, wenn Sie einen gelben Draht in ComfyUI sehen, einen Kommunikationskanal betrachten, der wichtige Anweisungen zum Herzen des Modells, dem UNet, transportiert.
