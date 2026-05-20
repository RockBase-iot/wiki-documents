---
sidebar_position: 2
---

# NM-RF-HAT

## 产品概述

NM-RF-HAT 是面向 ESP32-2432S028（CYD）的 all-in-one 射频扩展 HAT。
该板将多种无线模块集成在同一 PCB 上，并通过硬件 RF 开关缓解多模块共用总线时的冲突问题。

## 主要特性

### 硬件级冲突解决

- 通过硬件 RF 开关切换当前工作模块，降低共享总线冲突。
- 在显示屏、TF 卡与射频模块共存场景下提升系统稳定性。
- 减少固件层复杂的引脚重映射与兼容性调试工作。

### All-in-One 模块集成

| 模块 | 频段 / 类型 | 典型功能 |
|------|-------------|----------|
| CC1101 | Sub-GHz（433 MHz） | 遥控与传感信号捕获 |
| nRF24 | 2.4 GHz | 无线协议分析与通信 |
| PN532 | NFC / RFID | 读写与仿真 |
| IR TX/RX | 红外 | 红外信号采集与回放 |
| 433 OOK TX/RX | 433 MHz OOK | 基础 RF 发射/接收 |
| GNSS Header | GPS 扩展 | 定位与轨迹应用 |
| 电源电路 | USB-C / 电池路径 | 供电与硬件开关控制 |

### 插件化 GPS 扩展

- 新版 GPS 模块支持即插即用。
- 具备较快搜星能力与弱信号环境下的稳定定位表现。
- 适用于 IoT 追踪、机器人与车载定位等场景。

## 兼容性与连接

- 主要适配平台：ESP32-2432S028（CYD）。
- 按产品页面推荐，采用简化线缆连接（2x4Pin、1x5Pin、TF 延长线）。
- 商店页面可选项通常包含：仅 HAT / HAT + Bruce / HAT + GPS。

## 快速上手

1. 使用推荐线缆将 NM-RF-HAT 连接到 ESP32-2432S028（CYD）。
2. 通过板载硬件开关选择当前目标 RF 模块。
3. 烧录目标固件（例如 Bruce 生态可使用 Bruce-CYD-2USB）。
4. 分模块验证功能（Sub-GHz、nRF24、NFC/RFID、IR、OOK、GPS）。

## 应用场景

- RF 协议测试与信号回放
- 智能家居与传感器信号集成
- 安全研究与硬件实验原型开发
- 结合 GNSS 的移动/车载定位项目

## 参考链接

- RockBase 产品页：https://rockbase.shop/products/nm-rf-hat
- NMMiner 产品页：https://www.nmminer.com/product/nm-rf-hat/
- 快速上手：/zh/docs/products/nm-rf-hat-quick-start
- FAQ：/zh/docs/products/nm-rf-hat-faq
