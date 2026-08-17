---
sidebar_position: 4
title: NM-EPD-420 Port Ecosystem
description: Official NM-EPD-420 ports of Meshtastic, MeshCore, TRMNL and more
---

# NM-EPD-420 Port Ecosystem

The [NM-EPD-420](../products/nm-epd-420.md) (ESP32-S3 + 4.2" e-ink) has been officially ported to six open-source projects. Clone the linked branch and build — application firmware for these projects is also available on the [RockBase IoT Web Flasher](https://flash.rockbaseiot.com).

## Ported Projects

| Project | Description | Adapted repository / branch |
|---------|-------------|-----------------------------|
| **Meshtastic** | Off-grid LoRa mesh messaging; shows node info, messages, and sensor data on the 4.2" e-ink panel (HT-RA62 module, SX1262) | [meshtastic-firmware@`nm-epd-420`](https://github.com/RockBase-iot/meshtastic-firmware/tree/nm-epd-420) |
| **MeshCore** | Lightweight, low-power LoRa gateway firmware | [RockBase-iot/MeshCore](https://github.com/RockBase-iot/MeshCore) |
| **TRMNL-Firmware** | TRMNL e-ink content framework; fetches images/content from a server on a schedule | [trmnl-firmware@`nm-epd-420`](https://github.com/RockBase-iot/trmnl-firmware/tree/nm-epd-420) |
| **Biscuit** | Multi-purpose tool / entertainment firmware for e-ink devices | [biscuit@`master`](https://github.com/RockBase-iot/biscuit/tree/master) |
| **ESP32-weather-epd** | Low-power weather station; fetches data from OpenWeatherMap | [esp32-weather-epd@`main`](https://github.com/RockBase-iot/esp32-weather-epd/tree/main) |
| **ESP32-Dashboard** | Multi-function e-ink dashboard: weather, air quality, indoor T/RH, web config portal | [ESP32-Dashboard@`main`](https://github.com/RockBase-iot/ESP32-Dashboard/tree/main) |

## Meshtastic Terminal

Meshtastic is the popular off-grid LoRa mesh communication project. The `nm-epd-420` branch presents node info, messages, and sensor data on the 4.2-inch e-ink panel — combined with the onboard SX126x header (HT-RA62 module), it becomes a desktop LoRa communication terminal.

:::info LoRa Availability
The standard tri-color NM-EPD-420 does not include a LoRa module and targets general desktop applications. **The NM-EPD-420-BW (black-and-white) version includes LoRa support by default**, making it suitable as an indoor desktop LoRa node.
:::

## MeshCore Gateway

MeshCore is a lightweight, hybrid-routing mesh packet-radio protocol. The NM-EPD-420 can run as a low-power MeshCore LoRa gateway node, well suited for long-term off-grid deployments (pair it with the [NM-Solar](../products/nm-solar.md) solar power supply).

## TRMNL Content Framework

TRMNL is a "server pushes images/content on a schedule → e-ink displays them" framework. The port branch lets you use the NM-EPD-420 as a TRMNL-compatible device with self-hosted or third-party content sources.

## Biscuit {#biscuit}

Biscuit is a multi-purpose tool/entertainment firmware for e-ink devices, fully adapted to the NM-EPD-420 display and peripherals (including a two-button control model and tri-color/BW build variants). See the [Biscuit project page](./biscuit.md).

## Weather Station & Dashboard

- **[ESP32-Weather-EPD](./esp32-weather-epd.md)**: the classic low-power e-ink weather station, fetching data from OpenWeatherMap
- **[ESP32-Dashboard](./esp32-dashboard.md)**: a fuller e-ink dashboard — no API key required (Open-Meteo), built-in web config portal, showing weather, air quality, and indoor T/RH together

:::tip Which Panel to Choose
For mostly static content (weather, calendar, info panels) choose the **tri-color** version; for faster updates (message notifications, mesh node status) choose the **black-and-white (BW)** version with partial refresh support.
:::
