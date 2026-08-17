---
sidebar_position: 1
title: Projects Overview
description: Index of open-source firmware and application projects by RockBase IoT
---

# Projects Overview

This section collects open-source firmware and application projects officially adapted, ported, or co-developed by RockBase IoT. Every project runs directly on the corresponding RockBase / NMTech hardware, and most firmware images are available on the [RockBase IoT Web Flasher](https://flash.rockbaseiot.com) for one-click browser flashing.

## Index by Hardware Platform

### NM-TV-154 (1.54" desktop mini TV)

| Project | Type | Description |
|---------|------|-------------|
| [DeskBuddy-TV](./deskbuddy-tv.md) | Desktop companion | Six-page desktop buddy: weather / expressions / clock |
| [ESP32-Plane-Radar](./esp32-plane-radar.md) | ADS-B radar | Live aircraft radar with official NM-TV-154 support |

### NM-EPD-420 (4.2" e-ink dev board)

| Project | Type | Description |
|---------|------|-------------|
| [Meshtastic / MeshCore / TRMNL ports](./nm-epd-420-ecosystem.md) | LoRa / content framework | Official port branches of six open-source projects |
| [Biscuit](./biscuit.md) | Multi-purpose firmware | Turns an e-reader into a smart device, with a two-button NM-EPD-420 port |

### E-Ink Dashboard & Weather Station

| Project | Type | Description |
|---------|------|-------------|
| [ESP32-Dashboard](./esp32-dashboard.md) | Desk dashboard | Multi-page dashboard, no API key required (weather / timeline / world clock / focus clock) |
| [ESP32-Weather-EPD](./esp32-weather-epd.md) | Weather station | Ultra-low-power weather display, 7.5" and 4.2" tri-color panels, 6–12 months battery life |

### Hardware Buddy Desktop Companion

| Project | Description |
|---------|-------------|
| [Buddy Bridge App / Claude Desktop Buddy](./hardware-buddy.md) | USB-serial desktop companion app and Claude Bluetooth API example |

## Other Noteworthy Projects

- **[ESPWebApps](https://github.com/RockBase-iot/ESPWebApps)** — Firmware aggregation repository behind the Web Flasher; the community can submit new firmware via fork + PR
- **[esp-claw](https://github.com/RockBase-iot/esp-claw)** `nm-cyd-c5` branch — Espressif's Chat Coding AI agent framework with a built-in nmminer device-management skill

:::tip Flashing
Firmware marked as Web Flasher-ready can be flashed directly from Chrome / Edge at [flash.rockbaseiot.com](https://flash.rockbaseiot.com) — no development environment required.
:::
