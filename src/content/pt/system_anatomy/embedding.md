---
title: 'Embedding (Inversão Textual): Ensinando Novos Conceitos'
category: System Anatomy
sources:
  - text: 'Artigo Original: Uma Imagem Vale uma Palavra (Inversão Textual)'
    url: 'https://arxiv.org/abs/2208.01618'
  - text: Explicação de Embeddings na Stable Diffusion Art
    url: 'https://stablediffusionart.com/embedding/'
  - text: Guia para Embeddings (TI) no Civitai
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
related:
  - clip
  - prompt
  - tokens
  - lora
---

Um **Embedding**, também conhecido como **Inversão Textual**, é um pequeno arquivo que ensina ao modelo um **novo conceito visual** associando-o a uma palavra-chave específica. [1]

Pense no modelo CLIP como um enorme dicionário que liga palavras a ideias visuais. Um embedding é como se você pudesse **adicionar uma nova palavra a esse dicionário**. [2] Por exemplo, você pode treinar um embedding em 5-10 fotos do seu gato e associá-lo à palavra-chave `ohwx-cat`. A partir desse momento, toda vez que você escrever `ohwx-cat` no seu prompt, o modelo saberá exatamente a qual gato você está se referindo.

### Como funciona?

Ao contrário de uma LoRa que modifica os pesos da UNet (o "pintor"), um embedding modifica apenas os pesos do Codificador de Texto (o "tradutor"). [3] Ele não ensina o modelo a desenhar em um novo estilo, mas ensina o significado de uma nova "palavra" (token). [1] O arquivo de um embedding é extremamente pequeno, muitas vezes com apenas alguns kilobytes.

### Embedding vs. LoRa

| Característica | Embedding (Inversão Textual) | LoRa |
| :--- | :--- | :--- |
| **Propósito** | Ensinar um novo **conceito** (objeto, personagem) | Ensinar um novo **estilo** ou um personagem complexo |
| **Componente Modificado** | Codificador de Texto (CLIP) | UNet (e às vezes o Codificador de Texto) |
| **Tamanho do Arquivo** | Muito pequeno (KB) | Pequeno (MB) |
| **Flexibilidade** | Menos flexível, "injeta" um conceito | Mais flexível, pode alterar todo o estilo |

### Tipos comuns de embeddings

- **Estilo:** Embora menos comuns que as LoRas para este fim, alguns embeddings podem replicar estilos artísticos simples.
- **Personagem/Objeto:** O uso mais comum. Perfeitos para criar imagens consistentes de uma pessoa, animal ou objeto específico.
- **Embedding Negativo:** Um tipo especial de embedding treinado em imagens de baixa qualidade (por exemplo, com mãos deformadas, feias, etc.). Ao inserir a palavra-chave deste embedding no *prompt negativo*, a qualidade geral da imagem é bastante melhorada. Exemplos famosos são `EasyNegative` ou `bad-hands`. [2]

No ComfyUI, os embeddings são geralmente carregados em uma pasta específica e depois chamados simplesmente escrevendo sua palavra-chave (o nome do arquivo) diretamente no prompt.
