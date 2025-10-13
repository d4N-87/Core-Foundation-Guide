---
title: 'Inferenz: Verwendung des trainierten Modells'
category: Fundamentals
sources:
  - text: Was ist Inferenz? - Amazon Web Services
    url: 'https://aws.amazon.com/it/what-is/inference/'
  - text: Inferenz vs. Training - Google Cloud
    url: 'https://cloud.google.com/discover/inference-vs-training?hl=it'
related:
  - rete_neurale
  - deep_learning
  - checkpoint
---

**Inferenz** ist der Prozess der **Verwendung eines bereits trainierten neuronalen Netzes**, um Vorhersagen über neue und nie zuvor gesehene Daten zu treffen. [1]

Wenn das **Training** die "Lernphase" ist, in der das Modell aus Büchern (dem Datensatz) lernt, ist die **Inferenz** die **Abschlussprüfung**, in der es das Gelernte anwenden muss, um neue Fragen zu beantworten. [2]

### Der Inferenzprozess in der Praxis

Wenn wir ein Bild mit Stable Diffusion erzeugen, führen wir einen Inferenzprozess durch:
1.  **Laden des Modells:** Wir nehmen einen Checkpoint (`.safetensors`), der das Ergebnis eines langen und teuren Trainingsprozesses ist.
2.  **Bereitstellen einer Eingabe:** Wir geben dem Modell neue Daten, die es während des Lernens noch nie gesehen hat (unseren Prompt und ein Bild mit zufälligem Rauschen).
3.  **Das Modell "inferiert":** Das neuronale Netz verarbeitet die Eingabe durch seine Schichten, verwendet die gelernten Gewichte und erzeugt eine Ausgabe (die Vorhersage des zu entfernenden Rauschens).
4.  **Wir erhalten eine Ausgabe:** Indem wir diesen Prozess für eine bestimmte Anzahl von "Schritten" wiederholen, erhalten wir das endgültige Bild.

### Inferenz vs. Training

| Merkmal | Training | Inferenz |
| :--- | :--- | :--- |
| **Zweck** | Das Modell lehren, die "Gewichte" erstellen | Das Modell verwenden, um Ergebnisse zu erhalten |
| **Benötigte Ressourcen** | Enorm (viele GPUs, Wochen Zeit) | Mäßig (eine einzelne GPU, Sekunden/Minuten) |
| **Daten** | Großer beschrifteter Datensatz | Einzelne Eingabedaten (z. B. ein Prompt) |
| **Wer macht es?** | Forschungslabore, Unternehmen, die Community | Der Endbenutzer (wir!) |

Zusammenfassend lässt sich sagen, dass wir jedes Mal, wenn wir die Schaltfläche "Generieren" drücken, eine **Inferenz** durchführen.
