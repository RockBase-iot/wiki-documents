---
sidebar_position: 3
---

# NM-Display-2.8

## 产品概述

NM-Display-2.8 是一款 2.8 英寸 IPS 触控显示屏，分辨率为 320x240，支持电容多点触控，适用于嵌入式 GUI 开发与交互式物联网终端。

## 规格参数

| 参数 | 规格 |
|------|------|
| 尺寸 | 2.8 英寸 |
| 分辨率 | 320 x 240 (QVGA) |
| 面板类型 | IPS |
| 触控 | 电容式 5 点触控 |
| 驱动芯片 | ILI9341 + FT6236 |
| 接口 | SPI + I2C |
| 工作电压 | 3.3V |
| 尺寸 | 50 x 85 mm |

## 快速开始

### 接线

| 显示屏 | 主控 |
|--------|------|
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

### MicroPython 示例

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

## GUI 框架支持

- [LVGL](https://lvgl.io/) - 开源嵌入式 GUI 库
- [MicroPython-lvgl](https://github.com/lvgl/lv_binding_micropython)
