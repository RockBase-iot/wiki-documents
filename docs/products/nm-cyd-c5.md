---
sidebar_position: 1
---

# NM-CYD-C5

## Overview

The NM-CYD-C5 is a high-performance core development board based on the **ESP32-C5** chip, designed for IoT and edge AI applications.

## Specifications

| Parameter | Specification |
|-----------|---------------|
| MCU | ESP32-C5 |
| Wi-Fi | 802.11 b/g/n/ax (2.4/5 GHz) |
| Bluetooth | BLE 5.3 |
| RAM | 512 KB SRAM |
| Flash | 8 MB |
| Power | USB-C 5V / 3.3V LDO |
| Dimensions | 25.4 x 50.8 mm |

## Quick Start

### 1. Environment Setup

```bash
pip install esptool
pip install mpremote
```

### 2. Flash Firmware

```bash
esptool.py --chip esp32c5 --port COM3 write_flash -z 0x1000 firmware.bin
```

### 3. MicroPython REPL

```bash
mpremote connect COM3 repl
```

## Pinout

| Pin | Function |
|-----|----------|
| GPIO0 | Boot |
| GPIO1 | UART0 TX |
| GPIO2 | UART0 RX |
| GPIO3 | I2C SDA |
| GPIO4 | I2C SCL |

## Resources

- [Schematic](https://rockbaseiot.com/downloads/nm-cyd-c5-schematic.pdf)
- [Dimension Drawing](https://rockbaseiot.com/downloads/nm-cyd-c5-dimension.pdf)
- [Firmware](https://rockbaseiot.com/downloads/nm-cyd-c5-firmware.bin)
