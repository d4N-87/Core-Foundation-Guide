---
title: "CFG: La Scala di Guida"
category: "Core Concepts"
sources:
  - text: "Spiegazione tecnica su Stable Diffusion Art"
    url: "https://stablediffusionart.com/what-is-cfg-scale/"
  - text: "Paper Originale: Classifier-Free Diffusion Guidance"
    url: "https://arxiv.org/abs/2207.12598"
related:
  - "prompt"
  - "sampler"
  - "conditioning"
---

La **Scala CFG (Classifier-Free Guidance)** è uno dei parametri più potenti a tua disposizione. In parole semplici, è una manopola che controlla **quanto fedelmente** il modello deve seguire le istruzioni del tuo prompt. [1]

Pensa al prompt come a una mappa e al modello come a un esploratore. La CFG è il livello di disciplina dell'esploratore:
- **Un valore basso** gli dice: "Ecco la mappa, ma sentiti libero di esplorare i dintorni se trovi qualcosa di interessante". Il risultato sarà più creativo, ma potrebbe ignorare parti del prompt.
- **Un valore alto** gli ordina: "Segui questa mappa alla lettera, senza deviazioni!". Il risultato sarà molto più aderente al prompt, ma potrebbe perdere di naturalezza.

### Perché si chiama "Classifier-Free"?

Il nome tecnico deriva dal fatto che questo metodo non ha bisogno di un modello "classificatore" esterno per guidare la generazione, a differenza di tecniche più vecchie. [2] La guida è integrata nel modello di diffusione stesso, rendendolo più efficiente.

### Guida Pratica ai Valori di CFG

- **CFG Basso (1-6):** Massima libertà creativa.
- **CFG Medio (7-12):** Il punto di equilibrio ideale. La maggior parte delle interfacce usa un valore di default intorno a 7. [1]
- **CFG Alto (13-20+):** Aderenza molto stretta al prompt. A valori troppo alti, l'immagine rischia di diventare "bruciata", con colori e contrasto eccessivi. [1]

I modelli distallati hanno un CFG a 1, condizione che rende inutilizzabile il negative prompt.

Ogni modello solitamente ha il suo valore CFG consigliato.