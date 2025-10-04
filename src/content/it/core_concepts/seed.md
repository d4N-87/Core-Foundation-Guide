---
title: "Seed: Il Controllo della Casualità"
category: "Core Concepts"
sources:
  - text: "Guida al Seed su Stable Diffusion Art"
    url: "https://stablediffusionart.com/seed/"
  - text: "Documentazione PyTorch sulla generazione di numeri casuali"
    url: "https://pytorch.org/docs/stable/notes/randomness.html"
related:
  - "steps"
  - "sampler"
---

Il **Seed** (in italiano "seme") è un numero che inizializza lo stato di casualità per la generazione di un'immagine. Pensa a esso come al **codice identificativo univoco** di un'immagine. [1]

Il processo di diffusione parte da un'immagine di puro rumore casuale. Il seed è il numero che determina l'esatto pattern di quel rumore iniziale. Se tutti gli altri parametri (prompt, steps, CFG, etc.) rimangono identici, usare lo stesso seed produrrà **esattamente la stessa immagine**. [1, 2]

### A cosa serve il Seed?

1.  **Riproducibilità:** È lo strumento fondamentale per ottenere risultati consistenti. Se trovi un'immagine che ti piace, salvare il suo seed ti permette di ricrearla o di modificarla partendo da una base certa.
2.  **Variazione Controllata:** Cambiando anche solo di una cifra il seed (es. da 100 a 101), otterrai un'immagine completamente diversa, pur mantenendo lo stesso "stile" generale dettato dagli altri parametri.
3.  **Debug e Confronto:** Per confrontare l'effetto di due sampler diversi o di un CFG differente, è essenziale usare lo stesso seed. In questo modo, sei sicuro che le differenze che vedi siano causate solo dal parametro che hai cambiato e non dalla casualità.

**Valore Speciale: -1**
Nella maggior parte delle interfacce (incluso ComfyUI), impostare il seed a `-1` ha un significato speciale: "scegli un seed casuale per ogni generazione". [1] Questo è utile quando vuoi esplorare molte variazioni diverse di un prompt.