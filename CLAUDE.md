# Board Toolkit

A Windows desktop app (Electron) for working with the **Board** device from a PC over
adb, without touching the command line. Built for the Game Ever team; shared with the
Board makers (Harris Hill). Repo: https://github.com/Game-Ever/board-toolkit (public, MIT).

`adb` ships **inside** the app, so end users install nothing — they unzip and run.

---

## Features

- **Builds**: install, launch, restart, uninstall, clean reinstall, reset saved data
  (`pm clear`, wipes progress without reinstalling). Reads the package name from the
  `.apk`, shows which version is installed on the device, warns before a downgrade,
  offers to replace a signature-mismatched build, deletes builds to the Recycle Bin,
  drag-drop an `.apk` onto the window, auto-refreshes the folder when new builds appear,
  sortable list, and **closes the previously-launched game** so they don't pile up in RAM.
- **Logs**: live logcat with Unity-aware presets (running game by PID / Unity tag /
  Unity errors / all errors incl. native crashes / everything), colour-coded by level,
  text filter, savable to a file.
- **Media**: screenshots, screen recording (mp4, max 3 min — Android's limit, no audio),
  upload images to the device (button or drag-drop), open the Board Media Player.
- **Wireless adb**: one click while on USB switches the device to Wi-Fi and connects;
  then unplug the cable. PC and Board must share a network.
- **Bug report**: one click zips a screenshot + full logcat + device/build info
  (including the app *actually* running on the device, per the device — not assumed).
- **Update check**: on launch, compares against the latest GitHub Release and shows a
  banner if a newer version exists (notify + manual download — see below).
- **Languages**: English / Spanish / Portuguese, following the OS language on first run,
  switchable with the flags top-right.

---

## Project layout

- `main.js` — Electron main process: all adb calls, IPC handlers, update check,
  in-app confirm dialogs, logcat, recording, wireless, bug report.
- `preload.js` — contextBridge exposing `window.api.*` to the renderer.
- `renderer/` — the UI: `index.html`, `styles.css`, `renderer.js` (includes the `I18N`
  dictionary for the three languages).
- `scripts/` — `build-icon.js` (jpg → ico), `apply-icon.js` (rcedit the exe),
  `make-zip.ps1` (package the zip), `publish-release.ps1` (create the GitHub release).
- `resources/platform-tools/` — bundled `adb.exe` + DLLs (copied into the build).
- `resources/board_logo.jpg` — source of the app icon.
- `README-dist.txt` — the README that ships **inside** the distributed zip.

Not committed (see `.gitignore`): `node_modules/`, `dist/`, `build/` (icons are
regenerated on every build from `board_logo.jpg`).

---

## Development

Requires Node.js.

```
npm install     # first time
npm start       # run in dev
```

Icon regenerates automatically from `resources/board_logo.jpg` on each build. To change
the app icon, replace that jpg.

---

## Building & releasing (how to ship an update)

```
npm run release   # build + package -> dist/BoardToolkit-v<version>.zip
npm run ship      # release + publish a GitHub Release with the zip attached
```

**To cut a new version:**

1. Bump `version` in `package.json` (e.g. `1.0.3` → `1.0.4`).
2. Commit and **push** (via a git client — the repo uses SSH).
3. Run `npm run ship`.

`ship` runs `release` then `scripts/publish-release.ps1`, which:
- refuses to publish if that tag already exists (bump the version first),
- refuses if the local commit isn't the one on GitHub main (push first),
- creates `gh release create v<version>` with the zip attached.

Requires the **GitHub CLI** authenticated once: `gh auth login` (needs `repo` scope).

`npm run zip` also deletes older `BoardToolkit-v*.zip` in `dist/` so only the current
one is there — never send a stale zip.

### Build config notes

- `electron-builder` uses win `target: ["dir"]` + `signAndEditExecutable: false`, and
  is run with env `CSC_IDENTITY_AUTO_DISCOVERY=false`. This avoids the `winCodeSign`
  toolchain, whose archive contains macOS symlinks that fail to extract on Windows
  without Developer Mode. Consequence: the exe is **unsigned**.
- Because electron-builder won't touch the exe, the icon is applied afterwards in
  `postdist` with `rcedit`.
- Kill any running instance before building (the `predist` step does this) or the
  build fails with EBUSY / "Access is denied" on the locked exe.

---

## Distribution

The deliverable is a **portable zip** (`dist/BoardToolkit-v<version>.zip`), containing a
`Board Toolkit/` folder with the exe, bundled adb, and `README.txt`. Users unzip and run
`Board Toolkit.exe` — no installer.

- The exe is **unsigned**, so Windows SmartScreen warns on first run:
  "More info" → "Run anyway". (Only a code-signing certificate removes this.)
- Distribute the link `https://github.com/Game-Ever/board-toolkit/releases/latest`
  so people always get the newest version.

### Why notify-only, not auto-update

Auto-update requires an **installer** (a portable exe self-extracts to a temp folder,
so there's nothing on disk to replace). An installer that downloads and swaps its own
unsigned exe also looks like malware to aggressive antivirus. So the app only *notifies*
about a new version and opens the release page; the user downloads manually. To move to
one-click auto-update later, switch to an NSIS installer + `electron-updater` + ideally a
code-signing certificate.

### Update mechanism

On launch, `main.js` fetches `api.github.com/repos/Game-Ever/board-toolkit/releases/latest`,
strips the `v` from the tag, and compares it to `app.getVersion()` with
`compareVersionNames`. If newer, the renderer shows a dismissible banner with a Download
button that opens the release page. Everything is best-effort — no network or no releases
just shows nothing.

---

## Config & output files

- Settings: `%APPDATA%/board-toolkit/config.json` (the folder name comes from
  package.json `name`; renaming `name` orphans the old config).
- Output root (default `Documents/Board Toolkit`, changeable in the app) with
  `screenshots/`, `videos/`, `reports/` subfolders, created on demand.

---

## Board / adb quirks (learned by testing on a real device)

These are non-obvious and cost real debugging time:

- **Every build ships `versionCode: 1`** (all games, all versions — nobody bumps
  bundleVersionCode). Android therefore treats 0.7.0 and 0.7.1 as the same version:
  reinstall-over just works, and downgrade detection **must compare `versionName`**.
- **`df /data` reports the mount as `/storage/emulated/0/Android/obb`, not `/data`.**
  Parse the free-space by anchoring on the `Use%` column, not the mount point.
- **`monkey` and `adb install` both lie about success** (exit 0 / "Events injected: 1"
  even on failure). Trust the output text, and verify a launch with `pidof` ~2s later.
- **adb's first `devices` reply is often empty** while its server boots — don't declare
  "no device" until a couple of consecutive empty polls.
- **The Board doesn't close the previous app on launch** — force-stop it first (but
  never the launcher, resolved via `category.HOME`, nor `com.android.*`).

---

## i18n

Three languages live in the `I18N` object in `renderer/renderer.js`, plus a smaller
`MSG` object in `main.js` for main-process strings. Both must have identical key sets
across `es`/`en`/`pt` — a missing key renders the raw key name. When adding strings, add
all three. To add a language, add a new key block in both objects and a flag button
(flags are inline SVG — Windows does not render emoji country flags).
