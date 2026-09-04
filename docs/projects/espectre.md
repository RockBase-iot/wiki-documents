---
sidebar_position: 1
title: ESPectre WiFi CSI Human Motion Detection
description: Contactless human motion detection based on ESP32 and WiFi CSI
---

# ESPectre: Human Motion Detection Based on WiFi CSI

ESPectre is a contactless human motion detection project that runs on the ESP32. It analyzes Channel State Information (CSI) in 2.4 GHz WiFi links and detects human motion from the fluctuations that movement introduces into the wireless signal — no cameras or wearables required.

## Features

| Feature | Description |
|---------|-------------|
| Contactless sensing | Detects motion using existing WiFi signals; captures no images or audio |
| Dual detection algorithms | Supports both MVS (moving variance) and ML (machine learning) detection |
| Adaptive calibration | Automatically selects subcarriers via NBVI and computes detection thresholds from ambient noise |
| Multiple access methods | Integrates with Home Assistant via ESPHome, plus web and Bluetooth monitors |
| Local visualization | Displays the Movement score, detection threshold, and motion state on devices with a screen |

## How It Works

ESPectre continuously collects the WiFi CSI data received by the ESP32, filters the selected subcarriers, and computes features. It outputs two core results:

- **Movement Score**: the current motion intensity in the environment;
- **Motion Detected**: the motion state derived from the Movement Score with thresholding and hysteresis.

Run a calibration on first deployment or whenever the environment changes significantly. Calibration collects data from a static environment, selects suitable CSI subcarriers, and computes an adaptive threshold. Recalibrate when the device is moved, the furniture layout changes, or false positives/negatives become noticeable.

## NM-CYD-C5 Adaptation

The [NM-CYD-C5](/docs/products/nm-cyd-c5) combines an ESP32-C5, a 2.8-inch 320×240 display, and an XPT2046 resistive touch panel. On top of the core ESPectre detection capabilities, the adapted firmware adds a local real-time curve, a threshold line, touch-based threshold adjustment, and one-tap calibration — so the device can be used for daily monitoring and operation without relying on Home Assistant.

The NM-CYD-C5 version provides the following on-screen capabilities:

- Real-time Movement curve, with segments above the threshold highlighted in a different color;
- Threshold line plus `MOTION`, `IDLE`, and `CALIBRATING` status indicators;
- Touch buttons to adjust the threshold in 0.5 steps;
- Direct NBVI recalibration triggered from the screen;
- Device IP address and WiFi signal strength display.

## Resources

- [ESPectre upstream repository](https://github.com/francescopace/espectre)
- [RockBase IoT Web Flasher](https://flash.rockbaseiot.com)
- [NM-CYD-C5 hardware repository](https://github.com/RockBase-iot/NM-CYD-C5)
