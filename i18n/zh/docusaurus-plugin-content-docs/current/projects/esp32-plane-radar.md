---
sidebar_position: 3
title: ESP32-Plane-Radar 航班雷达
description: 基于 NM-TV-154 的 ADS-B 实时航班雷达
---

# ESP32-Plane-Radar 航班雷达

**ESP32-Plane-Radar** 是一款开源的 ADS-B 航班雷达固件，可在小圆屏/方屏上以声呐式雷达图实时显示你所在位置周边的飞机。原项目面向 ESP32-C3 Super Mini + 1.28" GC9A01 圆屏，**RockBase IoT 团队官方新增了对 NM-TV-154 的支持**（ESP32 + 1.54" ST7789 方屏，240×240）。

- 固件仓库：[RockBase-iot/ESP32-Plane-Radar](https://github.com/RockBase-iot/ESP32-Plane-Radar)
- 数据来源：[adsb.fi](https://opendata.adsb.fi/) 开放 ADS-B 数据
- 3D 打印外壳：[MakerWorld 模型页](https://makerworld.com/en/models/2872376-esp32-plane-radar-live-ads-b-on-a-round-display#profileId-3207083)

## 工作原理

1. **Wi-Fi 配网**（首次使用时）—— 设备开启名为 `PlaneRadar-Setup` 的 AP，通过 Captive Portal 强制门户完成配网
2. **雷达显示** —— 从 adsb.fi 拉取实时航班数据，在以你位置为中心的雷达网格上绘制飞机，约每 5 秒刷新一次

Wi-Fi 保存后设备会自动重连，雷达在主循环中持续运行。

## 按键操作

### 通用（BOOT 键，GPIO 9，低电平有效）

| 操作 | 效果 |
|------|------|
| 短按 | 循环切换雷达量程（5 → 10 → 15 → 25 km），并保存到 Flash |
| 长按 3 秒 | 清除 Wi-Fi、位置与单位设置，重启进入配网门户 |

开机时按住 BOOT 键也可强制清除配置（等同于长按）。

### NM-TV-154 触摸操作

在 NM-TV-154 上，可直接使用板载**电容触摸键（T9 / GPIO32）**循环切换量程（5 → 10 → 15 → 25 km），无需按 BOOT 键。

## NM-TV-154 已验证引脚

| 信号 | 参数 |
|------|------|
| 显示屏 | ST7789，240×240 |
| LCD 电源 | GPIO **21**（低电平使能） |
| 背光 | GPIO **19**（低电平点亮） |
| 触摸 | **T9 / GPIO32** |

:::tip 配网技巧
配网门户中可以一并设置雷达中心位置（经纬度）与单位制。设置错误时无需重烧固件，长按 BOOT 键 3 秒即可重置全部配置。
:::
