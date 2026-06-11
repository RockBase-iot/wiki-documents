---
sidebar_position: 5
---

# NM-ATGM336H

## 产品概述

**NM-ATGM336H** 是一款基于**中科微 AT6558** 芯片的紧凑型高性能 **GPS/GNSS** 定位模块。它支持包括 GPS、BDS（北斗）、GLONASS 和 GALILEO 在内的多星座卫星系统，可为物联网追踪、机器人、车载导航及户外定位应用提供快速、精准的定位服务。

该模块通过标准 UART 接口以 NMEA-0183 协议输出定位数据，与 ESP32、Arduino 和 Raspberry Pi 等主流微控制器即插即用兼容。

## 产品特性

- **多系统联合定位** — 支持 GPS / BDS / GLONASS / GALILEO 多系统联合定位
- **高灵敏度** — 冷启动灵敏度达 -148 dBm，跟踪灵敏度达 -162 dBm
- **快速定位** — 热启动 < 1 秒，冷启动 < 30 秒（典型值）
- **高刷新率** — 位置更新率最高可达 10 Hz
- **低功耗** — 捕获模式下工作电流 < 25 mA
- **标准 UART 接口** — TTL 电平，默认波特率 9600 bps（可配置）
- **NMEA-0183 协议** — 标准 GPRMC、GPGGA、GPGSA、GPGSV 语句输出
- **紧凑尺寸** — 12 × 16 mm 陶瓷天线模组，易于集成
- **内置电池座** — 支持 CR1220 备份电池，实现温启动与星历保持

## 硬件规格

| 项目 | 规格 |
|------|------|
| **芯片** | 中科微 AT6558 |
| **卫星系统** | GPS L1、BDS B1、GLONASS L1、GALILEO E1 |
| **通道数** | 32 跟踪通道 |
| **冷启动灵敏度** | -148 dBm |
| **跟踪灵敏度** | -162 dBm |
| **定位精度（水平）** | < 2.5 m CEP（开阔天空） |
| **速度精度** | < 0.1 m/s |
| **更新率** | 1 Hz（默认），最高 10 Hz |
| **UART 波特率** | 9600 bps（默认），4800–115200 bps 可配置 |
| **UART 电平** | TTL 3.3V / 5V 兼容 |
| **供电电压** | 3.3V – 5.0V DC |
| **工作电流** | ~25 mA（捕获），~20 mA（跟踪） |
| **备份电流** | < 10 µA（带备份电池） |
| **工作温度** | -40°C ~ +85°C |
| **尺寸** | 25.5 × 25.5 × 8.0 mm（含天线） |
| **天线** | 内置陶瓷贴片天线 + 支持外接天线 |

## 引脚定义

### UART 接口

| 引脚 | 名称 | 类型 | 说明 |
|------|------|------|------|
| 1 | VCC | 电源 | 3.3V – 5.0V 供电输入 |
| 2 | TXD | 输出 | UART TX（NMEA 数据输出） |
| 3 | RXD | 输入 | UART RX（指令输入） |
| 4 | GND | 电源 | 接地 |

> **注意：** PPS 引脚输出与 UTC 秒边界同步的精确 1 Hz 脉冲，适用于对时间精度要求较高的应用场景。

## 快速开始

### 与 ESP32 接线

与CYD系列开发板即插即用，无需接线。模块已预连接到 ESP32 的 UART 接口（TX=3，RX=1）。

### Arduino 示例

```cpp
#include <SoftwareSerial.h>

HardwareSerial GPSserial = HardwareSerial(2);

void setup() {
  Serial.begin(115200);
  GPSserial.begin(9600, SERIAL_8N1, 1, 3);
  Serial.println("NM-ATGM336H GPS 模块启动中...");
}

void loop() {
  while (GPSserial.available()) {
    char c = GPSserial.read();
    Serial.print(c); // 打印原始 NMEA 语句
  }
}
```

### MicroPython 示例

```python
from machine import UART
import time

# ESP32 UART2 (TX=3, RX=1)
gps = UART(2, baudrate=9600, tx=3, rx=1)

while True:
    if gps.any():
        data = gps.read()
        print(data.decode('utf-8', errors='ignore'), end='')
    time.sleep_ms(10)
```

### 使用 TinyGPS++ 解析（Arduino）

```cpp
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

TinyGPSPlus gps;
HardwareSerial GPSserial = HardwareSerial(2);

void setup() {
  Serial.begin(115200);
  GPSserial.begin(9600, SERIAL_8N1, 1, 3);
}

void loop() {
  while (GPSserial.available()) {
    gps.encode(GPSserial.read());
  }

  if (gps.location.isUpdated()) {
    Serial.print("纬度: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("经度: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("卫星数: ");
    Serial.println(gps.satellites.value());
  }
}
```

## NMEA 语句输出

NM-ATGM336H 默认以 1 Hz 频率输出标准 NMEA-0183 语句：

| 语句 | 说明 |
|------|------|
| `$GPRMC` | 推荐最小定位信息（时间、位置、速度） |
| `$GPGGA` | GPS 定位系统固定数据（时间、经纬度、定位质量） |
| `$GPGSA` | GNSS 精度因子与激活卫星 |
| `$GPGSV` | 可见 GNSS 卫星 |
| `$BDGSA` | 北斗精度因子与激活卫星（BDS 开启时） |
| `$BDGSV` | 可见北斗卫星 |

### NMEA 输出示例

```
$GPRMC,123519.00,A,3113.1234,N,12128.5678,E,0.15,180.50,030626,,,A*7E
$GPGGA,123519.00,3113.1234,N,12128.5678,E,1,08,1.2,15.3,M,0.0,M,,*5F
```

## 常见问题

### Q1：上电后为什么没有定位？
**A1**：首次上电（冷启动）需要下载卫星星历，在开阔天空环境下通常需要 30–60 秒。确保天线朝向开阔天空，室内或严重遮挡环境可能完全无法定位。安装 CR1220 备份电池可实现温/热启动，大幅缩短重新定位时间。

### Q2：如何提高定位精度？
**A2**：
- 确保模块朝向开阔天空，尽量减少遮挡。
- 在弱信号环境下使用外接有源天线。
- 开启多系统联合定位模式（GPS + BDS + GLONASS）以获得更好的卫星覆盖。
- 等待 DOP（精度因子）值降至 2.0 以下以获得最佳精度。

### Q3：模块可以在室内使用吗？
**A3**：NM-ATGM336H 配内置陶瓷天线，主要面向户外场景设计。室内定位通常不可靠，因为信号会被大幅衰减。如需室内应用，建议将外接有源天线放置在靠近窗户的位置。

### Q4：如何修改 UART 波特率？
**A4**：通过 UART 发送中科微 PMTK 指令即可配置模块。例如设置为 115200 bps：
```
$PMTK251,115200*1F\r\n
```
完整指令集请参考 ATGM336H 协议规范。

### Q5：PPS 引脚有什么作用？
**A5**：1PPS（秒脉冲）输出提供与 UTC 秒边界对齐的精确定时脉冲，相对 GNSS 时间的精度约为 ±10 ns。它适用于时间同步、时间戳标记和精密定时应用。

## 参考资料

| 资源 | 链接 |
|------|------|
| **产品页面** | [RockBase Shop — NM-ATGM336H](https://rockbase.shop/products/nm-atgm336h) |
| **ATGM336H 数据手册** | [中科微官网](http://www.zhongkewei.com/) |
| **TinyGPS++ 库** | [mikalhart/TinyGPSPlus](https://github.com/mikalhart/TinyGPSPlus) |
| **NMEA 参考** | [NMEA 0183 标准](https://en.wikipedia.org/wiki/NMEA_0183) |
