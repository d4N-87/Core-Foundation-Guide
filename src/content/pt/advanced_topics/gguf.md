---
title: 'GGUF: Quantização para CPU e GPU'
category: Advanced Topics
sources:
  - text: Anúncio oficial do GGUF no blog da Hugging Face
    url: 'https://huggingface.co/blog/gguf'
  - text: Repositório do GitHub do llama.cpp
    url: 'https://github.com/ggerganov/llama.cpp'
  - text: Exemplo de um fluxo de trabalho no ComfyUI com o GGUF Loader
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/llm/'
related:
  - precision
  - llm
  - checkpoint
  - clip
---

**GGUF (Georgi Gerganov Universal Format)** é um formato de arquivo projetado para conter modelos neurais **quantizados**, ou seja, convertidos para formatos de baixíssima precisão (como 4 ou 8 bits) para reduzir drasticamente seu tamanho e consumo de memória. [1]

Nascido do projeto **`llama.cpp`** para executar Grandes Modelos de Linguagem (LLMs) em CPUs, seu uso se expandiu recentemente para o ecossistema de modelos de difusão de imagens. [2]

### O objetivo principal: reduzir o consumo de memória

A principal vantagem do GGUF é a **quantização**. Um modelo que em formato FP16 (`.safetensors`) ocuparia 14 GB de VRAM, em formato GGUF quantizado para 4 bits (`q4_K_M`) pode ocupar menos de 5 GB. Isso permite:
- Executar modelos enormes em GPUs com menos VRAM.
- Carregar mais componentes na memória simultaneamente.
- Executar modelos em CPUs de forma eficiente.

### GGUF no mundo dos LLMs (uso clássico)

O uso primário do GGUF é para modelos de linguagem. Interfaces como o LM Studio ou o Ollama usam arquivos GGUF para executar chatbots poderosos (como Llama, Mistral) em hardware de consumo, aproveitando principalmente a CPU. [3]

### GGUF no mundo da difusão (uso moderno no ComfyUI)

Recentemente, a comunidade começou a aplicar as vantagens da quantização GGUF também aos componentes de processamento. No ComfyUI, através de nós especializados (`Load GGUF Model`), é possível carregar versões GGUF de:
- **Codificador de texto (CLIP):** Carregar um CLIP quantizado reduz significativamente seu impacto na VRAM, liberando recursos preciosos para o modelo UNet. Este é o uso mais comum e eficaz.
- **UNet:** Também existem experimentos para quantizar toda a UNet em formato GGUF. Embora isso ofereça a máxima economia de memória, pode levar a uma perda de qualidade mais perceptível na imagem final em comparação com o uso de uma UNet em formato FP16.

É uma ferramenta versátil para o **gerenciamento avançado de memória**, permitindo que os usuários executem fluxos de trabalho cada vez mais complexos em hardware de consumo, equilibrando habilmente o compromisso entre o consumo de VRAM e a qualidade da saída.

### Decifrando as nomenclaturas de quantização (por exemplo, `Q4_K_M`)

Ao baixar um modelo GGUF, o nome do arquivo geralmente contém um acrônimo que descreve o método de quantização usado. Entendê-lo ajuda a escolher o equilíbrio certo entre tamanho e qualidade. Veja como lê-lo:

- **`Q` seguido por um número (por exemplo, `Q4`, `Q5`, `Q8`):** Indica o número de **bits** usados para cada peso. `Q8` usa 8 bits (maior qualidade, arquivo maior), `Q4` usa 4 bits (menor qualidade, arquivo menor).
- **`_K`:** Indica uma variante "K-Quant". É uma técnica de quantização aprimorada que tenta preservar melhor a qualidade da informação, especialmente para os pesos mais importantes. Os modelos `_K` são frequentemente a escolha recomendada.
- **`_0` ou `_1` (por exemplo, `Q4_0`, `Q5_1`):** Indicam diferentes versões do mesmo método. `_0` é a versão "pura" de 4 bits, enquanto `_1` é uma versão mista que usa uma precisão ligeiramente maior (5 bits) para alguns pesos, oferecendo uma pequena melhoria de qualidade com um arquivo ligeiramente maior.
- **`_S`, `_M`, `_L` (por exemplo, `Q4_K_S`):** Indicam os tamanhos do modelo ("Pequeno", "Médio", "Grande"). Eles não se referem à quantização em si, mas a diferentes "tamanhos" do modelo original.

**Exemplos práticos:**
- **`Q8_0`:** Quantização de 8 bits. A mais alta qualidade entre as versões GGUF, mas também a mais pesada.
- **`Q5_K_M`:** Quantização "K-Quant" de 5 bits, versão "Média". Um excelente compromisso entre qualidade e tamanho.
- **`Q4_0`:** Quantização "pura" de 4 bits. A versão menor e mais leve, mas com a maior perda de qualidade. Frequentemente usada para executar modelos enormes em hardware muito limitado.
