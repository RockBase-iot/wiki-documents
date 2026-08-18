---
sidebar_position: 1
title: 常见问题（FAQ）
description: 使用、刷写、兼容、续航与购买相关的常见问题
---

# 常见问题（FAQ）

## 使用与刷写

<details>
<summary><strong>刷写固件前需要注意什么？</strong></summary>

务必核对**设备型号与固件名称**——例如 NM-EPD-420 的三色版与黑白版固件**不可混刷**；刷写会擦除设备原有固件与数据，请提前备份重要配置。

</details>

<details>
<summary><strong>为什么 Firefox / Safari 无法使用 Web Flasher？</strong></summary>

Web 烧录基于 Web Serial API，目前仅桌面版 Chrome / Edge 支持。请换用 Chrome 或 Edge 访问 [flash.rockbaseiot.com](https://flash.rockbaseiot.com)。

</details>

<details>
<summary><strong>烧录后屏幕无显示怎么办？</strong></summary>

按顺序排查：① 确认固件与设备型号/屏幕版本完全匹配；② 按 RESET 或重新上电；③ 参考 [Web Flasher 故障排查表](../platform/web-flasher.md#常见问题排查)；④ 仍无法解决请联系技术支持。

</details>

## 兼容与互联

<details>
<summary><strong>NM-EPD-420 三色版和黑白版有什么区别？</strong></summary>

三色版（GDEY042Z98）全刷约 10 秒、不支持局刷，适合静态内容，或周期性刷新全局内容；黑白版（GYE042A87）全刷 2–3 秒、支持约 1 秒局刷，且**默认包含 LoRa 支持**，适合需要快速刷新或作为桌面 LoRa 节点的场景。详见 [NM-EPD-420 产品页](../products/nm-epd-420.md)。

</details>

<details>
<summary><strong>社区固件（Bruce / Marauder 等）和官方固件是什么关系？</strong></summary>

社区固件由第三方开发者维护，RockBase IoT 官方完成硬件适配后通过PR贡献社区并通过 [Web Flasher](https://flash.rockbaseiot.com) 分发。使用前请阅读对应项目说明并自行评估适配性。

</details>

## 硬件与续航

<details>
<summary><strong>墨水屏设备充一次电能用多久？</strong></summary>

取决于固件与刷新频率：ESP32-Weather-EPD 在 30 分钟刷新间隔、5000 mAh 电池下可达 **6–12 个月**；NM-EPD-420 的低功耗设计允许外设在深度睡眠前完全断电，具体续航见各项目文档。

</details>

## 购买与资费

<details>
<summary><strong>在哪里购买硬件？</strong></summary>

官方商城 [rockbase.shop](https://rockbase.shop)、Amazon（RockBase IoT）、AliExpress [RockBase IoT Store](https://www.aliexpress.com/store/1105401362)。完整渠道列表见 [社区与渠道](../platform/community.md)。

</details>

<details>
<summary><strong>使用官方固件和 Web Flasher 收费吗？</strong></summary>

不收费。官方固件、Web Flasher 与 Wiki 文档均为免费提供；开源固件遵循各自仓库的 LICENSE。

</details>

---

:::info 没有找到答案？
- 📧 邮件支持：**support@rockbaseiot.com**（或 rockbase.iot@gmail.com）
- 💬 Telegram 社区：[t.me/rockbase_iot](https://t.me/rockbase_iot) —— 无需 GitHub 账号即可提问
- 🐛 文档问题：点击本页底部"编辑此页"提交修改建议
:::
