---
sidebar_position: 1
---

# NM-EPD-420 with ESP32-Dashboard

> Build a low-power 4.2-inch tri-color e-paper weather dashboard on NM-EPD-420.

## Overview

[ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard) is an open-source e-paper dashboard project by RockBase IoT. On NM-EPD-420 (ESP32-S3 + 4.2-inch tri-color EPD), it provides a practical always-on information screen for weather, air quality, and local environment data. Compared to the esp32-weather-epd project, this implementation uses a more cost-effective and faster-refreshing 4.2-inch tri-color panel, is easier to get started with, and offers richer features and configuration options. The Web-based configuration portal also makes customization more accessible.

This page explains how to deploy and use it on NM-EPD-420.

## What You Get on NM-EPD-420

- 4.2-inch tri-color e-paper UI (red/black/white), 400 x 300
- Open-Meteo weather + air quality data (no API key required)
- Indoor temperature and humidity from onboard AHT20
- Deep sleep power-saving wake cycle (default 30 minutes)
- Web configuration portal for Wi-Fi, city/location, unit, language, and sleep schedule
- Multilingual UI support (`en_US`, `zh_CN`)

## Hardware and Environment

- Board: NM-EPD-420 (ESP32-S3)
- Framework: Arduino (via PlatformIO)
- Recommended toolchain: VS Code + PlatformIO IDE
- Project repository: [RockBase-iot/ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard)

## Quick Deployment

### 1. Clone the project

```bash
git clone https://github.com/RockBase-iot/ESP32-Dashboard.git
cd ESP32-Dashboard
```

### 2. Open in VS Code

Open the folder in VS Code with PlatformIO extension installed. Dependencies are resolved automatically.

### 3. Build and flash NM-EPD-420 firmware

```bash
pio run -e nm-display-420 -t upload
```

The project also packs and uploads the LittleFS web portal resources automatically.

### 4. First-time configuration (AP mode)

- Long press Boot button (IO0, the third button above the screen) for at least 2 seconds to enter AP config mode
- Connect to hotspot `esp_dashboard_XXXXXX`
- Open `http://192.168.4.1`
- Configure Wi-Fi, location, timezone, and units, then save
- Device restarts and begins normal dashboard refresh cycle

### 5. Reopen web portal later

- Short press Boot button (IO0, the third button above the screen) to keep web portal alive for 5 minutes
- Open `http://<device-ip>` from the same LAN

## Key Configuration Items

- Wi-Fi SSID / password
- Latitude / longitude and city display name
- UTC offset
- Sleep interval
- Bed time / wake time window
- Unit systems (temperature, wind speed, pressure, distance, precipitation)
- Language (`en_US` / `zh_CN`)

## NM-EPD-420 Notes

- Recommended PlatformIO environment: `nm-display-420`
- Display driver is based on 4.2-inch tri-color panel (GDEY042Z98)
- The board includes AHT20 sensor support in this project
- IO0 is used for wake/config interaction and deep-sleep wake behavior

## Typical Application Scenarios

- Desk weather and AQI board
- Smart home status panel
- Low-power wall-mounted daily briefing display
- Secondary information display in maker projects

## Related Links

- [ESP32-Dashboard Repository](https://github.com/RockBase-iot/ESP32-Dashboard)
- [NM-EPD-420 Product Page](/docs/products/nm-epd-420)
- [NM-EPD-420 Quick Start](/docs/products/nm-epd-420-quickstart)
