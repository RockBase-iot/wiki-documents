---
sidebar_position: 3
title: ESP32-Plane-Radar
description: Live ADS-B aircraft radar on the NM-TV-154
---

# ESP32-Plane-Radar

**ESP32-Plane-Radar** is open-source firmware that draws a sonar-style radar of live aircraft around your location on a small round or square display. The original project targets the ESP32-C3 Super Mini + 1.28" GC9A01 round display; **the RockBase IoT team officially added support for the NM-TV-154** (ESP32 + 1.54" ST7789 square display, 240×240).

- Firmware repository: [RockBase-iot/ESP32-Plane-Radar](https://github.com/RockBase-iot/ESP32-Plane-Radar)
- Data source: [adsb.fi](https://opendata.adsb.fi/) open ADS-B data
- 3D-printed case: [MakerWorld model](https://makerworld.com/en/models/2872376-esp32-plane-radar-live-ads-b-on-a-round-display#profileId-3207083)

## How It Works

1. **Wi-Fi setup** (first run) — the device starts an AP named `PlaneRadar-Setup` with a captive portal
2. **Radar** — live aircraft from adsb.fi are plotted on a radar grid centered on your configured location, refreshing about every 5 seconds

Once Wi-Fi credentials are saved, the device reconnects automatically and the radar runs in the main loop.

## Controls

### Generic (BOOT button, GPIO 9, active LOW)

| Action | Effect |
|--------|--------|
| Short tap | Cycle range preset (5 → 10 → 15 → 25 km), saved to flash |
| Hold 3 s | Clear Wi-Fi, location, and units; reboot into the setup portal |

Holding BOOT at power-on also forces a credential reset (same as the long press).

### NM-TV-154 Touch Control

On the NM-TV-154, the onboard **capacitive touch key (T9 / GPIO32)** cycles the same range presets (5 → 10 → 15 → 25 km) without using the BOOT button.

## Verified NM-TV-154 Pins

| Signal | Value |
|--------|-------|
| Display | ST7789, 240×240 |
| LCD power | GPIO **21** (LOW = enabled) |
| Backlight | GPIO **19** (active LOW) |
| Touch | **T9 / GPIO32** |

:::tip Setup Tip
The setup portal also lets you configure the radar center (latitude/longitude) and unit system. If anything is misconfigured, there is no need to reflash — hold BOOT for 3 seconds to reset everything.
:::
