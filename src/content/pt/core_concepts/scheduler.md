---
title: 'Agendador: O Plano de Denoising'
category: Core Concepts
sources:
  - text: Documentação oficial dos Agendadores no Hugging Face Diffusers
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/overview'
  - text: Explicação da relação entre o Amostrador e o Agendador
    url: >-
      https://websim.ai/the-definitive-guide-to-samplers-and-schedulers-in-diffusion-models/
  - text: Discussão no ComfyUI sobre a diferença entre os Agendadores
    url: 'https://github.com/comfyanonymous/ComfyUI/discussions/227'
related:
  - sampler
  - steps
  - karras
---

O **Agendador** é o algoritmo que define a **estratégia** e o **ritmo** do processo de denoising. [1] Se o Amostrador é a *técnica* com a qual o artista pinta, o agendador é seu *plano de trabalho*: ele decide **quanto ruído remover e em qual passo**. [2]

Pense novamente no escultor. O agendador é sua estratégia: "Nos primeiros 10 passos, usarei um cinzel grande para remover grandes pedaços de mármore e desbastar a forma (remover muito ruído). Nos 10 seguintes, passarei para um cinzel menor para definir os detalhes (remover menos ruído, mas de forma mais precisa)." [2]

Este plano não linear é crucial: remover grandes quantidades de ruído no início acelera o processo, enquanto focar nos detalhes no final melhora a qualidade da imagem. [1]

### Tipos de Agendadores Comuns no ComfyUI

No ComfyUI, a escolha do agendador é separada da do amostrador, oferecendo um controle mais granular. [3] Os mais comuns são:

- **Normal:** É o agendador padrão, com uma progressão linear do denoising.
- **Karras:** Proposto pelo pesquisador Tero Karras, este agendador é muito popular. [3] Ele usa uma progressão não linear que concentra mais "trabalho fino" nos últimos passos. [1] Isso geralmente resulta em imagens com detalhes mais finos e uma melhor percepção da qualidade. [3]
- **Simples:** Um agendador muito simples que, como diz o criador do ComfyUI, funciona surpreendentemente bem em alguns cenários. [3]
- **DDIM Uniforme:** Um agendador específico para ser usado em conjunto com o amostrador `ddim` para replicar seu comportamento original. [3]

**Em resumo:** O **Amostrador** é o *como* o ruído é removido, o **Agendador** é o *quando* e *quanto*. A combinação deles determina a eficiência e a qualidade do resultado final.
