---
sidebar_position: 3
---

# NM-RF-HAT Quick Start

This guide is based on the official NM-RF-HAT quick-start article and is intended for:

- NM-CYD-C5
- ESP32-2432S028 (CYD)

## What Is in the Box

| Component | Description |
|---|---|
| NM-RF-HAT | RF expansion board with CC1101, nRF24, PN532, IR, and 433 OOK support |
| 2x 4-pin cables | One for CYD/NM-CYD-C5 connection, one for GPS expansion |
| 1x 5-pin cable | Main interconnect cable between CYD and NM-RF-HAT |
| TF extension cable | SD card slot extension cable |
| Antennas | 433 MHz and 2.4 GHz antennas |

## Hardware Connection

### Step 1: Connect TF and Signal Cables

1. Connect the TF extension cable between CYD and NM-RF-HAT.
2. Connect one 4-pin cable to `3.3V / IO9 / IO8 / GND`.
3. Connect one 4-pin cable to `5V / TX / RX / GND`.

### Step 2: Connect Cables to NM-RF-HAT Headers

Ensure all cables are fully seated and aligned with the expected pin order on NM-RF-HAT.

### Step 3: Attach Antennas

- SMA antenna (external thread, inner pin) -> CC1101 (433 MHz)
- SMA antenna (external thread, inner hole) -> nRF24 (2.4 GHz)

## Flash Bruce Firmware

1. Open https://flash.nmiot.net/
2. Select project: `bruce`
3. Select device: `nm-cyd-c5` or `esp32-2432s028`
4. Select version (example from official article): `v1.14.0`
5. Click `Flash`

## DIP Switch Basics

NM-RF-HAT uses a 6-position DIP switch:

- `1 ON`: CC1101
- `2 ON`: nRF24
- `3 ON`: PN532
- `4 ON`: IR
- `5 ON`: RF433 OOK
- `6 ON`: Battery power switch

Important:

- Keep only one RF function from `1-5` set to ON at a time.
- Do not enable multiple RF modules simultaneously.

## Basic Validation Checklist

1. Power on CYD and NM-RF-HAT.
2. Set DIP to the target module (for example, `1 ON` for CC1101).
3. In firmware menu, select matching module type.
4. Run a simple scan or test action.
5. Repeat for each module.

## Troubleshooting

| Problem | Suggested Fix |
|---|---|
| CC1101 not found | Ensure NM-RF-HAT is powered, set DIP to CC1101 only, and select CC1101 in firmware config |
| nRF24 not found | Ensure NM-RF-HAT is powered, set DIP to nRF24 only, verify antenna and cable seating |
| GPS waits forever | Verify GPS UART wiring and correct RX/TX pin configuration in firmware |

## References

- Quick Start article: https://rockbase.shop/blogs/tech-news/nm-rf-hat-quick-start
- FAQ source: https://github.com/RockBase-iot/NM-RF-HAT/blob/main/NM-RF-HAT%20FAQ.md
