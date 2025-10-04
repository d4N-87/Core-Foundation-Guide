---
title: "GGUF: Quantizzazione per CPU e GPU"
category: "Advanced Topics"
sources:
  - text: "Annuncio ufficiale di GGUF sul blog di Hugging Face"
    url: "https://huggingface.co/blog/gguf"
  - text: "Repository GitHub di llama.cpp"
    url: "https://github.com/ggerganov/llama.cpp"
  - text: "Esempio di workflow in ComfyUI con GGUF Loader"
    url: "https://comfyanonymous.github.io/ComfyUI_examples/llm/"
related:
  - "precision"
  - "llm"
  - "checkpoint"
  - "clip"
---

**GGUF (Georgi Gerganov Universal Format)** è un formato di file progettato per contenere modelli neurali **quantizzati**, ovvero convertiti in formati a bassissima precisione (come 4 o 8 bit) per ridurne drasticamente le dimensioni e il consumo di memoria. [1]

Nato dal progetto **`llama.cpp`** per eseguire Large Language Models (LLM) su CPU, il suo utilizzo si è recentemente espanso anche all'ecosistema dei modelli di diffusione per immagini. [2]

### Lo Scopo Principale: Ridurre il Consumo di Memoria

Il vantaggio chiave di GGUF è la **quantizzazione**. Un modello che in formato FP16 (`.safetensors`) occuperebbe 14 GB di VRAM, in formato GGUF quantizzato a 4-bit (`q4_K_M`) può occuparne meno di 5 GB. Questo permette di:
- Eseguire modelli enormi su GPU con meno VRAM.
- Caricare più componenti in memoria contemporaneamente.
- Eseguire modelli su CPU in modo efficiente.

### GGUF nel Mondo degli LLM (Uso Classico)

L'uso primario di GGUF è per i modelli linguistici. Interfacce come LM Studio o Ollama usano file GGUF per far girare chatbot potenti (come Llama, Mistral) su hardware consumer, sfruttando principalmente la CPU. [3]

### GGUF nel Mondo della Diffusione (Uso Moderno in ComfyUI)

Recentemente, la community ha iniziato ad applicare i vantaggi della quantizzazione GGUF anche ai componenti di elaborazione. In ComfyUI, tramite nodi specializzati (`Load GGUF Model`), è possibile caricare versioni GGUF di:
- **Text Encoder (CLIP):** Caricare un CLIP quantizzato riduce significativamente il suo impatto sulla VRAM, liberando risorse preziose per il modello UNet. Questo è l'uso più comune ed efficace.
- **UNet:** Esistono anche esperimenti per quantizzare l'intera UNet in formato GGUF. Sebbene questo offra il massimo risparmio di memoria, può portare a una perdita di qualità più evidente nell'immagine finale rispetto all'uso di una UNet in formato FP16.

È uno strumento versatile per la **gestione avanzata della memoria**, permettendo agli utenti di eseguire workflow sempre più complessi su hardware consumer, bilanciando sapientemente il compromesso tra consumo di VRAM e qualità dell'output.

### Decifrare le Nomenclature di Quantizzazione (es. `Q4_K_M`)

Quando si scarica un modello GGUF, il nome del file contiene spesso una sigla che descrive il metodo di quantizzazione usato. Capirla aiuta a scegliere il giusto equilibrio tra dimensione e qualità. Ecco come leggerla:

- **`Q` seguito da un numero (es. `Q4`, `Q5`, `Q8`):** Indica il numero di **bit** usati per ogni peso. `Q8` usa 8 bit (qualità più alta, file più grande), `Q4` usa 4 bit (qualità più bassa, file più piccolo).
- **`_K`:** Indica una variante "K-Quant". È una tecnica di quantizzazione migliorata che cerca di preservare meglio la qualità dell'informazione, specialmente per i pesi più importanti. I modelli `_K` sono spesso la scelta raccomandata.
- **`_0` o `_1` (es. `Q4_0`, `Q5_1`):** Indicano versioni diverse dello stesso metodo. `_0` è la versione "pura" a 4-bit, mentre `_1` è una versione mista che usa una precisione leggermente più alta (5-bit) per alcuni pesi, offrendo un piccolo miglioramento di qualità con un file leggermente più grande.
- **`_S`, `_M`, `_L` (es. `Q4_K_S`):** Indicano le dimensioni del modello ("Small", "Medium", "Large"). Non si riferiscono alla quantizzazione stessa, ma a diverse "taglie" del modello originale.

**Esempi Pratici:**
- **`Q8_0`:** Quantizzazione a 8-bit. Massima qualità tra le versioni GGUF, ma anche la più pesante.
- **`Q5_K_M`:** Quantizzazione "K-Quant" a 5-bit, versione "Medium". Un ottimo compromesso tra qualità e dimensione.
- **`Q4_0`:** Quantizzazione "pura" a 4-bit. La versione più piccola e leggera, ma con la maggiore perdita di qualità. Spesso usata per far girare modelli enormi su hardware molto limitato.