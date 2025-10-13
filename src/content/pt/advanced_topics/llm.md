---
title: 'LLM: Os Grandes Modelos de Linguagem'
category: Advanced Topics
sources:
  - text: 'Artigo que introduziu a arquitetura Transformer: Attention Is All You Need'
    url: 'https://arxiv.org/abs/1706.03762'
  - text: Explicação dos LLMs pela NVIDIA
    url: 'https://www.nvidia.com/it-it/glossary/large-language-models/'
  - text: O que é um LLM? - IBM
    url: 'https://www.ibm.com/it-it/topics/large-language-models'
related:
  - gguf
  - clip
  - dit
  - tokens
---

Um **LLM (Large Language Model)**, ou Grande Modelo de Linguagem, é um tipo de rede neural treinada em enormes quantidades de dados de texto (livros, artigos, código, conversas) com o objetivo de **entender e gerar linguagem humana** de forma coerente e contextualmente relevante. [2, 3]

Exemplos famosos de LLMs incluem a série **GPT** da OpenAI (a base do ChatGPT), **Llama** da Meta, **Gemini** do Google e **Claude** da Anthropic.

### Como eles funcionam conceitualmente?

Em sua essência, um LLM é um poderoso **mecanismo de previsão da próxima palavra**. [3] Quando recebe um texto de entrada (um "prompt"), o modelo calcula a probabilidade de qual palavra (ou "token") deve vir a seguir, com base nos padrões linguísticos que aprendeu durante o treinamento. Repetindo esse processo milhares de vezes, ele é capaz de gerar frases, parágrafos e documentos inteiros.

### A arquitetura chave: o Transformer

A revolução dos LLMs foi possível graças à invenção da arquitetura **Transformer** em 2017. [1] Seu componente fundamental, o mecanismo de **Atenção**, permite que o modelo pondere a importância de diferentes palavras no texto de entrada, entendendo as relações e o contexto mesmo a longas distâncias. É isso que dá aos LLMs sua extraordinária capacidade de seguir conversas, traduzir idiomas e escrever código.

### LLMs e geração de imagens

Embora sejam especializados em texto, os LLMs estão intimamente relacionados ao mundo da geração de imagens de duas maneiras:

1.  **O codificador de texto (CLIP):** O componente que interpreta nossos prompts nos modelos de difusão é, para todos os efeitos, um tipo de modelo de linguagem baseado na arquitetura Transformer. [1]
2.  **Arquiteturas híbridas (DiT):** As inovações no campo dos LLMs, em particular a arquitetura Transformer, também estão sendo adotadas para a geração de imagens, levando ao nascimento de novos e poderosos modelos como os **Transformadores de difusão (DiT)**.

Para executar LLMs em hardware de consumo, são frequentemente usados formatos de arquivo quantizados como **GGUF**, que reduzem drasticamente seu tamanho e consumo de memória.
