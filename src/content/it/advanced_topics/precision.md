---
title: "Precisione: FP32, FP16, FP8, FP4 e il Ruolo della GPU"
category: "Advanced Topics"
sources:
  - text: "Spiegazione dei tipi di dati a virgola mobile - Wikipedia"
    url: "https://en.wikipedia.org/wiki/Floating-point_arithmetic"
  - text: "Guida alla precisione mista (Mixed Precision) - Hugging Face"
    url: "https://huggingface.co/docs/diffusers/main/en/optimization/fp16"
  - text: "Introduzione ai formati a 8-bit (FP8) - Blog NVIDIA"
    url: "https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/"
  - text: "Architettura NVIDIA Ampere (Serie 30) e i Tensor Core di 3a gen"
    url: "https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/"
related:
  - "checkpoint"
  - "unet"
  - "gguf"
---

La **precisione** di un modello si riferisce al formato numerico utilizzato per memorizzare i suoi "pesi". Questi pesi sono numeri reali, e i computer li rappresentano usando un sistema chiamato **Virgola Mobile** (o **Floating Point**, da cui l'acronimo **FP**). [1]

Il numero che segue l'acronimo (es. FP**32**, FP**16**) indica quanti **bit** di memoria vengono usati per rappresentare un singolo numero. Più bit si usano, più preciso è il numero, ma più spazio occupa e più lento è da processare. La scelta della precisione è quindi un compromesso fondamentale tra qualità, velocità e consumo di memoria (VRAM).

### Il Legame Indissolubile con l'Hardware (GPU)

La scelta della precisione non è solo software: le prestazioni dipendono criticamente dal **supporto hardware nativo** della tua GPU. Se una GPU non supporta nativamente un formato a bassa precisione, deve emularlo via software, risultando in prestazioni inferiori. [4]

Le GPU moderne, specialmente quelle NVIDIA, includono hardware specializzato chiamato **Tensor Core**, progettato per accelerare drasticamente i calcoli a precisione ridotta. [4]

### Formati Comuni e Supporto Hardware (Esempi GeForce)

1.  **FP32 (Full Precision - 32-bit):**
    È la "massima qualità". Ogni numero occupa 32 bit di memoria. È lo standard su cui i modelli vengono addestrati, ma è molto pesante da eseguire per l'inferenza. [2] Raramente si usa un modello interamente in FP32 per generare immagini. Tutte le GPU la supportano.

2.  **FP16 (Half Precision - 16-bit):**
    Lo standard d'oro per l'inferenza. Dimezza la VRAM e raddoppia (o più) la velocità rispetto a FP32, con una perdita di qualità quasi impercettibile. [2] La compatibilità in questo caso si può trovare anche con GPU non recentissime. [4]

3.  **BF16 (Bfloat16 - 16-bit):**
    Un formato alternativo a 16-bit, più robusto durante l'addestramento. Supportato nativamente dalle serie **Ampere (RTX 30)** e successive.

### Quantizzazione e Supporto Hardware Avanzato

La **quantizzazione** converte i pesi in formati ancora più bassi (8 o 4 bit). Qui il supporto hardware diventa ancora più critico.

- **FP8 / INT8 (8-bit):**
    Rappresenta un enorme passo avanti in termini di efficienza. L'accelerazione hardware per FP8 è una feature di punta delle architetture più recenti, come **Ada Lovelace (RTX 40)** che introduce il supporto nativo, garantendo un aumento di prestazioni significativo con questo formato. [3] Le schede più vecchie possono eseguirlo, ma con un'efficienza molto minore.

    ### Un Approfondimento su FP8

Il termine `FP8` in realtà descrive una famiglia di formati. La differenza principale sta in come vengono allocati gli 8 bit a disposizione tra l'**Esponente** (che determina il range di valori possibili) e la **Mantissa** (che determina la precisione tra un valore e l'altro). I due standard principali sono:

- **`E4M3`**: Usa 4 bit per l'esponente e 3 per la mantissa. Offre un buon equilibrio tra range e precisione, ed è spesso usato per memorizzare i pesi del modello.
- **`E5M2`**: Usa 5 bit per l'esponente e 2 per la mantissa. Ha un range dinamico più ampio ma meno precisione. È tipicamente usato per i gradienti durante l'addestramento.

**FP8 Scaled** non è un formato a sé, ma descrive la tecnica di usare un fattore di scala per ottimizzare la conversione dei pesi in formato FP8, massimizzando la precisione nel range di valori più importante. Le GPU moderne come la serie RTX 40 gestiscono questi fattori di scala in modo molto efficiente.

- **4-bit (es. NF4):**
    Una forma di quantizzazione estrema, le prestazioni dipendono fortemente da implementazioni software ottimizzate che sfruttano al meglio le capacità generiche della GPU. Il supporto hardware è arrivato da **Blackwell (RTX 50)**.

