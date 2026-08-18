---
sidebar_position: 1
---

# NM-CYD-C5 ESP-Claw: Home AI Agent in Your Palm

> Turn your NM-CYD-C5 into an Edge AI Agent that fits in your palm.

![NM-CYD-C5 ESP-Claw](/img/applications/esp-claw-hero.png)

## Overview

In an era of increasing IoT and edge computing prevalence, the demand for intelligent, efficient, and economical AI Agents continues to grow. The **NM-CYD-C5 ESP-Claw** is designed to meet this very need. It combines the powerful ESP32-C5 dual-band Wi-Fi 6 microcontroller with the innovative **esp-claw** AI Agent framework, offering an independent, low-cost, and feature-rich edge AI solution.

This "Cheap Yellow Display" (CYD) development board not only boasts an intuitive user interface but also empowers devices with the ability to interact and be controlled through natural language, allowing ordinary users to easily define device behavior and achieve true "chat coding."

## Core Selling Points

### Edge AI Agent

Powered by **ESP32-C5** (16 MB Flash + 8 MB PSRAM), ESP-Claw handles perception and execution entirely on-device, while offloading reasoning and decision-making to LLMs. No separate host machine needed to run an OpenClaw Gateway — lower cost, lower power, stronger security.

### Chat Coding

Talk, and it codes. Chat directly via WeChat, QQ, Feishu, or Telegram — the LLM generates and runs Lua scripts in real time. Ordinary users can define device behavior without writing a single line of code.

### 2.8" Touchscreen — Intelligence You Can See

A 320×240 resistive touchscreen displays real-time status, a message inbox, and hardware metrics at a glance. Touch, swipe, and stay in full control.

### Rich Hardware Integration

Built-in display, touch, RGB LED, SD card slot, and GPS interface — fully featured and ready to go, right out of the box.

### Dual-Band Wi-Fi 6

Delivers high-speed, stable wireless connectivity for efficient data transfer, supporting both 2.4 GHz and 5 GHz bands.

### Multi-Model, On-Demand Conversations

Supports GPT, Claude Opus 4.6, DeepSeek, Kimi, MiniMax (cloud), and local Ollama — flexible API configuration for any scenario.

### Custom Skills

Create and evolve your own skills — continuously adapting, endlessly getting smarter.

## What's ESP-Claw

**ESP-Claw** is Espressif's **Chat Coding** AI agent framework for IoT devices. It defines device behavior through conversation and completes the full loop of sensing, decision-making, and execution locally on Espressif chips. Inspired by the OpenClaw concept and reimplemented in C, ESP-Claw is lightweight, intelligent, and continuously evolving. With just an ESP32-series chip that costs only a few dollars, you can experience what makes ESP-Claw so nimble.

![From Traditional IoT to Edge Agent](/img/applications/esp-claw-architecture.jpg)

## Key Features

Traditional IoT usually stops at connectivity: devices can connect to the network, but they cannot think; they can execute commands, but they cannot make decisions. ESP-Claw brings the Agent Runtime down onto Espressif chips, turning them from passive executors into active decision-making centers.

| Feature | Description |
|---------|-------------|
| **Chat as Creation** | IM chat + dynamic Lua loading. Ordinary users can define device behavior without programming. |
| **Event Driven** | Any event can trigger the Agent Loop. Response can be as fast as milliseconds. |
| **Structured Memory** | Organize memories in a structured way. Privacy stays off the cloud. |
| **MCP Communication** | Supports standard MCP devices. Works as both Server and Client. |
| **Ready Out of the Box** | Quick setup with Board Manager. Supports one-click flashing. |
| **Component Extensibility** | Every module can be trimmed as needed. You can also add your own component integrations. |

## Hardware Requirements

| Item | Specification |
|------|---------------|
| **Board** | NM-CYD-C5 (ESP32-C5) |
| **Flash** | 16 MB |
| **PSRAM** | 8 MB |
| **Display** | 2.8" ST7789, 320×240 |
| **Touch** | Resistive touchscreen |
| **Wireless** | Dual-band Wi-Fi 6 + BLE 5 |
| **Extras** | RGB LED, SD card slot, GPS interface |

## Quick Start

![Quick Start Flow](/img/applications/esp-claw-quickstart.png)

### 1. Get the Hardware

Purchase the NM-CYD-C5 from:
- [RockBase IoT Store](https://rockbaseiot.com)
- [RockBase Shop](https://shop.rockbaseiot.com)
- [NMTech Global Store](https://nmttech.com)

### 2. Flash ESP-Claw Firmware

[NMIOT Web Flash Tool](https://flash.nmiot.net/) supports one-click flashing of ESP-Claw firmware onto NM-CYD-C5. Just select the project, device, and version, and you're good to go.

**Note:**If you do not want the parameters of your `ESP-Claw` lost during flashing, you may need a SDCard, which will store the parameters, memory, and skills. After you flashed, the parameters will automatically restored for you.

### 3. Configure AI Model

Connect to the board's Wi-Fi AP and open the web config panel. Enter your preferred LLM API key (OpenAI, DeepSeek, Kimi, etc.).

### 4. Start Chatting

Open your favorite IM app (WeChat, Telegram, etc.) and add the board's bot. Start chatting to control your device!

## Example: Chat Coding

**User:** "Turn the LED red when the temperature exceeds 30°C."

**ESP-Claw:** *(generates and executes Lua script)*

```lua
-- Auto-generated by ESP-Claw
local temp = sensor.read_temperature()
if temp > 30 then
    led.set_color(255, 0, 0)
else
    led.set_color(0, 255, 0)
end
```

## Resources

- [ESP-Claw GitHub Repository](https://github.com/espressif/esp-claw)
- [NM-CYD-C5 Product Page](/docs/products/nm-cyd-c5)
- [ESP32-C5 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-c5_datasheet_en.pdf)
