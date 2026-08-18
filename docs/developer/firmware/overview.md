---
sidebar_position: 1
title: Official Firmware
description: How to obtain, upgrade, and verify official RockBase IoT firmware
---

# Official Firmware

This page summarizes how to obtain and upgrade **official firmware** for RockBase IoT hardware.

:::warning Before You Flash
Before flashing or upgrading, double-check the **device model and firmware name** (in particular, the NM-EPD-420 tri-color and BW versions are not cross-flashable), and back up important configuration and data.
:::

## Where to Get Firmware

| Channel | Best for | Entry |
|---------|----------|-------|
| **Web Flasher** | One-click browser flashing, no dev environment (recommended) | [flash.rockbaseiot.com](https://flash.rockbaseiot.com) |
| **GitHub Releases** | Download packages for local flashing / further development | The Releases page of each product repository |
| **Build from source** | Custom feature development | Each product repository (PlatformIO / Arduino projects) |

For detailed Web Flasher steps and troubleshooting, see the [Web Flasher Guide](../../platform/web-flasher.md).

## Factory Test Firmware

Some products (e.g. the [NM-EPD-420](../../products/nm-epd-420.md)) ship a **factory test firmware** in their repository. Its purpose is to let the production line — or a developer — quickly verify that all onboard peripherals (display, sensors, audio, SD card, buttons) work after power-on. It is not a daily-use application firmware; flash your target application firmware once verification is done.

## Upgrade Steps (Web Flasher)

1. Connect the device with a data-capable USB-C cable
2. Open [flash.rockbaseiot.com](https://flash.rockbaseiot.com) and select App → Device model → Version
3. Click Connect to pick the serial port, then Flash to start. If it fails, hold BOOT, then press RESET or power-cycle to enter BOOT mode, and try again
4. If you flashed in BOOT mode, press RESET or power-cycle when finished

## Firmware Entry Points by Device

| Device | Official firmware repository |
|--------|------------------------------|
| NM-CYD-C5 | [RockBase-iot/NM-CYD-C5](https://github.com/RockBase-iot/NM-CYD-C5) |
| NM-TV-154 | [RockBase-iot/NM-TV-154](https://github.com/RockBase-iot/NM-TV-154) |
| NM-EPD-420 | [RockBase-iot/NM-EPD-420](https://github.com/RockBase-iot/NM-EPD-420) |
| NM-Display-28inch | [RockBase-iot/NM-Display-28inch](https://github.com/RockBase-iot/NM-Display-28inch) |
| K230-Vision | [K230-Vision Releases](https://github.com/RockBase-iot/K230-Vision/releases) (SD card system images) |
