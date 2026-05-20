---
sidebar_position: 1
---

# NM-CYD-C5 ESP-Claw: Edge AI Agent in Your Palm

> 将 NM-CYD-C5 变身为掌心里的边缘 AI Agent。

![NM-CYD-C5 ESP-Claw](/img/applications/esp-claw-hero.png)

## 产品概述

在物联网和边缘计算日益普及的时代，对智能、高效、经济的 AI Agent 的需求持续增长。**NM-CYD-C5 ESP-Claw** 正是为满足这一需求而设计。它将强大的 ESP32-C5 双频 Wi-Fi 6 微控制器与创新的 **esp-claw** AI Agent 框架相结合，提供独立、低成本且功能丰富的边缘 AI 解决方案。

这款 "Cheap Yellow Display" (CYD) 开发板不仅拥有直观的用户界面，还能让设备通过自然语言进行交互和控制，让普通用户也能轻松定义设备行为，实现真正的 "对话编程"。

## 核心卖点

### 边缘 AI Agent

搭载 **ESP32-C5**（16 MB Flash + 8 MB PSRAM），ESP-Claw 在设备端完成感知和执行，将推理和决策卸载给大语言模型（LLM）。无需单独的主机来运行 OpenClaw Gateway —— 成本更低、功耗更低、安全性更强。

### 对话编程（Chat Coding）

说出来，它就写代码。直接通过微信、QQ、飞书或 Telegram 聊天 —— LLM 实时生成并运行 Lua 脚本。普通用户无需编写一行代码即可定义设备行为。

### 2.8 寸触摸屏 —— 看得见智能

320×240 电阻触摸屏实时显示状态、消息收件箱和硬件指标。触摸、滑动，一切尽在掌控。

### 丰富硬件集成

内置显示屏、触摸屏、RGB LED、SD 卡槽和 GPS 接口 —— 开箱即用，功能完备。

### 双频 Wi-Fi 6

支持 2.4 GHz 和 5 GHz 双频段，提供高速稳定的无线连接，实现高效数据传输。

### 多模型按需对话

支持 GPT、Claude Opus 4.6、DeepSeek、Kimi、MiniMax（云端）以及本地 Ollama —— 灵活的 API 配置，适配各种场景。

### 自定义技能

创建和进化属于自己的技能 —— 持续适应，越用越智能。

## 什么是 ESP-Claw

**ESP-Claw** 是乐鑫（Espressif）为物联网设备打造的 **对话编程（Chat Coding）** AI Agent 框架。它通过对话定义设备行为，并在乐鑫芯片上本地完成感知、决策和执行的完整闭环。受 OpenClaw 概念启发，用 C 语言重新实现，ESP-Claw 轻量、智能且持续进化。只需一块仅需几美元的 ESP32 系列芯片，你就能体验到 ESP-Claw 的敏捷之处。

![从传统物联网到边缘 Agent](/img/applications/esp-claw-architecture.jpg)

## 核心特性

传统物联网通常止步于连接：设备可以联网，但不会思考；可以执行命令，但无法决策。ESP-Claw 将 Agent Runtime 下沉到乐鑫芯片上，将它们从被动执行者转变为主动决策中心。

| 特性 | 说明 |
|------|------|
| **对话即创造** | IM 聊天 + 动态 Lua 加载。普通用户无需编程即可定义设备行为。 |
| **事件驱动** | 任何事件都能触发 Agent 循环。响应速度可达毫秒级。 |
| **结构化记忆** | 以结构化方式组织记忆。隐私数据不上云。 |
| **MCP 通信** | 支持标准 MCP 设备。既可作为 Server，也可作为 Client。 |
| **开箱即用** | 通过 Board Manager 快速配置。支持一键刷机。 |
| **组件可扩展** | 每个模块都可按需裁剪。你也可以添加自己的组件集成。 |

## 硬件要求

| 项目 | 规格 |
|------|------|
| **开发板** | NM-CYD-C5 (ESP32-C5) |
| **Flash** | 16 MB |
| **PSRAM** | 8 MB |
| **显示屏** | 2.8" ST7789, 320×240 |
| **触摸屏** | 电阻触摸屏 |
| **无线** | 双频 Wi-Fi 6 + BLE 5 |
| **扩展** | RGB LED、SD 卡槽、GPS 接口 |

## 快速开始

![快速开始流程](/img/applications/esp-claw-quickstart.png)

### 1. 获取硬件

从以下渠道购买 NM-CYD-C5：
- [RockBase IoT 官方商城](https://rockbaseiot.com)
- [RockBase Shop](https://shop.rockbaseiot.com)
- [NMTech 全球商城](https://nmttech.com)

### 2. 烧录 ESP-Claw 固件

[NMIOT Web Flasher](https://flash.nmiot.net/) 提供了便捷的在线烧录体验。选择 `espclaw` 项目，设备选择 `nm-cyd-c5`，版本选择 `v0.2.1`，点击 `Flash` 即可。

### 3. 配置 AI 模型

连接开发板的 Wi-Fi AP，打开网页配置面板。输入你偏好的 LLM API 密钥（OpenAI、DeepSeek、Kimi 等）。

### 4. 开始对话

打开你常用的 IM 应用（微信、Telegram 等），添加开发板的机器人。开始聊天来控制你的设备！

## 示例：对话编程

**用户：** "温度超过 30 度时把 LED 变成红色。"

**ESP-Claw：** *（生成并执行 Lua 脚本）*

```lua
-- 由 ESP-Claw 自动生成
local temp = sensor.read_temperature()
if temp > 30 then
    led.set_color(255, 0, 0)
else
    led.set_color(0, 255, 0)
end
```

## 资源

- [ESP-Claw GitHub 仓库](https://github.com/espressif/esp-claw)
- [NM-CYD-C5 产品页面](/docs/products/nm-cyd-c5)
- [ESP32-C5 数据手册](https://www.espressif.com/sites/default/files/documentation/esp32-c5_datasheet_en.pdf)
