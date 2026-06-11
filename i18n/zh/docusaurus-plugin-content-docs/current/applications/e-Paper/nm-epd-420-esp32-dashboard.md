---
sidebar_position: 1
---

# NM-EPD-420 在 ESP32-Dashboard 项目中的应用

> 使用 NM-EPD-420 构建低功耗 4.2 英寸三色墨水屏信息看板。

## 概述

[ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard) 是 RockBase IoT 开源的墨水屏看板项目。在 NM-EPD-420（ESP32-S3 + 4.2 英寸三色 EPD）上，它可以实现一个常亮、低功耗的信息终端，用于天气、空气质量和本地环境数据展示。本项目相比 esp32-weather-epd 项目而言，使用成本更低，刷新更快的 4.2 英寸三色屏实现，更容易上手，并且提供了更丰富的功能和配置选项，基于 Web 配置页面也更易于实现。

本文说明如何在 NM-EPD-420 上部署和使用该项目。

## 在 NM-EPD-420 上可实现的能力

- 4.2 英寸三色墨水屏界面（红/黑/白），分辨率 400 x 300
- Open-Meteo 天气与空气质量数据（无需 API Key）
- 读取板载 AHT20 温湿度数据
- 深度睡眠省电刷新机制（默认 30 分钟）
- Web 配置门户（Wi-Fi、城市/定位、单位、语言、休眠时间）
- 多语言界面支持（`en_US`、`zh_CN`）

## 硬件与开发环境

- 开发板：NM-EPD-420（ESP32-S3）
- 开发框架：Arduino（通过 PlatformIO）
- 推荐工具链：VS Code + PlatformIO IDE
- 项目仓库：[RockBase-iot/ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard)

## 快速部署

### 1. 克隆项目

```bash
git clone https://github.com/RockBase-iot/ESP32-Dashboard.git
cd ESP32-Dashboard
```

### 2. 使用 VS Code 打开

使用已安装 PlatformIO 扩展的 VS Code 打开项目目录，依赖会自动解析。

### 3. 编译并烧录 NM-EPD-420 固件

```bash
pio run -e nm-display-420 -t upload
```

项目会自动打包并烧录 LittleFS 的 Web 配置页面资源。

### 4. 首次配置（AP 模式）

- 长按 Boot 键（IO0，屏幕上方第三个按键）至少 2 秒进入 AP 配置模式
- 连接热点 `esp_dashboard_XXXXXX`
- 打开 `http://192.168.4.1`
- 配置 Wi-Fi、定位、时区和单位后保存
- 设备重启并进入正常刷新周期

### 5. 后续重新进入配置页面

- 短按 Boot 键（IO0，屏幕上方第三个按键），设备保持 5 分钟 Web 配置在线
- 在同一局域网访问 `http://<device-ip>`

## 关键配置项

- 设备待连接的家庭 Wi-Fi SSID / 密码
- 纬度 / 经度与城市显示名称
- UTC 偏移
- 刷新休眠间隔
- 夜间停刷时间窗口（Bed time / Wake time）
- 单位系统（温度、风速、气压、距离、降水）
- 语言（`en_US` / `zh_CN`）

## NM-EPD-420 使用要点

- 推荐使用 PlatformIO 环境：`nm-display-420`
- 显示驱动基于 4.2 英寸三色屏 GDEY042Z98
- 项目已集成板载 AHT20 传感器支持
- IO0 参与配置交互与深睡唤醒流程

## 典型应用场景

- 桌面天气与空气质量看板
- 智能家居状态面板
- 低功耗壁挂日程/资讯屏
- Maker 项目中的副显示终端

## 相关链接

- [ESP32-Dashboard 仓库](https://github.com/RockBase-iot/ESP32-Dashboard)
- [NM-EPD-420 产品页](/docs/products/nm-epd-420)
- [NM-EPD-420 快速开始](/docs/products/nm-epd-420-quickstart)
