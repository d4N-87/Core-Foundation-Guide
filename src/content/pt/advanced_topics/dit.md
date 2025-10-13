---
title: 'DiT: Os Transformadores de Difusão'
category: Advanced Topics
sources:
  - text: 'Artigo Original: Modelos de Difusão Escaláveis com Transformadores'
    url: 'https://arxiv.org/abs/2212.09748'
  - text: 'Anúncio do Stable Diffusion 3, baseado em DiT'
    url: 'https://stability.ai/news/stable-diffusion-3'
  - text: Explicação da arquitetura DiT - Hugging Face
    url: 'https://huggingface.co/papers/2212.09748'
related:
  - unet
  - llm
  - diffusion_model
  - attention
---

Um **DiT (Diffusion Transformer)** é uma nova arquitetura para modelos de difusão que **substitui a UNet tradicional por um Transformer**. [1] É uma evolução que empresta inovações do mundo dos Grandes Modelos de Linguagem (LLMs) e as aplica à geração de imagens, prometendo maior escalabilidade e eficiência.

### Por que substituir a UNet?

A **UNet** foi a arquitetura dominante por anos, mas tem limitações inerentes em sua capacidade de "escalar", ou seja, de melhorar seu desempenho à medida que seu tamanho e poder computacional aumentam.

A arquitetura **Transformer**, graças ao seu mecanismo de **Atenção**, provou nos LLMs ser incrivelmente eficaz no gerenciamento e relacionamento de grandes quantidades de dados. A ideia por trás dos DiTs é: "E se tratássemos uma imagem não como uma grade de pixels, mas como uma sequência de 'patches' (pedaços), de forma semelhante a como um Transformer trata uma sequência de palavras?". [1]

### Como funciona um DiT?

1.  A imagem latente é dividida em uma série de "patches" (tokens visuais).
2.  Esses tokens são processados por um Transformer, que usa o mecanismo de Atenção para entender as relações entre as diferentes partes da imagem.
3.  O Transformer, condicionado pelo prompt, prevê o ruído a ser removido de cada patch.

Essa abordagem provou ser extremamente escalável: quanto maior e mais poderoso o Transformer, melhores os resultados, superando o desempenho das UNets tradicionais com os mesmos recursos. [1]

### Exemplos concretos e o futuro

- **Sora:** O revolucionário modelo de texto para vídeo da OpenAI é baseado em uma arquitetura DiT.
- **Stable Diffusion 3:** A nova versão do modelo da Stability AI abandona a UNet em favor de uma arquitetura DiT, ou mais precisamente **MMDiT (Multi-Modal DiT)**. [2] Um MMDiT usa dois Transformadores diferentes, um para processar dados de texto e outro para dados de imagem, permitindo uma compreensão muito mais profunda e precisa do prompt. [2]

Os DiTs representam um passo fundamental em direção a modelos de geração cada vez mais poderosos, coerentes e capazes de entender as complexas nuances da linguagem humana.
