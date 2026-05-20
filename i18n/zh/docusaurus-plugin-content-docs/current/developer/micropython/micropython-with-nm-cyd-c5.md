---
sidebar_position: 1
---

# 在 NM-CYD-C5 上使用 MicroPython

本指南介绍如何在 **NM-CYD-C5** 上部署 MicroPython 固件，并使用纯 Python 驱动运行 ST7789 LCD 演示程序。

![NM-CYD-C5 MicroPython 演示](/img/developer/micropython/hero-rotation.png)

## 硬件准备

开始之前，请准备以下物品：

| 物品 | 数量 | 说明 |
|------|------|------|
| NM-CYD-C5 开发板 | ×1 | ESP32-C5 + 2.8" ST7789 LCD |
| USB-C 数据线 | ×1 | 用于供电和数据传输 |
| 电脑 | ×1 | Windows / macOS / Linux |

## 部署 MicroPython 固件

### 步骤 1: 安装 esptool

`esptool` 是乐鑫官方提供的烧录工具。如果你已经安装了 Python 3，打开终端并运行：

```bash
pip install esptool
```

### 步骤 2: 擦除 Flash

在安装 MicroPython 之前，先擦除整个 Flash 存储器，以避免启动冲突：

```bash
esptool.py --chip esp32c5 erase_flash
```

![擦除 Flash](/img/developer/micropython/erase-flash.png)

:::tip
如果开发板未被自动识别，请使用 `--port COM3` (Windows) 或 `--port /dev/ttyUSB0` (Linux/macOS) 指定端口。
:::

### 步骤 3: 下载 MicroPython 固件

访问 ESP32-C5 的官方 MicroPython 下载页面：

👉 [micropython.org/download/ESP32_GENERIC_C5](https://micropython.org/download/ESP32_GENERIC_C5)

选择最新的 **Release** 版本，例如：

```
ESP32_GENERIC_C5-20260406-v1.28.0.bin
```

![MicroPython 固件下载](/img/developer/micropython/micropython-firmware.png)

### 步骤 4: 烧录固件

**重要提示:** ESP32-C5 的起始地址是 **`0x2000`**（不像 ESP32 的 `0x1000`）。

```bash
esptool.py --chip esp32c5 --baud 961200 write_flash 0x2000 ESP32_GENERIC_C5-20260406-v1.28.0.bin
```

![部署 MicroPython](/img/developer/micropython/deploy-micropython.png)

烧录完成后，打开串口终端（PuTTY、Tera Term 或 `mpremote`），波特率设置为 **115200**。你应该能看到 ESP-ROM 启动信息，随后出现 MicroPython REPL 提示符 (`>>>`)。

![MicroPython REPL (PuTTY)](/img/developer/micropython/micropython-putty.png)

## 开发环境

你可以选择 **Thonny IDE** 或 **Visual Studio Code** + RT-Thread MicroPython 扩展。

### 方案 A: Thonny IDE（初学者推荐）

1. 下载并安装 [Thonny](https://thonny.org/)。
2. 进入 **工具 → 选项 → 解释器**。
3. 选择 **MicroPython (ESP32)** 并选择正确的串口。
4. 点击 **确定** — REPL 将显示在 Shell 面板中。

### 方案 B: VS Code + RT-Thread MicroPython

1. 安装 [Visual Studio Code](https://code.visualstudio.com/)。
2. 从插件市场安装 **RT-Thread MicroPython** 扩展。
3. 连接 NM-CYD-C5，在扩展面板中选择对应的串口。

![VS Code 中的 RT-Thread MicroPython](/img/developer/micropython/rt-thread-micropython.png)

## ST7789 屏幕演示

NM-CYD-C5 采用 **ST7789** 2.8" LCD。RockBase IoT 提供了适用于该开发板的 MicroPython 驱动和配置文件。

### 步骤 1: 获取驱动和配置

从 GitHub 克隆或下载所需文件：

```bash
git clone https://github.com/RockBase-iot/st7789py_mpy.git
git clone https://github.com/RockBase-iot/NM-CYD-C5.git
```

你需要以下文件：
- `st7789py_mpy/st7789.py` — 纯 Python ST7789 驱动
- `NM-CYD-C5/Demos/MicroPython/tft_configs/nm-cyd-c5/tft_config.py` — 开发板引脚配置

### 步骤 2: 创建 MicroPython 项目

在 IDE 中创建新项目，文件结构如下：

```
project/
├── st7789.py        # LCD 驱动
├── tft_config.py    # NM-CYD-C5 引脚配置
├── rotations.py     # 演示脚本
```

### 步骤 3: 同步文件到开发板

使用 **VS Code 中的 RT-Thread MicroPython**：

1. 点击 **Device connect**，选择 NM-CYD-C5 串口。
2. 点击 **Sync**，将所有 `.py` 文件上传到开发板。

使用 **mpremote**：

```bash
mpremote connect COM3 fs cp st7789.py :
mpremote connect COM3 fs cp tft_config.py :
mpremote connect COM3 fs cp rotations.py :
```

### 步骤 4: 运行演示

在 REPL 中执行 `rotations.py`，或直接从 IDE 运行：

```bash
mpremote connect COM3 run rotations.py
```

你应该能在 LCD 上看到彩色图案在旋转：

![旋转演示](/img/developer/micropython/rotation-demo.png)

### 示例: rotations.py

```python
import tft_config
import st7789
import vga1_16x32 as font

tft = tft_config.config(rotation=0)

tft.fill(st7789.BLACK)
tft.text(font, "RockBase IoT", 40, 100, st7789.CYAN, st7789.BLACK)
tft.text(font, "NM-CYD-C5", 60, 140, st7789.MAGENTA, st7789.BLACK)
```

## 快速参考

| 操作 | 命令 |
|------|------|
| 擦除 Flash | `esptool.py --chip esp32c5 erase_flash` |
| 烧录固件 | `esptool.py --chip esp32c5 --baud 961200 write_flash 0x2000 firmware.bin` |
| 进入 REPL | `mpremote connect COM3 repl` |
| 上传文件 | `mpremote connect COM3 fs cp file.py :` |
| 运行脚本 | `mpremote connect COM3 run file.py` |

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| 开发板无法识别 | 按住 **BOOT**，按一下 **RST**，然后松开 **BOOT**，进入下载模式 |
| 烧录失败 | 将波特率降低到 `460800` 或检查 USB 数据线 |
| 屏幕无显示 | 确认 `tft_config.py` 与 NM-CYD-C5 引脚一致（SPI: IO1=MOSI, IO5=SCLK, IO3=DC, IO6=BL） |
| 导入报错 | 确保 `st7789.py` 和 `tft_config.py` 都已上传到开发板根目录 |

## 参考资料

1. [ESP32-C5 MicroPython 安装指南](https://micropython.org/download/ESP32_GENERIC_C5/)
2. [MicroPython LCD 驱动 (st7789py_mpy)](https://github.com/russhughes/st7789py_mpy)
3. [RockBase-iot NM-CYD-C5 仓库](https://github.com/RockBase-iot/NM-CYD-C5)
