---
sidebar_position: 5
---

# NM-EPD-420 快速入门

本指南介绍如何在 **NM-EPD-420** 开发板上运行工厂测试固件，相关代码位于 GitHub 仓库中。

## 固件功能

工厂测试固件按固定顺序（T0–T11）检测每一个板载外设，每一步都在电子墨水屏上显示结果页面，操作员可通过 **USER** 和 **BOOT** 按键确认或拒绝每一步。最后在单页摘要中列出所有测试项的 PASS / FAIL / SKIP 状态。

- 上电初始化所有外设驱动
- 顺序执行 10 项硬件测试
- 在三色电子纸面板上为每项测试渲染专用页面
- 通过 ES8311 编解码器播放音频和贝多芬《欢乐颂》
- 通过 LMD4737 DMIC 录制短语音并计算 RMS 值
- 探测 I2C 设备、扫描 Wi-Fi、挂载 SD 卡、与 LoRa 模组通信
- 在电子墨水屏上打印结构化摘要，同时在串口输出机器可解析的结果

完整运行一次约需 3 分钟，主要耗时来自电子纸全刷新（三色面板每页约 10 秒）。

## 测试序列

| 测试 | 项目 | 说明 | 屏幕 |
|------|------|------|------|
| T0 | 系统启动 | 串口/EPD 初始化，欢迎页面，等待 USER | ![T0](/img/products/nm-epd-420/T0.png) |
| T1 | EPD 显示 | 全白/全黑/全红 + 文本演示 | — |
| T2 | WS2812 RGB LED | 红→绿→蓝→白循环 | ![T2](/img/products/nm-epd-420/T2.png) |
| T3 | 按键 | USER 和 BOOT 按键检测 | — |
| T4 | ES8311 编解码器 | 500/1k/2k/3k Hz 扫频 + 《欢乐颂》 | ![T4](/img/products/nm-epd-420/T4.png) |
| T5 | DMIC 麦克风 | 录音 + 扬声器回环 + RMS 校验 | ![T5](/img/products/nm-epd-420/T5.png) |
| T6 | AHT20 传感器 | I2C 读取温湿度 | ![T6](/img/products/nm-epd-420/T6.png) |
| T7 | 电池 ADC | 分压电压检测（未安装时 SKIP） | — |
| T8 | Wi-Fi 扫描 | 2.4 GHz AP 扫描，期望 ≥ 1 个网络 | ![T8](/img/products/nm-epd-420/T8.png) |
| T9 | SD 卡读写 | FSPI 挂载 + 写入/回读校验 | ![T9](/img/products/nm-epd-420/T9.png) |
| T10 | LoRa SPI 总线 | 复位模组，检查 BUSY 低电平 | — |
| T11 | 摘要 | 每项 PASS/FAIL/SKIP 汇总 | ![T11](/img/products/nm-epd-420/T11.png) |

## 操作流程

```
   上电
    │
    ▼
 ┌─────────────┐
 │ T0 欢迎页面 │ ──► 按 USER
 └─────────────┘
       │
       ▼
 ┌─────────────┐
 │ T1 – T10    │
 │ 每一项：    │
 │   显示页面  │
 │   运行硬件  │
 │   USER = 通过
 │   BOOT = 失败
 └─────────────┘
       │
       ▼
 ┌─────────────┐
 │ T11 摘要页  │ ──► 停机；重新上电以再次测试
 └─────────────┘
```

按键经过消抖处理（5–10 ms 采样），并与 EPD `BUSY` 信号互锁，确保在刷新期间的按键不会被误记为下一项的判定。

## 编译与烧录

前置要求：PlatformIO Core（或 VS Code + PlatformIO 扩展）。

```powershell
# 克隆仓库后，在项目根目录执行：
$env:IDF_GITHUB_ASSETS = "dl.espressif.cn/github_assets"   # 可选，国内镜像
pio run                                                    # 编译
pio run --target upload --upload-port COM38                # 烧录
pio device monitor --baud 115200                           # 串口监视
```

或通过 VS Code 任务一键执行：

* **Build (nm-epd-420)**
* **Upload (nm-epd-420)**

首次编译会下载 ESP-IDF 工具链（约数百 MB）到 `%USERPROFILE%\.platformio`。后续编译约 25 秒。

## 串口输出示例

```
[FACTORY TEST] Board: NM Display 4.2 Inch
[FACTORY TEST] FW: v1.3.10
[FACTORY TEST] T0 - System startup OK
...
[FACTORY TEST] T1 START - EPD Display
[T1] Round 1/4 - Filling screen WHITE ...
[T1] BUSY self-check: sawHigh=1  highMs=2873
...
[FACTORY TEST] ===== SUMMARY =====
[FACTORY TEST] T1   EPD Display    [PASS]
[FACTORY TEST] T2   WS2812 RGB LED [PASS]
...
[FACTORY TEST] Overall: FACTORY_TEST=OK
```

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| T1 显示 `sawHigh=0` | 检查 BUSY 引脚接线（开路、虚焊、GPIO 错误） |
| 移植后 EPD 异常 | 查看 `src/ui/display_helper.h` 中的 `Display::resync()` |
| T4 无声音 | 确认 `PIN_PA_CTRL` 为高电平且外部功放已使能 |
| T9 SD 卡失败 | 确保 HSPI 引脚（7–11）未被其他功能占用 |
| T8 Wi-Fi 扫描为空 | 靠近 AP 或检查天线连接 |

## 参考

- [NM-EPD-420 GitHub 仓库](https://github.com/RockBase-iot/NM-EPD-420)
- [产品概述](/docs/products/nm-epd-420)
