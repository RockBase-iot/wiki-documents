---
sidebar_position: 1
---

# NM-CYD-C5

## Overview

The **NM-CYD-C5** is a Cheap Yellow Display development board powered by the **ESP32-C5**, featuring a built-in 2.8" 320×240 TFT LCD with touch screen. It is fully compatible with the dimensions and interfaces of the ESP32-Cheap-Yellow-Display (CYD), enabling seamless replacement while adding dual-band Wi-Fi 6, BLE 5, Zigbee 3.0, and Thread support.

![NM-CYD-C5 Color](/img/products/nm-cyd-c5-color.png)

## Features

- **ESP32-C5-WROOM-1** — RISC-V 32-bit @ 240 MHz
- **16 MB Flash** + **8 MB PSRAM**
- **2.8" TFT LCD** — 320 × 240, ST7789 driver, capacitive touch screen
- **Dual USB-C ports** — one for ESP32-C5 programming/power, one CH340 UART
- **SD Card Slot** + **RGB LED** + additional GPIO pins
- **12-pin FPC connector** for convenient external module connection
- **Fully compatible** with ESP32-Cheap-Yellow-Display form factor

## Wireless Capabilities

| Protocol | Specification |
|----------|---------------|
| Wi-Fi | Dual-band Wi-Fi 6 (802.11ax), 2.4 GHz & 5 GHz |
| Bluetooth | BLE 5.3 + Classic Bluetooth (SPP, HID, GATT) |
| Zigbee | IEEE 802.15.4, Zigbee 3.0 end-device |
| Thread | IPv6-based mesh networking (Thread 1.3) |

## Comparison with Standard CYD

| Feature | Standard CYD (ESP32) | NM-CYD-C5 |
|---------|----------------------|-----------|
| Wi-Fi Band | 2.4 GHz | 2.4 + 5 GHz |
| Wi-Fi Standard | 802.11 b/g/n | 802.11ax (Wi-Fi 6) |
| Zigbee | Not supported | Zigbee 3.0 |
| Thread | Not supported | Thread 1.3 |
| Flash | 4 MB | 16 MB |
| PSRAM | None | 8 MB |

![Comparison](/img/products/compare-cyd-c5.jpg)

## Pinout

### SPI Bus (Shared by Display, Touch, and SD Card)

| Device | SCK | MISO | MOSI | CS |
|--------|-----|------|------|----|
| Display (ST7789) | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 23 |
| Touch (XPT2046) | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 1 |
| SD Card | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 10 |

![Pinout](/img/products/nm-cyd-c5-pinout.jpg)

### LP-UART (P5) — GPS Module

| Signal | Pin |
|--------|-----|
| RX | GPIO 4 |
| TX | GPIO 5 |

### I2C Connector (CN1)

| Pin 1 | Pin 2 | Pin 3 | Pin 4 |
|-------|-------|-------|-------|
| 3.3V | IO 9 | IO 8 | GND |

### Extension IO (P1)

| Pin 1 | Pin 2 | Pin 3 | Pin 4 |
|-------|-------|-------|-------|
| IO 4 | IO 8 | IO 26 | GND |

### 12-Pin FPC Connector (FPC2)

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|----|----|----|
| IO 2 | IO 6 | IO 7 | IO 10 | GND | IO 4 | IO 8 | IO 5 | IO 9 | USB D- | USB D+ | GND |

## Quick Start

### PlatformIO (Recommended)

Add the following to your `platformio.ini`:

```ini
[env:nm-cyd-c5]
platform = https://github.com/pioarduino/platform-espressif32/releases/download/55.03.36/platform-espressif32.zip
board = esp32-c5-devkitc-1
framework = arduino
```

### TFT_eSPI Setup

When using TFT_eSPI with the LCD, add the `TFT_eSPI_ESP32_C5.c/h` files to the Processors folder and update `TFT_eSPI.c/h` with `CONFIG_IDF_TARGET_ESP32C5`. These files can be found in the `Demos/Arduino/libraries/TFT_eSPI` directory of the [NM-CYD-C5 repository](https://github.com/RockBase-iot/NM-CYD-C5).

### MicroPython

```bash
esptool.py --chip esp32c5 --port COM3 erase_flash
esptool.py --chip esp32c5 --port COM3 --baud 460800 write_flash -z 0x1000 firmware.bin
mpremote connect COM3 repl
```

## Supported Projects

- [NMMiner](https://github.com/RockBase-iot/NMMiner)
- [Bruce](https://github.com/BruceDevices/firmware)
- [HaleHound-CYD](https://github.com/RockBase-iot/HaleHound-CYD)

![Supported Projects](/img/products/esp-claw.png)

## Firmware Flashing

If you just want to flash firmware, try:
- [NMMiner Web Flasher](https://nmminer.com)
- [NMIoT Web Flasher](https://nmiot.com) — select device type `nm-cyd-c5`

## Where to Buy

- [RockBase IoT Store](https://www.aliexpress.com/store/1105401362)
- [RockBase Shop](https://rockbase.shop)
- [NMMiner](https://www.nmminer.com)

## Resources

- [GitHub Repository](https://github.com/RockBase-iot/NM-CYD-C5)
- [Schematics](https://github.com/RockBase-iot/NM-CYD-C5/tree/main/Documention/2-sch)
- [Datasheet](https://github.com/RockBase-iot/NM-CYD-C5/tree/main/Documention/1-datasheet)
