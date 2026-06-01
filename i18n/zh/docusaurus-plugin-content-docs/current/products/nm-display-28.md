---
sidebar_position: 3
---

# NM-Display-2.8

## 产品概述

**NM-Display-2.8** 是一款基于 **ESP32-S3** 的低成本物联网显示开发板，板载 2.8 寸 TFT 触摸屏、6 轴 IMU、RTC、音频编解码器和电源管理芯片，适用于智能家居控制面板、物联网人机界面（HMI）和边缘 AI Agent 显示终端等场景。

![NM-Display-2.8](/img/products/nm-display-28/nm-display-28.png)

## 硬件规格

### 核心配置

| 项目 | 规格 |
|------|------|
| **MCU** | ESP32-S3 Dual-core Xtensa LX7, 240MHz |
| **SRAM** | 512KB + 8MB PSRAM |
| **Flash** | 16MB SPI Flash |
| **无线** | Wi-Fi 4 (802.11 b/g/n) + Bluetooth 5.0 LE |
| **显示屏** | 2.8" ST7789, 320×240 像素 |
| **触摸屏** | FT6336 电容触控 (I2C) |
| **分辨率** | 320 × RGB × 240 |
| **接口** | USB Type-C (供电/下载) |

### 板载资源

| 器件 | 型号 | 通信总线 |
|------|------|----------|
| **IMU** | QMI8658 (6轴加速度计/陀螺仪) | I2C |
| **RTC** | PCF85063 (实时时钟) | I2C |
| **音频编解码** | ES8311 (I2S) | I2C 控制 + I2S 数据 |
| **电源管理** | AXP2101 | I2C |
| **IO 扩展器** | TCA9554 | I2C |
| **摄像头** | OV 系列 DVP 接口 (可选) | DVP |
| **SD 卡槽** | SDMMC 1-bit 模式 | SDMMC |
| **背光驱动** | LEDC PWM 调光 | GPIO |

## 引脚定义

![NM-Display-2.8 引脚图](/img/products/nm-display-28/nm-display-28-pinout.jpg)

### 电源与调试

| GPIO | 功能 | 说明 |
|------|------|------|
| GND | Ground | 接地 |
| 3V3 | 3.3V 输出 | 外部 3.3V 输出 (最大 500mA) |
| TXD | UART TX (GPIO43) | 串口发送 / 通用 GPIO |
| RXD | UART RX (GPIO44) | 串口接收 / 通用 GPIO |

### I2C 总线 (共享)

| GPIO | 功能 | 说明 |
|------|------|------|
| IO7 | I2C SCL | 公共 I2C 时钟线 (不可复用为普通 GPIO) |
| IO8 | I2C SDA | 公共 I2C 数据线 (不可复用为普通 GPIO) |

:::warning
以下所有外设共用一条 I2C 总线 (I2C_NUM_0)：TCA9554、FT6336、AXP2101、ES8311（控制）、QMI8658、PCF85063。
:::

### 显示屏 (ST7789)

| GPIO | 功能 |
|------|------|
| IO1 | SPI MOSI |
| IO5 | SPI SCLK |
| IO3 | LCD DC |
| IO6 | 背光 BL (PWM) |
| NC | SPI CS |
| NC | LCD RESET |

- 接口: SPI，时钟 80 MHz，SPI 模式 3
- 驱动: ST7789
- 分辨率: 320×240 (逻辑宽高，270° 旋转)

### 触摸屏 (FT6336, I2C)

| GPIO | 功能 | 说明 |
|------|------|------|
| IO7 | I2C SCL | 触摸控制器时钟 |
| IO8 | I2C SDA | 触摸控制器数据 |
| NC | TP INT | 触摸中断 (未连接) |
| NC | TP RESET | 触摸复位 (未连接) |

### 音频编解码 (ES8311)

| GPIO | 功能 | 说明 |
|------|------|------|
| IO7 | I2C SCL | ES8311 控制总线 |
| IO8 | I2C SDA | ES8311 控制数据 |
| IO12 | I2S MCLK | I2S 主时钟 |
| IO13 | I2S BCLK | I2S 位时钟 |
| IO15 | I2S LRCK | I2S 左/右声道时钟 |
| IO14 | I2S DIN | 录音数据输入 |
| IO16 | I2S DOUT | 播放数据输出 |

### 摄像头 (DVP 接口)

| GPIO | 功能 | 说明 |
|------|------|------|
| IO38 | XCLK | 摄像头时钟输出 |
| IO17 | VSYNC | 垂直同步信号 |
| IO18 | HREF | 水平参考信号 |
| IO41 | PCLK | 像素时钟 |
| IO45 | D0 (Y2) | 数据位 0 |
| IO47 | D1 (Y3) | 数据位 1 |
| IO48 | D2 (Y4) | 数据位 2 |
| IO46 | D3 (Y5) | 数据位 3 |
| IO42 | D4 (Y6) | 数据位 4 |
| IO40 | D5 (Y7) | 数据位 5 |
| IO39 | D6 (Y8) | 数据位 6 |
| IO21 | D7 (Y9) | 数据位 7 |
| IO8 | SCCB SDA | (共享 I2C 总线) |
| IO7 | SCCB SCL | (共享 I2C 总线) |

- XCLK 频率: 20 MHz
- 帧格式: RGB565, 320×480

### SD 卡 (SDMMC 1-bit)

| GPIO | 功能 | 说明 |
|------|------|------|
| IO9 | SDMMC D0 | 数据位 0 |
| IO10 | SDMMC CMD | 命令线 |
| IO11 | SDMMC CLK | 时钟线 |

- 挂载点: `/sdcard`
- 模式: 1-bit SDMMC

### 按键

| GPIO | 功能 | 说明 |
|------|------|------|
| IO0 | BOOT 按钮 | 启动引导按钮 (低电平有效) |

### 其他

| GPIO | 功能 | 说明 |
|------|------|------|
| IO1 | Debug TX | 调试串口发送 |
| IO2 | Debug RX | 调试串口接收 |
| IO3 | Touch INT / GPIO | 触摸中断或通用 GPIO |
| IO4 | Battery ADC | 电池电压检测 (可选) |

## 快速入门

### 1. 硬件准备

| 项目 | 数量 |
|------|------|
| NM-Display-2.8 开发板 | ×1 |
| USB-C 数据线 | ×1 |
| (可选) 电池 (3.7V LiPo) | ×1 |

### 2. 开发环境搭建

推荐使用 **ESP-IDF** v5.3+ 进行开发。

```bash
# 1. 安装 ESP-IDF (Linux/macOS)
bash -c "$(curl -fsSL https://espressif.github.io/esp-idf/install.sh)"

# 2. 激活环境
source ~/esp-idf/export.sh

# 3. 克隆示例代码
git clone https://github.com/RockBase-iot/NM-Display-28inch.git
cd NM-Display-28inch

# 4. 配置项目
idf.py set-target esp32s3
idf.py menuconfig

# 5. 编译并烧录
idf.py build
idf.py flash monitor
```

### 3. 首次烧录

```bash
# 使用 esptool 烧录
esptool.py --chip esp32s3 --port /dev/ttyUSB0 write_flash 0x1000 bootloader.bin 0x8000 partition-table.bin 0x10000 app.bin
```

### 4. 串口监视

```bash
idf.py monitor
# 波特率: 115200
```

## 板载外设驱动

### IMU 驱动 (QMI8658)

```c
#include "qmi8658.h"

i2c_dev_t qmi8658;
esp_err_t ret = qmi8658_init(&qmi8658, I2C_NUM_0);

qmi8658_val mag;
ret = qmi8658_read_mag(&qmi8658, &mag);
// mag.x, mag.y, mag.z
```

### RTC 驱动 (PCF85063)

```c
#include "pcf85063.h"

pcf85063_set_time(&i2c_dev, 2026, 5, 19, 16, 56, 0);
pcf85063_get_time(&i2c_dev, &datetime);
```

### 音频播放 (ES8311)

```c
#include "es8311.h"

es8311_init(I2C_NUM_0);
es8311_set_volume(80); // 0-100

// 播放 PCM 数据流
es8311_play(audio_buffer, length);
```

### 触摸屏 (FT6336)

```c
#include "ft6336.h"

ft6336_init(I2C_NUM_0);
touch_point_t point;
if (ft6336_read_touch(&point)) {
    printf("Touch: x=%d, y=%d\n", point.x, point.y);
}
```

## 常见问题

### Q1: 触摸屏无响应怎么办？
**A1**: 检查 IO7/IO8 是否被其他设备占用，I2C 地址冲突可导致触摸失灵。使用 `i2cdetect` 工具扫描 I2C 总线，确认触摸芯片地址是否在 0x38 或 0x48。

### Q2: 背光不亮如何排查？
**A2**: 背光由 IO21 控制（LEDC PWM），检查 GPIO21 是否正确配置。测量 LCD 板上的背光电压确认电路正常。

### Q3: SD 卡无法挂载？
**A3**: 确保 SDMMC 引脚（IO9/IO10/IO11）未被其他功能占用。检查 SD 卡格式是否为 FAT32，最大支持 32GB。

### Q4: 如何进入下载模式？
**A4**: 按住 BOOT 按钮，然后按下并松开 RST 按钮，最后松开 BOOT 按钮。设备将进入 UART 下载模式。

### Q5: 突然断电无法开机怎么办？
**A5**: 可能是USB接口输入电压过低导致 PMU 保护触发，尝试更换高质量的电源或使用电池供电。另外，对于使用摄像头等外设的应用，一定要检查PMU AXP2101的配置是否正确，确保电源管理芯片能够提供足够的电流。具体可以参考[NM-Display-2.8 工厂测试代码](https://github.com/RockBase-iot/NM-Display-28inch/tree/Arduino/src/ui/factory_test/factory_test.cpp)

## 参考资料

| 资源 | 链接 |
|------|------|
| **示例代码** | [RockBase-iot/NM-Display-28inch](https://github.com/RockBase-iot/NM-Display-28inch) |
| **ESP-IDF 文档** | [https://docs.espressif.com/projects/esp-idf/](https://docs.espressif.com/projects/esp-idf/) |
| **ESP32-S3 数据手册** | [Espressif ESP32-S3 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf) |
