---
title: 'Precisão: FP32, FP16, FP8, FP4 e o Papel da GPU'
category: Advanced Topics
sources:
  - text: Explicação dos tipos de dados de ponto flutuante - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic'
  - text: Guia para Precisão Mista - Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/optimization/fp16'
  - text: Introdução aos formatos de 8 bits (FP8) - Blog da NVIDIA
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  - text: Arquitetura NVIDIA Ampere (Série 30) e os Tensor Cores de 3ª geração
    url: >-
      https://www.nvidia.com/it-it/geforce/graphics-cards/30-series/ampere-architecture/
related:
  - checkpoint
  - unet
  - gguf
---

A **precisão** de um modelo refere-se ao formato numérico usado para armazenar seus "pesos". Esses pesos são números reais, e os computadores os representam usando um sistema chamado **Ponto Flutuante** (daí o acrônimo **FP**). [1]

O número que segue o acrônimo (por exemplo, FP**32**, FP**16**) indica quantos **bits** de memória são usados para representar um único número. Quanto mais bits usados, mais preciso é o número, mas mais espaço ele ocupa e mais lento é para processar. A escolha da precisão é, portanto, um compromisso fundamental entre qualidade, velocidade e consumo de memória (VRAM).

### O Vínculo Inquebrável com o Hardware (GPU)

A escolha da precisão não é apenas software: o desempenho depende criticamente do **suporte de hardware nativo** da sua GPU. Se uma GPU não suporta nativamente um formato de baixa precisão, ela deve emulá-lo via software, resultando em menor desempenho. [4]

As GPUs modernas, especialmente as da NVIDIA, incluem hardware especializado chamado **Tensor Cores**, projetado para acelerar drasticamente os cálculos de precisão reduzida. [4]

### Formatos Comuns e Suporte de Hardware (Exemplos da GeForce)

1.  **FP32 (Precisão Total - 32 bits):**
    É a "qualidade máxima". Cada número ocupa 32 bits de memória. É o padrão no qual os modelos são treinados, mas é muito pesado para executar para inferência. [2] Um modelo raramente é usado inteiramente em FP32 para gerar imagens. Todas as GPUs o suportam.

2.  **FP16 (Meia Precisão - 16 bits):**
    O padrão ouro para inferência. Ele reduz pela metade a VRAM e dobra (ou mais) a velocidade em comparação com o FP32, com uma perda de qualidade quase imperceptível. [2] A compatibilidade neste caso também pode ser encontrada com GPUs não tão recentes. [4]

3.  **BF16 (Bfloat16 - 16 bits):**
    Um formato alternativo de 16 bits, mais robusto durante o treinamento. Suportado nativamente pelas séries **Ampere (RTX 30)** e posteriores.

### Quantização e Suporte de Hardware Avançado

A **quantização** converte os pesos para formatos ainda mais baixos (8 ou 4 bits). Aqui, o suporte de hardware se torna ainda mais crítico.

- **FP8 / INT8 (8 bits):**
    Representa um grande avanço em termos de eficiência. A aceleração de hardware para FP8 é um recurso de destaque das arquiteturas mais recentes, como a **Ada Lovelace (RTX 40)**, que introduz suporte nativo, garantindo um aumento significativo de desempenho com este formato. [3] Placas mais antigas podem executá-lo, mas com uma eficiência muito menor.

    ### Um Olhar mais Profundo sobre o FP8

    O termo `FP8` na verdade descreve uma família de formatos. A principal diferença reside em como os 8 bits disponíveis são alocados entre o **Expoente** (que determina a faixa de valores possíveis) e a **Mantissa** (que determina a precisão entre um valor e outro). Os dois padrões principais são:

    - **`E4M3`**: Usa 4 bits para o expoente e 3 para a mantissa. Oferece um bom equilíbrio entre faixa e precisão, e é frequentemente usado para armazenar os pesos do modelo.
    - **`E5M2`**: Usa 5 bits para o expoente e 2 para a mantissa. Tem uma faixa dinâmica mais ampla, mas menos precisão. É normalmente usado para gradientes durante o treinamento.

    **FP8 Scaled** não é um formato em si, mas descreve a técnica de usar um fator de escala para otimizar a conversão de pesos para o formato FP8, maximizando a precisão na faixa de valores mais importante. GPUs modernas como a série RTX 40 lidam com esses fatores de escala de forma muito eficiente.

- **4 bits (por exemplo, NF4):**
    Uma forma de quantização extrema, o desempenho depende fortemente de implementações de software otimizadas que aproveitam ao máximo as capacidades gerais da GPU. O suporte de hardware chegou com a **Blackwell (RTX 50)**.

