---
title: 'Denoise: A Força da Transformação'
category: Core Concepts
sources:
  - text: Guia para a Força de Denoising na Stable Diffusion Art
    url: 'https://stablediffusionart.com/denoising-strength/'
  - text: Explicação do Denoise no contexto de Img2Img
    url: >-
      https://stable-diffusion-art.com/how-to-use-img2img-to-turn-a-doodle-into-a-masterpiece/
related:
  - steps
  - sampler
  - inpaint
---

O parâmetro **Denoise** (ou *força de denoising*) é um botão que controla **quanto da imagem inicial deve ser transformado** durante o processo de geração. Seu valor varia de 0.0 (nenhuma mudança) a 1.0 (mudança completa). [1]

Pense em um restaurador trabalhando em uma pintura antiga. O `denoise` é sua diretiva:
- **Denoise = 0.1:** "Apenas dê uma leve atualizada nas cores, não toque no desenho." (Mudanças mínimas)
- **Denoise = 0.7:** "Mantenha a composição geral, mas repinte completamente os detalhes e o estilo." (Transformação significativa)
- **Denoise = 1.0:** "Ignore a pintura antiga e pinte uma completamente nova na mesma tela." (Criação do zero)

### Dois cenários de uso fundamentais

O comportamento do `denoise` muda dependendo do ponto de partida:

1.  **Geração do zero (Texto para Imagem):**
    Em um fluxo de trabalho padrão, você começa com uma imagem latente vazia, que é 100% ruído. Para criar uma imagem completamente nova, o `denoise` deve ser definido como **1.0**. Isso diz ao amostrador: "Pegue 100% do ruído e transforme-o em uma imagem seguindo o prompt". [1]

2.  **Modificação de uma imagem (Imagem para Imagem, Inpainting, Upscaling):**
    Aqui, o `denoise` se torna uma ferramenta criativa fundamental. Você começa com uma imagem existente (ou uma versão de baixa resolução) e diz ao modelo para "redesenhá-la".
    - **Valores baixos (0.1 - 0.4):** Ideais para upscaling ou para aplicar pequenas mudanças de estilo, preservando quase todos os detalhes originais. [2]
    - **Valores médios (0.5 - 0.75):** A faixa mais comum para img2img. Permite que o modelo mude significativamente o estilo e os detalhes, mantendo a composição e as formas principais da imagem inicial. [2]
    - **Valores altos (0.8 - 0.99):** A imagem original é usada apenas como um guia vago para a composição. O resultado será muito diferente. [1]

No ComfyUI, o `denoise` é um parâmetro explícito do `KSampler`, tornando seu papel em cada etapa da geração muito claro.
