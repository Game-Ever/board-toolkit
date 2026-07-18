# Board Toolkit

A Windows desktop app for working with the **Board** from your PC — install and test
builds, read logs, take screenshots and video, and more, without touching the command
line. `adb` is built in, so there's nothing to set up.

## Download

**[⬇ Download the latest version](https://github.com/Game-Ever/board-toolkit/releases/latest)**

Grab `BoardToolkit-v*.zip` from the release, unzip it, and run **`Board Toolkit.exe`**.
The app tells you when a newer version is available.

> **First run:** since the app isn't code-signed, Windows may show
> *"Windows protected your PC"*. Click **More info → Run anyway**. This is normal for an
> unsigned internal tool.

## Getting started

1. Plug the Board in over USB, with **USB debugging enabled**. The first time, accept the
   debugging prompt that appears on the Board's screen.
2. Open **Board Toolkit**.
3. Choose the folder where your `.apk` builds are.
4. Pick a build from the list and hit **Install**.

## What it does

- **Builds** — install, launch, restart and uninstall apps on the Board, plus clean
  reinstall or reset saved data for a fresh start. It reads the version from the `.apk`,
  shows what's installed on the device, and warns before installing an older version.
- **Logs** — live logcat with Unity presets (running game / Unity errors / native
  crashes / all), colour-coded and filterable, and savable to a file.
- **Media** — take screenshots straight into your PC, record up to 3 min of video (mp4),
  upload images by drag & drop, and open the Board Media Player to preview mockups on the
  device.
- **Wireless** — one click while on USB, then unplug the cable and keep working over
  Wi-Fi (the PC and the Board must be on the same network).
- **Bug reports** — one click bundles a screenshot, the full logcat and device info into
  a `.zip` that's ready to send.

## Languages

English, Spanish and Portuguese — it follows your system language, and you can switch any
time with the flags in the top-right corner.

## Requirements

Windows. That's it — `adb` ships inside, nothing else to install.
