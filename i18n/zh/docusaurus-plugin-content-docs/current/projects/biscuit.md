---
sidebar_position: 7
title: Biscuit 墨水屏多功能固件
description: 把墨水屏阅读器变成全能智能设备——无线工具、通信、游戏与实用工具
---

# Biscuit 墨水屏多功能固件

**Biscuit** 最初是为 **Xteink X4** 墨水屏设备打造的自定义固件，把一台约 70 美元的墨水屏阅读器变成集无线工具、安全功能、通信、游戏与实用工具于一身的智能设备，同时**完整保留电子阅读功能**。RockBase IoT已将其移植到 [NM-EPD-420](../products/nm-epd-420.md)，还有更多细节需要完善，期望感兴趣的爱好者可以参与到开源项目。

- 固件仓库：[RockBase-iot/biscuit](https://github.com/RockBase-iot/biscuit)
- 上游项目：Fork 自 [CrossPoint Reader](https://github.com/crosspoint-reader/crosspoint-reader)，核心阅读功能全部来自 CrossPoint，Biscuit 在其上扩展

## 设计理念

Biscuit 把设备当作通用智能终端而非单一阅读器：主屏幕是一个**磁贴式仪表盘**，实时显示系统信息（电量、堆内存、运行时长、Wi-Fi 状态）；阅读只是八大功能分类之一，而不是全部。

4.26" / 4.2" 墨水屏在阳光下清晰可读、断电不丢画面，配合数天级的电池续航；实体按键提供无需触摸屏的导航；Wi-Fi 与 BLE 5.0 支撑无线工具；MicroSD 卡存储所有内容。

## 硬件规格对比

| 规格 | Xteink X4（原版） | NM-EPD-420（移植版） |
|------|-------------------|----------------------|
| SoC | ESP32-C3（RISC-V，160 MHz） | ESP32-S3（Xtensa，240 MHz） |
| 内存 | 380 KB SRAM（无 PSRAM） | 380 KB SRAM + 8 MB PSRAM |
| Flash | 16 MB | 16 MB |
| 屏幕 | 4.26" 800×480 单色墨水屏 | 4.2" 400×300，三色 GDEY042Z98 或黑白 GYE042A87（优先推荐） |
| 输入 | 7 个按键（前 4 + 侧 3） | 2 个按键（USER 左 / BOOT 右） |
| 无线 | 2.4 GHz Wi-Fi + BLE 5.0 | 2.4 GHz Wi-Fi + BLE 5.0 |
| 存储 | MicroSD（FAT32） | MicroSD（FAT32） |
| 接口 | USB-C（串口 + 供电） | USB-C（串口 + 供电） |

## NM-EPD-420 移植版

### 构建变体

| PlatformIO 环境 | 面板 | 说明 |
|-----------------|------|------|
| `nm_epd_420` | GDEY042Z98 三色面板（含 UC8179 兼容回退） | 标准 NM-EPD-420 移植 |
| `nm_epd_420_bw` | GYE042A87 黑白面板 | 引脚与 UI 行为相同，换用更快的黑白 GxEPD2 驱动，刷新快，体验更好 |

### 双键操作模型

移植版用板载两个按键替代 X4 的七键布局，紧凑操作模型如下：

| 操作 | 含义 |
|------|------|
| USER 短按 | 上 / 上一项 / 上一页 |
| BOOT 短按 | 下 / 下一项 / 下一页 |
| USER 长按 | 返回 |
| BOOT 长按 | 确认 / 打开 |
| USER + BOOT 同时长按 | 逻辑电源键 |

完整按键映射、长按时间阈值与屏幕提示标签见仓库文档 `docs/nm-epd-420-controls.md`。

:::tip 编译烧录
克隆仓库后使用 PlatformIO 选择对应环境编译：`pio run -e nm_epd_420`（三色版）或 `pio run -e nm_epd_420_bw`（黑白版）。固件也已上架 [Web Flasher](https://flash.rockbaseiot.com)，可浏览器一键烧录。
:::
