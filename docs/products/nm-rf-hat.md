---
sidebar_position: 2
---

# NM-RF-HAT

## Overview

The NM-RF-HAT is an RF expansion module supporting dual-band communication in Sub-GHz and 2.4 GHz, suitable for smart home, industrial remote control, and wireless sensor networks.

## Specifications

| Parameter | Specification |
|-----------|---------------|
| RF Chip | CC1101 + nRF24L01 |
| Bands | 433/868/915 MHz + 2.4 GHz |
| TX Power | ≤ +20 dBm |
| RX Sensitivity | -120 dBm @ 0.6 kbps |
| Interface | SPI + GPIO |
| Dimensions | 30 x 65 mm |

## Usage

### SPI Wiring

| HAT Pin | Host Pin |
|---------|----------|
| SCK | GPIO14 |
| MISO | GPIO12 |
| MOSI | GPIO13 |
| CSN | GPIO15 |
| IRQ | GPIO16 |

### MicroPython Example

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

## Applications

- Smart home gateway
- Industrial wireless remote control
- Environmental monitoring nodes
- Low-power sensor networks
