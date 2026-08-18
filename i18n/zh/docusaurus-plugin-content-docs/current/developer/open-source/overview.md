---
sidebar_position: 1
title: 开源内容与计划
description: RockBase IoT 硬件与固件的开源范围、获取方式与后续路线图
---

# 开源内容与计划

RockBase IoT 相信开源能够加速工业物联网领域的创新。本页说明各类资源的**开放范围、获取方式与后续计划**。

## 开放范围

| 类别 | 开放内容 | 获取方式 |
|------|----------|----------|
| **开源硬件设计** | NM-CYD-C5、NM-RF-HAT、NM-Display-28inch 等原理图（SCH）、3D STEP 结构文件 | 各产品 GitHub 仓库 |
| **协同固件开发** | Bruce、Marauder、ESP-Claw 等社区项目的官方适配分支 | [GitHub 组织](https://github.com/RockBase-iot) 对应仓库分支 |
| **应用固件** | deskbuddy-tv、ESP32-Dashboard、Biscuit 等完整源码 | 各项目仓库 + [Web Flasher](https://flash.rockbaseiot.com) 固件包 |
| **固件分发协议** | ESPWebApps 聚合仓的 manifest 规范 | [RockBase-iot/ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) |

## 开发路线图

- **K230 AI 开发板**：即将发布，支持 CanMV、大模型、6 TOPS 算力、1 GB 内存（模组形态 [K230-Vision](../../products/k230-vision.md) 文档已上线）
- **NM-EPD-420**：ESP32-S3 4.2 英寸墨水屏板（NM-EPD-420 产品线，详见 [NM-EPD-420](../../products/nm-epd-420.md)）
- 持续为社区项目（Bruce、Marauder、MeshCore 等）适配新硬件

## 如何参与

- **提交固件**：fork [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps)，按 manifest 规范提交 PR（见 [ESPWebApps 贡献指南](../../platform/espwebapps.md)）
- **改进文档**：点击每页底部的"编辑此页"提交修改
- **分享项目**：在 [Facebook RockBase-IoT](https://www.facebook.com/groups/rockbaseiot/) 或 [Telegram](https://t.me/rockbase_iot) 展示你的作品

:::info 许可说明
各仓库的开源许可可能不同（MIT / GPL 等），使用前请查看对应仓库根目录的 LICENSE 文件。
:::
