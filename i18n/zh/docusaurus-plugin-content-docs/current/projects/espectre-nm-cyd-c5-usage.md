---
sidebar_position: 3
title: ESPectre × NM-CYD-C5 使用指南
description: ESPectre 固件配网、屏幕操作、Home Assistant 接入与故障排查
---

# ESPectre × NM-CYD-C5 使用指南

本指南适用于运行 ESPectre 适配固件的 NM-CYD-C5。该固件提供 WiFi CSI 人体运动检测、屏幕实时曲线、触摸门限调节、一键校准、Home Assistant 接入和网页控制台。

## 功能一览

| 功能 | 操作入口 |
|------|----------|
| MVS / ML 运动检测 | 设备自动运行 |
| Movement 曲线与 Threshold 门限线 | 设备屏幕 |
| 手动调节门限 | 屏幕按钮、Home Assistant 或网页控制台 |
| NBVI 自动校准 | 屏幕 `CALIBRATE` 按钮或 Home Assistant 实体 |
| Home Assistant 集成 | ESPHome 原生 API |
| 实体查看、日志与 OTA | 浏览器访问设备 IP |
| 25 Hz 实时曲线 | Web Bluetooth 监视器 |

![ESPectre 主界面](/img/applications/espectre/c5-espectre.png)

## 首次配网

设备首次启动时没有已保存的 WiFi 凭据，会自动开启配网热点：

1. 使用手机或电脑连接名为 **`ESPectre Fallback`** 的 WiFi 热点。
2. 等待浏览器自动打开配网页面；如未打开，请访问 `http://192.168.4.1`。
3. 选择当前环境中的 **2.4 GHz WiFi**，输入密码并保存。
4. 设备将自动重启并连接 WiFi。
5. 连接成功后，屏幕左上角会显示设备 IP 地址；未连接时显示黄色 `NO WIFI`。

ESPectre 使用 2.4 GHz WiFi CSI 进行检测，因此不能使用 5 GHz 网络完成运动感知。也可以通过 Home Assistant 手机应用的 BLE Improv 功能完成配网。

![未连接 WiFi 时的界面](/img/applications/espectre/c5-no-wifi.png)

## 添加到 Home Assistant

确保 NM-CYD-C5 与 Home Assistant 位于同一网络，然后执行以下步骤：

1. 在 Home Assistant 中打开 **设置 → 设备与服务 → 添加集成**，安装或选择 **ESPHome**。
2. 等待设备通过 mDNS 自动发现；设备主机名默认为 `espectre`。
3. 如未自动发现，手动输入屏幕上显示的 IP 地址，端口使用 `6053`。
4. 确认连接，完成设备添加。

![在 Home Assistant 中添加 ESPHome 设备](/img/applications/espectre/esphome-add.png)

添加后可使用以下实体：

| 实体 | 类型 | 说明 |
|------|------|------|
| Movement Score | sensor | 当前运动分数，也是屏幕曲线的数据源 |
| Motion Detected | binary_sensor | 经过门限和迟滞判断后的运动状态 |
| Threshold | number | 手动检测门限，范围 0–10 |
| Calibrate | switch | 触发重新校准，完成后自动关闭 |
| WiFi Signal | sensor | 当前 WiFi 信号强度，单位 dBm |

![ESPectre 的 Home Assistant 实体](/img/applications/espectre/esphome.png)

## 屏幕操作

- **曲线区**：显示约 4.5 分钟的滚动历史。低于门限的曲线为青色，超过黄色门限线的部分为红色。
- **THR -0.5 / +0.5**：以 0.5 为步长调节手动门限，修改后立即生效。
- **CALIBRATE**：启动 NBVI 重新校准。校准约需 10 秒，其间不要移动设备，并尽量保持检测区域无人走动。
- **状态文字**：`MOTION` 表示检测到运动，`IDLE` 表示环境静止，`CALIBRATING` 表示正在校准，`BOOT` 表示正在启动。

误报较多时可适当提高门限，漏报较多时可适当降低门限。设备位置或房间布局发生变化时，应优先重新校准，再进行小幅手动调整。

## 网页控制台

在同一局域网内访问 `http://<设备 IP>/`，可以：

- 查看 Movement Score、Motion Detected 等实体状态；
- 调节 Threshold 或触发 Calibrate；
- 查看设备实时日志；
- 上传 `firmware.ota.bin` 完成 OTA 更新。

默认配置未设置网页访问密码，只应在可信局域网内使用。如需限制访问，请在固件 YAML 中启用 `web_server.auth`。

## 蓝牙实时监视器

需要比设备屏幕更高的曲线刷新率时，可使用 ESPectre 仓库中的 `micro-espectre/espectre-monitor.html`。在支持 Web Bluetooth 的 Chrome 或 Edge 中打开该页面并连接设备，即可查看 25 Hz Movement 与 Threshold 曲线，并通过滑块调节门限。

## 日常使用建议

- 设备与路由器之间尽量避免大面积金属遮挡；
- 不要把设备放在距离路由器过近的位置，建议保留至少 50 cm 距离；
- 移动设备、调整家具或误报与漏报明显时重新校准；
- 校准时保持房间静止，避免人员走动影响环境基线；
- WiFi 短暂断开后，设备会自动重连并恢复 CSI 检测。

## 常见问题

| 现象 | 处理方法 |
|------|----------|
| 屏幕显示 `NO WIFI` | 连接 `ESPectre Fallback` 热点重新配网，并确认选择 2.4 GHz 网络 |
| 无法打开设备网页 | 确认电脑与设备位于同一网段，并确认当前固件启用了 `web_server` |
| Home Assistant 找不到设备 | 检查网段与 VLAN；也可使用屏幕 IP 和端口 `6053` 手动添加 |
| 触摸按钮无响应或位置偏移 | 调整 YAML 中 `touchscreen.calibration` 的四个边界值 |
| 校准结果不稳定 | 保持环境静止后重新校准，并检查设备与路由器距离及信号质量 |
| 误报较多 | 先重新校准，再逐步提高门限 |
| 漏报较多 | 先重新校准，再逐步降低门限 |
| 如何更新固件 | 在网页控制台上传 OTA 固件，或通过 ESPHome 经 WiFi 上传 |

有关硬件映射和刷新机制，请参阅 [ESPectre 在 NM-CYD-C5 上的实现](./espectre-nm-cyd-c5)。
