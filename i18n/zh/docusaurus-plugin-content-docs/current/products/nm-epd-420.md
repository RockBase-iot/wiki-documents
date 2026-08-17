---
sidebar_position: 4
---

# NM-EPD-420

## 产品概述

**NM-EPD-420** 是一款基于 ESP32-S3 的 4.2 英寸三色电子墨水屏显示开发板。它配备了三色（黑/白/红）电子纸面板或双色（黑/白）电子纸面板、音频编解码器（ES8311）、环境传感器（AHT20）、RGB LED（WS2812）、SD 卡槽和 LoRa 模组（Heltec RA62） —— 非常适合低功耗物联网仪表盘、户外标识和智能标签等应用场景。

![NM-EPD-420 Dashboard](/img/products/nm-epd-420/esp-dashboard.png) 

## 硬件规格

### 核心

| 项目 | 规格 |
|------|------|
| **MCU** | ESP32-S3 (双核 Xtensa LX7 @ 240 MHz) |
| **Flash** | 16 MB |
| **PSRAM** | 8 MB (QIO OPI) |
| **无线** | Wi-Fi 4 (802.11 b/g/n) + Bluetooth 5 LE |

### 显示屏

| 项目 | 规格 |
|------|------|
| **面板** | GDEY042Z98 三色电子墨水屏（或双色黑白电子墨水屏，GYE042A87），相同的引脚定义 |
| **尺寸** | 4.2 英寸 |
| **分辨率** | 400 × 300 |
| **颜色** | 三色（黑/白/红）或双色（黑/白） |
| **驱动** | GxEPD2 |
| **接口** | SPI (FSPI) |

当前NM-EPD-420支持三色墨水屏（GDEY042Z98）和黑白墨水屏（GYE042A87），两者的刷新性能如下：

- **GDEY042Z98 三色墨水屏**：
  - **SKU： NM-EPD-420**
  - 全刷（黑/白/红）约 10 秒，不支持局部刷新
  - 对于天气站，Dashboard等应用而言，三色墨水屏可以提供更丰富的显示效果，但刷新速度较慢，适合静态内容展示。
  - 默认三色墨水屏版本，NM-EPD-420 版本不支持 LoRa 模块，适合一般的桌面端应用。

- **GYE042A87 黑白墨水屏**：
  - **SKU： NM-EPD-420-BW**
  - 全刷（黑/白）约 2-3 秒，支持局部刷新，局部刷新时间约 1 秒
  - 对于需要快速刷新内容的应用，建议使用黑白墨水屏（GYE042A87）。
  - 因此，NM-EPD-420-BW 版本的开发板适合需要快速刷新内容的应用场景，默认 NM-EPD-420-BW 版本也默认支持了 LoRa 模块，更方便用户应用于室内的桌面端 LoRa 节点。

LoRa版本带有HT-RA62模块（SX1262），可用于Meshtastic、MeshCore等LoRa应用。无LoRa版本不带模块，可用于一般应用。默认NM-EPD-420-BW版本支持LoRa模块，以便相关LoRa应用可以实现较好的屏幕刷新效果。

![NM-EPD-420-LoRa](/img/products/nm-epd-420/nm_epd_420_interfaces_lora.png)

![NM-EPD-420-NoLoRa](/img/products/nm-epd-420/nm_epd_420_interfaces_no_lora.png)

### 板载外设

| 模块 | 型号 | 接口 | 说明 |
|------|------|------|------|
| **编解码器** | ES8311 | I2C 0x18 + I2S | DAC → 外部功放 → 8 Ω 扬声器 |
| **麦克风** | LMD4737 PDM DMIC | I2S (DMIC 模式) | 采样率 16 kHz |
| **温湿度传感器** | AHT20 | I2C 0x38 | 通过 `PIN_TEMP_CTL` 控制供电 |
| **RGB LED** | WS2812 | RMT | 1 颗 |
| **SD 卡** | μSD | SPI (HSPI) | 与 LoRa 共享总线 |
| **LoRa 模组** | SX126x 系列 | SPI (HSPI) | CS / RST / BUSY GPIO |
| **按键** | USER, BOOT | GPIO | 低电平有效，外部上拉 |
| **音频功放** | 外置 D 类 | EN GPIO | `PIN_PA_CTRL` 高电平使能 |

## 引脚定义

### EPD (FSPI)

| 信号 | GPIO | 方向 |
|------|------|------|
| SCK | 2 | 输出 |
| MOSI | 1 | 输出 |
| MISO | -- | -- |
| CS | 46 | 输出 |
| DC | 4 | 输出 |
| RST | 5 | 输出 |
| BUSY | 6 | 输入 |

### SD + LoRa (HSPI)

| 信号 | GPIO | 方向 |
|------|------|------|
| SCK | 9 | 输出 |
| MOSI | 10 | 输出 |
| MISO | 11 | 输入 |
| SD CS | 7 | 输出 |
| LoRa NSS | 8 | 输出 |
| LoRa RST | 12 | 输出 |
| LoRa BUSY | 13 | 输入 |
| LoRa DIO1 | 14 | 输入 |

### I2S (ES8311)

| 信号 | GPIO | 方向 |
|------|------|------|
| MCLK | 21 | 输出 |
| BCLK | 15 | 输出 |
| LRCK / WS | 17 | 输出 |
| DOUT (ESP→DAC) | 18 | 输出 |
| DIN (ADC→ESP) | 16 | 输入 |

### I2C + 其他

| 信号 | GPIO | 方向 | 说明 |
|------|------|------|------|
| SDA | 39 | 双向 | AHT20 + ES8311 共享总线 |
| SCL | 38 | 输出 | |
| TEMP_CTL | 40 | 输出 | AHT20 供电控制（高电平开启） |
| PA_CTRL | 41 | 输出 | 外部功放使能 |
| USER 按键 | 45 | 输入 | 低电平有效 |
| BOOT 按键 | 0 | 输入 | 低电平有效，RTC GPIO |
| LoRa EN | 47 | 输出 | LoRa模块上电使能，高有效 |
| Codec EN | 44 | 输出 | 音频编解码器上电使能，高有效 |
| ADC EN | 43 | 输出 | ADC 模块上电使能，高有效 |
| BATT_ADC | 3 | 输入 | 电池分压采样输入 |

> 权威来源：[src/config.h](https://github.com/RockBase-iot/NM-Display-420/blob/main/src/config.h)

## 资源

- [GitHub 仓库](https://github.com/RockBase-iot/NM-EPD-420)
- [工厂测试快速入门](/docs/products/nm-epd-420-quickstart)
- [ESP32-S3 数据手册](https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
