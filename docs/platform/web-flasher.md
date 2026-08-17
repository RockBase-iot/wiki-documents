---
sidebar_position: 1
title: Web Flasher Guide
description: Flash ESP32 firmware from your browser with flash.rockbaseiot.com
---

# Web Flasher Guide

**[flash.rockbaseiot.com](https://flash.rockbaseiot.com)** is RockBase IoT's web flashing platform: download and flash firmware to ESP32 devices directly from your browser, with no development environment to install.

## What's Supported

- Official firmware for all RockBase / NMTech hardware (NM-CYD-C5, NM-TV-154, NM-EPD-420, etc.)
- Popular community open-source projects: **Bruce**, **Marauder**, **ESP-Claw**, and more
- Ported application firmware for the NM-EPD-420 (Meshtastic, ESP32-Dashboard, ESP32-Weather-EPD, Biscuit, etc.)

Firmware is maintained centrally in the [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) aggregation repository and grows continuously. If you need additional firmware packages, device support, or workflow improvements, contact the team.

## Browser Requirements

Web flashing relies on the **Web Serial API**:

- ✅ Chrome / Edge (desktop, latest version recommended)
- ❌ Firefox / Safari (Web Serial not supported)

## Flashing Steps

1. **Connect the device**: plug the board into your computer with a data-capable USB-C cable
2. **Open the site**: go to [flash.rockbaseiot.com](https://flash.rockbaseiot.com)
3. **Pick firmware**: select by App → Device model → Version
4. **Connect the serial port**: click Connect and choose your device from the port list
5. **Flash**: click Flash / Install and wait for the progress to complete
6. **Reboot**: press RESET or power-cycle the device

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| Empty port list | Use a data-capable USB cable (not charge-only); on Windows install the CH340 / CP210x driver |
| Connection failed / flashing interrupted | Try another USB port or cable; lower the flash baud rate if the page offers the option |
| Device won't enter download mode | Hold **BOOT** while clicking Connect, or hold BOOT, tap RESET, then release |
| Blank screen after flashing | Make sure the selected firmware exactly matches your device model / panel version (e.g. NM-EPD-420 tri-color vs BW) |

:::warning Note
Confirm hardware compatibility before flashing third-party firmware (e.g. Bruce, Marauder). Flashing erases the existing firmware and data on the device.
:::

:::info Developers
Want your firmware listed on the Web Flasher? Read the [ESPWebApps Contribution Guide](./espwebapps.md).
:::
