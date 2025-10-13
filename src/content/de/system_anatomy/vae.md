---
title: 'VAE: Der visuelle Decoder'
category: System Anatomy
sources:
  - text: 'Original-Paper: Auto-Encoding Variational Bayes'
    url: 'https://arxiv.org/abs/1312.6114'
  - text: Erklärung auf Hugging Face
    url: 'https://huggingface.co/docs/diffusers/main/en/api/models/autoencoderkl'
related:
  - latent_space
  - checkpoint
---

Der **VAE (Variational Autoencoder)** ist der endgültige Decoder Ihres Systems. [1, 2]

Stellen Sie sich vor, das KI-Modell "denkt" nicht in Bildern, sondern in einer abstrakten mathematischen Sprache, einem **latenten Raum**. Es ist wie ein Komponist, der eine Partitur schreibt: Die Partitur ist keine Musik, es sind Symbole auf einem Blatt.

Der VAE ist das Orchester, das diese Partitur liest und sie in die visuelle Symphonie umwandelt, die Sie auf dem Bildschirm sehen. Ohne ihn hätten Sie nur die Partitur (unverständliches Rauschen) und nicht die Musik (das endgültige Bild).

### Wozu dient es konkret?

- **Von Latenz zu Pixeln:** Seine Hauptfunktion besteht darin, die vom Modell erzeugte abstrakte Darstellung (latenter Tensor) in ein reales Bild mit Pixeln und Farben umzuwandeln. [2]
- **Kompression:** Es kann auch das Gegenteil tun, indem es ein vorhandenes Bild in seine latente Darstellung komprimiert (Kodierungsprozess).
