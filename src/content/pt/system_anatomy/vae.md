---
title: 'VAE: O Decodificador Visual'
category: System Anatomy
sources:
  - text: 'Artigo Original: Auto-Encoder Variacional Bayesiano'
    url: 'https://arxiv.org/abs/1312.6114'
  - text: Explicação no Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/models/autoencoderkl'
related:
  - latent_space
  - checkpoint
---

O **VAE (Autoencoder Variacional)** é o decodificador final do seu sistema. [1, 2]

Imagine que o modelo de IA não "pensa" com imagens, mas em uma linguagem matemática abstrata, um **espaço latente**. É como um compositor que escreve uma partitura: a partitura não é música, são símbolos em uma folha.

O VAE é a orquestra que lê essa partitura e a transforma na sinfonia visual que você vê na tela. Sem ele, você ficaria apenas com a partitura (ruído incompreensível) e não com a música (a imagem final).

### Para que serve concretamente?

- **De Latente para Pixels:** Sua função principal é converter a representação abstrata (tensor latente) gerada pelo modelo em uma imagem real, com pixels e cores. [2]
- **Compressão:** Ele também pode fazer o oposto, comprimindo uma imagem existente em sua representação latente (processo de codificação).
