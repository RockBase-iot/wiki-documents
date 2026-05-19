---
sidebar_position: 2
---

# NM-RF-HAT

## 产品概述

NM-RF-HAT 是一款射频扩展模块，支持 Sub-GHz 与 2.4 GHz 双频段通信，适用于智能家居、工业遥控与无线传感网络。

## 规格参数

| 参数 | 规格 |
|------|------|
| 射频芯片 | CC1101 + nRF24L01 |
| 频段 | 433/868/915 MHz + 2.4 GHz |
| 发射功率 | ≤ +20 dBm |
| 接收灵敏度 | -120 dBm @ 0.6 kbps |
| 接口 | SPI + GPIO |
| 尺寸 | 30 × 65 mm |

## 使用说明

### SPI 接线

| HAT 引脚 | 主控引脚 |
|----------|----------|
| SCK | GPIO14 |
| MISO | GPIO12 |
| MOSI | GPIO13 |
| CSN | GPIO15 |
| IRQ | GPIO16 |

### MicroPython 示例

```python
from machine import SPI, Pin
import nrf24l01

spi = SPI(1, baudrate=10000000, sck=Pin(14), mosi=Pin(13), miso=Pin(12))
csn = Pin(15, Pin.OUT, value=1)
ce = Pin(17, Pin.OUT, value=0)

radio = nrf24l01.NRF24L01(spi, csn, ce)
radio.open_tx_pipe(b'1Node')
radio.open_rx_pipe(1, b'2Node')
radio.start_listening()
```

## 应用场景

- 智能家居网关
- 工业无线遥控
- 环境监测节点
- 低功耗传感网络
