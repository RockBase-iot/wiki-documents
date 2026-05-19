---
sidebar_position: 1
---

# NM-CYD-C5

## 产品概述

NM-CYD-C5 是基于 **ESP32-C5** 芯片的高性能核心开发板，专为物联网与边缘 AI 应用设计。

## 规格参数

| 参数 | 规格 |
|------|------|
| 主控芯片 | ESP32-C5 |
| Wi-Fi | 802.11 b/g/n/ax (2.4/5 GHz) |
| 蓝牙 | BLE 5.3 |
| 内存 | 512 KB SRAM |
| 存储 | 8 MB Flash |
| 供电 | USB-C 5V / 3.3V LDO |
| 尺寸 | 25.4 × 50.8 mm |

## 快速入门

### 1. 环境准备

```bash
pip install esptool
pip install mpremote
```

### 2. 固件烧录

```bash
esptool.py --chip esp32c5 --port COM3 write_flash -z 0x1000 firmware.bin
```

### 3. MicroPython REPL

```bash
mpremote connect COM3 repl
```

## 引脚定义

| 引脚 | 功能 |
|------|------|
| GPIO0 | Boot |
| GPIO1 | UART0 TX |
| GPIO2 | UART0 RX |
| GPIO3 | I2C SDA |
| GPIO4 | I2C SCL |

## 资源下载

- [原理图](https://rockbaseiot.com/downloads/nm-cyd-c5-schematic.pdf)
- [尺寸图](https://rockbaseiot.com/downloads/nm-cyd-c5-dimension.pdf)
- [固件](https://rockbaseiot.com/downloads/nm-cyd-c5-firmware.bin)
