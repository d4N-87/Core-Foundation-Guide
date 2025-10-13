---
title: 'Ponto de Verificação: O Cérebro do Modelo'
category: System Anatomy
sources:
  - text: O que são Modelos de Stable Diffusion? - Stable Diffusion Art
    url: 'https://stablediffusionart.com/models/'
  - text: Explicação dos formatos .ckpt e .safetensors - Hugging Face
    url: 'https://huggingface.co/docs/safetensors/index'
  - text: Guia para diferentes tipos de modelos de IA
    url: 'https://civitai.com/articles/8/a-guide-to-the-different-ai-model-types'
  - text: Introdução aos Modelos Destilados (SDXL Turbo)
    url: 'https://stability.ai/news/sdxl-turbo'
related:
  - unet
  - clip
  - vae
  - lora
---

O termo **Ponto de Verificação** (ou *Modelo*) refere-se aos arquivos que contêm os "pesos" da rede neural, ou seja, o **cérebro treinado** da inteligência artificial. [1] Carregar um ponto de verificação é o primeiro passo de qualquer fluxo de trabalho, mas a maneira como isso é feito reflete duas abordagens principais: monolítica e modular.

### 1. A Abordagem Monolítica (Tradicional)

Nesta abordagem, um único arquivo de ponto de verificação (com extensão `.ckpt` ou `.safetensors`) contém todos os três componentes principais necessários para a geração: [3]
- A **UNet**, o coração do modelo de difusão.
- O **Codificador de Texto** (CLIP), para interpretar o prompt.
- O **VAE**, para criar a imagem final.

Este método é simples e direto: você carrega um arquivo e tem tudo o que precisa. É muito comum para modelos baseados no Stable Diffusion 1.5.

### 2. A Abordagem Modular (Moderna)

Com o advento de modelos mais complexos como o FLUX.1 e a flexibilidade de interfaces como o ComfyUI, tornou-se comum carregar os componentes separadamente. Neste cenário, você não carrega um único "ponto de verificação", mas suas partes constituintes:
- Um arquivo para a **UNet** (muitas vezes chamado de "modelo base" ou "modelo de difusão").
- Um ou mais arquivos para o **Codificador de Texto CLIP** (o FLUX.1 usa até dois).
- Um arquivo para o **VAE**.

Esta abordagem oferece uma flexibilidade enorme: você pode, por exemplo, usar a UNet de um modelo com o VAE de outro para corrigir problemas de cor, ou experimentar com diferentes Codificadores de Texto. [1]

**Então, ainda faz sentido falar em Pontos de Verificação?**
Sim. O termo "ponto de verificação" ainda é comumente usado na comunidade para se referir ao arquivo principal do modelo, especialmente a **UNet**. Quando você baixa um modelo "ajustado" do Civitai, está baixando principalmente uma UNet modificada, que pode ser usada tanto de forma monolítica (se contiver tudo) quanto modular, combinando-a com o CLIP e o VAE de sua escolha.

### A Hierarquia dos Modelos

Podemos classificar os modelos em uma espécie de hierarquia:

1.  **Modelos Base:**
    São as fundações. Lançados por laboratórios de pesquisa (por exemplo, Stability AI, Black Forest Labs), são treinados em enormes conjuntos de dados genéricos. São muito poderosos, mas muitas vezes não têm um estilo artístico definido. Exemplos: `Stable Diffusion 1.5`, `SDXL Base`. [3]

2.  **Modelos Ajustados:**
    São modelos base que a comunidade treinou ainda mais em conjuntos de dados menores e mais específicos para obter um estilo particular (por exemplo, fotorrealismo, anime, fantasia). A grande maioria dos modelos em sites como o Civitai se enquadra nesta categoria. [1, 3]

3.  **Modelos Personalizados (Mesclagem):**
    Estes não são treinados, mas criados **misturando os pesos** de dois ou mais modelos ajustados. É uma técnica muito popular para combinar os estilos de diferentes modelos e criar um novo e único. É mais uma arte do que uma ciência, e os resultados podem variar. [3]

4.  **Modelos Destilados:**
    São uma categoria especial. Um modelo "destilado" é uma versão menor e mais rápida de um modelo base, criada com um processo de treinamento que "destila" o conhecimento do modelo maior. O exemplo mais famoso é o **SDXL Turbo**, que pode gerar imagens de alta qualidade em pouquíssimos passos (1-4), ao custo de menor flexibilidade. [4] Ou até mesmo versões como o FLUX.1 Dev destilado do Pro.

### Formatos: `.ckpt` vs. `.safetensors`

Independentemente da abordagem, os arquivos são distribuídos em dois formatos:

- **`.ckpt` (Ponto de Verificação):** O formato original baseado no "pickle" do Python. Potencialmente inseguro, pois pode conter código executável. [2]
- **`.safetensors` (Tensores Seguros):** O novo padrão, mais seguro e rápido de carregar, que contém apenas os dados do modelo. [2] **É sempre recomendável preferir o formato `.safetensors` quando disponível.**
