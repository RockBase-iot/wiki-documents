---
sidebar_position: 1
---

# Getting Started

## Development Environment

RockBase IoT hardware is primarily based on the **ESP32** series, supporting three development methods: **MicroPython**, **Arduino**, and **ESP-IDF**.

## MicroPython (Recommended)

### 1. Install Toolchain

```bash
# Python environment
pip install esptool mpremote

# Or install Thonny IDE (GUI)
# https://thonny.org/
```

### 2. Download Firmware

Visit the [MicroPython website](https://micropython.org/download/) to download firmware for your chip:

| Chip | Firmware |
|------|----------|
| ESP32 | ESP32_GENERIC |
| ESP32-C3 | ESP32_GENERIC_C3 |
| ESP32-C5 | ESP32_GENERIC_C5 |
| ESP32-S3 | ESP32_GENERIC_S3 |

### 3. Flash Firmware

```bash
# Erase Flash
esptool.py --chip esp32 --port COM3 erase_flash

# Flash firmware
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 firmware.bin
```

### 4. REPL Interaction

```bash
mpremote connect COM3 repl
```

Common shortcuts:
- `Ctrl+A` — Enter raw mode
- `Ctrl+B` — Exit raw mode
- `Ctrl+C` — Interrupt execution
- `Ctrl+D` — Soft reset

## Arduino

### 1. Install Arduino IDE

Download and install [Arduino IDE 2.x](https://www.arduino.cc/en/software).

### 2. Add ESP32 Board Manager URL

In **File -> Preferences -> Additional Board Manager URLs**, add:

```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

### 3. Install ESP32 Core

Go to **Tools -> Board -> Board Manager**, search for `esp32`, and install.

### 4. Select Board

Go to **Tools -> Board -> ESP32 Arduino -> Your Model**.

## ESP-IDF

For scenarios requiring full hardware control and high performance.

```bash
# Clone ESP-IDF
git clone -b v5.2 --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
./install.sh esp32
cd ../your-project
idf.py set-target esp32
idf.py build flash monitor
```

## FAQ

### Q: "Failed to connect to ESP32" when flashing

A: Hold the **BOOT** button, then press the **RST** button to enter download mode.

### Q: MicroPython reports insufficient memory

A: Use `gc.collect()` to manually trigger garbage collection, or optimize your code to reduce global variables.

### Q: Unstable Wi-Fi connection

A: Check power supply stability. It is recommended to use a dedicated 3.3V LDO and avoid insufficient USB power.
