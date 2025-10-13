---
title: 'UNet: O Coração do Denoising'
category: System Anatomy
sources:
  - text: Artigo original que introduziu a UNet (para imagens biomédicas)
    url: 'https://arxiv.org/abs/1505.04597'
  - text: Explicação da UNet no contexto do Stable Diffusion - Hugging Face
    url: 'https://huggingface.co/blog/stable_diffusion#the-unet'
  - text: Artigo ilustrado sobre a arquitetura do Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - checkpoint
  - diffusion_model
  - conditioning
  - clip
---

A **UNet** é o componente central e mais importante de um modelo de difusão como o Stable Diffusion. É a rede neural que aprende a **remover progressivamente o ruído** de uma imagem latente, guiada pelas instruções do prompt. [2, 3]

Se o ponto de verificação é o "cérebro", a UNet é o **lobo parietal**, a parte que processa as informações sensoriais (o prompt) para criar uma representação espacial coerente (a imagem).

### Por que se chama "U-Net"?

O nome vem de sua arquitetura, que tem uma forma característica de "U". [1] O processo de elaboração dentro da UNet ocorre em duas fases principais:

1.  **Codificador (A Descida):**
    A imagem ruidosa entra na primeira parte do "U". A cada passo para baixo, a rede **comprime a imagem**, reduzindo sua resolução, mas aumentando o número de canais de informação. Na prática, ela está tentando "entender" o conteúdo da imagem em um nível cada vez mais abstrato, ignorando os detalhes finos para captar as formas e os conceitos principais. [3]

2.  **Decodificador (A Subida):**
    Chegando ao fundo do "U" (o *gargalo*), a informação comprimida começa a subir. A cada passo para cima, a rede **descomprime a imagem**, aumentando sua resolução e usando as informações abstratas aprendidas antes para reconstruir os detalhes de forma coerente. Graças a "conexões de atalho" que ligam diretamente os níveis da descida com os da subida, a rede não "esquece" os detalhes de baixa resolução enquanto reconstrói a imagem. [1, 3]

### O papel do condicionamento

A UNet não trabalha às cegas. A cada passo de seu processo, ela recebe duas entradas fundamentais que a guiam (um processo chamado **condicionamento**):
- **O Prompt:** As informações provenientes do Codificador de Texto (CLIP) são "injetadas" na UNet para lhe dizer *o que* desenhar.
- **O Passo de Tempo:** Um número que indica em qual passo do processo de denoising se encontra. Isso permite que a UNet seja mais agressiva no início (quando há muito ruído) e mais delicada no final. [2]

Em resumo, quando você carrega um modelo base ou um ponto de verificação no ComfyUI, a parte maior e mais importante desse arquivo é precisamente a UNet.
