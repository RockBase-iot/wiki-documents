---
sidebar_position: 1
title: Open Source & Roadmap
description: Open-source scope, access, and roadmap for RockBase IoT hardware and firmware
---

# Open Source & Roadmap

RockBase IoT believes open source accelerates innovation in industrial IoT. This page explains the **open-source scope, how to access resources, and what comes next**.

## What Is Open

| Category | Content | Access |
|----------|---------|--------|
| **Open-source hardware** | Schematics (SCH) and 3D STEP files for NM-CYD-C5, NM-RF-HAT, NM-Display-28inch, etc. | Each product's GitHub repository |
| **Collaborative firmware** | Official adaptation branches for community projects like Bruce, Marauder, ESP-Claw | Branches in the [GitHub org](https://github.com/RockBase-iot) repositories |
| **Application firmware** | Full source for deskbuddy-tv, ESP32-Dashboard, Biscuit, and more | Project repositories + firmware packages on the [Web Flasher](https://flash.rockbaseiot.com) |
| **Distribution spec** | The ESPWebApps manifest specification | [RockBase-iot/ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) |

## Roadmap

- **K230 AI development board**: launching soon — CanMV support, large-model support, 6 TOPS compute, 1 GB RAM (docs for its module form, [K230-Vision](../../products/k230-vision.md), already live)
- **NM-EPD-420**: ESP32-S3 4.2-inch e-ink board (part of the NM-EPD-420 line — see the [product page](../../products/nm-epd-420.md))
- Continuous hardware adaptation for community projects (Bruce, Marauder, MeshCore, and more)

## How to Contribute

- **Submit firmware**: fork [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) and open a PR following the manifest spec (see the [ESPWebApps Contribution Guide](../../platform/espwebapps.md))
- **Improve the docs**: use "Edit this page" at the bottom of any page
- **Share your project**: show your work on [Facebook RockBase-IoT](https://www.facebook.com/groups/rockbaseiot/) or [Telegram](https://t.me/rockbase_iot)

:::info Licensing
Licenses vary by repository (MIT / GPL / etc.). Check the LICENSE file in each repository before use.
:::
