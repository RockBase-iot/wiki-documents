---
sidebar_position: 4
---

# NM-RF-HAT 常见问题（FAQ）

## 产品概览

### Q1：NM-RF-HAT 是什么？

NM-RF-HAT 是面向 ESP32-2432S028 与 NM-CYD-C5 的多功能 RF 扩展板。
它将常用无线模块整合到一块 PCB 上，用于减少接线复杂度与引脚冲突。

### Q2：支持哪些模块？

- CC1101（433 MHz，FSK/GFSK）
- nRF24L01（2.4 GHz）
- PN532（NFC/RFID）
- IR 红外发射/接收
- 433 OOK/ASK 发射/接收
- GNSS 接口（GPS 扩展）

## 配置与使用

### Q3：DIP 开关如何设置？

- `1 ON`：CC1101
- `2 ON`：nRF24
- `3 ON`：PN532
- `4 ON`：IR
- `5 ON`：RF433 OOK
- `6 ON`：电池供电开关

说明：`1-5` 中同一时刻只能启用一个 RF 模块。

### Q4：在 Bruce 固件中如何配置各模块？

- CC1101：DIP 1 -> RF -> Config -> RF Module -> CC1101
- nRF24：DIP 2 -> 使用 nRF24 相关功能
- PN532：DIP 3 -> RFID -> Config -> RFID module -> PN532（I2C）
- RF433 OOK：DIP 5 -> RF Module -> M5 RF433T/R，再按需设置 TX/RX 引脚
- IR：DIP 4 -> 在固件里设置 IR TX/RX 引脚

### Q5：如何配置 GPS？

先连接 GPS 模块，再根据当前固件配置 GPS RX/TX 引脚。
在 NM-RF-HAT 场景中，使用 `GPS Tracker`、`Wardriving` 前请先确认引脚映射正确。

## 常见故障

### Q6：Type-C 供电无反应，指示灯不亮？

部分 CYD 设备使用 USB-C to USB-C 线可能无法正常上电。
建议改用 USB-A to USB-C 线。

### Q7：如何识别已预刷兼容固件的 CYD？

官方渠道购买的设备通常已预刷兼容固件与显示驱动设置。
建议上手前先核对当前固件版本。

### Q8：切换 DIP 后仍检测不到模块怎么办？

常见原因：

- 同时打开了多个 RF 功能位
- 线缆松动或插反
- 固件菜单中选择了错误模块
- 供电不足

## 进一步支持

- Bruce Wiki：https://wiki.bruce.computer/
- NMTech：https://www.nmminer.com/
- Telegram：https://t.me/NMMiner
- Reddit：https://www.reddit.com/r/NMTech_Team/
