---
sidebar_position: 1
title: FAQ
description: Frequently asked questions about usage, flashing, compatibility, battery life, and purchasing
---

# Frequently Asked Questions

## Usage & Flashing

<details>
<summary><strong>What should I check before flashing firmware?</strong></summary>

Always verify the **device model and firmware name** — for example, the NM-EPD-420 tri-color and BW firmware images are **not cross-flashable**. Flashing erases the existing firmware and data, so back up important configuration first.

</details>

<details>
<summary><strong>Why doesn't the Web Flasher work in Firefox / Safari?</strong></summary>

Web flashing relies on the Web Serial API, currently supported only by desktop Chrome / Edge. Please use Chrome or Edge to visit [flash.rockbaseiot.com](https://flash.rockbaseiot.com).

</details>

<details>
<summary><strong>What if the screen stays blank after flashing?</strong></summary>

In order: ① confirm the firmware exactly matches your device model / panel version; ② press RESET or power-cycle; ③ see the [Web Flasher troubleshooting table](../platform/web-flasher.md#troubleshooting); ④ if still unresolved, contact support.

</details>

## Compatibility

<details>
<summary><strong>What's the difference between the NM-EPD-420 tri-color and BW versions?</strong></summary>

The tri-color version (GDEY042Z98) takes ~10 s per full refresh with no partial refresh — best for static content. The BW version (GYE042A87) refreshes in 2–3 s with ~1 s partial refresh and **includes LoRa support by default** — best for fast-updating content or desktop LoRa nodes. See the [NM-EPD-420 product page](../products/nm-epd-420.md).

</details>

<details>
<summary><strong>How do community firmware (Bruce / Marauder, etc.) relate to official firmware?</strong></summary>

Community firmware is maintained by third-party developers; RockBase IoT provides the official hardware adaptation and distribution via the [Web Flasher](https://flash.rockbaseiot.com). Read each project's notes and evaluate compatibility yourself before use.

</details>

## Hardware & Battery

<details>
<summary><strong>How long does an e-ink device last on a single charge?</strong></summary>

It depends on the firmware and refresh interval: ESP32-Weather-EPD achieves **6–12 months** on a 5000 mAh battery at a 30-minute refresh interval. The NM-EPD-420's low-power design fully powers down peripherals before deep sleep — see each project's documentation for specifics.

</details>

## Purchasing & Pricing

<details>
<summary><strong>Where can I buy the hardware?</strong></summary>

The official store [rockbase.shop](https://rockbase.shop), Amazon (RockBase IoT), and AliExpress [RockBase IoT Store](https://www.aliexpress.com/store/1105401362). See [Community & Channels](../platform/community.md) for the full list.

</details>

<details>
<summary><strong>Are official firmware and the Web Flasher free?</strong></summary>

Yes. Official firmware, the Web Flasher, and this wiki are all free; open-source firmware follows the LICENSE of its respective repository.

</details>

---

:::info Didn't find your answer?
- 📧 Email support: **support@rockbaseiot.com** (or rockbase.iot@gmail.com)
- 💬 Telegram community: [t.me/rockbase_iot](https://t.me/rockbase_iot) — no GitHub account needed
- 🐛 Documentation issues: use "Edit this page" at the bottom to suggest changes
:::
