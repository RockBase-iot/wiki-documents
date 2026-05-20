---
sidebar_position: 1
---

# NM-CYD-C5

## 产品概述

**NM-CYD-C5** 是一款基于 **ESP32-C5** 的 Cheap Yellow Display 开发板，内置 2.8 英寸 320×240 TFT LCD 电容触摸屏。它与 ESP32-Cheap-Yellow-Display（CYD）的尺寸和接口完全兼容，可实现无缝替换，同时新增了双频 Wi-Fi 6、BLE 5、Zigbee 3.0 和 Thread 支持。

![NM-CYD-C5 彩色外观](/img/products/nm-cyd-c5-color.png)

## 主要特性

- **ESP32-C5-WROOM-1** — RISC-V 32 位 @ 240 MHz
- **16 MB Flash** + **8 MB PSRAM**
- **2.8 英寸 TFT LCD** — 320 × 240 分辨率，ST7789 驱动，电容触摸屏
- **双 USB-C 接口** — 一个用于 ESP32-C5 编程/供电，一个 CH340 UART
- **SD 卡槽** + **RGB LED** + 额外 GPIO 引脚
- **12 针 FPC 连接器** — 方便连接外部模块
- **完全兼容** ESP32-Cheap-Yellow-Display 外形尺寸

## 无线能力

| 协议 | 规格 |
|------|------|
| Wi-Fi | 双频 Wi-Fi 6（802.11ax），2.4 GHz 和 5 GHz |
| 蓝牙 | BLE 5.3 + 经典蓝牙（SPP、HID、GATT） |
| Zigbee | IEEE 802.15.4，Zigbee 3.0 终端设备 |
| Thread | 基于 IPv6 的网状网络（Thread 1.3） |

## 与标准 CYD 对比

| 特性 | 标准 CYD（ESP32） | NM-CYD-C5 |
|------|-------------------|-----------|
| Wi-Fi 频段 | 2.4 GHz | 2.4 + 5 GHz |
| Wi-Fi 标准 | 802.11 b/g/n | 802.11ax（Wi-Fi 6） |
| Zigbee | 不支持 | Zigbee 3.0 |
| Thread | 不支持 | Thread 1.3 |
| Flash | 4 MB | 16 MB |
| PSRAM | 无 | 8 MB |

![对比图](/img/products/compare-cyd-c5.jpg)

## 引脚定义

### SPI 总线（显示、触摸、SD 卡共用）

| 设备 | SCK | MISO | MOSI | CS |
|------|-----|------|------|----|
| 显示屏（ST7789） | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 23 |
| 触摸屏（XPT2046） | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 1 |
| SD 卡 | GPIO 6 | GPIO 2 | GPIO 7 | GPIO 10 |

![引脚图](/img/products/nm-cyd-c5-pinout.jpg)

### LP-UART（P5）— GPS 模块

| 信号 | 引脚 |
|------|------|
| RX | GPIO 4 |
| TX | GPIO 5 |

### I2C 接口（CN1）

| 引脚 1 | 引脚 2 | 引脚 3 | 引脚 4 |
|--------|--------|--------|--------|
| 3.3V | IO 9 | IO 8 | GND |

### 扩展 IO（P1）

| 引脚 1 | 引脚 2 | 引脚 3 | 引脚 4 |
|--------|--------|--------|--------|
| IO 4 | IO 8 | IO 26 | GND |

### 12 针 FPC 连接器（FPC2）

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|----|----|----|
| IO 2 | IO 6 | IO 7 | IO 10 | GND | IO 4 | IO 8 | IO 5 | IO 9 | USB D- | USB D+ | GND |

## 快速开始

### PlatformIO（推荐）

在 `platformio.ini` 中添加：

```ini
[env:nm-cyd-c5]
platform = https://github.com/pioarduino/platform-espressif32/releases/download/55.03.36/platform-espressif32.zip
board = esp32-c5-devkitc-1
framework = arduino
```

### TFT_eSPI 配置

使用 TFT_eSPI 驱动 LCD 时，需将 `TFT_eSPI_ESP32_C5.c/h` 文件添加到 Processors 文件夹，并在 `TFT_eSPI.c/h` 中更新 `CONFIG_IDF_TARGET_ESP32C5`。这些文件可在 [NM-CYD-C5 仓库](https://github.com/RockBase-iot/NM-CYD-C5) 的 `Demos/Arduino/libraries/TFT_eSPI` 目录中找到。

### MicroPython

```bash
esptool.py --chip esp32c5 --port COM3 erase_flash
esptool.py --chip esp32c5 --port COM3 --baud 460800 write_flash -z 0x1000 firmware.bin
mpremote connect COM3 repl
```

## 支持的项目

- [NMMiner](https://github.com/RockBase-iot/NMMiner)
- [Bruce](https://github.com/BruceDevices/firmware)
- [HaleHound-CYD](https://github.com/RockBase-iot/HaleHound-CYD)

![支持的项目](/img/products/esp-claw.png)

## 固件烧录

如果只想快速刷入固件，可使用：
- [NMMiner Web Flasher](https://flash.nmminer.com)
- [NMIoT Web Flasher](https://flash.nmiot.net) — 选择设备类型 `nm-cyd-c5`

## 购买渠道

- [RockBase IoT Aliexpress官方商城](https://www.aliexpress.com/store/1105401362)
- [RockBase Shop](https://rockbase.shop)
- [NMMiner](https://www.nmminer.com)

## 资源下载

- [GitHub 仓库](https://github.com/RockBase-iot/NM-CYD-C5)
- [原理图](https://github.com/RockBase-iot/NM-CYD-C5/tree/main/Documention/2-sch)
- [数据手册](https://github.com/RockBase-iot/NM-CYD-C5/tree/main/Documention/1-datasheet)
