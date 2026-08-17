---
sidebar_position: 2
title: ESPWebApps Contribution Guide
description: How to submit your firmware app to the RockBase IoT Web Flasher
---

# ESPWebApps Contribution Guide

**[ESPWebApps](https://github.com/RockBase-iot/ESPWebApps)** is the firmware aggregation repository behind the [RockBase IoT Web Flasher](https://flash.rockbaseiot.com). It uses a dynamic loading model — a root `apps.json` plus a per-app `manifest.json` — and the community submits or updates firmware via **fork + PR**.

## Runtime Model

- The frontend is path-driven: new app folders can be added **without changing loader code**
- Each app is maintained as a folder in this repository (no git submodules)
- On startup the frontend reads the root `apps.json`, then loads each app's own `manifest.json`

## Repository Layout

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

## What Each App Should Include

```text
<app-id>/
  manifest.json            # App manifest: name, versions, devices, firmware file list
  assets/
    logo.svg|png|jpg       # App icon and product images
  <version>/
    <device>/
      ...                  # Firmware binaries per device
```

## Submission Flow

1. **Fork** the [ESPWebApps](https://github.com/RockBase-iot/ESPWebApps) repository
2. Create a `<app-id>/` folder with `manifest.json`, `assets/`, and firmware files as structured above
3. Register your app in the root `apps.json`
4. Verify locally that manifest fields are complete and firmware paths resolve
5. Open a **Pull Request** describing the firmware source, target devices, and testing status

## Manifest Tips

- Use relative paths for firmware files; keep version directories stable (e.g. `v1.0.0/`)
- One app can declare multiple devices, each with its own firmware file group
- Keep asset images small (SVG or < 100 KB PNG for logos) so the frontend stays fast

:::tip Learn from Existing Apps
Before starting, read the `manifest.json` under `bruce/` or `deskbuddy/` — they are the current reference examples.
:::

:::info Need Help?
For extra firmware packaging, device adaptation, or workflow improvements, reach out via the [community channels](./community.md) — the team can help with the necessary additions and optimizations.
:::
