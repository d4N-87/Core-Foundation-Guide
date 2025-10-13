---
title: 'Latenter Raum: Die komprimierte Welt der Bilder'
category: System Anatomy
sources:
  - text: >-
      Original-Paper von Stable Diffusion (Hochauflösende Bildsynthese mit
      latenten Diffusionsmodellen)
    url: 'https://arxiv.org/abs/2112.10752'
  - text: Erklärung des latenten Raums im Hugging Face-Blog
    url: 'https://huggingface.co/blog/stable_diffusion#the-latent-space'
  - text: Illustrierter Artikel über Stable Diffusion
    url: 'https://jalammar.github.io/illustrated-stable-diffusion/'
related:
  - vae
  - unet
  - diffusion_model
---

Der **Latente Raum** ist eine komprimierte und niedrig aufgelöste Darstellung eines Bildes. Es ist eine "Zwischenwelt", in der Diffusionsmodelle wie Stable Diffusion den größten Teil ihrer Arbeit verrichten. [1]

Stellen Sie sich ein hochauflösendes Bild als einen Ordner voller Tausender von Dateien vor. Die Arbeit an jeder einzelnen Datei wäre langsam und teuer. Der latente Raum ist wie eine **ZIP-Datei** dieses Ordners: Er enthält alle wesentlichen Informationen, aber in einem viel kleineren und leichteren Format. [2]

Der Diffusionsprozess (das "Denoising" durch das UNet) findet nicht auf den Pixeln des endgültigen Bildes statt, sondern auf dieser komprimierten Version, der "latenten Darstellung". [3]

### Warum im latenten Raum arbeiten?

Der Grund ist ein einziger: **Effizienz**. [1]
- **Geschwindigkeit:** Die Durchführung des Denoising-Prozesses auf einer kleinen latenten Darstellung (z. B. 64x64) ist **um Größenordnungen schneller** als auf einem Bild in voller Auflösung (z. B. 512x512).
- **Weniger Ressourcen:** Es erfordert viel weniger Speicher (VRAM) und Rechenleistung.

Dies war die Schlüsselinnovation der "Latent Diffusion Models" (LDM), der Modellfamilie, zu der Stable Diffusion gehört. [1] Sie ermöglichten es, leistungsstarke Modelle auf Consumer-Hardware auszuführen.

### Die Rolle des VAE

Wie gelangt man von der Welt der Pixel in die latente Welt und umgekehrt? Hier kommt der **VAE (Variational Autoencoder)** ins Spiel:

1.  **VAE-Encoder:** Bei Verwendung eines Eingangsbildes (img2img) nimmt der Encoder des VAE das Bild in Pixeln und **komprimiert** es in seine latente Darstellung.
2.  **VAE-Decoder:** Am Ende des Denoising-Prozesses nimmt der Decoder des VAE die "saubere" latente Darstellung und **dekomprimiert** sie in das endgültige Bild in Pixeln, das wir sehen. [3]

In ComfyUI erstellt der `Empty Latent Image`-Knoten einen leeren Ausgangspunkt in diesem latenten Raum, der bereit ist, vom UNet verarbeitet zu werden.

Zusammenfassend lässt sich sagen, dass der latente Raum das geniale "Büro" ist, in dem das UNet schnell und effizient arbeitet und dem VAE die Aufgabe überlässt, als "Portier" zwischen diesem Büro und der Außenwelt der Pixel zu fungieren.
