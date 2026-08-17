---
sidebar_position: 6
title: ESP32-Weather-EPD
description: Ultra-low-power e-paper weather station supporting 7.5" and 4.2" tri-color panels
---

# ESP32-Weather-EPD Weather Station

**ESP32-Weather-EPD** is the classic low-power e-paper weather display: the ESP32 wakes on a schedule, fetches weather data from the OpenWeatherMap API, reads indoor temperature and humidity from an onboard sensor, then returns to deep sleep. The RockBase fork is adapted for the [NM-EPD-420](../products/nm-epd-420.md).

- Firmware repository: [RockBase-iot/esp32-weather-epd](https://github.com/RockBase-iot/esp32-weather-epd)
- Data API: OpenWeatherMap (bring your own free API key)

## Dual Panel Support

| Panel | Resolution | Notes |
|-------|-----------|-------|
| 7.5" classic | 800×480 | High resolution, information-dense |
| 4.2" tri-color | 400×300 | **Significantly lower cost**; a re-optimized UI keeps the same rich weather information and a similar visual experience |

## Power & Battery Life

- Sleep current around **14 µA**
- Around 83 mA during refresh (~15 s on 7.5", ~10 s on 4.2" tri-color)
- **6–12 months** on a 5000 mAh battery with a 30-minute update interval
- USB-C charging with battery monitoring

## Display & Customization

- Hourly outlook graph: temperature line + precipitation probability (optionally volume) shaded bars
- Multiple languages, units, time/date formats, and AQI scales
- Extensive personalization options

## Reference Hardware

| Component | Recommended | Notes |
|-----------|-------------|-------|
| ESP32 | FireBeetle 2 ESP32-E | Low-power design, USB-C, battery management |
| E-paper display | See Panel Support in the repo | 7.5" or 4.2" tri-color |
| Adapter board | DESPI-C02 | Waveshare HATs (rev 2.2/2.3) not recommended |
| Sensor | BME280 | Temperature, humidity, pressure; 3.3V/5V compatible |
| Battery | 3.7V LiPo (JST-PH2.0) | 5000 mAh for 6+ months runtime |

:::tip Solder-Free Option
Using the NM-EPD-420 dev board eliminates the adapter board and soldering: it integrates a 4.2" tri-color/BW e-ink panel, AHT20 sensor, battery management, and USB-C. The repo includes the adapted branch and real-device demo photos.
:::

:::info Troubleshooting
The repository README includes a full error-message troubleshooting chapter (low battery, WiFi connection, API errors, time-server errors) — check it first when the display misbehaves.
:::
