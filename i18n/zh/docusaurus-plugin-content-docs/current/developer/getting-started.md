---
sidebar_position: 1
---

# 快速开始

## 开发环境搭建

RockBase IoT 硬件主要基于 **ESP32** 系列芯片，支持 **MicroPython**、**Arduino** 和 **ESP-IDF** 三种开发方式。

## MicroPython（推荐）

### 1. 安装工具链

```bash
# Python 环境
pip install esptool mpremote

# 或安装 Thonny IDE（图形化）
# https://thonny.org/
```

### 2. 下载固件

前往 [MicroPython 官网](https://micropython.org/download/) 下载对应芯片的固件：

| 芯片 | 固件 |
|------|------|
| ESP32 | ESP32_GENERIC |
| ESP32-C3 | ESP32_GENERIC_C3 |
| ESP32-C5 | ESP32_GENERIC_C5 |
| ESP32-S3 | ESP32_GENERIC_S3 |

### 3. 烧录固件

```bash
# 擦除 Flash
esptool.py --chip esp32 --port COM3 erase_flash

# 烧录固件
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 firmware.bin
```

### 4. REPL 交互

```bash
mpremote connect COM3 repl
```

常用快捷键：
- Ctrl+A - 进入 raw 模式
- Ctrl+B - 退出 raw 模式
- Ctrl+C - 中断运行
- Ctrl+D - 软重启

## Arduino

### 1. 安装 Arduino IDE

下载并安装 [Arduino IDE 2.x](https://www.arduino.cc/en/software)。

### 2. 添加 ESP32 板管理器

在 **文件 - 首选项 - 附加开发板管理器网址** 中添加：

```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

### 3. 安装 ESP32 核心

**工具 - 开发板 - 开发板管理器** - 搜索 `esp32` - 安装。

### 4. 选择开发板

**工具 - 开发板 - ESP32 Arduino - 对应型号**

## ESP-IDF

适用于需要完整硬件控制与高性能的场景。

```bash
# 克隆 ESP-IDF
git clone -b v5.2 --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
./install.sh esp32
cd ../your-project
idf.py set-target esp32
idf.py build flash monitor
```

## 常见问题

### Q: 烧录时提示 Failed to connect to ESP32

A: 按住 **BOOT** 键，再按 **RST** 键进入下载模式。

### Q: MicroPython 提示内存不足

A: 使用 `gc.collect()` 手动触发垃圾回收，或优化代码减少全局变量。

### Q: Wi-Fi 连接不稳定

A: 检查电源稳定性，建议使用独立 3.3V LDO，避免 USB 供电不足。
