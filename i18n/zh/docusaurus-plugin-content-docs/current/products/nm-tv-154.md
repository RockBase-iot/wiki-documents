---
sidebar_position: 6
---

# NM-TV-154

## 概述

**NM-TV-154** 是一款 1.54 英寸桌面小电视开发板，基于 **ESP32** 主控，搭载 **ST7789** 驱动的高分辨率彩色 TFT 显示屏。集成电容触摸按键（T9 / GPIO32），支持单击与长按手势，适合桌面天气站、迷你仪表盘、表情伴侣等创意 IoT 项目。

> 仓库地址：[RockBase-iot/NM-TV-154](https://github.com/RockBase-iot/NM-TV-154)

## 硬件规格

| 项目 | 规格 |
|------|------|
| **主控** | ESP32 双核 Xtensa LX6 @ 240 MHz |
| **显示屏** | 1.54" TFT LCD，240 × 240 像素 |
| **显示驱动** | ST7789，SPI 接口 |
| **触摸按键** | T9 电容触摸，接 GPIO32，支持单击 / 长按 |
| **背光控制** | GPIO19，支持 5 级 PWM 调光 |
| **LCD 电源** | GPIO21 控制 |
| **Flash** | 4 MB（典型配置） |
| **无线** | Wi-Fi 802.11 b/g/n + Bluetooth 4.2 |
| **供电** | USB-C 5 V 或外部 3.3 V |

## 引脚定义

### 显示屏接口（SPI）

| 信号 | GPIO | 说明 |
|------|------|------|
| SCK | GPIO18 | SPI 时钟 |
| MOSI | GPIO23 | SPI 数据输出 |
| DC | GPIO16 | 数据 / 命令选择 |
| CS | GPIO5 | 片选 |
| RST | GPIO17 | 复位 |
| BL | GPIO19 | 背光控制（PWM 调光） |
| LCD_PWR | GPIO21 | LCD 电源开关 |

### 触摸按键

| 功能 | GPIO | 说明 |
|------|------|------|
| T9 触摸 | GPIO32 | 电容触摸输入，支持单击 / 长按检测 |

## 快速入门

### PlatformIO 开发环境

推荐使用 **PlatformIO** 进行开发。仓库内已提供完整的官方 Demo，包含以下功能示例：

- 显示驱动初始化与基本绘图
- 触摸按键单击 / 长按事件检测
- GPIO19 背光 5 级调光
- GPIO21 LCD 电源控制

```ini
; platformio.ini 示例
[env:nm-tv-154]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
```

### 项目构建

```bash
git clone https://github.com/RockBase-iot/NM-TV-154.git
cd NM-TV-154
pio run
pio run --target upload
```

## 固件烧录

- 可通过 **Web Flasher** 在线烧录：[flash.rockbaseiot.com](https://flash.rockbaseiot.com)
- 支持项目：deskbuddy-tv、ESP32-Plane-Radar 等

## 适用项目

| 项目 | 说明 |
|------|------|
| [deskbuddy-tv](https://github.com/RockBase-iot/deskbuddy-tv) | 桌面天气 / 表情伴侣，6 页面交互（动画眼睛、时钟、天气、预报、曲线、空气质量） |
| [ESP32-Plane-Radar](https://github.com/RockBase-iot/ESP32-Plane-Radar) | ADS-B 航班雷达，支持 5/10/15/25 km 量程切换 |

## 资源

- [GitHub 仓库](https://github.com/RockBase-iot/NM-TV-154)
- [硬件说明 `docs/HARDWARE.md`](https://github.com/RockBase-iot/NM-TV-154/blob/main/docs/HARDWARE.md)
- [整片合并镜像生成说明](https://github.com/RockBase-iot/NM-TV-154/blob/main/docs/HARDWARE.md)
- [RockBase Shop 购买页面](https://rockbase.shop)
