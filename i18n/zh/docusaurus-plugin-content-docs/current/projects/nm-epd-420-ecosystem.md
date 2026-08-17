---
sidebar_position: 4
title: NM-EPD-420 移植生态
description: Meshtastic、MeshCore、TRMNL 等六大开源项目的 NM-EPD-420 官方移植
---

# NM-EPD-420 移植生态

[NM-EPD-420](../products/nm-epd-420.md)（ESP32-S3 + 4.2" 墨水屏）已被官方移植到六大开源项目。克隆对应分支即可直接编译烧录，相关应用固件也已上架 [RockBase IoT Web Flasher](https://flash.rockbaseiot.com)。

## 已移植项目一览

| 项目 | 说明 | 适配仓库 / 分支 |
|------|------|----------------|
| **Meshtastic** | 离网 LoRa 网状通信；在 4.2" 墨水屏上显示节点信息、消息与传感器数据（HT-RA62 模组，SX1262） | [meshtastic-firmware@`nm-epd-420`](https://github.com/RockBase-iot/meshtastic-firmware/tree/nm-epd-420) |
| **MeshCore** | 轻量级、低功耗 LoRa 网关固件 | [RockBase-iot/MeshCore](https://github.com/RockBase-iot/MeshCore) |
| **TRMNL-Firmware** | TRMNL 墨水屏内容框架；按计划从服务器拉取图片/内容 | [trmnl-firmware@`nm-epd-420`](https://github.com/RockBase-iot/trmnl-firmware/tree/nm-epd-420) |
| **Biscuit** | 墨水屏多功能工具 / 娱乐固件 | [biscuit@`master`](https://github.com/RockBase-iot/biscuit/tree/master) |
| **ESP32-weather-epd** | 低功耗气象站；从 OpenWeatherMap 获取数据并显示 | [esp32-weather-epd@`main`](https://github.com/RockBase-iot/esp32-weather-epd/tree/main) |
| **ESP32-Dashboard** | 多功能墨水屏仪表盘：天气、空气质量、室内温湿度、Web 配置门户 | [ESP32-Dashboard@`main`](https://github.com/RockBase-iot/ESP32-Dashboard/tree/main) |

## Meshtastic 终端

Meshtastic 是流行的离网 LoRa Mesh 通信项目。NM-EPD-420 的 `nm-epd-420` 分支将节点信息、消息与传感器数据呈现在 4.2 英寸墨水屏上，配合板载 SX126x 扩展座（HT-RA62 模组）即可组成一台桌面 LoRa 通信终端。

:::info LoRa 支持说明
标准三色版 NM-EPD-420 默认不含 LoRa 模组，面向一般桌面应用；**黑白版 NM-EPD-420-BW 默认包含 LoRa 支持**，适合作为室内桌面 LoRa 节点。
:::

## MeshCore 网关

MeshCore 是一种轻量级混合路由的 Mesh 分组无线协议，NM-EPD-420 可作为其低功耗 LoRa 网关节点运行，适合需要长期离网部署的场景（可搭配 [NM-Solar](../products/nm-solar.md) 太阳能供电）。

## TRMNL 内容框架

TRMNL 是一套"服务器定时下发图片/内容 → 墨水屏展示"的框架。移植分支让你可以把 NM-EPD-420 当作 TRMNL 兼容设备，接入自建或第三方内容源。

## Biscuit {#biscuit}

Biscuit 是面向墨水屏设备的多功能工具/娱乐固件，已完整适配 NM-EPD-420 的屏幕与外设（含双键操作模型与三色/黑白两种构建变体），适合作为电子阅读器与桌面小工具平台。详见 [Biscuit 项目介绍](./biscuit.md)。

## 气象站与仪表盘

- **[ESP32-Weather-EPD](./esp32-weather-epd.md)**：经典低功耗墨水屏气象站，从 OpenWeatherMap 拉取数据
- **[ESP32-Dashboard](./esp32-dashboard.md)**：功能更全的墨水屏仪表盘，免 API Key（Open-Meteo），内置 Web 配置门户，支持天气、空气质量与室内温湿度同屏显示

:::tip 选择建议
内容以静态展示为主（天气、日历、信息牌）选**三色版**；需要更快刷新（消息通知、Mesh 节点状态）选支持局部刷新的**黑白版（BW）**。
:::
