---
title: 'LoRa: Modificadores de Estilo Leves'
category: System Anatomy
sources:
  - text: >-
      Artigo Original: LoRA: Adaptação de Baixo Rank de Grandes Modelos de
      Linguagem
    url: 'https://arxiv.org/abs/2106.09685'
  - text: Guia para LoRas no Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Explicação técnica de LoRas no Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/training/lora'
related:
  - checkpoint
  - unet
  - clip
---

Uma **LoRa (Adaptação de Baixo Rank)** é um pequeno arquivo que aplica modificações direcionadas a um modelo de ponto de verificação completo, sem alterá-lo permanentemente. [1] Pense em uma LoRa como um **conjunto de instruções adicionais** ou um **filtro transparente** que você coloca sobre o "cérebro" principal (o ponto de verificação) para fazê-lo adotar um estilo específico, replicar um personagem ou um conceito. [2]

A principal vantagem das LoRas é seu **tamanho reduzido**. Enquanto um ponto de verificação completo pode pesar vários gigabytes, uma LoRa normalmente pesa apenas alguns megabytes (de 2 a 200 MB). [3] Isso as torna fáceis de baixar, compartilhar e usar.

### Como elas funcionam?

Em vez de retreinar todo o modelo (um processo caro), uma LoRa é treinada para "interceptar" e modificar apenas uma pequena parte dos pesos da UNet e do Codificador de Texto. [3] Quando você aplica uma LoRa, seus pequenos pesos são adicionados aos do modelo principal durante a geração, influenciando o resultado final.

### Tipos comuns de LoRas

As LoRas são incrivelmente versáteis e podem ser treinadas para diferentes propósitos:

1.  **Estilo (LoRa de Estilo):**
    Essas LoRas ensinam ao modelo um estilo artístico específico (por exemplo, "estilo Ghibli", "pixel art", "pintura a óleo barroca"). Estão entre as mais populares. [2]

2.  **Personagem (LoRa de Personagem):**
    Treinadas em imagens de um personagem específico (real ou fictício), permitem inserir esse personagem em qualquer cena com boa consistência.

3.  **Conceito (LoRa de Conceito):**
    Podem ensinar ao modelo um conceito mais abstrato, como uma pose particular, um tipo de roupa ou um objeto específico.

### Uso no ComfyUI

No ComfyUI, as LoRas são carregadas através de um nó `Load LoRA` que normalmente é inserido entre o `Load Checkpoint` e o `KSampler`. Este nó recebe o modelo e o CLIP do ponto de verificação como entrada e retorna uma versão "modificada" de ambos, pronta para ser usada no resto do fluxo de trabalho.

Também é possível **combinar várias LoRas** (um processo chamado *empilhamento*), aplicando diferentes filtros em sequência, embora isso possa levar a resultados imprevisíveis se as LoRas entrarem em conflito umas com as outras.
