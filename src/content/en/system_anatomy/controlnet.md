---
title: 'ControlNet: Guiding the AI with Images'
category: System Anatomy
sources:
  - text: >-
      Original Paper: Adding Conditional Control to Text-to-Image Diffusion
      Models
    url: 'https://arxiv.org/abs/2302.05543'
  - text: Illustrated guide to ControlNet
    url: >-
      https://www.assemblyai.com/blog/controlnet-explained-a-new-way-to-control-stable-diffusion/
  - text: Official GitHub Repository with the models
    url: 'https://github.com/lllyasviel/ControlNet'
related:
  - checkpoint
  - unet
  - conditioning
---

**ControlNet** is a neural network architecture that allows **conditioning and controlling diffusion models using a visual input**, such as an image or a data map. [1] In simple terms, it is a system that works alongside the main model (the UNet) and provides it with extra "visual guidance", much more precise and direct than a simple text prompt. [2]

Think of the diffusion model as a talented artist to whom you can only give verbal instructions. ControlNet is like giving them a **tracing** or a **preparatory sketch**: the artist will maintain their creativity and style, but will faithfully follow the composition, pose, or structure you have provided. [2]

### The ControlNet Workflow

A typical workflow with ControlNet takes place in two main phases:

1.  **Preprocessing:**
    You start with an input image. This image is processed by a **preprocessor**, an algorithm that extracts a "map" of specific information from it. This map is what will be used as guidance. There are many types of preprocessors, each specialized in a different type of control. [3]

2.  **Applying the ControlNet Model:**
    The generated map is passed to a specific ControlNet model, trained to "understand" that type of map. This ControlNet model works in parallel with the UNet of the main checkpoint, injecting its visual guidance at each step of the denoising process to force the result to respect the map. [1]

### Examples of Common Preprocessors and Models

- **Canny:**
    It is an **edge detection** algorithm. The `Canny` preprocessor takes an image and transforms it into a black and white line drawing, highlighting only the outlines of the objects. [3] It is extremely useful for replicating the exact composition of a photo or drawing.

- **Depth:**
    The `Depth` preprocessor analyzes an image and creates a **depth map**, where the colors (usually from white to black) indicate which objects are closer or farther from the "camera". [3] This allows transferring the 3D layout of a scene to a completely different image.

- **OpenPose:**
    This preprocessor detects the "skeleton" of one or more people in an image, creating a map with the **exact pose** of each figure. It is the definitive tool for controlling the posture and position of the characters.

- **Scribble / Sketch:**
    It allows you to use a simple scribble or a hand-drawn sketch as a guide for the general composition of the image.

ControlNet has opened the door to a level of control and consistency previously unthinkable, becoming an indispensable tool for animation, design, and any application that requires precise and reproducible results.
