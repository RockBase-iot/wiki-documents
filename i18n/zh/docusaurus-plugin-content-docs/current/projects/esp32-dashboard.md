---
sidebar_position: 5
title: ESP32-Dashboard 墨水屏仪表盘
description: 免 API Key 的多页面墨水屏仪表盘固件（天气 / 时间轴 / 世界时钟 / 专注时钟）
---

# ESP32-Dashboard 墨水屏仪表盘

**ESP32-Dashboard** 是一款运行在 ESP32 上的墨水屏仪表盘固件，当前版本包含多个成品页面（天气、时间轴、世界时钟、专注时钟等），天气数据由免费的 [Open-Meteo](https://open-meteo.com/) API 提供——**无需 API Key，无需注册账号**。

- 固件仓库：[RockBase-iot/ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard)（含中文版 `README_cn.md`）
- 开发框架：PlatformIO + Arduino（espressif32 @ 6.13.0）
- 适配硬件：[NM-EPD-420](../products/nm-epd-420.md) 等 ESP32 + 墨水屏组合

项目愿景是做一块真正的 **"Dashboard for anything"** 墨水屏，路线图还包括加密货币价格、股市数据、本地 IoT 设备监控等。

## 页面一览

| 页面 ID | 名称 | 内容 |
|---------|------|------|
| P0 | 标准页 | 时间与核心信息总览 |
| P1 | 今日天气 | 当前温度、体感、风、湿度、气压、能见度、紫外线指数 |
| P2 | 今日概览 | 当日综合信息 |
| P4 | 每周时间轴 | 一周日程时间轴 |
| P5 | 月度概览 | 月视图 |
| P6 | 每周天气 | 5 日天气预报（WMO 天气图标） |
| P7 | 世界时钟 | 多时区时钟 |
| P8 | 专注时钟 | 番茄钟式专注计时，可独立配置时长 |

另有逐小时温度趋势线 + 未来 12 小时降水概率柱状图，以及基于板载 AHT20 / BME280 传感器的室内温湿度显示、美标 AQI 与 PM2.5 浓度。

## 功能特性

- **免 Key 天气数据源**：Open-Meteo 天气 + 空气质量，免费、无需账号
- **低功耗设计**：更新间隔可配置（默认 30 分钟），间隔期间深度睡眠；支持就寝/起床时间窗，夜间不刷屏
- **AP 配网模式**：长按 Boot 键进入热点配网，首次配置无需 App
- **浏览器配置门户**：WiFi、位置、单位、时区、睡眠间隔均在网页端完成；新版菜单分 `device` / `pages` / `data-source` 三组
- **开机配置窗口**：每次 WiFi 连接后 Web 门户在设备 IP 上保持可达（`PortalSec` 默认 30 秒，设为 `0` 可关闭以最大化省电）
- **多语言界面**：`en_US`、`zh_CN`
- **可配置单位**：°C/°F、km/h/m/s/mph/kn、hPa/inHg/mmHg、km/mi、mm/in
- **三色支持**：在兼容面板上启用红/黑/白三色强调色
- **SNTP 时间同步**：UTC 偏移可配置

## 快速上手

1. 通过 [Web Flasher](https://flash.rockbaseiot.com) 烧录固件，或克隆仓库用 PlatformIO 编译
2. 长按 Boot 键进入 AP 配网模式，连接设备热点完成 Wi-Fi 与位置设置
3. 之后可通过浏览器访问设备 IP 随时调整页面与数据源配置

:::info 与 NM-EPD-420 配套部署指南
针对 NM-EPD-420 的接线、编译与烧录步骤，见 [NM-EPD-420 部署 ESP32-Dashboard](./esp32-dashboard-nm-epd-420.md)。
:::
