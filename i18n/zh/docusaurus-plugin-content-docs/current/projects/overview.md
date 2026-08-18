---
sidebar_position: 1
title: 项目案例总览
description: RockBase IoT 开源固件与应用项目案例索引
---

# 项目案例总览

本栏目收录 RockBase IoT 官方适配、移植或合作开发的开源固件与应用项目。每个案例均可直接烧录到对应的 RockBase / NMTech 硬件上运行，大部分固件已上架 [RockBase IoT Web Flasher](https://flash.rockbaseiot.com)，可在浏览器中一键烧录。

## 按硬件平台索引

### NM-TV-154（1.54" 桌面小电视）

| 项目 | 类型 | 说明 |
|------|------|------|
| [DeskBuddy-TV](./deskbuddy-tv.md) | 桌面伴侣 | 天气 / 表情 / 时钟六页桌面摆件 |
| [ESP32-Plane-Radar](./esp32-plane-radar.md) | ADS-B 雷达 | 实时航班雷达，官方新增 NM-TV-154 支持 |

### NM-EPD-420（4.2" 墨水屏开发板）

| 项目 | 类型 | 说明 |
|------|------|------|
| [Meshtastic / MeshCore / TRMNL 移植生态](./nm-epd-420-ecosystem.md) | LoRa / 内容框架 | 六大开源项目官方移植分支 |
| [Biscuit](./biscuit.md) | 多功能固件 | 阅读器变身全能智能设备，含 NM-EPD-420 双键移植 |

### 墨水屏仪表盘与气象站

| 项目 | 类型 | 说明 |
|------|------|------|
| [ESP32-Dashboard](./esp32-dashboard.md) | 桌面仪表盘 | 免 API Key 的多页面仪表盘（天气/时间轴/世界时钟/专注时钟） |
| [ESP32-Weather-EPD](./esp32-weather-epd.md) | 气象站 | 超低功耗气象站，支持 7.5" 与 4.2" 三色面板，续航 6–12 个月 |

### Hardware Buddy 桌面伴侣

| 项目 | 说明 |
|------|------|
| [Buddy Bridge App / Claude Desktop Buddy](./hardware-buddy.md) | USB 串口桌面伴侣 App 与 Claude 蓝牙 API 示例 |

### ESP-Claw 边缘 AI Agent

| 项目 | 说明 |
|------|------|
| [NM-CYD-C5 ESP-Claw](./esp-claw-nm-cyd-c5.md) | 掌心里的边缘 AI Agent：ESP32-C5 + Chat Coding，IM 对话生成 Lua 脚本 |
| [NM-Display-2.8 ESP-Claw](./esp-claw-nm-display-28inch.md) | 多模态边缘 AI Agent：触摸、IMU、音频编解码、电池管理 |
| [ESP-Claw × Meshtastic 对接指南](./esp-claw-meshtastic-guide.md) | UART 桥接 Meshtastic 节点，实现离网 Mesh 消息互通 |

### 部署指南

| 文档 | 说明 |
|------|------|
| [NM-EPD-420 部署 ESP32-Dashboard](./esp32-dashboard-nm-epd-420.md) | 在 NM-EPD-420 上部署 4.2" 三色墨水屏仪表盘的完整步骤 |

## 其他值得关注的项目

- **[ESPWebApps](https://github.com/RockBase-iot/ESPWebApps)** — Web Flasher 固件聚合仓，社区可通过 fork + PR 提交新固件
- **[esp-claw](https://github.com/RockBase-iot/esp-claw)** `nm-cyd-c5` 分支 — 乐鑫 Chat Coding AI Agent 框架，内置 nmminer 设备管理技能（站内教程见上方 ESP-Claw 分组）

:::tip 烧录方式
以上项目中标注支持 Web Flasher 的固件，均可在 [flash.rockbaseiot.com](https://flash.rockbaseiot.com) 中通过 Chrome / Edge 浏览器直接烧录，无需安装任何开发环境。
:::
