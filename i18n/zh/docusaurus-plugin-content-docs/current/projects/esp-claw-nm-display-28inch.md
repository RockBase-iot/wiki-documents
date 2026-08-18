---
sidebar_position: 2
---

# NM-Display-2.8 ESP-Claw：带语音与动作感知的边缘 AI Agent

> 将 NM-Display-2.8 变身为多模态边缘 AI Agent —— 能看、能听、能感知、能对话。

![NM-Display-2.8inch](/img/products/nm-display-28/nm-display-28.png)

## 产品概述

**NM-Display-2.8 ESP-Claw** 将 ESP-Claw AI Agent 框架带到了 RockBase 的旗舰级 ESP32-S3 显示平台。如果说 NM-CYD-C5 主打无线通信的极致 versatility，那么 **NM-Display-2.8** 则补齐了完整的**人机交互栈** —— 电容触控、六轴 IMU、实时时钟、音频编解码器和电池电源管理，使其成为**语音 AI Agent**、**手势控制物联网面板**和**便携式智能助手**的理想硬件载体。

凭借 **16 MB Flash**、**8 MB PSRAM** 以及丰富的板载传感器，NM-Display-2.8 可在本地运行 ESP-Claw 的 Agent 循环，同时利用 2.8 寸电容触摸屏提供视觉反馈，借助 ES8311 音频编解码器实现语音交互。自然语言就是你的遥控器，设备则以图形和声音回应你。

## 核心卖点

### 多模态边缘 AI Agent

在 2.8 寸 TFT 上看，通过板载音频编解码器听，借助六轴 IMU 感知姿态 —— ESP-Claw 在 NM-Display-2.8 上成为了真正的**多模态 AI Agent**。ESP32-S3 的 AI 加速向量指令帮助在设备端运行轻量级感知任务，而推理则连接到你青睐的大语言模型。

### 开箱即用的语音能力

**ES8311 音频编解码器**（I2S）无需外接模块即可实现音频播放与录制。通过 Telegram 或微信向设备提问，它会以合成语音或屏幕上的可视化组件作答。

### 电容触控 —— 顺滑精准

**FT6336 电容触摸屏**替代了电阻屏，带来现代化的手指友好交互体验。滑动浏览设备状态卡片，点击确认 Agent 动作，或绘制手势快捷指令。

### 动作感知智能

板载 **QMI8658 六轴 IMU** 让 ESP-Claw 能够感知方向、摇晃和敲击手势。将物理动作作为事件触发器：翻转设备静音，摇晃唤醒 Agent，倾斜滚动菜单。

### 电池供电的便携性

借助 **AXP2101 电源管理芯片**和 3.7V 锂电池接口，NM-Display-2.8 可以脱离电源线独立运行。ESP-Claw 的事件驱动架构在实际需要 Agent 之前保持低功耗。

### 对话编程 + 可视化预览

说出来，它就写代码 —— 与 CYD 相同。但在这里，生成的 Lua 脚本还能在 2.8 寸屏幕上**绘制组件、图表和通知**。大语言模型现在同时掌控逻辑与 UI。

### 丰富的板载生态

显示屏、触摸、IMU、RTC、音频、SD 卡、电池管理、可选摄像头 —— 所有功能集成于一块紧凑的板卡之上。无需面包板，无需飞线。

## 什么是 ESP-Claw

**ESP-Claw** 是乐鑫（Espressif）为物联网设备打造的 **对话编程（Chat Coding）** AI Agent 框架。它通过对话定义设备行为，并在乐鑫芯片上本地完成感知、决策和执行的完整闭环。受 OpenClaw 概念启发，用 C 语言重新实现，ESP-Claw 轻量、智能且持续进化。

在 **NM-Display-2.8** 上，ESP-Claw 拥有了**面孔和声音**：ST7789 显示屏渲染 Agent 状态和用户组件，ES8311 编解码器实现音频反馈。最终呈现的是一个你能真正与之交互的 AI Agent —— 而不仅仅是通过串口进行配置。

![从传统物联网到边缘 Agent](/img/applications/esp-claw-architecture.jpg)

## 核心特性

| 特性 | 说明 |
|------|------|
| **对话即创造** | IM 聊天 + 动态 Lua 加载。无需编程即可定义行为与界面。 |
| **事件驱动** | 触摸、IMU 动作、定时器或语音事件可在毫秒级触发 Agent 循环。 |
| **结构化记忆** | 设备端记忆组织。隐私数据不上云。 |
| **MCP 通信** | 支持标准 MCP 设备 —— 既可作为 Server，也可作为 Client。 |
| **开箱即用** | 通过 NMIOT Web Flasher 刷机，在 Captive Portal 配置。 |
| **组件可扩展** | 显示、音频、IMU 和触摸驱动均为模块化 —— 按需裁剪或扩展。 |

## 硬件要求

| 项目 | 规格 |
|------|------|
| **开发板** | NM-Display-2.8 (ESP32-S3) |
| **Flash** | 16 MB |
| **PSRAM** | 8 MB |
| **显示屏** | 2.8" ST7789, 320×240 |
| **触摸屏** | FT6336 电容触摸屏 |
| **音频** | ES8311 编解码器 (I2S 播放 + 录制) |
| **动作感知** | QMI8658 六轴 IMU |
| **电源** | AXP2101 PMU，支持锂电池 |
| **无线** | Wi-Fi 4 + Bluetooth 5 LE |
| **扩展** | RTC、SD 卡槽、可选 DVP 摄像头 |

## 快速开始

### 1. 获取硬件

从以下渠道购买 NM-Display-2.8：
- [RockBase IoT Store](https://www.aliexpress.com/store/1105401362)
- [RockBase Shop](https://shop.rockbaseiot.com)

### 2. 烧录 ESP-Claw 固件

[NMIOT Web Flash Tool](https://flash.nmiot.net/) 支持 NM-Display-2.8 的一键烧录。选择：
- **项目：** `espclaw`
- **设备：** `nm-display-28inch`
- **版本：** 最新稳定版

点击 **Flash**，等待进度条完成。

### 3. 配置 AI 模型

重启后，连接 `ESP-Claw-XXXX` Wi-Fi AP，打开 `http://192.168.4.1`。输入你偏好的 LLM API 密钥（OpenAI、DeepSeek、Kimi 等）并保存。

#### 3.1 状态页面切换

在`nm-display-28inch`设备上，由于使用了不一样的触摸屏，考虑支持LCD触摸绘画等应用，切换状态功能进行了调整，用户可以通过直接按BOOT按键（左上角第一个按键）来切换状态页面。

### 4. 开启对话

在即时通讯应用中添加设备的机器人。试着说：

> *"在屏幕上显示一个时钟组件，并每分钟语音播报一次时间。"*

ESP-Claw 将生成同时驱动 **ST7789 显示屏**和 **ES8311 编解码器**的 Lua 脚本。

#### 示例 1：录制语音

如果你想录制一段音频样本，只需提问：
> *"录制一段 5 秒钟的语音备忘，并保存为 'memo.wav'。"*
ESP-Claw 将使用 ES8311 的 I2S 录音功能采集音频，并将其存储到 SD 卡或内部 Flash。你也可以让 ESP-Claw 将音频文件发送到你的 IM 聊天中以便即时播放。

#### 示例 2：摄像头预览 Skill

使用RockBase-IoT提供的ESP-Claw版本固件，提供了内置的摄像头预览技能，支持板载摄像头（如 OV2640）。

当用户要求预览摄像头、显示摄像头画面、打开摄像头、运行摄像头演示或测试摄像头是否正常工作时，使用此 Skill。

Lua 脚本从板载摄像头抓取画面，并通过 display 模块推送到 LCD 上。支持 RGB565 / RGB565X 像素格式。

官方提供的固件还支持音频录制以及视频录制功能，用户可以根据需求，让 ESP-Claw 录制一段视频或音频，并保存到 SD 卡或内部 Flash 中，甚至直接发送到 IM 聊天中。

**注意：由于音频或视频文件而言，都会比较大，因此有这样需求，最好为设备配备一个SD卡，否则会因内部Flash空间受限而失败。**

此外，受限于ESP32-S3的性能，ESP-Claw 目前无法在设备端进行视频编码，录制的相关文件画质、性能都会比较差。

#### 示例 3：LCD 触摸绘画

请向你的 ESP-Claw 发送以下内容：
```
Download the following Skill from ESP-Claw Skills Lab: lcd_touch_paint
```
当用户要求绘图应用、绘画应用、触摸测试、LCD 触摸演示或在板载显示屏上用手指绘画时，使用此 Skill。

Lua 脚本使用设备上的 board_manager、display 和 lcd_touch 模块初始化面板，并渲染跟随用户手指的轨迹。它每帧都会清除并重绘，因此不需要持久缓冲区。

## 与 NM-CYD-C5 的硬件差异

| 能力 | NM-CYD-C5 | NM-Display-2.8 |
|------|-----------|----------------|
| **MCU** | ESP32-C5 (RISC-V) | ESP32-S3 (Xtensa LX7) |
| **Wi-Fi** | Wi-Fi 6 (2.4 / 5 GHz) | Wi-Fi 4 (2.4 GHz) |
| **触摸屏** | 电阻屏 (XPT2046) | 电容屏 (FT6336) |
| **音频** | 无板载音频 | ES8311 编解码器 |
| **IMU** | 无板载 IMU | QMI8658 六轴 |
| **电池** | 无电池管理 | AXP2101 + 锂电池支持 |
| **Zigbee / Thread** | 支持 | 不支持 |
| **适用场景** | 无线 Hub、RF 网关 | HMI、语音助手、便携 Agent |

当你需要 **Wi-Fi 6、Zigbee 或 Thread** 时，选择 **NM-CYD-C5**。当你需要一台**带触摸、音频和动作感知的完整交互式 AI 终端**时，选择 **NM-Display-2.8**。

## 资源

- [ESP-Claw GitHub 仓库](https://github.com/espressif/esp-claw)
- [NM-Display-2.8 产品页面](/docs/products/nm-display-28)
- [ESP32-S3 数据手册](https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
- [ESP-Claw Skills-lab](https://skills-lab.esp-claw.com/)
