---
title: 'Prompt: Dialogando com a IA'
category: Core Concepts
sources:
  - text: Guia para Prompting na Stable Diffusion Art
    url: 'https://stablediffusionart.com/prompt-guide/'
  - text: Documentação do ComfyUI sobre Codificação de Texto
    url: 'https://comfyanonymous.github.io/ComfyUI_examples/prompt/'
  - text: Explicação do Prompt Negativo
    url: 'https://stable-diffusion-art.com/negative-prompt/'
related:
  - clip
  - tokens
  - cfg
---

O **Prompt** é a instrução textual que você fornece ao modelo para descrever a imagem que deseja criar. É a maneira mais direta de dialogar com a inteligência artificial e guiar sua criatividade. [1]

No ComfyUI, e em muitas outras interfaces, o prompt é dividido em duas partes complementares:

### 1. Prompt Positivo

Aqui você descreve **tudo o que quer ver** na imagem. Não é apenas uma lista de objetos, mas um conjunto de instruções que podem incluir:
- **Assunto:** `um leão majestoso`
- **Estilo:** `no estilo de uma pintura em aquarela`
- **Artista:** `por Van Gogh`
- **Detalhes e Qualidade:** `detalhes intrincados, foco nítido, 4k, iluminação cinematográfica`
- **Composição:** `foto de corpo inteiro, olhando para a câmera`

**Sintaxe para Peso (Atenção):**
Para dar mais importância a uma palavra ou frase, você pode aumentar seu "peso". A sintaxe comum, também usada no ComfyUI, é `(palavra:peso)`. [2]
- `(olhos azuis:1.3)`: Aumenta a importância de "olhos azuis" em 30%.
- `(rosa vermelha:0.8)`: Diminui a importância de "rosa vermelha" em 20%.
- Os parênteses `()` são um atalho para aumentar o peso (geralmente em 1.1), enquanto `[]` são um atalho para diminuí-lo. [1]

### 2. Prompt Negativo

Aqui você descreve **tudo o que quer evitar** na imagem. É uma ferramenta poderosa para corrigir erros comuns e melhorar a qualidade geral. [3]

Exemplos comuns de prompts negativos incluem:
- **Corrigir Deformidades:** `deformado, mutado, desfigurado, membros extras, má anatomia`
- **Melhorar a Qualidade:** `desfocado, granulado, baixa resolução, feio, artefatos jpeg`
- **Remover Elementos Indesejados:** `texto, marca d'água, assinatura, nome de usuário`
- **Excluir Estilos:** `desenho animado, anime, renderização 3d`

Usar um bom prompt negativo é muitas vezes tão importante quanto escrever um bom prompt positivo para obter resultados de alta qualidade. [3]
