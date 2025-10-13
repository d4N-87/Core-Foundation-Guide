---
title: 'Amostrador: A Técnica de Denoising'
category: Core Concepts
sources:
  - text: Guia completo para Amostradores na Stable Diffusion Art
    url: 'https://stablediffusionart.com/samplers/'
  - text: Explicação e comparação de Amostradores
    url: 'https://getimg.ai/guides/guide-to-stable-diffusion-samplers'
  - text: Discussão técnica sobre Amostradores e suas famílias
    url: >-
      https://www.reddit.com/r/StableDiffusion/comments/112l2l9/a_guide_to_the_various_samplers_and_what_they_do/
related:
  - scheduler
  - steps
  - seed
---

O **Amostrador** (ou método de amostragem) é o algoritmo que executa materialmente o processo de "denoising" (remoção de ruído) a cada passo. [1] Se o modelo de IA é o cérebro que prevê o ruído a ser removido, o amostrador é a **técnica específica** ou o **estilo de pincelada** que o artista usa para limpar a imagem. [2]

Pense em um bloco de mármore bruto (a imagem de ruído inicial). Diferentes escultores (os amostradores) usarão técnicas diferentes para chegar à estátua final, mesmo seguindo o mesmo projeto (o prompt). Alguns serão mais rápidos e agressivos, outros mais lentos e meticulosos. O resultado final será semelhante, mas os detalhes e a "textura" podem variar. [3]

### Principais famílias de amostradores

Embora a lista no ComfyUI seja longa, os amostradores podem ser agrupados em algumas famílias principais:

- **Solucionadores de EDO Ancestrais (por exemplo, `Euler`, `Heun`, `LMS`):** São os métodos mais clássicos e simples. [1] `Euler` é o mais simples e rápido. `Heun` é mais preciso, mas cerca de duas vezes mais lento. [1, 2]
- **Amostradores Ancestrais (por exemplo, `Euler a`, `DPM2 a`):** Esses amostradores reinjetam uma pequena quantidade de ruído a cada passo. [1] Isso os torna não determinísticos: mesmo com a mesma semente, a imagem final pode variar ligeiramente. Eles são ótimos para exploração criativa. [1]
- **DPM / DPM++ (Solucionadores de Modelos Probabilísticos de Difusão):** Uma família de amostradores modernos, muito eficientes e populares. [2] Variantes como `DPM++ 2M Karras` são frequentemente recomendadas porque atingem uma qualidade muito alta em poucos passos (20-30), oferecendo um excelente equilíbrio entre velocidade e qualidade. [2]
- **DDIM (Modelos Implícitos de Difusão com Denoising):** Um dos primeiros amostradores desenvolvidos para modelos de difusão, é determinístico e confiável, mas muitas vezes superado em velocidade e eficiência pelos mais recentes DPM++. [1]

### Qual escolher?

Não existe um "melhor" amostrador em termos absolutos. A escolha depende do modelo que você está usando e do resultado que deseja alcançar. Uma boa estratégia é começar com um amostrador rápido e de alta qualidade como **`DPM++ 2M Karras`** com 20-30 passos. [2]

**Importante:** O Amostrador trabalha em estreita colaboração com o **Agendador**, que determina *quanto* ruído remover a cada passo.
