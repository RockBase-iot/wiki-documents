---
sidebar_position: 7
title: Biscuit Multi-Purpose E-Ink Firmware
description: Turn an e-ink reader into a smart device — wireless tools, communication, games, and utilities
---

# Biscuit Multi-Purpose E-Ink Firmware

**Biscuit** is custom firmware originally built for the **Xteink X4** e-paper device. It turns a ~$70 e-ink reader into a smart device with wireless tools, security features, communication, games, and utilities — while **keeping full e-reader functionality**. RockBase has ported it to the [NM-EPD-420](../products/nm-epd-420.md).

- Firmware repository: [RockBase-iot/biscuit](https://github.com/RockBase-iot/biscuit)
- Upstream: forked from [CrossPoint Reader](https://github.com/crosspoint-reader/crosspoint-reader) — all core reading functionality comes from CrossPoint; Biscuit builds on top

## Design Philosophy

Biscuit treats the device as a general-purpose smart terminal rather than a single-purpose reader: the home screen is a **tile-based dashboard** with live system info (battery, heap, uptime, WiFi status); reading is one of eight categories, not the main focus.

The 4.26" / 4.2" e-ink display is readable in direct sunlight and retains its image without power, giving days of battery life; physical buttons provide touchscreen-free navigation; WiFi and BLE 5.0 power the wireless tools; a MicroSD card stores everything.

## Hardware Comparison

| Spec | Xteink X4 (original) | NM-EPD-420 (port) |
|------|----------------------|-------------------|
| SoC | ESP32-C3 (RISC-V, 160 MHz) | ESP32-S3 (Xtensa, 240 MHz) |
| RAM | 380 KB SRAM (no PSRAM) | 380 KB SRAM + 8 MB PSRAM |
| Flash | 16 MB | 16 MB |
| Display | 4.26" 800×480 mono e-ink | 4.2" 400×300, tri-color GDEY042Z98 or BW GYE042A87 |
| Input | 7 buttons (4 front, 3 side) | 2 buttons (USER left / BOOT right) |
| Wireless | 2.4 GHz Wi-Fi + BLE 5.0 | 2.4 GHz Wi-Fi + BLE 5.0 |
| Storage | MicroSD (FAT32) | MicroSD (FAT32) |
| Port | USB-C (serial + power) | USB-C (serial + power) |

## NM-EPD-420 Port

### Build Variants

| PlatformIO environment | Panel | Notes |
|------------------------|-------|-------|
| `nm_epd_420` | GDEY042Z98 tri-color panel (with UC8179-compatible fallback) | Standard NM-EPD-420 port |
| `nm_epd_420_bw` | GYE042A87 black/white panel | Same pins and UI behavior, uses the faster BW GxEPD2 driver |

### Two-Button Control Model

The port maps the X4's seven buttons onto the board's two built-in buttons:

| Action | Meaning |
|--------|---------|
| USER short press | Up / previous item / previous page |
| BOOT short press | Down / next item / next page |
| USER hold | Back |
| BOOT hold | Confirm / open |
| USER + BOOT hold | Logical power action |

See `docs/nm-epd-420-controls.md` in the repository for the full button mapping, timing thresholds, and on-screen hint labels.

:::tip Build & Flash
Clone the repo and build with PlatformIO: `pio run -e nm_epd_420` (tri-color) or `pio run -e nm_epd_420_bw` (BW). The firmware is also available on the [Web Flasher](https://flash.rockbaseiot.com) for one-click browser flashing.
:::
