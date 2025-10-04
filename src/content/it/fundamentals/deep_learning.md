---
title: "Deep Learning: L'Apprendimento Profondo"
category: "Fundamentals"
sources:
  - text: "Cos'è il Deep Learning? - IBM"
    url: "https://www.ibm.com/it-it/topics/deep-learning"
  - text: "Deep Learning, una spiegazione semplice - Intel"
    url: "https://www.intel.it/content/www/it/it/analytics/deep-learning.html"
related:
  - "rete_neurale"
  - "inferenza"
---

Il **Deep Learning** (Apprendimento Profondo) è una sottocategoria del Machine Learning basata su **Reti Neurali Artificiali Profonde**, ovvero reti neurali con molti strati nascosti (da decine a centinaia). [1]

La "profondità" della rete è ciò che le permette di imparare a riconoscere pattern e gerarchie nei dati in modo automatico. [2]

### Come Funziona l'Apprendimento?

Pensa a un bambino che impara a riconoscere un gatto:
1.  **Primo Strato (Semplice):** Impara a riconoscere elementi basilari come linee, bordi e colori.
2.  **Strati Intermedi (Complesso):** Combina questi elementi semplici per riconoscere forme più complesse come orecchie a punta, baffi, occhi.
3.  **Strati Finali (Astratto):** Combina le forme complesse per arrivare al concetto astratto di "gatto".

Il Deep Learning funziona in modo simile. Durante l'**addestramento**, la rete analizza milioni di esempi (es. immagini etichettate) e aggiusta autonomamente i "pesi" delle connessioni tra i suoi neuroni per diventare sempre più brava a mappare un input (un'immagine) a un output corretto (l'etichetta "gatto"). [1]

### Deep Learning vs. Machine Learning Tradizionale

Nel Machine Learning tradizionale, uno specialista doveva spesso "pre-processare" i dati ed estrarre manualmente le caratteristiche importanti da far analizzare al modello. Nel Deep Learning, la rete neurale profonda impara a estrarre queste caratteristiche da sola, direttamente dai dati grezzi. [2]

Tutti i modelli di cui parliamo in questo manuale (Stable Diffusion, CLIP, etc.) sono il risultato di applicazioni estremamente avanzate del Deep Learning.