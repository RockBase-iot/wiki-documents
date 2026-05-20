---
sidebar_position: 2
---

# NM-RF-HAT

## Overview

The NM-RF-HAT is an all-in-one RF expansion HAT designed for ESP32-2432S028 (CYD).
It integrates multiple radio interfaces on one board and adds a hardware RF switch to reduce SPI conflicts in multi-module setups.

## Key Features

### Hardware-Level Conflict Resolution

- Hardware RF switch for selecting active RF paths in shared-bus scenarios.
- Improves stability when combining display/TF card/RF modules on the same platform.
- Reduces firmware-level pin remapping complexity for CYD-based projects.

### All-in-One RF and Utility Integration

| Module | Frequency / Type | Typical Function |
|--------|-------------------|------------------|
| CC1101 | Sub-GHz (433 MHz) | Remote control and sensor signal capture |
| nRF24 | 2.4 GHz | Wireless protocol analysis and communication |
| PN532 | NFC / RFID | Read, write, and emulation workflows |
| IR TX/RX | Infrared | IR signal capture and replay |
| 433 OOK TX/RX | 433 MHz OOK | Basic RF transmission/reception |
| GNSS Header | GPS expansion | Location and tracking extension |
| Power Circuit | USB-C / battery path | Power input and hardware switch control |

### Plug-and-Play GPS Expansion

- New GPS module option supports plug-and-play use.
- Fast satellite acquisition and stable positioning in weak-signal environments.
- Suitable for IoT tracking, robotics, and vehicle positioning projects.

## Compatibility and Connection

- Primary target platform: ESP32-2432S028 (CYD).
- Designed for minimal wiring with bundled cable layout (2x4-pin, 1x5-pin, TF extension cable).
- Product options on store pages may include: HAT only / HAT + Bruce / HAT + GPS.

## Quick Start

1. Connect NM-RF-HAT to ESP32-2432S028 (CYD) using the recommended cable set.
2. Select the required RF path with the onboard hardware switch.
3. Flash the target firmware (for example Bruce-CYD-2USB when using Bruce ecosystem).
4. Validate each module one by one (Sub-GHz, nRF24, NFC/RFID, IR, OOK, GPS).

## Application Scenarios

- RF protocol testing and replay workflows
- Smart home and sensor signal integration
- Security research and hardware lab prototyping
- Mobile/vehicle tracking with GNSS extension

## References

- RockBase product page: https://rockbase.shop/products/nm-rf-hat
- NMMiner product page: https://www.nmminer.com/product/nm-rf-hat/
- Quick Start Guide: /docs/products/nm-rf-hat-quick-start
- FAQ: /docs/products/nm-rf-hat-faq
