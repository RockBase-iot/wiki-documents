---
sidebar_position: 4
---

# NM-EPD-420

## Overview

The **NM-EPD-420** is an ESP32-S3 based 4.2-inch e-ink display development board. It is available with either a tri-color (Black / White / Red) e-paper panel or a dual-color (Black / White) e-paper panel, and features an audio codec (ES8311), environmental sensor (AHT20), RGB LED (WS2812), SD card slot, and optional LoRa modem (SX126x family) — making it ideal for low-power IoT dashboards, outdoor signage, and smart labeling applications.

![NM-EPD-420 Dashboard](/img/products/nm-epd-420/esp-dashboard.png)

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
| **Panel** | GDEY042Z98 tri-color e-paper (or GYE042A87 black/white e-paper), same pinout |
| **Size** | 4.2 inches |
| **Resolution** | 400 × 300 |
| **Colors** | 3-color (Black / White / Red) or 2-color (Black / White) |
| **Driver** | GxEPD2 |
| **Interface** | SPI (FSPI) |

The NM-EPD-420 currently supports both the tri-color panel (GDEY042Z98) and the black/white panel (GYE042A87). Their refresh performance differs as follows:

- **GDEY042Z98 Tri-color E-Paper**:
  - **SKU: NM-EPD-420**
  - Full refresh (Black / White / Red) takes about 10 seconds; partial refresh is not supported.
  - For weather stations, dashboards, and similar applications, the tri-color panel provides richer visual effects but slower refresh speeds, making it suitable for static content display.
  - The default tri-color version does not include a LoRa module and is ideal for general desktop applications.

- **GYE042A87 Black/White E-Paper**:
  - **SKU: NM-EPD-420-BW**
  - Full refresh (Black / White) takes about 2–3 seconds; partial refresh is supported, with partial refresh time around 1 second.
  - For applications requiring faster content updates, the black/white panel (GYE042A87) is recommended.
  - The NM-EPD-420-BW version supports a LoRa module by default, making it more convenient for indoor desktop LoRa node applications.

The LoRa version includes an HT-RA62 module (SX1262) for Meshtastic, MeshCore, and other LoRa applications. The non-LoRa version omits the module for general applications. The default NM-EPD-420-BW version supports LoRa to provide better screen refresh performance for relevant LoRa applications.

![NM-EPD-420-LoRa](/img/products/nm-epd-420/nm_epd_420_interfaces_lora.png)

![NM-EPD-420-NoLoRa](/img/products/nm-epd-420/nm_epd_420_interfaces_no_lora.png)

### Onboard Peripherals

| Block | Part | Interface | Notes |
|-------|------|-----------|-------|
| **Codec** | ES8311 | I2C 0x18 + I2S | DAC → external PA → 8 Ω speaker |
| **Microphone** | LMD4737 PDM DMIC | I2S (DMIC mode) | 16 kHz sample rate |
| **T/RH Sensor** | AHT20 | I2C 0x38 | Power-gated via `PIN_TEMP_CTL` |
| **RGB LED** | WS2812 | RMT | 1 pixel |
| **SD Card** | μSD | SPI (HSPI) | Shared bus with LoRa |
| **LoRa Modem** | SX126x family | SPI (HSPI) | CS / RST / BUSY GPIOs |
| **Buttons** | USER, BOOT | GPIO | Active LOW, external pull-up |
| **Audio Amp** | External Class-D | EN GPIO | Enabled by `PIN_PA_CTRL` HIGH |

## Pinout

### EPD (FSPI)

| Signal | GPIO | Direction |
|--------|------|-----------|
| SCK | 2 | OUT |
| MOSI | 1 | OUT |
| MISO | - | - |
| CS | 46 | OUT |
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
| LoRa EN | 47 | OUT | LoRa module power enable, active HIGH |
| Codec EN | 44 | OUT | Audio codec power enable, active HIGH |
| ADC EN | 43 | OUT | ADC module power enable, active HIGH |
| BATT_ADC | 3 | IN | Battery voltage divider sampling input |

> Authoritative source: [src/config.h](https://github.com/RockBase-iot/NM-Display-420/blob/main/src/config.h)

## Resources

- [GitHub Repository](https://github.com/RockBase-iot/NM-EPD-420)
- [Factory Test Quick Start](/docs/products/nm-epd-420-quickstart)
- [ESP32-S3 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
