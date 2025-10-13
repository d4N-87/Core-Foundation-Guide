---
title: 'Rede Neural: O Cérebro Artificial'
category: Fundamentals
sources:
  - text: O que é uma Rede Neural? - IBM
    url: 'https://www.ibm.com/it-it/topics/neural-networks'
  - text: Explicação de Redes Neurais - Wikipedia
    url: 'https://it.wikipedia.org/wiki/Rete_neurale_artificiale'
related:
  - deep_learning
  - inferenza
  - unet
---

Uma **Rede Neural Artificial** é um modelo computacional inspirado na estrutura e no funcionamento do cérebro humano. [1] É o bloco de construção fundamental de quase todos os sistemas modernos de inteligência artificial, incluindo os modelos que geram imagens.

Pense em uma rede neural como um sistema de **neurônios artificiais** (chamados de "nós") organizados em **camadas**. [2]

### Como funciona (de forma simples)?

1.  **Camada de Entrada:** Recebe os dados iniciais. No nosso caso, poderia ser a representação numérica de um prompt ou os pixels de uma imagem.
2.  **Camadas Ocultas:** São as camadas intermediárias onde ocorre o verdadeiro "processamento". Cada neurônio recebe sinais dos neurônios da camada anterior, realiza um pequeno cálculo e passa seu resultado para os da camada seguinte. Durante o treinamento, a rede aprende a ajustar as "conexões" (os "pesos") entre esses neurônios para reconhecer padrões cada vez mais complexos. [1]
3.  **Camada de Saída:** Produz o resultado final. Por exemplo, a previsão do ruído a ser removido de uma imagem.

Uma rede com muitas camadas ocultas é chamada de **Rede Neural Profunda**, e o campo que a estuda é a **Aprendizagem Profunda**. [1]

Os modelos que usamos, como a **UNet** ou o **CLIP**, são exemplos extremamente grandes e complexos de redes neurais, com bilhões de conexões otimizadas para suas tarefas específicas.
