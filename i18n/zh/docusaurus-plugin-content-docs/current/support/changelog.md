---
sidebar_position: 2
title: 更新日志
description: RockBase IoT Wiki 文档站的内容更新记录
---

# 更新日志

本页记录 Wiki 文档站的内容变更。各产品的固件版本更新请查看对应 GitHub 仓库的 Releases 页面。

## 2026-09-22

### 新增
- **产品**：NM-EPD-420 页面新增 NM-EPD-420-4C 四色（黑/白/红/黄，GDEY0420F51）SKU 说明；快速上手指南补充 `nm-epd-420-4c` 构建环境与 T1 测试差异
- **项目案例**：新增 Inkstone 固件页面——RockBase IoT 自研、面向 NM-EPD-420-4C 的本地图片推送固件
- **产品**：NM-CYD-C5 页面补充已支持/适配中项目（GhostESP、ESPectre、the_poom 等）、I2C 上拉说明（IO8/IO9）、TFT_eSPI 颜色反转修复、WS2812/背光引脚表，以及 Colorful-Ant 外置天线版
- **项目案例**：ESP32-Dashboard 文档补充 NM-EPD-420-4C 板卡支持、三个新 HomeWeatherTheme 主题（HOME-RHYTHM / HOME-ATLAS / HOME-PRINT）与 Google 日历 ICS 同步
- **项目案例**：NM-EPD-420 移植生态新增 nm-epd420-bw-demo、Inkstone、emini Home、AgentDeck 四个条目；MeshCore 一节补充 Web Flasher 五种角色固件；Meshtastic 一节补充 InkHUD 界面与 ES8311 音频支持

### 优化
- **平台与基础设施**：Web Flasher 支持固件清单与 ESPWebApps 线上目录同步（新增 AgentDeck、nm-epd420-bw-demo、MeshCore、ESPectre；移除已下架的 ESP32-Weather-EPD）

## 2026-08-18

### 新增
- **开发指南** 栏目新增「官方固件」与「开源内容与计划」两个子板块
- 新增 **支持与帮助** 栏目：常见问题（FAQ）、更新日志

### 优化
- FAQ 页提供邮件与 Telegram 支持入口，无需 GitHub 账号即可获取帮助

## 2026-08-17

### 新增
- **产品**：NM-TV-154、NM-Solar、K230-Vision 产品页（中英双语）
- **项目案例** 栏目：DeskBuddy-TV、ESP32-Plane-Radar、NM-EPD-420 移植生态、ESP32-Dashboard、ESP32-Weather-EPD、Biscuit、Hardware Buddy（中英双语）
- **平台与基础设施** 栏目：Web Flasher 使用指南、ESPWebApps 固件贡献指南、社区与渠道（中英双语）
- 侧边栏分类中文标签（`current.json`）

### 修复
- 补齐缺失的英文产品源文档，修复整站构建失败问题（`onBrokenLinks: 'throw'` 下双边文档校验）
