---
sidebar_position: 4
---

# NM-EPD-420

## Overview

The **NM-EPD-420** is an ESP32-S3 based 4.2-inch 3-Color E-ink display development board. It features a tri-color (Black / White / Red) e-paper panel, audio codec(ES8311), environmental sensor(AHT20), RGB LED(WS2812), SD card slot, and LoRa modem (SX126x family, Heltec RA62) — making it ideal for low-power IoT dashboards, outdoor signage, and smart labeling applications.

## Hardware Specifications

### Core

| Item | Specification |
|------|---------------|
| **MCU** | ESP32-S3 (dual-core Xtensa LX7 @ 240 MHz) |
| **Flash** | 16 MB |
| **PSRAM** | 8 MB (QIO OPI) |
| **Wireless** | Wi-Fi 4 (802.11 b/g/n) + Bluetooth 5 LE |

### Display

| Item | Specification |
|------|---------------|
| **Panel** | GDEY042Z98 |
| **Size** | 4.2 inches |
| **Resolution** | 400 × 300 |
| **Colors** | 3-color (Black / White / Red) |
| **Driver** | GxEPD2 |
| **Interface** | SPI (FSPI) |

### Onboard Peripherals

| Block | Part | Interface | Notes |
|-------|------|-----------|-------|
| **Codec** | ES8311 | I2C 0x18 + I2S | DAC → external PA → 4 Ω speaker |
| **Microphone** | LMD4737 PDM DMIC | I2S (DMIC mode) | 16 kHz sample rate |
| **T/RH Sensor** | AHT20 | I2C 0x38 | Power-gated via `PIN_TEMP_CTL` |
| **RGB LED** | WS2812 | RMT | 1 pixel |
| **SD Card** | μSD | SPI (HSPI) | Shared bus with LoRa |
| **LoRa Modem** | SX126x family (Heltec RA62) | SPI (HSPI) | CS / RST / BUSY GPIOs |
| **Buttons** | USER, BOOT | GPIO | Active LOW, external pull-up |
| **Audio Amp** | External Class-D | EN GPIO | Enabled by `PIN_PA_CTRL` HIGH |

## Pinout

### EPD (FSPI)

| Signal | GPIO | Direction |
|--------|------|-----------|
| SCK | 2 | OUT |
| MOSI | 1 | OUT |
| MISO | - | - |
| CS | 3 | OUT |
| DC | 4 | OUT |
| RST | 5 | OUT |
| BUSY | 6 | IN |

### SD + LoRa (HSPI)

| Signal | GPIO | Direction |
|--------|------|-----------|
| SCK | 9 | OUT |
| MOSI | 10 | OUT |
| MISO | 11 | IN |
| SD CS | 7 | OUT |
| LoRa NSS | 8 | OUT |
| LoRa RST | 12 | OUT |
| LoRa BUSY | 13 | IN |
| LoRa DIO1 | 14 | IN |

### I2S (ES8311)

| Signal | GPIO | Direction |
|--------|------|-----------|
| MCLK | 21 | OUT |
| BCLK | 15 | OUT |
| LRCK / WS | 17 | OUT |
| DOUT (ESP→DAC) | 18 | OUT |
| DIN (ADC→ESP) | 16 | IN |

### I2C + Others

| Signal | GPIO | Direction | Notes |
|--------|------|-----------|-------|
| SDA | 39 | I/O | AHT20 + ES8311 shared bus |
| SCL | 38 | OUT | |
| TEMP_CTL | 40 | OUT | AHT20 power gate (HIGH = on) |
| PA_CTRL | 41 | OUT | External amplifier enable |
| USER button | 45 | IN | Active LOW |
| BOOT button | 0 | IN | Active LOW, RTC GPIO |
| WS2812 data | 47 | OUT | RMT |

> Authoritative source: [src/config.h](https://github.com/RockBase-iot/NM-Display-420/blob/main/src/config.h)

## Resources

- [GitHub Repository](https://github.com/RockBase-iot/NM-EPD-420)
- [Factory Test Quick Start](/docs/products/nm-epd-420-quickstart)
- [ESP32-S3 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
