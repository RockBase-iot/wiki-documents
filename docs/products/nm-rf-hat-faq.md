---
sidebar_position: 4
---

# NM-RF-HAT FAQ

## Product Overview

### Q1: What is NM-RF-HAT?

NM-RF-HAT is a multi-functional RF expansion board for ESP32-2432S028 and NM-CYD-C5.
It integrates common RF modules on one PCB to reduce wiring complexity and pin conflicts.

### Q2: What modules are supported?

- CC1101 (433 MHz, FSK/GFSK)
- nRF24L01 (2.4 GHz)
- PN532 (NFC/RFID)
- IR TX/RX
- 433 OOK/ASK TX/RX
- GNSS header for GPS expansion

## Configuration and Usage

### Q3: How do I set the DIP switch?

- `1 ON`: CC1101
- `2 ON`: nRF24
- `3 ON`: PN532
- `4 ON`: IR
- `5 ON`: RF433 OOK
- `6 ON`: Battery power switch

Note: Keep only one RF module from switches `1-5` enabled at once.

### Q4: How to configure modules in Bruce firmware?

- CC1101: DIP 1 -> RF -> Config -> RF Module -> CC1101
- nRF24: DIP 2 -> Use nRF24 functions
- PN532: DIP 3 -> RFID -> Config -> RFID module -> PN532 (I2C)
- RF433 OOK: DIP 5 -> RF Module -> M5 RF433T/R, then set TX/RX pins as required
- IR: DIP 4 -> Configure IR TX/RX pins in firmware

### Q5: How to configure GPS?

Connect GPS first, then configure GPS RX/TX pins according to your firmware profile.
For NM-RF-HAT setups, verify custom pin mapping before using features like GPS Tracker or Wardriving.

## Common Problems

### Q6: Type-C power does not work, LED is off

Some CYD units may fail with USB-C to USB-C cables.
Try a USB-A to USB-C cable.

### Q7: How can I identify CYD units with pre-flashed compatible firmware?

Boards purchased from official NMTech channels are typically shipped with compatible firmware and display-driver settings.
Always verify firmware version before testing RF modules.

### Q8: Why can the module not be detected even after switching DIP?

Common causes:

- Multiple RF switches enabled at the same time
- Loose cable or wrong connector orientation
- Wrong module selection in firmware config
- Inadequate power source

## Further Help

- Bruce Wiki: https://wiki.bruce.computer/
- NMTech: https://www.nmminer.com/
- Telegram: https://t.me/NMMiner
- Reddit: https://www.reddit.com/r/NMTech_Team/
