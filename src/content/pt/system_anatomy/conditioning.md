---
title: 'Condicionamento: As Instruções para a UNet'
category: System Anatomy
sources:
  - text: Artigo do ControlNet (que fala sobre 'controle condicional')
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Explicação do Condicionamento de Texto no Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
  - text: Documentação do ComfyUI mostrando os fluxos de Condicionamento
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/sdxl/'
related:
  - clip
  - unet
  - controlnet
  - prompt
---

O **Condicionamento** é o termo técnico que descreve os **dados de orientação** que são fornecidos à UNet para influenciar e controlar o processo de geração de imagens. [1]

Pense na UNet como um motor potente, mas "cego". Sozinha, ela só saberia como remover o ruído de forma genérica. O condicionamento é o conjunto de **instruções e restrições** que lhe dizem *como* remover o ruído para obter um resultado específico. [2]

No ComfyUI, o condicionamento é representado visualmente pelos **fios amarelos** que conectam os vários nós. Esses fios não transportam imagens, mas sim esses pacotes de dados de orientação. [3]

### Principais tipos de condicionamento

Existem várias "fontes" de condicionamento que podem ser combinadas para um controle granular:

1.  **Condicionamento Textual:**
    É a forma mais comum de orientação. Ele vem do **Codificador de Texto CLIP**, que transforma o prompt positivo e negativo em uma representação numérica (embedding). Este "pacote" de dados diz à UNet quais conceitos, objetos e estilos ela deve representar. [2]

2.  **Condicionamento de Imagem:**
    Esta orientação não vem do texto, mas de uma imagem. É o princípio no qual o **ControlNet** se baseia. Um modelo ControlNet analisa uma imagem de entrada (por exemplo, uma pose, um mapa de profundidade) e a transforma em um condicionamento que é adicionado ao do texto. Este tipo de condicionamento impõe restrições estruturais e espaciais muito fortes à UNet. [1]

3.  **Condicionamento Temporal:**
    É um tipo de condicionamento mais "interno". A cada passo da amostragem, uma informação sobre o "passo de tempo" atual (por exemplo, "estamos no passo 5 de 20") é passada para a UNet. Isso permite que ela saiba em que ponto do processo está e ajuste sua agressividade na remoção de ruído de acordo.

### Combinando condicionamentos

A potência de fluxos de trabalho avançados como os do ComfyUI reside na capacidade de manipular e combinar esses fluxos de dados. Por exemplo, é possível:
- **Misturar** o condicionamento de dois prompts diferentes.
- **Aplicar** um ControlNet apenas a uma parte do prompt.
- **Guiar** a geração com vários ControlNets simultaneamente.

Em resumo, toda vez que você vê um fio amarelo no ComfyUI, está olhando para um canal de comunicação que leva instruções vitais para o coração do modelo, a UNet.
