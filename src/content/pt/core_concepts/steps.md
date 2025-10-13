---
title: 'Passos: Os Passos de Amostragem'
category: Core Concepts
sources:
  - text: Explicação no blog da Stable Diffusion Art
    url: 'https://stablediffusionart.com/steps/'
  - text: Documentação do `DDIMScheduler` no Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/schedulers/ddim'
related:
  - sampler
  - scheduler
  - denoise
---

**Passos** (ou passos de amostragem) indicam quantas vezes o modelo "refina" a imagem a partir do ruído puro. É um dos parâmetros mais importantes para equilibrar a qualidade e a velocidade de geração. [1]

Imagine um pintor começando com uma tela completamente caótica. Cada "passo" é uma pincelada que adiciona detalhes e coerência, removendo um pouco de caos (denoising) e aproximando a imagem do seu prompt.

### Como escolher o número de passos?

- **Poucos Passos (por exemplo, 10-15):** A imagem é gerada muito rapidamente, mas pode parecer incompleta, pouco detalhada ou "turva". Ótimo para pré-visualizações rápidas.
- **Número Padrão (por exemplo, 20-30):** É o ponto de equilíbrio ideal para a maioria dos modelos e amostradores. A imagem é de alta qualidade e os tempos de geração são razoáveis. [1]
- **Muitos Passos (por exemplo, 40-100):** Aumentar ainda mais os passos leva a melhorias mínimas (ou às vezes nenhuma), mas aumenta drasticamente o tempo de geração.

**Nota importante:** O efeito dos passos depende muito do **Amostrador** escolhido. Alguns amostradores (como `DPM++ 2M Karras`) atingem excelente qualidade com apenas 20 passos, enquanto outros podem precisar de 30 ou mais. [2]

Recentemente, modelos e LoRas se tornaram populares, permitindo excelentes resultados mesmo com poucos passos, como o Lightv2x.

Cada modelo geralmente tem uma faixa de passos recomendada.
