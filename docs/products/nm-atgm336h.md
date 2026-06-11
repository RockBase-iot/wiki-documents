---
sidebar_position: 5
---

# NM-ATGM336H

## Overview

The **NM-ATGM336H** is a compact, high-performance **GPS/GNSS** positioning module based on the **Zhongke Micro AT6558** chip, which supports a variety ofsatellite systems including GPS, BDS (BeiDou), GLONASS, and GALILEO, providing fast and accurate positioning for IoT tracking, robotics, vehicle navigation, and outdoor positioning applications. **AT6558** is a true six-in-one multi-mode satellite navigation and positioning chip, including 32 tracking channels, which can receive GNSS signals from six satellite navigation systems at the same time, and realize joint positioning, navigation and timing. This series of modules has the advantages of high sensitivity, low power consumption, and low cost. It is suitable for car navigation, handheld positioning, and wearable devices. *It can directly replace UBlox MAX series modules.*

The module communicates via a standard UART interface with NMEA-0183 protocol output, making it plug-and-play compatible with most microcontrollers including ESP32, Arduino, and Raspberry Pi. For specific information, please refer to "CASIC Multimode Satellite Navigation Receiver Protocol Specification".

## Features

- **Multi-GNSS Support** — GPS / BDS / GLONASS / GALILEO multi-system joint positioning
- **High Sensitivity** — Cold start sensitivity up to -148 dBm, tracking sensitivity up to -162 dBm
- **Fast TTFF** — Hot start < 1s, cold start < 30s (typical)
- **High Update Rate** — Up to 10 Hz position update rate
- **Low Power Consumption** — Operating current < 25 mA (acquisition mode)
- **Standard UART Interface** — TTL level, default baud rate 9600 bps (configurable)
- **NMEA-0183 Protocol** — Standard GPRMC, GPGGA, GPGSA, GPGSV sentence output
- **Compact Form Factor** — 12 × 16 mm ceramic antenna module, easy to integrate
- **Built-in Battery Holder** — Supports CR1220 backup battery for warm start and ephemeris retention

## Hardware Specifications

| Item | Specification |
|------|---------------|
| **Chip** | Zhongke Micro AT6558 |
| **Constellations** | GPS L1, BDS B1, GLONASS L1 |
| **Channels** | 32 tracking channels |
| **Sensitivity (Cold Start)** | -148 dBm |
| **Sensitivity (Tracking)** | -162 dBm |
| **Accuracy (Horizontal)** | < 2.5 m CEP (open sky) |
| **UART Baud Rate** | 9600 bps (default), 4800–115200 bps configurable |
| **UART Level** | TTL 3.3V / 5V compatible |
| **Supply Voltage** | 3.3V – 5.0V DC |
| **Operating Current** | ~25 mA (acquisition), ~20 mA (tracking) |
| **Backup Current** | < 10 µA (with backup battery) |
| **Operating Temperature** | -40°C ~ +85°C |
| **Dimensions** | 25.5 × 25.5 × 8.0 mm (including antenna) |
| **Antenna** | Built-in ceramic patch antenna + external antenna support |

## Pinout

### UART Interface

| Pin | Name | Type | Description |
|-----|------|------|-------------|
| 1 | VCC | Power | 3.3V – 5.0V supply input |
| 2 | TXD | Output | UART TX (NMEA data output) |
| 3 | RXD | Input | UART RX (command input) |
| 4 | GND | Power | Ground |

> **Note:** The NM-ATGM336H for CYD series Plug-and-plug, no PPS pin, which will add the next version.

## Quick Start

### Wiring with ESP32 (ESP32-2432S028R, CYD)

Just Plug-and-play with the CYD series development board, no wiring needed. The module is pre-connected to the UART interface (TX=3, RX=1) of the ESP32.

### Arduino Example

```cpp

HardwareSerial GPSserial = HardwareSerial(2);

void setup() {
  Serial.begin(115200);
  GPSserial.begin(9600, SERIAL_8N1, 1, 3);
  Serial.println("NM-ATGM336H GPS Module Starting...");
}

void loop() {
  while (GPSserial.available()) {
    char c = GPSserial.read();
    Serial.print(c); // Print raw NMEA sentences
  }
}
```

### MicroPython Example

```python
from machine import UART
import time

# UART2 on ESP32 (TX=3, RX=1)
gps = UART(2, baudrate=9600, tx=3, rx=1)

while True:
    if gps.any():
        data = gps.read()
        print(data.decode('utf-8', errors='ignore'), end='')
    time.sleep_ms(10)
```

### Parsing NMEA with TinyGPS++ (Arduino)

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
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
  }
}
```

## NMEA Sentence Output

The NM-ATGM336H outputs standard NMEA-0183 sentences at 1 Hz by default:

| Sentence | Description |
|----------|-------------|
| `$GPRMC` | Recommended minimum specific GPS/Transit data (time, position, speed) |
| `$GPGGA` | Global positioning system fix data (time, latitude, longitude, fix quality) |
| `$GPGSA` | GNSS DOP and active satellites |
| `$GPGSV` | GNSS satellites in view |
| `$BDGSA` | BeiDou DOP and active satellites (when BDS enabled) |
| `$BDGSV` | BeiDou satellites in view |

### Example NMEA Output

```
$GPRMC,123519.00,A,3113.1234,N,12128.5678,E,0.15,180.50,030626,,,A*7E
$GPGGA,123519.00,3113.1234,N,12128.5678,E,1,08,1.2,15.3,M,0.0,M,,*5F
```

## FAQ

### Q1: Why is there no position fix after powering on?
**A1**: First power-on (cold start) requires satellite ephemeris download, which typically takes 30–60 seconds in open sky. Ensure the antenna has a clear view of the sky. Indoor or heavily obstructed environments may prevent fix entirely. Installing a CR1220 backup battery enables warm/hot starts for faster re-acquisition.

### Q2: How to improve positioning accuracy?
**A2**: 
- Ensure the module has a clear sky view with minimal obstructions.
- Use an external active antenna in weak signal environments.
- Enable multi-GNSS mode (GPS + BDS + GLONASS) for better satellite coverage.
- Wait for DOP (Dilution of Precision) values to drop below 2.0 for optimal accuracy.

### Q3: Can the module work indoors?
**A3**: The NM-ATGM336H with built-in ceramic antenna is designed for outdoor use. Indoor positioning is generally not reliable due to signal attenuation. For indoor applications, consider using an external active antenna placed near a window.

### Q4: How to change the UART baud rate?
**A4**: Send the proprietary PMTK command via UART to configure the module. Example for 115200 bps:
```
$PMTK251,115200*1F\r\n
```
Refer to the ATGM336H protocol specification for the full command set.

### Q5: What is the PPS pin used for?
**A5**: The 1PPS (Pulse Per Second) output provides a precise timing pulse aligned to UTC seconds boundary with ±10 ns accuracy relative to GNSS time. It is useful for time synchronization, timestamping, and precise timing applications.

## Resources

| Resource | Link |
|----------|------|
| **Product Page** | [RockBase Shop — NM-ATGM336H](https://rockbase.shop/products/nm-atgm336h) |
| **ATGM336H Datasheet** | [Zhongke Micro ATGM336H](http://www.zhongkewei.com/) |
| **TinyGPS++ Library** | [mikalhart/TinyGPSPlus](https://github.com/mikalhart/TinyGPSPlus) |
| **NMEA Reference** | [NMEA 0183 Standard](https://en.wikipedia.org/wiki/NMEA_0183) |
