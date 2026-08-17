---
sidebar_position: 7
---

# K230-Vision

## 概述

**K230-Vision** 是 RockBase IoT 推出的 AI 视觉模组，基于嘉楠科技新一代 **K230** RISC-V 双核处理器，提供高达 **6 TOPS** 的等效 AI 算力（为 K210 的 13.7 倍）。模组运行 **Linux + RT-Smart 双系统**，支持 **CanMV / MicroPython** 开发，可快速实现多模态 AI 应用，包括视觉识别、语音处理与图像理解。

K230-Vision 提供 **标准版** 与 **豪华版** 两种配置，后者集成 3.5 英寸电容触摸屏，开箱即用。串口可直接对接 ESP32、STM32、树莓派、Jetson 等主流开发平台。

> 仓库地址：[RockBase-iot/K230-Vision](https://github.com/RockBase-iot/K230-Vision)

## 硬件规格

| 项目 | 规格 |
|------|------|
| **SoC** | 嘉楠科技 K230 RISC-V 双核 |
| **AI 算力** | 6 TOPS 等效（K210 的 13.7 倍） |
| **内存** | 1 GB LPDDR4（可选 2 GB） |
| **存储** | SD 卡扩展 |
| **操作系统** | Linux + RT-Smart 双系统 |
| **开发环境** | CanMV、MicroPython、C/C++ SDK |
| **摄像头** | DVP / MIPI 接口，支持多路输入 |
| **显示** | 豪华版：3.5" 电容触摸屏（标准版无屏幕） |
| **串口** | UART / USB，支持对接 ESP32 / STM32 / 树莓派 / Jetson |
| **网络** | 以太网（ Wi-Fi 6 模组 / 4G 扩展） |
| **供电** | USB-C 5 V 或 DC 5 V 输入 |

## 版本对比

| 特性 | 标准版 | 豪华版 |
|------|--------|--------|
| **K230 处理器** | ✓ | ✓ |
| **1 GB LPDDR4** | ✓ | ✓（可选 2 GB） |
| **3.5" 电容触摸屏** | — | ✓ |
| **开箱即用 AI Demo** | 基础视觉识别 | 多模态交互（视觉 + 语音 + 触摸） |
| **适用场景** | 嵌入式视觉节点、工业检测 | 人机交互终端、教学演示、边缘 AI 网关 |

## 接口说明

### 串口对接定义

K230-Vision 通过 UART 与外部主控通信，典型接线如下：

| K230 引脚 | 外部主控（如 ESP32） | 说明 |
|-----------|---------------------|------|
| TX | RX（如 GPIO3） | K230 数据发送 |
| RX | TX（如 GPIO1） | K230 数据接收 |
| GND | GND | 共地 |
| 3.3V | 3.3V | 电平参考（可选） |

:::tip
K230-Vision 串口电平为 3.3 V TTL，可直接与 ESP32、STM32、树莓派等 3.3 V 电平设备对接。
:::

### 摄像头接口

- 支持 DVP 并行摄像头与 MIPI CSI 摄像头
- 推荐分辨率：640 × 480、1280 × 720、1920 × 1080
- 支持多路摄像头输入（豪华版可同时运行视觉 + 触摸交互）

## 开发环境

### CanMV 开发

CanMV 是基于 MicroPython 的 K230 开发框架，提供丰富的 AI 模型调用接口：

```python
# CanMV 示例：人脸检测
from machine import FPIOA
from media.sensor import SENSOR
import KPU as kpu

sensor = SENSOR()
sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QVGA)

task = kpu.load(0x300000)  # 加载人脸检测模型

while True:
    img = sensor.snapshot()
    code = kpu.run_yolo2(task, img)
    if code:
        for i in code:
            img.draw_rectangle(i.rect())
```

### MicroPython 开发

K230-Vision 支持标准 MicroPython 语法，同时提供 K230 专用硬件控制模块：

```python
# 串口通信示例
from machine import UART

uart = UART(1, baudrate=115200, tx=2, rx=3)
uart.write(b'Hello from K230!')
```

## AI 能力

K230-Vision 支持以下多模态 AI 应用场景：

| 能力 | 说明 | 典型应用 |
|------|------|---------|
| **视觉识别** | 人脸检测、物体分类、姿态估计 | 安防监控、工业质检 |
| **语音处理** | 关键词唤醒、语音识别、语音合成 | 智能音箱、语音助手 |
| **图像理解** | 图像描述、场景分析、OCR | 文档数字化、辅助驾驶 |
| **边缘推理** | 6 TOPS 本地算力，无需云端 | 离线 AI、数据隐私保护 |

## 快速入门

### 1. 准备工作

| 物品 | 数量 |
|------|------|
| K230-Vision 模组 | ×1 |
| USB-C 数据线 | ×1 |
| Micro-SD 卡（≥16 GB） | ×1 |
| （可选）摄像头模组 | ×1 |

### 2. 烧录系统镜像

1. 从 [K230-Vision 仓库 Releases](https://github.com/RockBase-iot/K230-Vision/releases) 下载最新系统镜像
2. 使用 **balenaEtcher** 或 **Rufus** 将镜像写入 SD 卡
3. 插入 SD 卡并上电启动

### 3. 连接串口控制台

```bash
# Linux/macOS
screen /dev/ttyUSB0 115200

# Windows（使用 PuTTY 或 MobaXterm）
# 选择对应 COM 口，波特率 115200
```

### 4. 运行第一个 AI Demo

```bash
# 登录后进入 CanMV 环境
canmv

# 运行预置的人脸检测 Demo
exec(open('/app/face_detection.py').read())
```

## 资源

- [GitHub 仓库](https://github.com/RockBase-iot/K230-Vision)
- [CanMV 开发文档](https://github.com/RockBase-iot/canmv_k230)
- [勘智 K230 官方文档](https://github.com/kendryte/k230_docs)
- [RockBase Shop 购买页面](https://rockbase.shop)

:::note
K230-Vision 为 RockBase IoT 最新发布的 AI 视觉平台，相关文档与示例代码将持续更新。请关注 GitHub 仓库获取最新动态。
:::
