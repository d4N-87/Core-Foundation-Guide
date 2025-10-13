---
title: 'Segmentação: Entendendo a Cena'
category: System Anatomy
sources:
  - text: Explicação de Segmentação de Imagem - Wikipedia
    url: 'https://en.wikipedia.org/wiki/Image_segmentation'
  - text: 'Exemplos de Modelos de Segmentação (por exemplo, SAM) - Meta AI'
    url: 'https://ai.meta.com/blog/segment-anything-sam-computer-vision-model/'
  - text: Uso de Segmentação Semântica no ControlNet
    url: >-
      https://github.com/lllyasviel/ControlNet-v1-1-nightly#controlnet-11-with-semantic-segmentation
related:
  - controlnet
  - inpaint
  - rete_neurale
---

A **Segmentação de Imagem** é um processo de Visão Computacional que consiste em **particionar uma imagem em múltiplos segmentos ou regiões**, associando cada pixel a um rótulo de classe específico. [1]

Em termos simples, é como uma IA "decompõe" uma imagem para entender seu conteúdo em um nível muito detalhado. Em vez de apenas ver "uma foto de uma rua", um modelo de segmentação vê "estes pixels são 'estrada', estes são 'céu', estes são 'árvore' e aqueles são 'carro'".

### Tipos de segmentação

Existem vários tipos de segmentação, mas os mais comuns são:
- **Segmentação Semântica:** A cada pixel é atribuída uma categoria (por exemplo, "pessoa", "gato", "grama"). Todos os objetos da mesma categoria têm a mesma cor no mapa de segmentação. [3]
- **Segmentação de Instância:** É mais avançada. Ela não apenas rotula os pixels como "pessoa", mas distingue entre "pessoa 1", "pessoa 2", etc. Cada *instância* de um objeto é identificada separadamente.

### Aplicações na geração de imagens

A segmentação se tornou uma ferramenta poderosa para o controle e a modificação de imagens geradas:

1.  **ControlNet com Segmentação Semântica:**
    É possível usar um mapa de segmentação como entrada para um modelo ControlNet. [3] Isso permite ditar a composição de uma cena de forma muito precisa. Por exemplo, pode-se fornecer um mapa com uma área azul na parte superior (céu), uma verde na parte inferior (prado) e uma marrom no meio (casa), e o modelo gerará uma imagem que respeita exatamente essa disposição espacial.

2.  **Inpainting Automático e Preciso:**
    Modelos avançados como o **SAM (Segment Anything Model)** da Meta AI podem gerar máscaras de segmentação incrivelmente precisas para qualquer objeto em uma imagem com um único clique. [2] No ComfyUI, isso permite criar fluxos de trabalho de inpainting poderosos: você clica em um objeto, o SAM cria a máscara perfeita para ele, e você pode modificá-lo ou substituí-lo com um prompt, sem ter que desenhar a máscara à mão.

Em resumo, a segmentação é uma tecnologia chave que permite a interação e a manipulação de imagens em um nível de precisão e inteligência que antes era impensável.
