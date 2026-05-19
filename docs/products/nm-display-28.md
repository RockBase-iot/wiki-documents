---
sidebar_position: 3
---

# NM-Display-2.8

## Overview

The NM-Display-2.8 is a 2.8-inch IPS touch display with a resolution of 320x240, supporting capacitive multi-touch. It is ideal for embedded GUI development and interactive IoT terminals.

## Specifications

| Parameter | Specification |
|-----------|---------------|
| Size | 2.8 inches |
| Resolution | 320 x 240 (QVGA) |
| Panel Type | IPS |
| Touch | Capacitive 5-point multi-touch |
| Driver IC | ILI9341 + FT6236 |
| Interface | SPI + I2C |
| Voltage | 3.3V |
| Dimensions | 50 x 85 mm |

## Quick Start

### Wiring

| Display | Host |
|---------|------|
| VCC | 3.3V |
| GND | GND |
| SCK | GPIO14 |
| MOSI | GPIO13 |
| MISO | GPIO12 |
| CS | GPIO5 |
| DC | GPIO18 |
| RST | GPIO19 |
| SDA | GPIO21 |
| SCL | GPIO22 |

### MicroPython Example

```python
from machine import Pin, SPI, I2C
import ili9341
import ft6236

spi = SPI(1, baudrate=40000000, sck=Pin(14), mosi=Pin(13), miso=Pin(12))
display = ili9341.ILI9341(spi, cs=Pin(5), dc=Pin(18), rst=Pin(19))
display.fill(ili9341.color565(0x25, 0x2F, 0x38))
display.text("RockBase IoT", 80, 110, ili9341.color565(0x00, 0x94, 0x94))

i2c = I2C(0, scl=Pin(22), sda=Pin(21))
ts = ft6236.FT6236(i2c)
```

## GUI Framework Support

- [LVGL](https://lvgl.io/) — Open-source embedded GUI library
- [MicroPython-lvgl](https://github.com/lvgl/lv_binding_micropython)
