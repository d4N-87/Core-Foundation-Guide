---
title: "Tokens: I Mattoni del Linguaggio"
category: "Advanced Topics"
sources:
  - text: "Introduzione al Tokenizing - Hugging Face"
    url: "https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt"
  - text: "Annuncio del modello FLUX.1 di Black Forest Labs"
    url: "https://blackforestlabs.ai/announcing-flux/"
  - text: "Spiegazione dei Token nel contesto di Stable Diffusion"
    url: "https://stable-diffusion-art.com/token/"
related:
  - "clip"
  - "prompt"
  - "attention"
---

I **Tokens** sono le unità fondamentali in cui un testo viene scomposto prima di essere processato da un modello linguistico come CLIP. [1] Sono i "mattoni" con cui il modello legge e comprende il nostro prompt.

Un token **non è necessariamente una parola intera**. Il processo di **Tokenizing** (tokenizzazione) utilizza un vocabolario predefinito per suddividere il testo in pezzi che il modello conosce. [3]

### Esempi di Tokenizzazione

Consideriamo la parola `indescrivibilmente`. Un tokenizer potrebbe scomporla in più token che conosce:
`inde` + `scrivi` + `bil` + `mente`

- **Parole comuni** (es. `gatto`, `il`, `un`) sono spesso un singolo token.
- **Parole complesse o rare** vengono scomposte in sotto-parole.
- **Spazi e punteggiatura** vengono gestiti come token separati.

Questo approccio permette al modello di gestire un vocabolario virtualmente infinito partendo da un numero finito di token (solitamente tra 30.000 e 50.000). [1]

### Il Limite di Token e l'Evoluzione dei Modelli

Ogni Text Encoder ha un **limite massimo di token** che può elaborare in un singolo "chunk" (blocco). Questo limite è stato a lungo una delle principali restrizioni nel prompt engineering.

- **Vecchie Architetture (es. Stable Diffusion 1.5, SDXL):**
  Questi modelli usano Text Encoder (CLIP) con un limite di **75 token** per chunk. [3] Se un prompt è più lungo, viene diviso in più chunk, ma la comprensione del contesto tra un blocco e l'altro è molto più debole. Questo ha costretto gli utenti a concentrare i concetti più importanti all'inizio del prompt.

- **Nuove Architetture (es. FLUX.1):**
  I modelli di nuova generazione, come **FLUX.1**, sono progettati per superare questa limitazione. FLUX.1 utilizza un Text Encoder molto più potente (basato su T5-XXL) che è stato specificamente addestrato per comprendere prompt lunghi e complessi in modo nativo. [2] Questo permette un'espressione molto più naturale e dettagliata, senza doversi preoccupare del limite artificiale dei 75 token.

Capire il concetto di token e i limiti dei diversi modelli è fondamentale per scrivere prompt efficaci e sfruttare al massimo le capacità di ogni architettura.