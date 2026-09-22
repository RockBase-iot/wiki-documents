---
sidebar_position: 9
title: Inkstone 本地推图固件
description: RockBase 自研的全本地墨水屏推图固件——浏览器裁剪、双抖动算法并排预览、Bearer Token 鉴权 HTTP API
---

# Inkstone 本地推图固件

**Inkstone-firmware** 是 RockBase-iot 自研的墨水屏设备本地推图固件（ESP32 平台），零安装、完全本地运行：设备联网后用浏览器打开 `http://inkstone.local`，选择图片 → 裁剪 → 预览 → 推送上屏；AI 工具与脚本也可通过带鉴权的 HTTP API 直接推图。

- 固件仓库：[RockBase-iot/Inkstone-firmware](https://github.com/RockBase-iot/Inkstone-firmware)（含中文版 `README_zh.md`）
- 开发框架：PlatformIO + pioarduino 54.x（arduino-esp32 3.1 + IDF 5.3），与 NM-EPD-420 出厂固件基线一致
- 适配硬件：[NM-EPD-420](../products/nm-epd-420.md)——目前支持 `NM-EPD-420-4C` 型号（4.2" 四色墨水屏开发板）

![Inkstone Firmware](/img/projects/inkstone.png)

## 功能特性

- **全本地工作流**：设备自托管上传页面（STA 模式 `inkstone.local` 或 AP 模式 `192.168.4.1`）；选定画面在浏览器端完成量化，以原始 2bpp 比特流直写屏幕
- **双量化算法并排预览**：页面同时渲染两种算法效果——`default`（亮度加权 Floyd–Steinberg 抖动）与 `retro`（OKLab 色彩空间 + 面板校准暖色调色板 + 色相感知掩蔽，v0.1.1 新增），任选其一来推送
- **双语界面**：英文 / 中文，默认英文
- **带鉴权的 HTTP API**：`/api/v1/*` 接口采用 Bearer Token 鉴权，支持 raw / JPEG / PNG 三种通道与 `?profile=default|retro|none` 算法选择，AI 工具与脚本可直接推图
- **刷新频率保护**：调试期最小间隔 60 秒，并支持窗口化深度睡眠
- **可信网络开放模式**：`POST /api/v1/auth {"open":true}` 可在家庭内网免 Token 使用
- **多板卡框架**：板级常量全部集中在 `src/boards/*.h`，新增板卡见仓库 `docs/PORTING.md`（目前仅支持 NM-EPD-420-4C）
- **便捷访问**：配网后直接打开 `inkstone.local`，无需查询设备 IP；配网热点名为 `Inkstone-XXXXXX`，便于区分多台设备

## 两种量化算法

两种算法没有绝对优劣——优化目标不同，这正是页面并排展示两者的原因。

| | `default` | `retro` |
|---|---|---|
| 目标 | 保真度 | 风格化、胶片颗粒感 |
| 冷色区域（天空、水面） | 抖动成红色噪点 | 掩蔽为纯黑 + 纯白 |
| 高光 / 阴影 | 可能压成纯白 / 纯黑 | 提升并压缩 |
| 适合 | 暖色调主体、日常使用 | 大面积冷色区域的图片 |

两种算法在固件、浏览器与参考脚本 `tools/convert_image.py` 三端输出字节级一致——同一输入帧在三端结果完全相同。

## 快速上手

1. 无已存凭证时，设备开启热点 `Inkstone-XXXXXX`（XXXXXX 为 MAC 地址后三字节，密码 `12345678`），用浏览器打开 `http://192.168.4.1` 配置 Wi-Fi
2. 配网完成后访问 `http://inkstone.local`，选择图片、裁剪、对比两种量化预览效果，然后推送上屏
3. API Token 显示在 AP 模式页面与串口日志中；脚本推图用法见仓库 `docs/API.md` 与 `tools/push_image.py`，也可开启开放模式免 Token

:::tip 编译与烧录
克隆仓库后用 PlatformIO 编译：`pio run -e nm-epd-420-4c` 生成合并固件 `inkstone-nm-epd-420-4c.bin`；烧录执行 `pio run -e nm-epd-420-4c -t upload`。
:::
