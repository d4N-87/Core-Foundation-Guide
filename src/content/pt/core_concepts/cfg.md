---
title: 'CFG: A Escala de Orientação'
category: Core Concepts
sources:
  - text: Explicação técnica na Stable Diffusion Art
    url: 'https://stablediffusionart.com/what-is-cfg-scale/'
  - text: 'Artigo Original: Orientação de Difusão Livre de Classificador'
    url: 'https://arxiv.org/abs/2207.12598'
related:
  - prompt
  - sampler
  - conditioning
---

A **Escala CFG (Classifier-Free Guidance)** é um dos parâmetros mais poderosos à sua disposição. Em termos simples, é um botão que controla **quão fielmente** o modelo deve seguir as instruções do seu prompt. [1]

Pense no prompt como um mapa e no modelo como um explorador. A CFG é o nível de disciplina do explorador:
- **Um valor baixo** diz a ele: "Aqui está o mapa, mas sinta-se à vontade para explorar os arredores se encontrar algo interessante". O resultado será mais criativo, mas pode ignorar partes do prompt.
- **Um valor alto** ordena: "Siga este mapa à risca, sem desvios!". O resultado será muito mais fiel ao prompt, mas pode perder a naturalidade.

### Por que se chama "Livre de Classificador"?

O nome técnico vem do fato de que este método não precisa de um modelo "classificador" externo para orientar a geração, ao contrário de técnicas mais antigas. [2] A orientação é integrada no próprio modelo de difusão, tornando-o mais eficiente.

### Guia prático para os valores de CFG

- **CFG baixo (1-6):** Máxima liberdade criativa.
- **CFG médio (7-12):** O ponto de equilíbrio ideal. A maioria das interfaces usa um valor padrão em torno de 7. [1]
- **CFG alto (13-20+):** Adesão muito estrita ao prompt. Em valores muito altos, a imagem corre o risco de ficar "queimada", com cores e contraste excessivos. [1]

Modelos destilados têm um CFG de 1, uma condição que torna o prompt negativo inutilizável.

Cada modelo geralmente tem seu próprio valor de CFG recomendado.
