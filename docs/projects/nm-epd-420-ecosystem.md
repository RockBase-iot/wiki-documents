---
sidebar_position: 4
title: NM-EPD-420 Port Ecosystem
description: Official NM-EPD-420 ports of Meshtastic, MeshCore, TRMNL and more
---

# NM-EPD-420 Port Ecosystem

The [NM-EPD-420](../products/nm-epd-420.md) (ESP32-S3 + 4.2" e-ink) has been officially ported to ten open-source projects. Clone the linked branch and build — application firmware for these projects is also available on the [RockBase IoT Web Flasher](https://flash.rockbaseiot.com).

## Ported Projects

| Project | Description | Adapted repository / branch |
|---------|-------------|-----------------------------|
| **Meshtastic** | Off-grid LoRa mesh messaging; shows node info, messages, and sensor data on the 4.2" e-ink panel (HT-RA62 module, SX1262) | [meshtastic-firmware@`nm-epd-420`](https://github.com/RockBase-iot/meshtastic-firmware/tree/nm-epd-420) |
| **MeshCore** | Lightweight, low-power LoRa gateway firmware | [RockBase-iot/MeshCore](https://github.com/RockBase-iot/MeshCore) |
| **TRMNL-Firmware** | TRMNL e-ink content framework; fetches images/content from a server on a schedule | [trmnl-firmware@`nm-epd-420`](https://github.com/RockBase-iot/trmnl-firmware/tree/nm-epd-420) |
| **Biscuit** | Multi-purpose tool / entertainment firmware for e-ink devices | [biscuit@`master`](https://github.com/RockBase-iot/biscuit/tree/master) |
| **ESP32-weather-epd** | Low-power weather station; fetches data from OpenWeatherMap | [esp32-weather-epd@`main`](https://github.com/RockBase-iot/esp32-weather-epd/tree/main) |
| **ESP32-Dashboard** | Multi-function e-ink dashboard: weather, air quality, indoor T/RH, web config portal | [ESP32-Dashboard@`main`](https://github.com/RockBase-iot/ESP32-Dashboard/tree/main) |
| **NM-EPD420-BW Demo** | Official NM-EPD-420-BW reference demo firmware, ported from the ZECTRIX NOTE4 EPD demo; demonstrates partial/fast refresh on the black-and-white panel — also flashable in one click via the Web Flasher | [RockBase-iot/nm-epd420-bw-demo](https://github.com/RockBase-iot/nm-epd420-bw-demo) |
| **Inkstone Firmware** | RockBase IoT's own local image-push firmware: open `inkstone.local` in a browser to pick an image, crop it, preview two quantization algorithms, and push it to the panel; Bearer-authenticated HTTP API (currently supports NM-EPD-420-4C). See the [Inkstone project page](./inkstone-firmware.md) | [RockBase-iot/Inkstone-firmware](https://github.com/RockBase-iot/Inkstone-firmware) |
| **emini Home** | Four-color "poster of your day" firmware (weather, headline, note, sunrise/sunset & moon phase, air quality) with phone-browser provisioning; the RockBase fork supports NM-EPD-420-4C (upstream [fiedoruk/emini-home](https://github.com/fiedoruk/emini-home), originally for the ZECTRIX NOTE4C) | [RockBase-iot/emini-home](https://github.com/RockBase-iot/emini-home) |
| **AgentDeck** | Third-party project that puts AI coding agent status on a physical e-ink display, targeting the NM-EPD-420; flashable via the Web Flasher | [puritysb/AgentDeck](https://github.com/puritysb/AgentDeck) |

## Meshtastic Terminal

Meshtastic is the popular off-grid LoRa mesh communication project. The `nm-epd-420` branch presents node info, messages, and sensor data on the 4.2-inch e-ink panel — combined with the onboard SX126x header (HT-RA62 module), it becomes a desktop LoRa communication terminal.

On the NM-EPD-420-BW, the build additionally enables the InkHUD interface (2026-08-17) and ES8311 audio support (2026-09-03).

:::info LoRa Availability
The standard tri-color NM-EPD-420 does not include a LoRa module and targets general desktop applications. **The NM-EPD-420-BW (black-and-white) version includes LoRa support by default**, making it suitable as an indoor desktop LoRa node.
:::

## MeshCore Gateway

MeshCore is a lightweight, hybrid-routing mesh packet-radio protocol. The NM-EPD-420 can run as a low-power MeshCore LoRa gateway node, well suited for long-term off-grid deployments (pair it with the [NM-Solar](../products/nm-solar.md) solar power supply).

The [RockBase IoT Web Flasher](https://flash.rockbaseiot.com) now offers one-click MeshCore v1.17.0 builds for the NM-EPD-420-BW in all five device roles — **Companion Radio (BLE)**, **Companion Radio (USB)**, **KISS Modem**, **Repeater**, and **Room Server** — no toolchain required.

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
