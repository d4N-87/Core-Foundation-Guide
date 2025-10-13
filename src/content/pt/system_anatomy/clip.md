---
title: 'Codificador de Texto CLIP: O Tradutor do Prompt'
category: System Anatomy
sources:
  - text: Artigo Original da OpenAI sobre o CLIP
    url: 'https://arxiv.org/abs/2103.00020'
  - text: Explicação do CLIP no blog da Hugging Face
    url: 'https://huggingface.co/docs/transformers/main/en/model_doc/clip'
  - text: Artigo ilustrado sobre como funciona o Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - prompt
  - tokens
  - conditioning
  - unet
---

**CLIP (Contrastive Language-Image Pre-training)** é um modelo neural desenvolvido pela OpenAI que revolucionou a forma como as IAs "entendem" a relação entre texto e imagens. [1] Dentro de um modelo de difusão, seu papel é o de um **tradutor universal**: ele pega seu prompt em linguagem humana e o converte em uma representação matemática (chamada *embedding*) que a UNet pode usar como guia. [3]

Os termos "Codificador de Texto" e "CLIP" são frequentemente usados de forma intercambiável. O primeiro descreve a *função*, o segundo o *nome* do componente que executa essa função.

Sem o CLIP, o prompt "um astronauta a cavalo" seria apenas uma sequência de texto sem sentido para a UNet. Graças ao CLIP, essa frase é transformada em um conjunto de números que "descrevem" matematicamente os conceitos de "astronauta", "cavalo" e sua relação espacial.

### Como funciona o processo de "tradução"?

O nó `CLIP Text Encode` no ComfyUI executa um processo de várias etapas:

1.  **Tokenização:**
    Primeiro, o prompt é dividido em pedaços menores chamados **Tokens**. [2] Um token não corresponde necessariamente a uma palavra. Palavras complexas podem ser divididas em vários tokens, enquanto palavras comuns podem ser um único token. Cada modelo CLIP tem um número máximo de tokens que pode processar de uma vez (geralmente 75). Se o seu prompt for mais longo, ele é dividido em vários "blocos".

2.  **Embedding:**
    Cada token é convertido em um vetor numérico. Neste ponto, temos uma sequência de números que representa nosso prompt.

3.  **Processamento (Atenção):**
    Esta sequência de números é processada por uma arquitetura Transformer. [3] É aqui que a verdadeira mágica acontece: o mecanismo de **Atenção** permite que o modelo entenda as relações entre as palavras. Ele não vê apenas "vermelho" e "cubo", mas entende que é o "cubo" que deve ser "vermelho". É aqui que o peso que damos às palavras no prompt (por exemplo, `(palavra:1.2)`) tem efeito, dizendo ao mecanismo de atenção para "prestar mais atenção" a certos conceitos.

O resultado final deste processo é o **Condicionamento**, uma saída que contém os embeddings do prompt prontos para serem "injetados" na UNet e guiar a geração da imagem.

### Diferentes Modelos, Diferentes CLIPs

- **Stable Diffusion 1.5** usa um único modelo CLIP (OpenCLIP).
- **Stable Diffusion XL (SDXL)** usa uma combinação de dois modelos CLIP diferentes (OpenCLIP e CLIP ViT-L), permitindo que ele entenda os prompts de uma forma muito mais rica e sutil. Esta é uma das principais razões para sua qualidade superior.

Isso implica que quanto mais CLIPs trabalharem juntos, com muitos bilhões de parâmetros, mais o resultado estará alinhado com o prompt.
