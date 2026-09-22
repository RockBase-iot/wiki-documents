---
sidebar_position: 2
title: Changelog
description: Content changelog for the RockBase IoT Wiki
---

# Changelog

This page records content changes to the wiki site itself. For firmware version updates of each product, see the Releases page of the corresponding GitHub repository.

## 2026-09-22

### Added
- **Products**: NM-EPD-420 page now covers the new NM-EPD-420-4C four-color (B/W/R/Y, GDEY0420F51) SKU; quick start guide adds the `nm-epd-420-4c` build environment and T1 differences
- **Projects**: new Inkstone Firmware page — RockBase IoT's local image-push firmware for NM-EPD-420-4C
- **Products**: NM-CYD-C5 page adds supported/in-progress projects (GhostESP, ESPectre, the_poom, and more), I2C pull-up note (IO8/IO9), TFT_eSPI color-inversion fix, WS2812/backlight pinout, and the Colorful-Ant external-antenna variant
- **Projects**: ESP32-Dashboard docs cover the NM-EPD-420-4C board, three new HomeWeatherTheme themes (HOME-RHYTHM / HOME-ATLAS / HOME-PRINT), and Google Calendar ICS sync
- **Projects**: NM-EPD-420 port ecosystem adds nm-epd420-bw-demo, Inkstone, emini Home, and AgentDeck; MeshCore section lists the five Web Flasher role firmwares; Meshtastic section notes InkHUD and ES8311 audio support

### Improved
- **Platform**: Web Flasher supported-firmware list synced with the live ESPWebApps catalog (added AgentDeck, nm-epd420-bw-demo, MeshCore, ESPectre; removed the delisted ESP32-Weather-EPD)

## 2026-08-18

### Added
- **Developer** section: new "Official Firmware" and "Open Source & Roadmap" sub-sections
- New **Support** section: FAQ and Changelog

### Improved
- The FAQ page now permanently lists email and Telegram support entries at the bottom — no GitHub account required to get help

## 2026-08-17

### Added
- **Products**: NM-TV-154, NM-Solar, K230-Vision product pages (EN + ZH)
- **Projects** section: DeskBuddy-TV, ESP32-Plane-Radar, NM-EPD-420 port ecosystem, ESP32-Dashboard, ESP32-Weather-EPD, Biscuit, Hardware Buddy (EN + ZH)
- **Platform** section: Web Flasher Guide, ESPWebApps Contribution Guide, Community & Channels (EN + ZH)
- Chinese sidebar category labels (`current.json`)

### Fixed
- Added missing English product source documents, fixing a site-wide build failure (both locales are validated under `onBrokenLinks: 'throw'`)
