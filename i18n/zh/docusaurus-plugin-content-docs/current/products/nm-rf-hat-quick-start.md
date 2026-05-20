---
sidebar_position: 3
---

# NM-RF-HAT 快速上手

本指南基于官方 NM-RF-HAT Quick Start 与 FAQ，适用于：

- NM-CYD-C5
- ESP32-2432S028（CYD）

## 包装清单

| 组件 | 说明 |
|---|---|
| NM-RF-HAT | 集成 CC1101、nRF24、PN532、IR、433 OOK 的 RF 扩展板 |
| 2 根 4Pin 线 | 一根用于 CYD/NM-CYD-C5，一根用于 GPS 扩展 |
| 1 根 5Pin 线 | CYD 与 NM-RF-HAT 主连接线 |
| TF 延长线 | TF 卡槽延长连接 |
| 天线 | 433 MHz 与 2.4 GHz 天线 |

## 硬件连接

### 第 1 步：连接 TF 与信号线

1. 连接 CYD 与 NM-RF-HAT 之间的 TF 延长线。
2. 一根 4Pin 连接到 `3.3V / IO9 / IO8 / GND`。
3. 一根 4Pin 连接到 `5V / TX / RX / GND`。

### 第 2 步：连接到 NM-RF-HAT 接口

确认插头方向与引脚顺序正确，线缆插到位。

### 第 3 步：安装天线

- SMA 天线（外螺纹内针）-> CC1101（433 MHz）
- SMA 天线（外螺纹内孔）-> nRF24（2.4 GHz）

## 烧录 Bruce 固件

1. 打开 https://flash.nmiot.net/
2. 选择项目：`bruce`
3. 选择设备：`nm-cyd-c5` 或 `esp32-2432s028`
4. 选择版本（官方文章示例）：`v1.14.0`
5. 点击 `Flash`

## DIP 开关说明

NM-RF-HAT 使用 6 位 DIP 开关：

- `1 ON`：CC1101
- `2 ON`：nRF24
- `3 ON`：PN532
- `4 ON`：IR
- `5 ON`：RF433 OOK
- `6 ON`：电池供电开关

注意：

- `1-5` 中同一时刻只能打开一个 RF 功能位。
- 不可同时启用多个 RF 模块。

## 基础验证流程

1. 给 CYD 与 NM-RF-HAT 上电。
2. DIP 切到目标模块（例如 `1 ON`）。
3. 在固件菜单中选择对应模块类型。
4. 运行一次扫描或测试动作。
5. 按模块逐项验证。

## 故障排查

| 问题 | 建议处理 |
|---|---|
| CC1101 未识别 | 确认 NM-RF-HAT 已供电，DIP 仅打开 CC1101，固件中选择 CC1101 |
| nRF24 未识别 | 确认供电正常，DIP 仅打开 nRF24，检查天线与线缆连接 |
| GPS 一直等待 | 检查 GPS UART 接线，并在固件里设置正确 RX/TX 引脚 |

## 参考链接

- Quick Start 原文：https://rockbase.shop/blogs/tech-news/nm-rf-hat-quick-start
- FAQ 原文：https://github.com/RockBase-iot/NM-RF-HAT/blob/main/NM-RF-HAT%20FAQ.md
