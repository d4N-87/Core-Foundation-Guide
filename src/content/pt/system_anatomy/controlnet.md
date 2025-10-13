---
title: 'ControlNet: Guiando a IA com Imagens'
category: System Anatomy
sources:
  - text: >-
      Artigo Original: Adicionando Controle Condicional a Modelos de Difusão de
      Texto para Imagem
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Guia ilustrado para o ControlNet
    url: >-
      https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/
  - text: Repositório Oficial do GitHub com os modelos
    url: 'https://github.com/lllyasviel/ControlNet'
related:
  - checkpoint
  - unet
  - conditioning
---

**ControlNet** é uma arquitetura de rede neural que permite **condicionar e controlar modelos de difusão usando uma entrada visual**, como uma imagem ou um mapa de dados. [1] Em termos simples, é um sistema que funciona ao lado do modelo principal (a UNet) e lhe fornece uma "orientação visual" extra, muito mais precisa e direta do que um simples prompt de texto. [2]

Pense no modelo de difusão como um artista talentoso a quem você só pode dar instruções verbais. O ControlNet é como dar a ele um **traçado** ou um **esboço preparatório**: o artista manterá sua criatividade e estilo, mas seguirá fielmente a composição, a pose ou a estrutura que você forneceu. [2]

### O fluxo de trabalho do ControlNet

Um fluxo de trabalho típico com o ControlNet ocorre em duas fases principais:

1.  **Pré-processamento:**
    Começa-se com uma imagem de entrada. Esta imagem é processada por um **pré-processador**, um algoritmo que extrai dela um "mapa" de informações específicas. Este mapa é o que será usado como orientação. Existem muitos tipos de pré-processadores, cada um especializado em um tipo diferente de controle. [3]

2.  **Aplicação do modelo ControlNet:**
    O mapa gerado é passado para um modelo ControlNet específico, treinado para "entender" esse tipo de mapa. Este modelo ControlNet trabalha em paralelo com a UNet do ponto de verificação principal, injetando sua orientação visual a cada passo do processo de denoising para forçar o resultado a respeitar o mapa. [1]

### Exemplos de pré-processadores e modelos comuns

- **Canny:**
    É um algoritmo de **detecção de bordas**. O pré-processador `Canny` pega uma imagem e a transforma em um desenho de linhas em preto e branco, destacando apenas os contornos dos objetos. [3] É extremamente útil para replicar a composição exata de uma foto ou desenho.

- **Profundidade:**
    O pré-processador `Profundidade` analisa uma imagem e cria um **mapa de profundidade**, onde as cores (geralmente do branco ao preto) indicam quais objetos estão mais próximos ou mais distantes da "câmera". [3] Isso permite transferir a disposição 3D de uma cena para uma imagem completamente diferente.

- **OpenPose:**
    Este pré-processador detecta o "esqueleto" de uma ou mais pessoas em uma imagem, criando um mapa com a **pose exata** de cada figura. É a ferramenta definitiva para controlar a postura e a posição dos personagens.

- **Rascunho / Esboço:**
    Permite usar um simples rascunho ou um desenho feito à mão como guia para a composição geral da imagem.

O ControlNet abriu as portas para um nível de controle e consistência antes impensável, tornando-se uma ferramenta indispensável para animação, design e qualquer aplicação que exija resultados precisos e reproduzíveis.
