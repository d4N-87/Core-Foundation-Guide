---
title: "Inferenza: Usare il Modello Addestrato"
category: "Fundamentals"
sources:
  - text: "Cos'è l'Inferenza? - Amazon Web Services"
    url: "https://aws.amazon.com/it/what-is/inference/"
  - text: "Inferenza vs. Addestramento - Google Cloud"
    url: "https://cloud.google.com/discover/inference-vs-training?hl=it"
related:
  - "rete_neurale"
  - "deep_learning"
  - "checkpoint"
---

L'**Inferenza** è il processo di **utilizzo di una rete neurale già addestrata** per fare previsioni su dati nuovi e mai visti prima. [1]

Se l'**addestramento** è la fase di "studio" in cui il modello impara dai libri (il dataset), l'**inferenza** è l'**esame finale** in cui deve applicare ciò che ha imparato per rispondere a domande nuove. [2]

### Il Processo di Inferenza in Pratica

Quando noi generiamo un'immagine con Stable Diffusion, stiamo eseguendo un processo di inferenza:
1.  **Carichiamo il Modello:** Prendiamo un checkpoint (`.safetensors`), che è il risultato di un lungo e costoso processo di addestramento.
2.  **Forniamo un Input:** Diamo al modello dati nuovi che non ha mai visto durante lo studio (il nostro prompt e un'immagine di rumore casuale).
3.  **Il Modello "Inferisce":** La rete neurale processa l'input attraverso i suoi strati, usando i pesi che ha imparato, e produce un output (la previsione del rumore da rimuovere).
4.  **Otteniamo un Output:** Ripetendo questo processo per un certo numero di "steps", otteniamo l'immagine finale.

### Inferenza vs. Addestramento

| Caratteristica | Addestramento (Training) | Inferenza (Inference) |
| :--- | :--- | :--- |
| **Scopo** | Insegnare al modello, creare i "pesi" | Usare il modello per ottenere risultati |
| **Risorse Richieste** | Enormi (molte GPU, settimane di tempo) | Moderate (una singola GPU, secondi/minuti) |
| **Dati** | Dataset etichettato di grandi dimensioni | Dati di input singoli (es. un prompt) |
| **Chi lo fa?** | Laboratori di ricerca, aziende, la community | L'utente finale (noi!) |

In sintesi, ogni volta che premiamo il pulsante "Generate", stiamo eseguendo l'**inferenza**.