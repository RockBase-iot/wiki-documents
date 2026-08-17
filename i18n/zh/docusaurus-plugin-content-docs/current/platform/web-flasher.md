---
sidebar_position: 1
title: Web Flasher 使用指南
description: 使用 flash.rockbaseiot.com 在浏览器中一键烧录 ESP32 固件
---

# Web Flasher 使用指南

**[flash.rockbaseiot.com](https://flash.rockbaseiot.com)** 是 RockBase IoT 的 Web 烧录平台：无需安装任何开发环境，在浏览器中即可为 ESP32 设备下载并烧录固件。

## 支持内容

- RockBase IoT 全系硬件的官方固件（NM-CYD-C5、NM-TV-154、NM-EPD-420 等）
- 社区热门开源项目：**Bruce**、**Marauder**、**ESP-Claw** 等
- NM-EPD-420 各移植应用固件（Meshtastic、ESP32-Dashboard、ESP32-Weather-EPD、Biscuit 等）

固件由 [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) 聚合仓统一维护，持续增加。如果你需要额外的固件包、设备支持或工作流改进，欢迎联系官方团队。

## 浏览器要求

Web 烧录基于 **Web Serial API**，请使用：

- ✅ Chrome / Edge（桌面版，推荐最新版本）
- ❌ Firefox / Safari（暂不支持 Web Serial）

## 烧录步骤

1. **连接设备**：使用带数据功能的 USB-C 线将开发板连接到电脑
2. **打开网站**：访问 [flash.rockbaseiot.com](https://flash.rockbaseiot.com)
3. **选择固件**：按 应用 → 设备型号 → 版本 选择目标固件
4. **连接串口**：点击 Connect，在弹出的串口列表中选择你的设备
5. **开始烧录**：点击 Flash / Install，等待进度完成
6. **重启设备**：烧录完成后按 RESET 键或重新上电

## 常见问题排查

| 问题 | 排查方法 |
|------|----------|
| 串口列表为空 | 确认 USB 线支持数据传输（非纯充电线）；Windows 需安装 CH340 / CP210x 驱动 |
| 连接失败 / 烧录中断 | 换 USB 口或数据线；降低烧录波特率（如页面提供选项） |
| 设备无法进入下载模式 | 按住 **BOOT** 键再点连接，或按住 BOOT 的同时短按 RESET 后松开 |
| 烧录后无显示 | 确认所选固件与设备型号/屏幕版本完全匹配（如 NM-EPD-420 三色版（nm-epd-420） vs 黑白版（nm-epd-420-bw）） |

:::warning 注意
刷写第三方固件（如 Bruce、Marauder）前请确认硬件兼容性；烧录会擦除设备原有固件与数据。
:::

:::info 开发者
想让你的固件上架 Web Flasher？请阅读 [ESPWebApps 贡献指南](./espwebapps.md)。
:::
