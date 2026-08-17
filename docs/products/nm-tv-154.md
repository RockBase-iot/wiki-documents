---
sidebar_position: 6
---

# NM-TV-154

## Overview

**NM-TV-154** is a 1.54-inch desktop mini-TV development board based on the **ESP32**, with a high-resolution color TFT display driven by **ST7789**. It integrates a capacitive touch key (T9 / GPIO32) supporting tap and long-press gestures — ideal for creative IoT projects such as desktop weather stations, mini dashboards, and expression companions.

> Repository: [RockBase-iot/NM-TV-154](https://github.com/RockBase-iot/NM-TV-154)

## Hardware Specifications

| Item | Specification |
|------|---------------|
| **MCU** | ESP32 dual-core Xtensa LX6 @ 240 MHz |
| **Display** | 1.54" TFT LCD, 240 × 240 pixels |
| **Display driver** | ST7789, SPI interface |
| **Touch key** | T9 capacitive touch on GPIO32, tap / long-press |
| **Backlight** | GPIO19, 5-level PWM dimming |
| **LCD power** | GPIO21 |
| **Flash** | 4 MB (typical) |
| **Wireless** | Wi-Fi 802.11 b/g/n + Bluetooth 4.2 |
| **Power** | USB-C 5 V or external 3.3 V |

## Pinout

### Display Interface (SPI)

| Signal | GPIO | Description |
|--------|------|-------------|
| SCK | GPIO18 | SPI clock |
| MOSI | GPIO23 | SPI data out |
| DC | GPIO16 | Data / command select |
| CS | GPIO5 | Chip select |
| RST | GPIO17 | Reset |
| BL | GPIO19 | Backlight (PWM dimming) |
| LCD_PWR | GPIO21 | LCD power switch |

### Touch Key

| Function | GPIO | Description |
|----------|------|-------------|
| T9 touch | GPIO32 | Capacitive touch input, tap / long-press detection |

## Getting Started

### PlatformIO Environment

**PlatformIO** is recommended. The repository ships a complete official demo covering:

- Display driver initialization and basic drawing
- Touch key tap / long-press event detection
- GPIO19 backlight with 5-level dimming
- GPIO21 LCD power control

```ini
; platformio.ini example
[env:nm-tv-154]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
```

### Build

```bash
git clone https://github.com/RockBase-iot/NM-TV-154.git
cd NM-TV-154
pio run
pio run --target upload
```

## Firmware Flashing

- Flash online via the **Web Flasher**: [flash.rockbaseiot.com](https://flash.rockbaseiot.com)
- Supported projects: deskbuddy-tv, ESP32-Plane-Radar, and more

## Compatible Projects

| Project | Description |
|---------|-------------|
| [deskbuddy-tv](https://github.com/RockBase-iot/deskbuddy-tv) | Desktop weather / expression companion with 6 interactive pages (animated eyes, clock, weather, forecast, charts, air quality) |
| [ESP32-Plane-Radar](https://github.com/RockBase-iot/ESP32-Plane-Radar) | ADS-B aircraft radar with 5/10/15/25 km range presets |

## Resources

- [GitHub repository](https://github.com/RockBase-iot/NM-TV-154)
- [Hardware notes `docs/HARDWARE.md`](https://github.com/RockBase-iot/NM-TV-154/blob/main/docs/HARDWARE.md)
- [Merged single-image build notes](https://github.com/RockBase-iot/NM-TV-154/blob/main/docs/HARDWARE.md)
- [RockBase Shop](https://rockbase.shop)
