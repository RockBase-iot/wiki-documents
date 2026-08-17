---
sidebar_position: 2
title: ESPWebApps 固件贡献指南
description: 如何向 RockBase IoT Web Flasher 提交你的固件应用
---

# ESPWebApps 固件贡献指南

**[ESPWebApps](https://github.com/RockBase-iot/ESPWebApps)** 是 [RockBase IoT Web Flasher](https://flash.rockbaseiot.com) 背后的固件聚合仓库。它采用"根目录 `apps.json` + 每个应用独立 `manifest.json`"的动态加载模型，社区通过 **fork + PR** 的方式提交或更新固件。

## 运行模型

- 前端按路径驱动，新增应用文件夹**无需修改加载器代码**
- 每个应用以独立文件夹维护（不使用 git submodule）
- 前端启动时读取根目录 `apps.json`，再按应用加载各自的 `manifest.json`

## 仓库结构

```text
apps.json
bruce/
  manifest.json
  assets/
  <version>/<device>/...
deskbuddy/
espclaw/
marauder/
```

## 每个应用需要包含

```text
<app-id>/
  manifest.json            # 应用清单：名称、版本、设备、固件文件列表
  assets/
    logo.svg|png|jpg       # 应用图标与产品图
  <version>/
    <device>/
      ...                  # 各设备对应的固件二进制文件
```

## 提交流程

1. **Fork** [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) 仓库
2. 新建 `<app-id>/` 文件夹，按上述结构放入 `manifest.json`、`assets/` 与固件文件
3. 在根目录 `apps.json` 中注册你的应用
4. 本地验证 manifest 字段完整、固件路径可解析
5. 提交 **Pull Request**，说明固件来源、适配设备与测试情况

## 清单编写建议

- `manifest.json` 中的固件路径使用相对路径，版本号目录保持稳定（如 `v1.0.0/`）
- 一个应用可声明多个设备（device），每个设备对应独立的固件文件组
- 资产图片控制体积（logo 建议 SVG 或 < 100 KB PNG），避免拖慢前端加载

:::tip 参考现有应用
动手前建议先阅读 `bruce/` 或 `deskbuddy/` 目录下的 `manifest.json`，它们是最新的标准范例。
:::

:::info 需要官方协助？
如果你需要额外的固件打包、设备适配或工作流改进，可通过 [社区渠道](./community.md) 联系 RockBase IoT 团队，官方可协助完成必要的补充与优化。
:::
