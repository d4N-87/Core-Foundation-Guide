---
title: 'Atenção: O Mecanismo de Foco'
category: Advanced Topics
sources:
  - text: Artigo 'Attention Is All You Need' que introduziu o Transformer
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explicação ilustrada do mecanismo de Atenção
    url: >-
      https://jalammar.github.io/visualizing-neural-machine-translation-self-attention-visualizations-for-transformer-models/
related:
  - clip
  - dit
  - tokens
  - prompt
---

A **Atenção** (ou *Auto-Atenção*) é o mecanismo computacional no coração da arquitetura **Transformer**, que revolucionou tanto os modelos de linguagem (LLMs) quanto, mais recentemente, os modelos de difusão (DiTs). [1]

Em termos simples, a Atenção permite que um modelo **pondere dinamicamente a importância de diferentes partes de uma entrada** (como palavras em uma frase ou patches em uma imagem) para entender o contexto e as relações entre elas. [2]

### Como Funciona (Conceitualmente)?

Imagine ler a frase: `Um gato vermelho persegue um rato cinza`.
Quando o modelo processa a palavra "vermelho", o mecanismo de Atenção permite que ele entenda que "vermelho" está fortemente conectado a "gato" e não a "rato". Na prática, para cada palavra, a Atenção calcula uma "pontuação de atenção" em relação a todas as outras palavras da frase, "focando" nas relações mais importantes. [2]

Isso é fundamental para resolver ambiguidades e entender as nuances da linguagem.

### Atenção na Geração de Imagens

O mecanismo de Atenção é crucial em dois pontos do nosso fluxo de trabalho:

1.  **No Codificador de Texto CLIP:**
    Quando o CLIP processa nosso prompt, a Atenção é o que permite que ele entenda que em `um astronauta a cavalo`, é o astronauta que deve estar no cavalo. É também o mecanismo que é influenciado quando aumentamos o peso de uma palavra com a sintaxe `(palavra:1.2)`, dizendo-lhe para "prestar mais atenção" a esse conceito.

2.  **Nos Transformadores de Difusão (DiTs):**
    Em modelos como o Stable Diffusion 3, a Atenção não é aplicada apenas ao texto, mas também aos "tokens visuais" (os patches da imagem). Isso permite que o modelo crie relações complexas entre as diferentes partes da imagem, melhorando drasticamente a coerência e a composição. Por exemplo, ele pode garantir que um reflexo em um espelho corresponda corretamente ao objeto refletido.

Em resumo, a Atenção é a tecnologia que permitiu que os modelos passassem de uma simples "associação" de palavras para uma verdadeira "compreensão" do contexto e das relações, tanto no texto quanto nas imagens.
