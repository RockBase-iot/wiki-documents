---
sidebar_position: 1
title: ESPectre WiFi CSI 人体运动检测
description: 基于 ESP32 与 WiFi CSI 的无接触人体运动检测项目
---

# ESPectre：基于 WiFi CSI 的人体运动检测

ESPectre 是一个运行在 ESP32 上的无接触人体运动检测项目。它分析 2.4 GHz WiFi 链路中的信道状态信息（Channel State Information，CSI），从无线信号随环境变化产生的波动中判断是否有人体运动，无需摄像头或可穿戴设备。

## 项目特点

| 特性 | 说明 |
|------|------|
| 无接触感知 | 利用已有 WiFi 信号检测运动，不采集图像或声音 |
| 双检测算法 | 支持 MVS（滑动方差）与 ML（机器学习）检测算法 |
| 自适应校准 | 通过 NBVI 自动选择子载波，并根据环境噪声计算检测门限 |
| 多种接入方式 | 可通过 ESPHome 接入 Home Assistant，并提供网页与蓝牙监视方式 |
| 本地可视化 | 在带屏设备上显示 Movement 分数、检测门限与运动状态 |

## 工作方式

ESPectre 持续采集 ESP32 接收到的 WiFi CSI 数据，对选定子载波进行滤波和特征计算，并输出两个核心结果：

- **Movement Score**：当前环境中的运动强度分数；
- **Motion Detected**：Movement Score 经过门限和迟滞判断后的运动状态。

首次部署或环境发生明显变化时，可运行校准。校准过程会采集静止环境数据、选择较合适的 CSI 子载波并计算自适应门限。设备移动、家具布局变化或误报与漏报明显时，建议重新校准。

## NM-CYD-C5 适配

[NM-CYD-C5](/docs/products/nm-cyd-c5) 集成 ESP32-C5、2.8 英寸 320×240 显示屏和 XPT2046 电阻触摸屏。适配固件在 ESPectre 检测能力之上增加了本地实时曲线、门限线、触摸调节和一键校准，让设备无需依赖 Home Assistant 也能完成日常查看与操作。

NM-CYD-C5 版本包含以下界面能力：

- 实时显示 Movement 曲线，超出门限的曲线段以不同颜色标识；
- 显示 Threshold 门限线及 `MOTION`、`IDLE`、`CALIBRATING` 状态；
- 通过触摸按钮以 0.5 为步长调节门限；
- 直接在屏幕上触发 NBVI 重新校准；
- 显示设备 IP 地址和 WiFi 信号强度。

## 相关资源

- [ESPectre 上游仓库](https://github.com/francescopace/espectre)
- [RockBase IoT Web Flasher](https://flash.rockbaseiot.com)
- [NM-CYD-C5 硬件仓库](https://github.com/RockBase-iot/NM-CYD-C5)
