---
title: "Attention: Il Meccanismo di Messa a Fuoco"
category: "Advanced Topics"
sources:
  - text: "Paper 'Attention Is All You Need' che ha introdotto il Transformer"
    url: "https://arxiv.org/abs/1706.03762"
  - text: "Spiegazione illustrata del meccanismo di Attention"
    url: "https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/"
related:
  - "clip"
  - "dit"
  - "tokens"
  - "prompt"
---

L'**Attention** (o *Self-Attention*) è il meccanismo computazionale al cuore dell'architettura **Transformer**, che ha rivoluzionato sia i modelli linguistici (LLM) che, più recentemente, i modelli di diffusione (DiT). [1]

In parole semplici, l'Attention permette a un modello di **pesare dinamicamente l'importanza delle diverse parti di un input** (come le parole in una frase o le patch in un'immagine) per comprendere il contesto e le relazioni tra di esse. [2]

### Come Funziona (Concettualmente)?

Immagina di leggere la frase: `Un gatto rosso insegue un topo grigio`.
Quando il modello elabora la parola "rosso", il meccanismo di Attention gli permette di capire che "rosso" è fortemente collegato a "gatto" e non a "topo". In pratica, per ogni parola, l'Attention calcola un "punteggio di attenzione" rispetto a tutte le altre parole della frase, "mettendo a fuoco" le relazioni più importanti. [2]

Questo è fondamentale per risolvere le ambiguità e comprendere le sfumature del linguaggio.

### Attention nella Generazione di Immagini

Il meccanismo di Attention è cruciale in due punti del nostro workflow:

1.  **Nel CLIP Text Encoder:**
    Quando il CLIP processa il nostro prompt, l'Attention è ciò che gli permette di capire che in `un astronauta a cavallo`, è l'astronauta che deve trovarsi sul cavallo. È anche il meccanismo che viene influenzato quando aumentiamo il peso di una parola con la sintassi `(parola:1.2)`, dicendogli di "prestare più attenzione" a quel concetto.

2.  **Nei Diffusion Transformers (DiT):**
    Nei modelli come Stable Diffusion 3, l'Attention non viene applicata solo al testo, ma anche ai "token visivi" (le patch dell'immagine). Questo permette al modello di creare relazioni complesse tra le diverse parti dell'immagine, migliorando drasticamente la coerenza e la composizione. Ad esempio, può assicurarsi che il riflesso in uno specchio corrisponda correttamente all'oggetto riflesso.

In sintesi, l'Attention è la tecnologia che ha permesso ai modelli di passare da una semplice "associazione" di parole a una vera e propria "comprensione" del contesto e delle relazioni, sia nel testo che nelle immagini.