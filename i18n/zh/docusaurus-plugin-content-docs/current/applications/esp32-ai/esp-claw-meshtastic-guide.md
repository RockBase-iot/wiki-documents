---
sidebar_position: 3
---

# ESP-Claw 接入 Meshtastic 使用说明

本文档介绍如何将 ESP-Claw 与 Meshtastic 节点（如 Heltec LoRa32 V3）互联互通，通过串口将 Meshtastic 节点桥接到 ESP-Claw 主板，实现去中心化的离线 mesh 消息收发，以及桥接后对外暴露的 HTTP API、LLM 工具、串口控制台命令和 C 编程接口。

## 目录

1. [概述](#概述)
2. [功能特性](#功能特性)
3. [准备工作](#准备工作)
4. [硬件接线](#硬件接线)
5. [配置 Meshtastic Serial 模块](#配置-meshtastic-serial-模块)
6. [验证连接](#验证连接)
7. [接口使用](#接口使用)
8. [编译期配置](#编译期配置)
9. [排障速查](#排障速查)
10. [注意事项](#注意事项)

---

## 概述

`cap_meshtastic` 是 ESP-Claw 的 Meshtastic 桥接能力组件。它将外接的 Meshtastic LoRa 电台通过 UART 连接到 ESP-Claw，并使用 Meshtastic **Stream API**（protobuf）进行通信，使 ESP-Claw 能够：

- 读取 mesh 节点数据库
- 接收 mesh 文本消息
- 向 mesh 网络发送文本消息
- 通过 HTTP API、LLM 工具、控制台命令和 C API 对外提供访问接口

> 桥接的工作原理、电台 PROTO 模式设置与接线，请优先阅读本指南的硬件接线和配置章节。接口细节请参考本文的[接口使用](#接口使用)章节。

---

## 功能特性

- 完整的 `FromRadio` protobuf 解码器，支持 `MeshPacket`、`MyNodeInfo`、`NodeInfo`、`DeviceMetadata` 以及内嵌的 `Data`、`User`、`Position`、`DeviceMetrics` 子消息。
- `ToRadio` protobuf 编码器，支持文本报文、`want_config_id` 和心跳，带 4 字节 Stream API 帧头（`0x94 0xc3 <len_hi> <len_lo>`）。
- 后台 RX 任务：重组帧、维护节点数据库和近期文本消息环形缓冲区，并将入站文本以 `meshtastic` 通道的路由器事件发布。
- LLM 可调用的工具：`meshtastic_send_text`、`meshtastic_list_nodes`、`meshtastic_get_status`、`meshtastic_get_messages`、`meshtastic_request_config`。
- 串口控制台命令 `mesh`（支持 `status` / `nodes` / `messages` / `send` / `config`）。

---

## 准备工作

- 已刷入 Meshtastic 固件的 Heltec LoRa32 V3（或其他 Meshtastic 兼容 LoRa 电台）
- 运行 ESP-Claw 的 NM-CYD-C5 或 NM-Display-28inch 主板，软件版本 V0.3.2 及以上
- USB-C 数据线 或 电池为设备供电
- 杜邦线或导线（NM-CYD-C5 与 NM-Display-28inch 默认配备了转接线，即插即用）
- 已安装 `meshtastic` CLI 的电脑，或已安装 Meshtastic App 的手机

---

## 硬件接线

Heltec LoRa32 V3 由主板 5V 供电，串口与主板**交叉连接**（主板 TX → 电台 RX，主板 RX ← 电台 TX）。

| 主板（ESP-Claw） | Heltec LoRa32 V3 | 说明 |
| --- | --- | --- |
| 5V | 5V | 供电 |
| GND | GND | 共地 |
| GPIO5（TX） | GPIO19（RX） | 主板 TX 接 Heltec RX |
| GPIO4（RX） | GPIO20（TX） | 主板 RX 接 Heltec TX |

> **注意**：上表为 NM-CYD-C5 的默认引脚。若主板为 **NM-Display-28inch**，默认使用 **GPIO43（TX）/ GPIO44（RX）**，板级 sdkconfig 默认值已设为这两根引脚，通常编译时无需再手动配置。

若默认引脚与其他外设冲突，可替换为任意空闲 UART 引脚，并同步修改 Meshtastic 配置中的 `serial.rxd` 和 `serial.txd`。

---

## 配置 Meshtastic Serial 模块

完整 protobuf 解析要求电台的 Serial 模块工作在 **PROTO** 模式。

### 使用 Meshtastic CLI

将 Heltec 通过 USB-C 连接到电脑，执行：

```bash
meshtastic --set serial.enabled true
meshtastic --set serial.mode PROTO
meshtastic --set serial.baud BAUD_115200
meshtastic --set serial.rxd 19
meshtastic --set serial.txd 20
meshtastic --reboot
```

> **必须使用 PROTO 模式**：ESP-Claw 的 `cap_meshtastic` 使用 Meshtastic 的 Stream API（protobuf）。Serial 模块必须设为 **PROTO** 模式，而不是 TEXTMSG。TEXTMSG 模式下电台只发送纯文本，桥接将无法建立连接。

### 使用 Meshtastic App

1. 通过手机蓝牙连接 Heltec LoRa32 V3。
2. 进入 **设置 -> 模块 -> Serial**。
3. 开启 **Enabled**，将 **Mode** 设为 **PROTO**。
4. 设置 **Baud** 为 **115200**。
5. 设置 **RX pin** 为 **19**，**TX pin** 为 **20**。
6. 保存并重启设备。

---

## 验证连接

设备重启后，向 ESP-Claw 智能体（或通过串口控制台）查询 mesh 状态。`cap_meshtastic` 桥接会在后台任务中完成 protobuf 握手并拉取节点数据库。

```bash
# 在 ESP-Claw 串口控制台
mesh status      # 连接状态 + 诊断信息（rx_bytes / frames_decoded）
mesh nodes       # 已知 mesh 节点
mesh send "hello mesh"
```

若 `connected` 为 false，请查看 `mesh status` 返回的 `hint` 字段：

- `rx_bytes = 0`：没有收到任何字节 —— 检查供电、TX↔RX 交叉接线，以及波特率是否与 `serial.baud` 一致。
- `rx_bytes > 0` 但 `frames_decoded = 0`：电台未设为 **PROTO** 模式（或波特率不对）。
- 已解析到帧但仍未连接：等待几秒让配置握手完成。

或根据ESP-Claw主页显示的IP地址，在浏览器访问 `http://<设备IP>/#meshtastic` 查看状态，已连接显示为Connected。

---

## 接口使用

`cap_meshtastic` 桥接后为 ESP-Claw 提供四类访问方式：HTTP REST API、LLM 可调用工具、串口控制台命令和 C 编程接口。

### HTTP REST API

所有接口挂载在设备 HTTP 服务器下，路径前缀 `/api/mesh`。基地址示例：`http://<设备IP>`（AP 模式下通常为 `http://192.168.4.1`）。

- 仅当固件编译开启 `CONFIG_APP_CLAW_CAP_MESHTASTIC` 且服务回调已注册时可用；否则统一返回 `503 Service Unavailable`，响应体为 `Meshtastic not configured`。
- 请求/响应均为 `application/json`（错误占位响应除外）。
- 接口无独立鉴权，依赖局域网信任模型。`DELETE` 与 `POST` 为状态变更接口，请勿暴露到不可信网络。
- 发送 mesh 文本未通过 HTTP 暴露，仅可经 LLM 工具 / 控制台 / C API 发送。

#### GET /api/mesh/status

返回桥接链路状态与持久化消息存储概况。

```bash
curl http://192.168.4.1/api/mesh/status
```

响应示例：

```json
{
  "connected": true,
  "message_count": 12,
  "file_size_bytes": 3456,
  "store_path": "/sdcard/meshtastic/messages.jsonl"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `connected` | bool | 是否已收到电台 `MyNodeInfo`（链路建立） |
| `message_count` | number | 已持久化的消息条数 |
| `file_size_bytes` | number | 存储文件大小（字节） |
| `store_path` | string | 存储文件绝对路径；存储未初始化时该字段缺省 |

> 存储优先使用 SD 卡（无大小上限），无 SD 卡时回退内部 FATFS（上限 256 KB，超限自动滚动保留较新约一半内容）。若用户觉得消息太多，可以进行手动删除messages.jsonl文件或调用 `DELETE /api/mesh/messages` 清空。

#### GET /api/mesh/messages

读取已接收的 mesh 文本消息，**最新在前**。

查询参数：

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `limit` | int | 200 | 返回的最大条数，有效范围 `1 ~ 9999`，越界则回退默认值 |

```bash
curl "http://192.168.4.1/api/mesh/messages?limit=50"
```

#### DELETE /api/mesh/messages

清空持久化的全部消息。

```bash
curl -X DELETE http://192.168.4.1/api/mesh/messages
```

#### GET /api/mesh/im

列出“收到 mesh 消息后可主动推送到的 IM 渠道”及其状态。当前固定四个渠道：`feishu` / `qq` / `telegram` / `wechat`。

```bash
curl http://192.168.4.1/api/mesh/im
```

#### POST /api/mesh/im

开启或关闭某个 IM 渠道的 mesh 消息推送。偏好持久化到 NVS。

请求体：

```json
{ "channel": "feishu", "enabled": true, "has_target": false}
```

```bash
curl -X POST http://192.168.4.1/api/mesh/im \
  -H 'Content-Type: application/json' \
  -d '{"channel":"feishu","enabled":true}'
```

#### HTTP 错误码一览

| 状态码 | 含义 |
| --- | --- |
| `200 OK` | 成功 |
| `400 Bad Request` | 请求参数 / JSON 体非法（仅 `POST /api/mesh/im`） |
| `500 Internal Server Error` | 内存不足或读取/操作失败 |
| `503 Service Unavailable` | Meshtastic 能力未编译或未配置 |

### LLM 可调用工具

Agent 可通过自然语言触发以下工具（family = `meshtastic`）。

| 工具 | 作用 | 入参 |
| --- | --- | --- |
| `meshtastic_send_text` | 发送文本到 mesh（广播或指定节点） | 见下 |
| `meshtastic_list_nodes` | 列出已知节点（名称、SNR、位置、遥测） | 无 |
| `meshtastic_get_status` | 链路状态、本机节点 ID、固件版本、节点数、诊断 | 无 |
| `meshtastic_get_messages` | 返回最近接收的文本消息 | 无 |
| `meshtastic_request_config` | 请求电台重新流式下发节点库与配置 | 无 |

`meshtastic_send_text` 入参 schema：

```json
{
  "text": "hello mesh",       // 必填，消息正文（≤237 字节）
  "dest": "broadcast",        // 可选，"broadcast"/"all" 或 "!aabbccdd"/十进制节点号，默认广播
  "channel": 0,               // 可选，信道索引，默认 0
  "want_ack": false           // 可选，是否请求送达确认
}
```

`meshtastic_get_status` 在未连接时会返回 `hint` 字段，提示排障方向（无字节 / 非 PROTO 模式 / 等待握手）。

### 串口控制台命令

在设备串口控制台输入 `mesh`：

```text
mesh status                                  # 链路状态 + 诊断（rx_bytes / frames_decoded）
mesh nodes                                   # 列出已知节点
mesh messages                                # 列出已接收消息
mesh send "hello mesh"                       # 广播一条文本
mesh send "hi node" --dest !aabbccdd --ch 0 --ack   # 定向发送并请求 ACK
mesh config                                  # 请求电台重新下发节点库 / 配置
```

| 参数 | 说明 |
| --- | --- |
| `<action>` | `status`(默认) / `node` / `message` / `send` / `config` |
| `<text>` | `send` 的消息正文 |
| `--dest <id>` | 目的节点 ID，默认广播 |
| `--ch <n>` | 信道索引，默认 0 |
| `--ack` | 请求送达确认 |

### C 编程接口

头文件：`include/cap_meshtastic.h`。

#### 生命周期与配置

```c
/* 在能力组启动前覆盖 UART 引脚 / 端口 / 波特率（可选）。 */
esp_err_t cap_meshtastic_set_uart_config(const cap_meshtastic_uart_config_t *config);

/* 注册并启动 Meshtastic 能力组（创建 UART 与后台 RX 任务）。 */
esp_err_t cap_meshtastic_register_group(void);

/* 链路是否已建立（已收到 MyNodeInfo）。 */
bool cap_meshtastic_is_connected(void);
```

#### 收发

```c
/* 发送文本：dest=0xFFFFFFFF 为广播，channel=0 为主信道。 */
esp_err_t cap_meshtastic_send_text(uint32_t dest, uint32_t channel,
                                   bool want_ack, const char *text);

/* 请求电台重新流式下发节点库与配置。 */
esp_err_t cap_meshtastic_request_config(void);
```

#### IM 推送目标

```c
/* 显式设置/清除入站 mesh 消息的 IM 推送会话（sticky，不会被自动学习覆盖）。 */
esp_err_t cap_meshtastic_set_notify_target(const char *channel, const char *chat_id);

/* 记录“最近对话会话”，供未显式配置时的自动推送使用（可在 IM 消息观察者中调用）。 */
void cap_meshtastic_note_im_target(const char *channel, const char *chat_id);

/* 查询 / 设置每个 IM 渠道的推送开关（持久化到 NVS）。 */
size_t    cap_meshtastic_get_im_push(cap_meshtastic_im_push_t *out, size_t max);
esp_err_t cap_meshtastic_set_im_push_enabled(const char *channel, bool enabled);
```

#### 持久化消息存储

```c
/* 配置存储路径与上限（max_bytes=0 表示不限，适合 SD 卡）。 */
esp_err_t cap_meshtastic_set_store_path(const char *base_path, size_t max_bytes);

/* 读取已存消息到 cJSON 数组（最新在前）。 */
esp_err_t cap_meshtastic_read_stored_messages(cJSON *array, size_t max_count);

esp_err_t   cap_meshtastic_clear_stored_messages(void);
size_t      cap_meshtastic_stored_count(void);
size_t      cap_meshtastic_store_file_size(void);
const char *cap_meshtastic_store_path(void);
```

> 当存储后端（如 SD 卡）与 LCD 共用 SPI 总线时，需通过 `meshtastic_store_set_bus_lock()`（见 `meshtastic_store.h`）注入总线锁回调，避免 SDSPI 轮询与 LCD DMA 事务竞争。

---

## 编译期配置

通过 `Component config -> Claw Meshtastic Capability`（`CONFIG_CAP_MESHTASTIC_*`）配置：

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `CAP_MESHTASTIC_UART_PORT` | 1 | UART 外设号（勿用作控制台的 UART0） |
| `CAP_MESHTASTIC_TX_GPIO` | 5 | 主板 TX（→ 电台 RX）；NM-Display-28inch 用 43 |
| `CAP_MESHTASTIC_RX_GPIO` | 4 | 主板 RX（← 电台 TX）；NM-Display-28inch 用 44 |
| `CAP_MESHTASTIC_BAUD` | 115200 | 须与电台 `serial.baud` 一致 |

UART 必须交叉连接（主板 TX → 电台 RX，主板 RX ← 电台 TX）：

| 主板 | 默认 TX | 默认 RX |
| --- | --- | --- |
| NM-CYD-C5 | GPIO5 | GPIO4 |
| NM-Display-28inch | GPIO43 | GPIO44（板级默认已设置） |

电台侧需将 Serial 模块设为 **PROTO** 模式（非 TEXTMSG）：

```bash
meshtastic --set serial.enabled true
meshtastic --set serial.mode PROTO
meshtastic --set serial.baud BAUD_115200
meshtastic --set serial.rxd 19
meshtastic --set serial.txd 20
meshtastic --reboot
```

---

## 排障速查

通过 `GET /api/mesh/status` 或 `mesh status` 的诊断字段定位问题：

| 现象 | 可能原因 |
| --- | --- |
| `connected=false` 且 `rx_bytes=0` | 未收到任何字节：检查供电、TX↔RX 交叉接线、波特率是否与 `serial.baud` 一致 |
| `rx_bytes>0` 但 `frames_decoded=0` | 收到字节但无 protobuf 帧：电台未处于 **PROTO** 模式或波特率不匹配 |
| 已解出帧但仍 `connected=false` | 等待电台完成 config 握手，稍候数秒 |
| `connected=true` 但消息列表为空 | 链路与节点库正常，但尚无实时 mesh 报文：从其他节点发一条文本即可填充 |

---

## 注意事项

- **供电**：Heltec LoRa32 V3 在 LoRa 发射时瞬时电流可达 200mA 以上，请确保主板 5V 引脚供电能力充足，或额外使用独立 5V 电源共地连接。**尤其是在外接了GPS模块的情况下**。
- **GPS 或 Meshtastic 任选**：NM-CYD-C5 的串口外设可按需连接 GPS 或 Meshtastic 设备，二者没有强制冲突；只需在配置与接线时保持一致即可。
- **安全**：HTTP API 无独立鉴权，依赖局域网信任模型；请勿将设备暴露到不可信网络。
- **发送限制**：发送 mesh 文本未通过 HTTP 暴露，仅可经 LLM 工具、串口控制台或 C API 发送。
