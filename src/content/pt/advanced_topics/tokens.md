---
title: 'Tokens: Os Blocos de Construção da Linguagem'
category: Advanced Topics
sources:
  - text: Introdução à Tokenização - Hugging Face
    url: 'https://huggingface.co/learn/nlp-course/chapter2/4?fw=pt'
  - text: Anúncio do modelo FLUX.1 pela Black Forest Labs
    url: 'https://blackforestlabs.ai/announcing-flux/'
  - text: Explicação dos Tokens no contexto do Stable Diffusion
    url: 'https://stable-diffusion-art.com/token/'
related:
  - clip
  - prompt
  - attention
---

**Tokens** são as unidades fundamentais em que um texto é dividido antes de ser processado por um modelo de linguagem como o CLIP. [1] São os "blocos de construção" com os quais o modelo lê e entende nosso prompt.

Um token **não é necessariamente uma palavra inteira**. O processo de **Tokenização** usa um vocabulário predefinido para dividir o texto em pedaços que o modelo conhece. [3]

### Exemplos de Tokenização

Considere a palavra `indescritivelmente`. Um tokenizador pode dividi-la em vários tokens que ele conhece:
`in` + `descri` + `tivel` + `mente`

- **Palavras comuns** (por exemplo, `gato`, `o`, `um`) são frequentemente um único token.
- **Palavras complexas ou raras** são divididas em sub-palavras.
- **Espaços e pontuação** são tratados como tokens separados.

Essa abordagem permite que o modelo lide com um vocabulário virtualmente infinito a partir de um número finito de tokens (geralmente entre 30.000 e 50.000). [1]

### O Limite de Tokens e a Evolução dos Modelos

Cada Codificador de Texto tem um **limite máximo de tokens** que pode processar em um único "bloco". Esse limite tem sido, por muito tempo, uma das principais restrições na engenharia de prompts.

- **Arquiteturas Antigas (por exemplo, Stable Diffusion 1.5, SDXL):**
  Esses modelos usam Codificadores de Texto (CLIP) com um limite de **75 tokens** por bloco. [3] Se um prompt for mais longo, ele é dividido em vários blocos, mas a compreensão do contexto entre um bloco e outro é muito mais fraca. Isso forçou os usuários a concentrarem os conceitos mais importantes no início do prompt.

- **Novas Arquiteturas (por exemplo, FLUX.1):**
  Modelos de nova geração, como o **FLUX.1**, são projetados para superar essa limitação. O FLUX.1 usa um Codificador de Texto muito mais poderoso (baseado no T5-XXL) que foi especificamente treinado para entender prompts longos e complexos nativamente. [2] Isso permite uma expressão muito mais natural e detalhada, sem ter que se preocupar com o limite artificial de 75 tokens.

Entender o conceito de tokens e as limitações de diferentes modelos é fundamental para escrever prompts eficazes e aproveitar ao máximo as capacidades de cada arquitetura.
