---
title: 'Inferência: Usando o Modelo Treinado'
category: Fundamentals
sources:
  - text: O que é Inferência? - Amazon Web Services
    url: 'https://aws.amazon.com/it/what-is/inference/'
  - text: Inferência vs. Treinamento - Google Cloud
    url: 'https://cloud.google.com/discover/inference-vs-training?hl=it'
related:
  - rete_neurale
  - deep_learning
  - checkpoint
---

A **Inferência** é o processo de **usar uma rede neural já treinada** para fazer previsões sobre dados novos e nunca antes vistos. [1]

Se o **treinamento** é a fase de "estudo" em que o modelo aprende com os livros (o conjunto de dados), a **inferência** é o **exame final** em que ele deve aplicar o que aprendeu para responder a novas perguntas. [2]

### O Processo de Inferência na Prática

Quando geramos uma imagem com o Stable Diffusion, estamos realizando um processo de inferência:
1.  **Carregar o Modelo:** Pegamos um checkpoint (`.safetensors`), que é o resultado de um longo e caro processo de treinamento.
2.  **Fornecer uma Entrada:** Damos ao modelo novos dados que ele nunca viu durante o estudo (nosso prompt e uma imagem de ruído aleatório).
3.  **O Modelo "Infere":** A rede neural processa a entrada através de suas camadas, usando os pesos que aprendeu, e produz uma saída (a previsão do ruído a ser removido).
4.  **Obtemos uma Saída:** Repetindo esse processo por um certo número de "passos", obtemos a imagem final.

### Inferência vs. Treinamento

| Característica | Treinamento | Inferência |
| :--- | :--- | :--- |
| **Propósito** | Ensinar o modelo, criar os "pesos" | Usar o modelo para obter resultados |
| **Recursos Necessários** | Enormes (muitas GPUs, semanas de tempo) | Moderados (uma única GPU, segundos/minutos) |
| **Dados** | Grande conjunto de dados rotulados | Dados de entrada únicos (por exemplo, um prompt) |
| **Quem faz?** | Laboratórios de pesquisa, empresas, a comunidade | O usuário final (nós!) |

Em resumo, toda vez que pressionamos o botão "Gerar", estamos realizando uma **inferência**.
