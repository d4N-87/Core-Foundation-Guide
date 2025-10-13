---
title: 'Semente: O Controle da Aleatoriedade'
category: Core Concepts
sources:
  - text: Guia para a Semente na Stable Diffusion Art
    url: 'https://stablediffusionart.com/seed/'
  - text: Documentação do PyTorch sobre geração de números aleatórios
    url: 'https://pytorch.org/docs/stable/notes/randomness.html'
related:
  - steps
  - sampler
---

A **Semente** (em inglês "Seed") é um número que inicializa o estado de aleatoriedade para a geração de uma imagem. Pense nela como o **código de identificação único** de uma imagem. [1]

O processo de difusão começa a partir de uma imagem de puro ruído aleatório. A semente é o número que determina o padrão exato desse ruído inicial. Se todos os outros parâmetros (prompt, passos, CFG, etc.) permanecerem idênticos, usar a mesma semente produzirá **exatamente a mesma imagem**. [1, 2]

### Para que serve a Semente?

1.  **Reprodutibilidade:** É a ferramenta fundamental para obter resultados consistentes. Se você encontrar uma imagem que goste, salvar sua semente permite recriá-la ou modificá-la a partir de uma base certa.
2.  **Variação Controlada:** Alterando a semente em apenas um dígito (por exemplo, de 100 para 101), você obterá uma imagem completamente diferente, mantendo o mesmo "estilo" geral ditado pelos outros parâmetros.
3.  **Depuração e Comparação:** Para comparar o efeito de dois amostradores diferentes ou de um CFG diferente, é essencial usar a mesma semente. Dessa forma, você tem certeza de que as diferenças que vê são causadas apenas pelo parâmetro que você alterou e não pela aleatoriedade.

**Valor Especial: -1**
Na maioria das interfaces (incluindo o ComfyUI), definir a semente como `-1` tem um significado especial: "escolha uma semente aleatória para cada geração". [1] Isso é útil quando você quer explorar muitas variações diferentes de um prompt.
