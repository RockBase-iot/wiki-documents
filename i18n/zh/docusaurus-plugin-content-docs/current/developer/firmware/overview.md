---
sidebar_position: 1
title: 官方固件
description: RockBase IoT 官方固件的获取、升级与验证方式
---

# 官方固件

本页汇总 RockBase IoT 硬件**官方固件**的获取渠道与升级方法。

:::warning 刷写前请核对
刷写或升级前，请再次核对**设备型号与固件名称**（尤其注意 NM-EPD-420 三色版与黑白版不可混刷），并提前备份重要配置与数据。
:::

## 获取渠道

| 渠道 | 适用场景 | 入口 |
|------|----------|------|
| **Web Flasher** | 浏览器一键烧录，无需开发环境（推荐） | [flash.rockbaseiot.com](https://flash.rockbaseiot.com) |
| **GitHub Releases** | 下载固件包本地烧录 / 二次开发 | 各产品仓库的 Releases 页 |
| **源码编译** | 需要定制功能 | 各产品仓库（PlatformIO / Arduino 工程） |

Web Flasher 的详细操作步骤与故障排查见 [Web Flasher 使用指南](../../platform/web-flasher.md)。

## 出厂测试固件

部分产品（如 [NM-EPD-420](../../products/nm-epd-420.md)）仓库内附带**产线测试固件（Factory Test Firmware）**，用于产线或开发者在上电后快速验证板载外设（屏幕、传感器、音频、SD 卡、按键等）是否全部工作正常。它不是日常应用固件，验证完毕后请刷入目标应用固件。

## 升级步骤（Web Flasher）

1. 使用带数据功能的 USB-C 线连接设备
2. 打开 [flash.rockbaseiot.com](https://flash.rockbaseiot.com)，选择 应用 → 设备型号 → 版本
3. 点击 Connect 选择串口，点击 Flash 开始烧录。若遇到失败，请尝试按住 BOOT 按键之后 RESET 或重新上电，进入BOOT模式之后再刷一次
4. 若进入 BOOT 模式刷新，下载完成后按 RESET 或重新上电

## 常用设备固件入口

| 设备 | 官方固件仓库 |
|------|--------------|
| NM-CYD-C5 | [RockBase-iot/NM-CYD-C5](https://github.com/RockBase-iot/NM-CYD-C5) |
| NM-TV-154 | [RockBase-iot/NM-TV-154](https://github.com/RockBase-iot/NM-TV-154) |
| NM-EPD-420 | [RockBase-iot/NM-EPD-420](https://github.com/RockBase-iot/NM-EPD-420) |
| NM-Display-28inch | [RockBase-iot/NM-Display-28inch](https://github.com/RockBase-iot/NM-Display-28inch) |
| K230-Vision | [K230-Vision Releases](https://github.com/RockBase-iot/K230-Vision/releases)（SD 卡系统镜像） |
