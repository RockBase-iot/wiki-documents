---
sidebar_position: 2
title: DeskBuddy-TV Desktop Companion
description: Desktop weather / mood companion firmware for the NM-TV-154
---

# DeskBuddy-TV Desktop Companion

**DeskBuddy-TV** is a desktop weather / mood companion firmware built for the [NM-TV-154](../products/nm-tv-154.md). It turns the 1.54-inch square screen into a blinking, expressive desk buddy while delivering complete weather and air-quality information.

- Firmware repository: [RockBase-iot/deskbuddy-tv](https://github.com/RockBase-iot/deskbuddy-tv)
- Hardware: NM-TV-154 (ESP32 + ST7789 240×240 + capacitive touch key)

## Pages

The device cycles through 6 pages:

| Page | Content |
|------|---------|
| 1. Eyes | Animated eyes that blink and look around, with 7 expressions |
| 2. Clock | Current time, date, and device IP address |
| 3. Current Weather | Temperature, condition, feels-like, humidity, wind speed, pressure |
| 4. Forecast | 5-day forecast with date, high/low, rain probability, condition |
| 5. Hourly Graph | 24-hour temperature line + rain-probability bar chart |
| 6. Air Quality | US/EU AQI, PM2.5, PM10, O₃, NO₂, CO |

## Expressions

On the **Eyes** page, **long-press the touch key** to cycle through:

1. **Normal** – classic oval eye with round pupil
2. **Round** – fully round eye
3. **Heart** – heart-shaped pupil
4. **Star** – star-shaped pupil
5. **Angry** – angry eyebrow
6. **Cute** – tall oval eyes, cheeks, small mouth
7. **Glasses** – glasses face with a subtle smile

## Touch Gestures

| Gesture | Function |
|---------|----------|
| Single tap | Switch page |
| Long press | Cycle expressions on the Eyes page |

The touch key is the onboard capacitive touch (T9 / GPIO32) — no external button needed.

## Quick Start

1. Flash the firmware via the [Web Flasher](https://flash.rockbaseiot.com) or PlatformIO
2. On first boot, follow the on-screen prompts to complete Wi-Fi setup and city selection
3. Once connected, the device fetches weather data automatically; tap the touch key to browse pages

:::info Development Reference
To build your own NM-TV-154 firmware, start from the official PlatformIO demo in the [NM-TV-154 repository](https://github.com/RockBase-iot/NM-TV-154), which includes a minimal implementation of the display driver, touch detection, and PWM backlight dimming.
:::
