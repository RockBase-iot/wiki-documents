---
sidebar_position: 8
title: Hardware Buddy 桌面伴侣
description: Buddy Bridge App 与 Claude Desktop Buddy 桌面交互项目
---

# Hardware Buddy 桌面伴侣

Hardware Buddy 系列探索"AI 助手 + 实体硬件"的交互方式：让桌面上的小硬件设备成为 AI 的延伸载体。本页收录两个配套项目。

## Buddy Bridge App

仓库：[RockBase-iot/buddy-bridge-app](https://github.com/RockBase-iot/buddy-bridge-app)（2026-06-18 新建）

Buddy Bridge App 是 Hardware Buddy 设备的**本地桌面伴侣程序**，面向不使用 BLE、仅通过 **USB 串口**通信的硬件型号，在电脑与设备之间搭起数据桥梁。

## Claude Desktop Buddy

仓库：[RockBase-iot/claude-desktop-buddy](https://github.com/RockBase-iot/claude-desktop-buddy)（2026-06-22 新建）

Claude Desktop Buddy 是面向创客的 **Claude Cowork / 蓝牙 API 参考与示例工程**，演示如何让硬件设备通过蓝牙 API 与 Claude 桌面端协同工作——例如把 AI 对话状态、通知或表情实时呈现到桌面小硬件上。

## 相关项目

- [deskbuddy-tv](./deskbuddy-tv.md) — NM-TV-154 上的桌面天气/表情伴侣固件，与 Buddy 系列同属"桌面 AI 伴侣"产品思路
- [pizero-openclaw](https://github.com/RockBase-iot/pizero-openclaw) — Pi Zero 上的 OpenClaw 相关实验（2026-07-10 新建）

:::info 产品线说明
Hardware Buddy 是 RockBase IoT 正在成形的桌面交互产品线：设备侧固件（如 DeskBuddy-TV）+ 桥接软件（Buddy Bridge App）+ AI 集成示例（Claude Desktop Buddy）三层结构，适合作为"AI + IoT 桌面终端"场景的入门路径。
:::
