---
title: 'Inpainting e Outpainting: Modificando e Estendendo Imagens'
category: System Anatomy
sources:
  - text: >-
      Artigo original sobre Inpainting com Modelos de Difusão (Blended
      Diffusion)
    url: 'https://arxiv.org/abs/2111.14818'
  - text: >-
      Guia prático para Inpainting no Automatic1111 (os conceitos são
      universais)
    url: 'https://stable-diffusion-art.com/inpainting-a-beginners-guide/'
  - text: Explicação de Outpainting (ou 'Uncrop')
    url: 'https://stable-diffusion-art.com/outpainting/'
related:
  - denoise
  - vae
  - controlnet
---

**Inpainting** e **Outpainting** são duas técnicas poderosas que usam modelos de difusão não para criar uma imagem do zero, mas para **modificar ou estender partes específicas de uma imagem existente**. [2] Ambas se baseiam no mesmo princípio: fornecer ao modelo uma imagem parcial e pedir que ele "preencha" as partes que faltam de forma coerente.

### Inpainting: Redesenhando o interior

O **Inpainting** consiste em **substituir uma porção de uma imagem** por algo novo, gerado pela IA. [1]

O processo é simples:
1.  Começa-se com uma imagem existente.
2.  Cria-se uma **máscara**, ou seja, "colore-se" a área que se quer modificar.
3.  Fornece-se um novo prompt que descreve o que se quer inserir na área mascarada.

O modelo usará a área não mascarada como contexto para gerar o novo conteúdo, tentando integrá-lo de forma natural em termos de estilo, luzes e sombras. [2] É a técnica perfeita para:
- **Corrigir erros:** Remover objetos indesejados, consertar mãos deformadas.
- **Mudar detalhes:** Modificar a cor de um vestido, mudar a expressão de um rosto.
- **Adicionar elementos:** Inserir um novo personagem ou objeto em uma cena.

### Outpainting: Expandindo o exterior

O **Outpainting** (ou "uncrop") é o processo inverso: em vez de preencher um buraco *dentro* da imagem, **expande-se a tela para fora**, pedindo à IA que imagine e desenhe o que está além das bordas originais. [3]

O modelo usa a imagem original inteira como contexto para gerar os novos pixels, estendendo a cena de forma coerente. É uma técnica incrivelmente útil para:
- **Mudar o formato:** Transformar uma imagem vertical em uma horizontal para um banner.
- **Corrigir enquadramentos apertados:** "Afastar a câmera" para mostrar mais contexto ao redor de um assunto.
- **Criar panoramas:** Estender progressivamente uma imagem em várias direções para criar paisagens vastas.

### O papel fundamental do `Denoise`

Em ambas as técnicas, o parâmetro **Denoise** é fundamental. Ele controla quanto "poder" o modelo tem para ignorar os pixels originais (se presentes na área a ser modificada) e seguir o novo prompt.
- Um `denoise` alto dará ao modelo mais liberdade criativa.
- Um `denoise` baixo tentará preservar mais a estrutura e as cores da área original.
