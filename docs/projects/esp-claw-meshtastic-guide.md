---
sidebar_position: 3
---

# ESP-Claw Meshtastic Integration Guide

This guide explains how to interconnect ESP-Claw with a Meshtastic node (e.g. Heltec LoRa32 V3). It bridges the Meshtastic node to an ESP-Claw mainboard over UART, enabling decentralized offline mesh messaging, and documents the HTTP API, LLM tools, console commands, and C programming interfaces exposed by the bridge.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Hardware Wiring](#hardware-wiring)
5. [Configuring the Meshtastic Serial Module](#configuring-the-meshtastic-serial-module)
6. [Verifying the Connection](#verifying-the-connection)
7. [Using the Interfaces](#using-the-interfaces)
8. [Build-time Configuration](#build-time-configuration)
9. [Troubleshooting](#troubleshooting)
10. [Notes](#notes)

---

## Overview

`cap_meshtastic` is the Meshtastic bridge capability of ESP-Claw. It connects an external Meshtastic LoRa radio to ESP-Claw over UART and speaks the Meshtastic **Stream API** (protobuf), allowing ESP-Claw to:

- Read the mesh node database
- Receive mesh text messages
- Transmit text messages into the mesh
- Expose access through HTTP API, LLM tools, console commands, and a C API

> For the bridge principle, radio PROTO mode setup, and wiring, please read the Hardware Wiring and Configuration sections first. Interface details are covered in [Using the Interfaces](#using-the-interfaces).

---

## Features

- Full hand-rolled protobuf decoder for `FromRadio` (`MeshPacket`, `MyNodeInfo`, `NodeInfo`, `DeviceMetadata`, config-complete) and embedded `Data`, `User`, `Position`, `DeviceMetrics` sub-messages.
- Protobuf encoder for `ToRadio` (text packets, `want_config_id`, heartbeat) with the 4-byte Stream API framing header (`0x94 0xc3 <len_hi> <len_lo>`).
- Background RX task that reassembles frames, maintains a node database and a ring buffer of recent text messages, and publishes inbound text as router events on channel `meshtastic`.
- LLM-callable tools: `meshtastic_send_text`, `meshtastic_list_nodes`, `meshtastic_get_status`, `meshtastic_get_messages`, `meshtastic_request_config`.
- Console command `mesh` (supports `status` / `node` / `message` / `send` / `config`).

---

## Prerequisites

- A Heltec LoRa32 V3 (or other Meshtastic-compatible LoRa radio) flashed with Meshtastic firmware
- An ESP-Claw mainboard (NM-CYD-C5 or NM-Display-28inch) running firmware V0.3.2 or later
- A USB-C cable or a battery to power the device
- Dupont lines or wires (NM-CYD-C5 and NM-Display-28inch ship with adapter cables for plug-and-play use)
- A computer with the `meshtastic` CLI installed, or a phone with the Meshtastic App

---

## Hardware Wiring

The Heltec LoRa32 V3 is powered from the mainboard 5V rail. UART must be **cross-connected** (mainboard TX → radio RX, mainboard RX ← radio TX).

| Mainboard (ESP-Claw) | Heltec LoRa32 V3 | Note |
| --- | --- | --- |
| 5V | 5V | Power supply |
| GND | GND | Common ground |
| GPIO5 (TX) | GPIO19 (RX) | Mainboard TX to Heltec RX |
| GPIO4 (RX) | GPIO20 (TX) | Mainboard RX to Heltec TX |

> **Note**: The table above shows the default pins for **NM-CYD-C5**. For **NM-Display-28inch**, the defaults are **GPIO43 (TX) / GPIO44 (RX)**, which are already set in the board-level `sdkconfig`, so usually no manual configuration is required.

If the default pins conflict with other peripherals, you can use any free UART pins and update the `serial.rxd` and `serial.txd` settings in Meshtastic accordingly.

---

## Configuring the Meshtastic Serial Module

Full protobuf parsing requires the radio Serial module to run in **PROTO** mode.

### Using the Meshtastic CLI

Connect the Heltec to your computer via USB-C and run:

```bash
meshtastic --set serial.enabled true
meshtastic --set serial.mode PROTO
meshtastic --set serial.baud BAUD_115200
meshtastic --set serial.rxd 19
meshtastic --set serial.txd 20
meshtastic --reboot
```

> **PROTO mode is required**: ESP-Claw's `cap_meshtastic` uses the Meshtastic Stream API (protobuf). The Serial module must be set to **PROTO** mode, not TEXTMSG. In TEXTMSG mode the radio only sends plain text, and the bridge will not be able to establish a connection.

### Using the Meshtastic App

1. Connect to the Heltec LoRa32 V3 over Bluetooth with your phone.
2. Go to **Settings -> Modules -> Serial**.
3. Enable **Enabled**, and set **Mode** to **PROTO**.
4. Set **Baud** to **115200**.
5. Set **RX pin** to **19** and **TX pin** to **20**.
6. Save and reboot the device.

---

## Verifying the Connection

After rebooting, query the mesh status through the ESP-Claw agent or serial console. The `cap_meshtastic` bridge performs the protobuf handshake and pulls the node database in a background task.

```bash
# In the ESP-Claw serial console
mesh status      # Connection state + diagnostics (rx_bytes / frames_decoded)
mesh node        # Known mesh nodes
mesh message     # Received messages
mesh send "hello mesh"
```

If `connected` is false, check the `hint` field returned by `mesh status`:

- `rx_bytes = 0`: No bytes received — check power, TX↔RX cross-wiring, and that the baud rate matches `serial.baud`.
- `rx_bytes > 0` but `frames_decoded = 0`: The radio is not in **PROTO** mode (or the baud rate is wrong).
- Frames decoded but still not connected: Wait a few seconds for the config handshake to complete.

Alternatively, open a browser and navigate to `http://<device-ip>/#meshtastic` using the IP address shown on the ESP-Claw home page. The status is shown as **Connected** when the bridge is established.

---

## Using the Interfaces

The `cap_meshtastic` bridge exposes four access methods: HTTP REST API, LLM-callable tools, serial console commands, and a C programming interface.

### HTTP REST API

All endpoints are mounted under `/api/mesh` on the device's HTTP server. Base URL example: `http://<device-ip>` (usually `http://192.168.4.1` in AP mode).

- Available only when the firmware is compiled with `CONFIG_APP_CLAW_CAP_MESHTASTIC` and service callbacks are registered; otherwise all endpoints return `503 Service Unavailable` with body `Meshtastic not configured`.
- Request and response bodies are `application/json` (except for placeholder error responses).
- The API has **no independent authentication** and relies on the LAN trust model (consistent with the rest of the device HTTP API). Do not expose `DELETE` and `POST` endpoints to untrusted networks.
- Sending mesh text is **not** exposed over HTTP; use LLM tools, console commands, or the C API instead.

#### GET /api/mesh/status

Returns the bridge link state and persisted message store overview.

```bash
curl http://192.168.4.1/api/mesh/status
```

Example response:

```json
{
  "connected": true,
  "message_count": 12,
  "file_size_bytes": 3456,
  "store_path": "/sdcard/meshtastic/messages.jsonl"
}
```

| Field | Type | Description |
| --- | --- | --- |
| `connected` | bool | Whether `MyNodeInfo` has been received (link established) |
| `message_count` | number | Number of persisted messages |
| `file_size_bytes` | number | Storage file size in bytes |
| `store_path` | string | Absolute path of the storage file; omitted if storage is not initialized |

> Storage prefers SD card (no size limit). Without SD card it falls back to internal FATFS (256 KB limit, with automatic rollover keeping roughly the newer half when exceeded). If you feel there are too many messages, you can manually delete the `messages.jsonl` file or call `DELETE /api/mesh/messages` to clear them.

#### GET /api/mesh/messages

Reads received mesh text messages, **newest first**.

Query parameters:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `limit` | int | 200 | Maximum number of messages to return, valid range `1 ~ 9999`, out-of-range values fall back to the default |

```bash
curl "http://192.168.4.1/api/mesh/messages?limit=50"
```

#### DELETE /api/mesh/messages

Clears all persisted messages.

```bash
curl -X DELETE http://192.168.4.1/api/mesh/messages
```

#### GET /api/mesh/im

Lists the IM channels to which inbound mesh messages can be pushed and their states. Currently four channels are fixed: `feishu` / `qq` / `telegram` / `wechat`.

```bash
curl http://192.168.4.1/api/mesh/im
```

#### POST /api/mesh/im

Enable or disable push for a specific IM channel. Preferences are persisted to NVS.

Request body:

```json
{ "channel": "feishu", "enabled": true, "has_target": false }
```

```bash
curl -X POST http://192.168.4.1/api/mesh/im \
  -H 'Content-Type: application/json' \
  -d '{"channel":"feishu","enabled":true}'
```

#### HTTP Status Codes

| Status | Meaning |
| --- | --- |
| `200 OK` | Success |
| `400 Bad Request` | Invalid request parameters / JSON body (only for `POST /api/mesh/im`) |
| `500 Internal Server Error` | Out of memory or read/operation failure |
| `503 Service Unavailable` | Meshtastic capability not compiled or not configured |

### LLM-callable Tools

The agent can trigger the following tools through natural language (family = `meshtastic`).

| Tool | Purpose | Parameters |
| --- | --- | --- |
| `meshtastic_send_text` | Send text into the mesh (broadcast or to a specific node) | See below |
| `meshtastic_list_nodes` | List known nodes (name, SNR, location, telemetry) | None |
| `meshtastic_get_status` | Link status, local node ID, firmware version, node count, diagnostics | None |
| `meshtastic_get_messages` | Return recently received text messages | None |
| `meshtastic_request_config` | Ask the radio to re-stream the node database and config | None |

`meshtastic_send_text` parameter schema:

```json
{
  "text": "hello mesh",       // Required, message body (≤237 bytes)
  "dest": "broadcast",        // Optional, "broadcast"/"all" or "!aabbccdd"/decimal node number, default broadcast
  "channel": 0,               // Optional, channel index, default 0
  "want_ack": false           // Optional, whether to request delivery acknowledgment
}
```

`meshtastic_get_status` returns a `hint` field when not connected, indicating the troubleshooting direction (no bytes / not PROTO mode / waiting for handshake).

### Serial Console Commands

In the device serial console, type `mesh`:

```text
mesh status                                  # Link state + diagnostics (rx_bytes / frames_decoded)
mesh node                                    # List known nodes
mesh message                                 # List received messages
mesh send "hello mesh"                       # Broadcast a text message
mesh send "hi node" --dest !aabbccdd --ch 0 --ack   # Directed send with ACK
mesh config                                  # Request the radio to re-stream node database / config
```

| Parameter | Description |
| --- | --- |
| `<action>` | `status` (default) / `node` / `message` / `send` / `config` |
| `<text>` | Message body for `send` |
| `--dest <id>` | Destination node ID, default broadcast |
| `--ch <n>` | Channel index, default 0 |
| `--ack` | Request delivery acknowledgment |

### C Programming Interface

Header file: `include/cap_meshtastic.h`.

#### Lifecycle and Configuration

```c
/* Override UART pins / port / baud before the capability group starts (optional). */
esp_err_t cap_meshtastic_set_uart_config(const cap_meshtastic_uart_config_t *config);

/* Register and start the Meshtastic capability group (creates UART and background RX task). */
esp_err_t cap_meshtastic_register_group(void);

/* Whether the link is established (MyNodeInfo received). */
bool cap_meshtastic_is_connected(void);
```

#### Transmit and Receive

```c
/* Send text: dest=0xFFFFFFFF for broadcast, channel=0 for the primary channel. */
esp_err_t cap_meshtastic_send_text(uint32_t dest, uint32_t channel,
                                   bool want_ack, const char *text);

/* Request the radio to re-stream the node database and config. */
esp_err_t cap_meshtastic_request_config(void);
```

#### IM Push Targets

```c
/* Explicitly set/clear the IM push session for inbound mesh messages (sticky, not overwritten by auto-learning). */
esp_err_t cap_meshtastic_set_notify_target(const char *channel, const char *chat_id);

/* Record the "most recent conversation" for automatic push when not explicitly configured (can be called in IM message observers). */
void cap_meshtastic_note_im_target(const char *channel, const char *chat_id);

/* Query / set push switches per IM channel (persisted to NVS). */
size_t    cap_meshtastic_get_im_push(cap_meshtastic_im_push_t *out, size_t max);
esp_err_t cap_meshtastic_set_im_push_enabled(const char *channel, bool enabled);
```

#### Persistent Message Storage

```c
/* Configure storage path and limit (max_bytes=0 means unlimited, suitable for SD card). */
esp_err_t cap_meshtastic_set_store_path(const char *base_path, size_t max_bytes);

/* Read stored messages into a cJSON array (newest first). */
esp_err_t cap_meshtastic_read_stored_messages(cJSON *array, size_t max_count);

esp_err_t   cap_meshtastic_clear_stored_messages(void);
size_t      cap_meshtastic_stored_count(void);
size_t      cap_meshtastic_store_file_size(void);
const char *cap_meshtastic_store_path(void);
```

> When the storage backend (e.g. SD card) shares the SPI bus with the LCD, inject a bus lock callback via `meshtastic_store_set_bus_lock()` (see `meshtastic_store.h`) to avoid contention between SDSPI polling and LCD DMA transactions.

---

## Build-time Configuration

Configure via `Component config -> Claw Meshtastic Capability` (`CONFIG_CAP_MESHTASTIC_*`):

| Option | Default | Description |
| --- | --- | --- |
| `CAP_MESHTASTIC_UART_PORT` | 1 | UART peripheral number (do not use UART0 for the console) |
| `CAP_MESHTASTIC_TX_GPIO` | 5 | Mainboard TX (→ radio RX); use 43 for NM-Display-28inch |
| `CAP_MESHTASTIC_RX_GPIO` | 4 | Mainboard RX (← radio TX); use 44 for NM-Display-28inch |
| `CAP_MESHTASTIC_BAUD` | 115200 | Must match the radio `serial.baud` setting |

UART must be cross-connected (mainboard TX → radio RX, mainboard RX ← radio TX):

| Mainboard | Default TX | Default RX |
| --- | --- | --- |
| NM-CYD-C5 | GPIO5 | GPIO4 |
| NM-Display-28inch | GPIO43 | GPIO44 (board-level default already set) |

The radio Serial module must be set to **PROTO** mode (not TEXTMSG):

```bash
meshtastic --set serial.enabled true
meshtastic --set serial.mode PROTO
meshtastic --set serial.baud BAUD_115200
meshtastic --set serial.rxd 19
meshtastic --set serial.txd 20
meshtastic --reboot
```

---

## Troubleshooting

Use the diagnostics from `GET /api/mesh/status` or `mesh status` to locate problems:

| Symptom | Likely Cause |
| --- | --- |
| `connected=false` and `rx_bytes=0` | No bytes received: check power, TX↔RX cross-wiring, and that the baud rate matches `serial.baud` |
| `rx_bytes>0` but `frames_decoded=0` | Bytes received but no protobuf frames: radio not in **PROTO** mode or baud rate mismatch |
| Frames decoded but still `connected=false` | Wait for the radio to complete the config handshake |
| `connected=true` but message list is empty | Link and node database are fine, but no live mesh traffic yet: send a text from another node |

---

## Notes

- **Power**: Heltec LoRa32 V3 can draw more than 200 mA instantaneously during LoRa transmission. Make sure the mainboard 5V pin can supply enough current, or use a separate 5V power supply with common ground. **This is especially important when a GPS module is also connected.**
- **GPS or Meshtastic**: The NM-CYD-C5 UART peripheral can be connected to either a GPS or a Meshtastic device as needed; there is no mandatory conflict. Just keep the wiring and configuration consistent.
- **Security**: The HTTP API has no independent authentication and relies on the LAN trust model. Do not expose the device to untrusted networks.
- **Send Limitation**: Sending mesh text is not exposed over HTTP; use LLM tools, the serial console, or the C API instead.
