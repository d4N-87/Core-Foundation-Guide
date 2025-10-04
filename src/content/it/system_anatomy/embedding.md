---
title: "Embedding (Textual Inversion): Insegnare Nuovi Concetti"
category: "System Anatomy"
sources:
  - text: "Paper Originale: An Image is Worth One Word (Textual Inversion)"
    url: "https://arxiv.org/abs/2208.01618"
  - text: "Spiegazione degli Embedding su Stable Diffusion Art"
    url: "https://stablediffusionart.com/embedding/"
  - text: "Guida agli Embedding (TI) su Civitai"
    url: "https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types"
related:
  - "clip"
  - "prompt"
  - "tokens"
  - "lora"
---

Un **Embedding**, noto anche come **Textual Inversion**, è un piccolo file che insegna al modello un **nuovo concetto visivo** associandolo a una parola chiave specifica. [1]

Pensa al modello CLIP come a un enorme dizionario che collega parole a idee visive. Un embedding è come se tu potessi **aggiungere una nuova parola a quel dizionario**. [2] Ad esempio, puoi addestrare un embedding su 5-10 foto del tuo gatto e associarlo alla parola chiave `ohwx-cat`. Da quel momento in poi, ogni volta che scriverai `ohwx-cat` nel tuo prompt, il modello saprà esattamente a quale gatto ti stai riferendo.

### Come Funziona?

A differenza di una LoRa che modifica i pesi della UNet (il "pittore"), un embedding modifica solo i pesi del Text Encoder (il "traduttore"). [3] Non insegna al modello a disegnare in un nuovo stile, ma gli insegna il significato di una nuova "parola" (token). [1] Il file di un embedding è estremamente piccolo, spesso solo pochi kilobyte.

### Embedding vs. LoRa

| Caratteristica | Embedding (Textual Inversion) | LoRa |
| :--- | :--- | :--- |
| **Scopo** | Insegnare un nuovo **concetto** (oggetto, personaggio) | Insegnare un nuovo **stile** o un personaggio complesso |
| **Componente Modificato** | Text Encoder (CLIP) | UNet (e a volte il Text Encoder) |
| **Dimensione File** | Molto piccola (KB) | Piccola (MB) |
| **Flessibilità** | Meno flessibile, "inietta" un concetto | Più flessibile, può alterare l'intero stile |

### Tipi Comuni di Embedding

- **Stile:** Anche se meno comuni delle LoRa per questo scopo, alcuni embedding possono replicare stili artistici semplici.
- **Personaggio/Oggetto:** L'uso più comune. Perfetti per creare immagini consistenti di una persona, un animale o un oggetto specifico.
- **Negative Embedding:** Un tipo speciale di embedding addestrato su immagini di bassa qualità (es. con mani deformi, brutte, etc.). Inserendo la parola chiave di questo embedding nel *negative prompt*, si migliora notevolmente la qualità generale dell'immagine. Esempi famosi sono `EasyNegative` o `bad-hands`. [2]

In ComfyUI, gli embedding vengono solitamente caricati in una cartella specifica e poi richiamati semplicemente scrivendo la loro parola chiave (il nome del file) direttamente nel prompt.