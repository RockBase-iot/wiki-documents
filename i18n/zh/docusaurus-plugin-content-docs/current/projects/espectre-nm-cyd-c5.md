---
sidebar_position: 2
title: ESPectre 在 NM-CYD-C5 上的实现
description: NM-CYD-C5 的 ESPectre 显示、触摸与 ESPHome 集成方案
---

# ESPectre 在 NM-CYD-C5 上的实现

本方案将 [ESPectre](./espectre) 的 WiFi CSI 人体运动检测能力移植到 [NM-CYD-C5](/docs/products/nm-cyd-c5)，并利用板载显示屏与触摸屏提供实时曲线、门限调节和一键校准。实现基于 ESPHome 配置完成，无需修改 ESPectre C++ 组件。

![ESPectre 在 NM-CYD-C5 上运行](/img/applications/espectre/c5-espectre.png)

## 硬件映射

| 功能 | 引脚 | 实现说明 |
|------|------|----------|
| SPI | SCK=`GPIO6`、MISO=`GPIO2`、MOSI=`GPIO7` | LCD、触摸屏与 SD 卡共享总线 |
| LCD | CS=`GPIO23`、DC=`GPIO24` | 2.8 英寸 ST7789，320×240，使用 ESPHome `mipi_spi` |
| 背光 | `GPIO25` | 高电平点亮，由显示组件的 `enable_pin` 控制 |
| 触摸屏 | CS=`GPIO1` | XPT2046 电阻触摸屏，轮询模式 |
| SD 卡 | CS=`GPIO10` | 当前固件不使用 |
| RGB LED | `GPIO27` | 当前固件不使用，可扩展为运动状态指示灯 |
| 主控 | ESP32-C5-WROOM-1 | 16 MB Flash、8 MB PSRAM |

触摸校准参考范围为 X：185–3700、Y：250–3800。电阻触摸屏存在个体差异，实际按钮位置偏移时，应根据设备读数微调 ESPHome 配置中的 `touchscreen.calibration`。

## 可视化数据

ESPectre 组件现有实体已覆盖屏幕交互需要，无需增加新的组件接口：

| 数据或状态 | ESPHome 实体 | 屏幕用途 |
|------------|--------------|----------|
| Movement 分数 | `movement_sensor` | 绘制实时运动曲线 |
| Motion 状态 | `motion_sensor` | 显示 `IDLE` 或 `MOTION` |
| Movement Threshold | `threshold_number` | 绘制门限线并接收触摸调节 |
| 校准状态 | `calibrate_switch` | 触发重新校准并显示校准状态 |
| WiFi 信号 | `wifi_signal` | 显示 RSSI |

Movement 默认约每秒发布一次。屏幕保存 272 个采样点，因此可展示约 4.5 分钟的滚动历史。纵轴按历史峰值和当前门限自动缩放，曲线超过门限的部分显示为红色，其余部分显示为青色。

## 屏幕布局

```text
┌──────────────────────────────────────────────┐
│ 192.168.1.100   MOTION / IDLE / CAL     MVS  │
├──────────────────────────────────────────────┤
│        ╭─╮          Movement 曲线（青色）     │
│       ╱   ╲╭─╮      超门限部分（红色）       │
│  - - - - - - - -   Threshold（黄色虚线）    │
├──────────────────────────────────────────────┤
│  1.83 mv   1.10 thr                 -55 dBm  │
├────────────┬──────────────────┬──────────────┤
│  THR -0.5  │    CALIBRATE     │   THR +0.5   │
└────────────┴──────────────────┴──────────────┘
```

顶部状态栏显示 IP 地址、检测状态与算法；中部为滚动曲线；底部三个触摸热区分别用于降低门限、重新校准和提高门限。

## 触摸交互

| 按钮 | 动作 | 行为 |
|------|------|------|
| `THR -0.5` | 调用 `number.set` | 将手动门限降低 0.5，最低为 0 |
| `CALIBRATE` | 打开 `calibrate_switch` | 重新选择子载波并计算自适应门限 |
| `THR +0.5` | 调用 `number.set` | 将手动门限提高 0.5，最高为 10 |

手动调节立即生效，但只在当前会话中保留；设备重启后会根据 YAML 配置或校准结果重新计算门限。校准通常约需 10 秒，其间应保持设备和周围环境静止。

## 刷新与共享 SPI 约束

LCD 与 XPT2046 使用同一条 SPI 总线。显示刷新必须在 ESPHome 主循环中统一执行，不能直接从 Movement、Motion、Threshold 或 Calibrate 的实体回调中调用显示组件更新。

推荐将显示组件设置为 `update_interval: never`，再由 1 秒 `interval` 触发重绘。实体回调只更新内存中的状态，主循环负责读取状态并刷新屏幕。这样可以避免显示写入与触摸轮询同时占用总线，导致 `spi_master: Cannot acquire bus when a polling transaction is in progress` 断言重启。

## 后续扩展

- 将增益锁状态暴露为诊断实体并显示在状态栏；
- 暴露校准采样数量，显示真实校准进度；
- 增加已选 CSI 子载波的诊断视图；
- 使用板载 RGB LED 指示运动状态；
- 长时间无运动时关闭背光，触摸后唤醒。

下一步请参阅 [ESPectre × NM-CYD-C5 使用指南](./espectre-nm-cyd-c5-usage)。
