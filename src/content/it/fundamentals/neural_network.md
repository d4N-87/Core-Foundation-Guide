---
title: "Rete Neurale: Il Cervello Artificiale"
category: "Fundamentals"
sources:
  - text: "Cos'è una Rete Neurale? - IBM"
    url: "https://www.ibm.com/it-it/topics/neural-networks"
  - text: "Spiegazione delle Reti Neurali - Wikipedia"
    url: "https://it.wikipedia.org/wiki/Rete_neurale_artificiale"
related:
  - "deep_learning"
  - "inferenza"
  - "unet"
---

Una **Rete Neurale Artificiale** è un modello computazionale ispirato alla struttura e al funzionamento del cervello umano. [1] È il blocco costruttivo fondamentale di quasi tutti i moderni sistemi di intelligenza artificiale, inclusi i modelli che generano immagini.

Pensa a una rete neurale come a un sistema di **neuroni artificiali** (chiamati "nodi") organizzati in **strati** (layers). [2]

### Come Funziona (in modo semplice)?

1.  **Strato di Input (Input Layer):** Riceve i dati iniziali. Nel nostro caso, potrebbe essere la rappresentazione numerica di un prompt o i pixel di un'immagine.
2.  **Strati Nascosti (Hidden Layers):** Sono gli strati intermedi dove avviene la vera "elaborazione". Ogni neurone riceve segnali dai neuroni dello strato precedente, esegue un piccolo calcolo e passa il suo risultato a quelli dello strato successivo. Durante l'addestramento, la rete impara a regolare le "connessioni" (i "pesi") tra questi neuroni per riconoscere pattern sempre più complessi. [1]
3.  **Strato di Output (Output Layer):** Produce il risultato finale. Ad esempio, la previsione del rumore da rimuovere in un'immagine.

Una rete con molti strati nascosti viene chiamata **Rete Neurale Profonda (Deep Neural Network)**, e il campo che la studia è il **Deep Learning**. [1]

I modelli che usiamo, come la **UNet** o **CLIP**, sono esempi estremamente grandi e complessi di reti neurali, con miliardi di connessioni ottimizzate per i loro compiti specifici.