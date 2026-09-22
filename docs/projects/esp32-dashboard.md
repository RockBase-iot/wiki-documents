---
sidebar_position: 5
title: ESP32-Dashboard
description: Multi-page e-ink dashboard firmware, no API key required (weather / timeline / world clock / focus clock)
---

# ESP32-Dashboard

**ESP32-Dashboard** is an e-paper dashboard running on ESP32. The current version includes multiple production pages (weather, timeline, world clock, focus clock, and more), powered by the free [Open-Meteo](https://open-meteo.com/) API — **no API key or account required**.

- Firmware repository: [RockBase-iot/ESP32-Dashboard](https://github.com/RockBase-iot/ESP32-Dashboard) (Chinese README available as `README_cn.md`)
- Stack: PlatformIO + Arduino (espressif32 @ 6.13.0)
- Hardware: [NM-EPD-420](../products/nm-epd-420.md) and other ESP32 + e-paper combinations

The vision is a true **"Dashboard for anything"** on e-paper; the roadmap includes cryptocurrency prices, stock market data, local IoT device monitoring, and more.

## Pages

| Page ID | Name | Content |
|---------|------|---------|
| P0 | Standard page | Time and core info overview |
| P1 | Weather Today | Temperature, feels-like, wind, humidity, pressure, visibility, UV index |
| P2 | Today Overview | Daily summary |
| P4 | Weekly Timeline | Week timeline |
| P5 | Monthly Overview | Month view |
| P6 | Weekly Weather | 5-day forecast with WMO weather icons |
| P7 | World Clock | Multi-timezone clocks |
| P8 | Focus Clock | Pomodoro-style focus timer with independent duration setting |

Also included: an hourly temperature trend line with a 12-hour precipitation-probability bar chart, indoor temperature/humidity from an onboard AHT20 / BME280 sensor, and US AQI with PM2.5 concentration.

## Features

- **Key-free weather data**: Open-Meteo weather + air quality, free, no account
- **Low power**: configurable update interval (default 30 min) with deep sleep between updates; bed-time/wake-time window skips night refreshes
- **AP config mode**: long-press the Boot button to start a hotspot for first-time setup — no app needed
- **Browser config portal**: WiFi, location, units, timezone, sleep interval; menus grouped as `device` / `pages` / `data-source`
- **Power-on config window**: after each WiFi connection the web portal stays reachable at the device IP (`PortalSec`, default 30 s; set `0` to disable for maximum power saving)
- **Multilingual UI**: `en_US`, `zh_CN`
- **Configurable units**: °C/°F, km/h/m/s/mph/kn, hPa/inHg/mmHg, km/mi, mm/in
- **Tri-color accents** on compatible red/black/white panels
- **Four-color panel support**: NM-EPD-420-4C (4.2″ black/white/red/yellow, GDEY0420F51) via the `nm-epd-420-4c` PlatformIO environment; the yellow channel is currently reserved for the Home page UI
- **Home themes**: three `HomeWeatherTheme` themes — HOME-RHYTHM, HOME-ATLAS, HOME-PRINT — for the Home page on the four-color panel
- **Calendar sync**: Google Calendar ICS feeds as a data source (see below)
- **SNTP time sync** with configurable UTC offset

## Calendar Data Source

Since v1.0.0 the dashboard can sync calendar events from an ICS feed:

1. In Google Calendar, open the calendar's settings and copy its **secret iCal (ICS) URL**.
2. In the device web portal, open the `data-source` menu and paste the ICS URL into the calendar source field.
3. Calendar pages will render events from the feed on the next refresh.

`webcal://` links are normalized to HTTPS. Outlook Calendar and Apple Calendar ICS feeds follow the same mechanism but are **not fully tested** in the current release.

## Quick Start

1. Flash via the [Web Flasher](https://flash.rockbaseiot.com), or clone the repo and build with PlatformIO
2. Long-press the Boot button to enter AP config mode; connect to the hotspot to set Wi-Fi and location
3. Afterwards, open the device IP in a browser anytime to adjust pages and data sources

:::info NM-EPD-420 Deployment Guide
For wiring, build, and flashing steps specific to the NM-EPD-420, see [ESP32-Dashboard on NM-EPD-420](./esp32-dashboard-nm-epd-420.md).
:::
