---
sidebar_position: 7
---

# K230-Vision

## Overview

**K230-Vision** is RockBase IoT's AI vision module, built on Canaan's next-generation **K230** dual-core RISC-V processor with up to **6 TOPS** equivalent AI compute (13.7× the K210). The module runs a **Linux + RT-Smart dual system** and supports **CanMV / MicroPython** development, enabling multimodal AI applications including visual recognition, speech processing, and image understanding.

K230-Vision comes in **Standard** and **Deluxe** editions; the Deluxe edition integrates a 3.5-inch capacitive touchscreen and works out of the box. Its serial port connects directly to mainstream platforms such as ESP32, STM32, Raspberry Pi, and Jetson.

> Repository: [RockBase-iot/K230-Vision](https://github.com/RockBase-iot/K230-Vision)

## Hardware Specifications

| Item | Specification |
|------|---------------|
| **SoC** | Canaan K230 dual-core RISC-V |
| **AI compute** | 6 TOPS equivalent (13.7× K210) |
| **Memory** | 1 GB LPDDR4 (2 GB optional) |
| **Storage** | SD card expansion |
| **OS** | Linux + RT-Smart dual system |
| **Development** | CanMV, MicroPython, C/C++ SDK |
| **Camera** | DVP / MIPI interfaces, multi-channel input |
| **Display** | Deluxe: 3.5" capacitive touchscreen (Standard: none) |
| **Serial** | UART / USB; pairs with ESP32 / STM32 / Raspberry Pi / Jetson |
| **Network** | Ethernet (Wi-Fi 6 module / 4G expansion) |
| **Power** | USB-C 5 V or DC 5 V input |

## Edition Comparison

| Feature | Standard | Deluxe |
|---------|----------|--------|
| **K230 processor** | ✓ | ✓ |
| **1 GB LPDDR4** | ✓ | ✓ (2 GB optional) |
| **3.5" capacitive touchscreen** | — | ✓ |
| **Out-of-box AI demos** | Basic visual recognition | Multimodal interaction (vision + speech + touch) |
| **Best for** | Embedded vision nodes, industrial inspection | HMI terminals, teaching demos, edge-AI gateways |

## Interfaces

### Serial Connection

K230-Vision communicates with an external host over UART. Typical wiring:

| K230 pin | External host (e.g. ESP32) | Description |
|----------|---------------------------|-------------|
| TX | RX (e.g. GPIO3) | K230 data out |
| RX | TX (e.g. GPIO1) | K230 data in |
| GND | GND | Common ground |
| 3.3V | 3.3V | Level reference (optional) |

:::tip
The K230-Vision serial port uses 3.3 V TTL levels and connects directly to 3.3 V devices such as ESP32, STM32, and Raspberry Pi.
:::

### Camera Interface

- Supports DVP parallel cameras and MIPI CSI cameras
- Recommended resolutions: 640 × 480, 1280 × 720, 1920 × 1080
- Multi-channel camera input (Deluxe edition can run vision + touch interaction simultaneously)

## Development

### CanMV

CanMV is a MicroPython-based development framework for the K230 with rich AI model APIs:

```python
# CanMV example: face detection
from machine import FPIOA
from media.sensor import SENSOR
import KPU as kpu

sensor = SENSOR()
sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QVGA)

task = kpu.load(0x300000)  # load face-detection model

while True:
    img = sensor.snapshot()
    code = kpu.run_yolo2(task, img)
    if code:
        for i in code:
            img.draw_rectangle(i.rect())
```

### MicroPython

K230-Vision supports standard MicroPython syntax plus K230-specific hardware modules:

```python
# UART example
from machine import UART

uart = UART(1, baudrate=115200, tx=2, rx=3)
uart.write(b'Hello from K230!')
```

## AI Capabilities

| Capability | Description | Typical applications |
|------------|-------------|---------------------|
| **Visual recognition** | Face detection, object classification, pose estimation | Security monitoring, industrial QC |
| **Speech processing** | Keyword wakeup, ASR, TTS | Smart speakers, voice assistants |
| **Image understanding** | Image captioning, scene analysis, OCR | Document digitization, driver assistance |
| **Edge inference** | 6 TOPS local compute, no cloud needed | Offline AI, data-privacy protection |

## Getting Started

### 1. Preparation

| Item | Qty |
|------|-----|
| K230-Vision module | ×1 |
| USB-C data cable | ×1 |
| Micro-SD card (≥16 GB) | ×1 |
| (Optional) camera module | ×1 |

### 2. Flash the System Image

1. Download the latest system image from [K230-Vision Releases](https://github.com/RockBase-iot/K230-Vision/releases)
2. Write the image to the SD card with **balenaEtcher** or **Rufus**
3. Insert the SD card and power on

### 3. Connect the Serial Console

```bash
# Linux/macOS
screen /dev/ttyUSB0 115200

# Windows (PuTTY or MobaXterm)
# Select the corresponding COM port, baud rate 115200
```

### 4. Run Your First AI Demo

```bash
# Enter the CanMV environment after login
canmv

# Run the built-in face-detection demo
exec(open('/app/face_detection.py').read())
```

## Resources

- [GitHub repository](https://github.com/RockBase-iot/K230-Vision)
- [CanMV development docs](https://github.com/RockBase-iot/canmv_k230)
- [Canaan K230 official docs](https://github.com/kendryte/k230_docs)
- [RockBase Shop](https://rockbase.shop)

:::note
K230-Vision is RockBase IoT's latest AI vision platform — documentation and examples are continuously updated. Watch the GitHub repository for the latest news.
:::
