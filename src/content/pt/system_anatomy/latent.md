---
title: 'Espaço Latente: O Mundo Comprimido das Imagens'
category: System Anatomy
sources:
  - text: >-
      Artigo original do Stable Diffusion (Síntese de Imagens de Alta Resolução
      com Modelos de Difusão Latente)
    url: 'https://arxiv.org/abs/2112.10752'
  - text: Explicação do Espaço Latente no blog da Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-latent-space'
  - text: Artigo ilustrado sobre o Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - vae
  - unet
  - diffusion_model
---

O **Espaço Latente** é uma representação comprimida e de baixa resolução de uma imagem. É um "mundo" intermediário no qual modelos de difusão como o Stable Diffusion realizam a maior parte de seu trabalho. [1]

Pense em uma imagem de alta resolução como uma pasta cheia de milhares de arquivos. Trabalhar em cada arquivo individualmente seria lento e caro. O espaço latente é como um **arquivo ZIP** dessa pasta: ele contém todas as informações essenciais, mas em um formato muito menor e mais leve. [2]

O processo de difusão (o "denoising" feito pela UNet) não acontece nos pixels da imagem final, mas nesta versão comprimida, a "representação latente". [3]

### Por que trabalhar no espaço latente?

A razão é uma só: **eficiência**. [1]
- **Velocidade:** Realizar o processo de denoising em uma pequena representação latente (por exemplo, 64x64) é **ordens de magnitude mais rápido** do que fazê-lo em uma imagem de resolução total (por exemplo, 512x512).
- **Menos recursos:** Requer muito menos memória (VRAM) e poder de computação.

Essa foi a inovação chave dos "Modelos de Difusão Latente" (LDM), a família de modelos à qual o Stable Diffusion pertence. [1] Eles tornaram possível a execução de modelos poderosos em hardware de consumo.

### O papel do VAE

Como se passa do mundo dos pixels para o mundo latente e vice-versa? É aqui que entra o **VAE (Autoencoder Variacional)**:

1.  **Codificador do VAE:** Ao usar uma imagem de entrada (img2img), o codificador do VAE pega a imagem em pixels e a **comprime** em sua representação latente.
2.  **Decodificador do VAE:** No final do processo de denoising, o decodificador do VAE pega a representação latente "limpa" e a **descomprime** na imagem final em pixels que vemos. [3]

No ComfyUI, o nó `Empty Latent Image` cria um ponto de partida vazio neste espaço latente, pronto para ser processado pela UNet.

Em resumo, o espaço latente é o engenhoso "escritório" no qual a UNet trabalha de forma rápida e eficiente, deixando para o VAE a tarefa de atuar como um "porteiro" entre este escritório e o mundo exterior dos pixels.
