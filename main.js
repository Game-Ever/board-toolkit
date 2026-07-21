const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const AppInfoParser = require('app-info-parser')

let mainWindow = null
let logcatProc = null
let devicePollTimer = null

// where to look for newer versions (public repo, no auth needed)
const UPDATE_REPO = 'Game-Ever/board-toolkit'

// screen recording state
let recordProc = null
let recordDevicePath = ''
let recordSerial = ''

const RECORD_MAX_SECONDS = 180 // screenrecord's hard limit on Android

// ---------------------------------------------------------------------------
// adb resolution: prefer the bundled copy, fall back to PATH
// ---------------------------------------------------------------------------
function adbPath() {
  const candidates = []
  if (app.isPackaged) {
    candidates.push(path.join(process.resourcesPath, 'platform-tools', 'adb.exe'))
  }
  candidates.push(path.join(__dirname, 'resources', 'platform-tools', 'adb.exe'))
  for (const c of candidates) {
    if (fs.existsSync(c)) return c
  }
  return 'adb' // last resort: whatever is on PATH
}

// ---------------------------------------------------------------------------
// Config (persisted in the user profile)
// ---------------------------------------------------------------------------
function configPath() {
  return path.join(app.getPath('userData'), 'config.json')
}

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath(), 'utf8'))
  } catch {
    return {}
  }
}

// default UI language follows the OS; English for anything we don't speak
function defaultLang() {
  try {
    const locale = (app.getLocale() || '').toLowerCase()
    if (locale.startsWith('es')) return 'es'
    if (locale.startsWith('pt')) return 'pt'
    return 'en'
  } catch {
    return 'en'
  }
}

function getConfig() {
  const cfg = loadConfig()
  if (!cfg.buildsFolder) cfg.buildsFolder = ''
  // One configurable root; screenshots/videos/reports get their own subfolder.
  // Migrates the old flat `screenshotsFolder` so existing setups keep their path.
  if (!cfg.outputFolder) {
    cfg.outputFolder = cfg.screenshotsFolder || path.join(app.getPath('documents'), 'Board Toolkit')
  }
  delete cfg.screenshotsFolder
  if (!['en', 'es', 'pt'].includes(cfg.lang)) cfg.lang = defaultLang()
  const SORTS = ['date-desc', 'date-asc', 'name-asc', 'name-desc', 'size-desc']
  if (!SORTS.includes(cfg.sortBy)) cfg.sortBy = 'date-desc'
  if (!cfg.uploadFolder) cfg.uploadFolder = '/sdcard/Pictures'
  if (!cfg.mediaManagerPkg) cfg.mediaManagerPkg = 'co.harrishill.mediaplayer'
  return cfg
}

// Subfolder of the output root, created on demand. kind: screenshots|videos|reports
function outDir(kind) {
  const dir = path.join(getConfig().outputFolder, kind)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function saveConfig(partial) {
  const cfg = { ...getConfig(), ...partial }
  fs.writeFileSync(configPath(), JSON.stringify(cfg, null, 2))
  return cfg
}

// ---------------------------------------------------------------------------
// i18n (main-process user-facing strings)
// ---------------------------------------------------------------------------
let uiLang = 'es'

const MSG = {
  es: {
    noDevice: 'No hay device seleccionado.',
    cleanUninstall: (p) => `\n> Desinstalando ${p} (reinstalación limpia)...\n`,
    installing: (n) => `\n> Instalando ${n}...\n`,
    launching: (p) => `\n> Lanzando ${p}...\n`,
    uninstalling: (p) => `\n> Desinstalando ${p}...\n`,
    restarting: (p) => `\n> Reiniciando ${p}...\n`,
    mkdirFail: (m) => 'No se pudo crear la carpeta: ' + m,
    noImage: 'No se recibieron datos de imagen.',
    saveFail: (m) => 'No se pudo guardar: ' + m,
    uploadingN: (n, dir) => `\n> Subiendo ${n} imagen(es) a ${dir}...\n`,
    pushOne: (n) => `  ${n} ... `,
    pushOk: 'ok\n',
    pushErr: 'ERROR\n',
    delTitle: 'Eliminar build',
    delMsg: (n) => `¿Eliminar ${n}?`,
    delDetail: 'Se mueve a la Papelera de reciclaje (podés recuperarlo).',
    delCancel: 'Cancelar',
    delConfirm: 'Eliminar',
    recStarting: '\n> Grabando pantalla del device (máx 3 min, sin audio)...\n',
    recSaving: '\n> Guardando video...\n',
    recNoFile: 'No se pudo traer el video del device.',
    recBusy: 'Ya hay una grabación en curso.',
    replTitle: 'No se pudo instalar',
    replMsg: '¿Reemplazar la app que ya está instalada?',
    replDetail: (p) =>
      `La versión de ${p} instalada en el device es incompatible con esta ` +
      `(firma distinta, o la instalada es más nueva).\n\n` +
      `Para instalar esta hay que desinstalar la actual primero. ` +
      `Se pierden los datos guardados de la app en el device.`,
    replCancel: 'Cancelar',
    replConfirm: 'Desinstalar e instalar',
    replUninstalling: (p) => `\n> Desinstalando ${p} para reemplazarla...\n`,
    dgTitle: 'Versión más vieja',
    dgMsg: 'Estás por instalar una versión más vieja que la que hay en el device.',
    dgDetail: (inst, neu) =>
      `Instalada en el device: ${inst}\nLa que vas a instalar: ${neu}\n\n` +
      `No se pierden los datos guardados. ¿Continuar?`,
    dgCancel: 'Cancelar',
    dgConfirm: 'Instalar igual',
    resetTitle: 'Resetear datos',
    resetMsg: (p) => `¿Borrar todos los datos de ${p}?`,
    resetDetail:
      'La app queda como recién instalada: se pierde el guardado, progreso y configuración. ' +
      'La app NO se desinstala.',
    resetCancel: 'Cancelar',
    resetConfirm: 'Borrar datos',
    resetting: (p) => `\n> Borrando datos de ${p}...\n`,
    wlStarting: '\n> Activando modo inalámbrico...\n',
    wlNoIp: 'No se pudo detectar la IP del device. ¿Está conectado a wifi?',
    wlFail: 'No se pudo conectar por wifi.',
    wlAlready: 'Ese device ya está conectado por wifi.',
    brStarting: '\n> Armando reporte de bug...\n',
    brFail: 'No se pudo armar el reporte.',
    spaceTitle: 'Poco espacio en el device',
    spaceMsg: 'Puede que no haya espacio suficiente para instalar.',
    spaceDetail: (free, need) =>
      `Libre en el device: ${free}\nEl build ocupa: ${need}\n\n` +
      `La instalación puede fallar. ¿Intentar igual?`,
    spaceCancel: 'Cancelar',
    spaceConfirm: 'Intentar igual',
    pickBuildsTitle: 'Elegí la carpeta donde están tus builds (.apk)',
    pickOutputTitle: 'Elegí dónde guardar capturas, videos y reportes',
    pickImagesTitle: 'Elegí las imágenes para subir al device',
    pickFolderBtn: 'Usar esta carpeta',
    launchCrashed:
      '\n⚠ La app se abrió y se cerró sola (crashea al iniciar).\n' +
      '  Mirá la pestaña Logcat con el preset "Errores" para ver por qué.\n',
    stoppingOther: (p) => `> Cerrando ${p} (estaba abierta)...\n`,
  },
  en: {
    noDevice: 'No device selected.',
    cleanUninstall: (p) => `\n> Uninstalling ${p} (clean reinstall)...\n`,
    installing: (n) => `\n> Installing ${n}...\n`,
    launching: (p) => `\n> Launching ${p}...\n`,
    uninstalling: (p) => `\n> Uninstalling ${p}...\n`,
    restarting: (p) => `\n> Restarting ${p}...\n`,
    mkdirFail: (m) => 'Could not create folder: ' + m,
    noImage: 'No image data received.',
    saveFail: (m) => 'Could not save: ' + m,
    uploadingN: (n, dir) => `\n> Uploading ${n} image(s) to ${dir}...\n`,
    pushOne: (n) => `  ${n} ... `,
    pushOk: 'ok\n',
    pushErr: 'ERROR\n',
    delTitle: 'Delete build',
    delMsg: (n) => `Delete ${n}?`,
    delDetail: 'It will be moved to the Recycle Bin (recoverable).',
    delCancel: 'Cancel',
    delConfirm: 'Delete',
    recStarting: '\n> Recording device screen (max 3 min, no audio)...\n',
    recSaving: '\n> Saving video...\n',
    recNoFile: 'Could not pull the video off the device.',
    recBusy: 'A recording is already running.',
    replTitle: 'Install failed',
    replMsg: 'Replace the app already installed?',
    replDetail: (p) =>
      `The version of ${p} on the device is incompatible with this one ` +
      `(different signing key, or the installed one is newer).\n\n` +
      `Installing this build means uninstalling the current one first. ` +
      `The app's saved data on the device will be lost.`,
    replCancel: 'Cancel',
    replConfirm: 'Uninstall & install',
    replUninstalling: (p) => `\n> Uninstalling ${p} to replace it...\n`,
    dgTitle: 'Older version',
    dgMsg: "You're about to install an older version than the one on the device.",
    dgDetail: (inst, neu) =>
      `Installed on device: ${inst}\nAbout to install: ${neu}\n\n` +
      `Saved data will be kept. Continue?`,
    dgCancel: 'Cancel',
    dgConfirm: 'Install anyway',
    resetTitle: 'Reset data',
    resetMsg: (p) => `Wipe all data for ${p}?`,
    resetDetail:
      'The app will be left as freshly installed: saves, progress and settings are lost. ' +
      'The app itself is NOT uninstalled.',
    resetCancel: 'Cancel',
    resetConfirm: 'Wipe data',
    resetting: (p) => `\n> Wiping data for ${p}...\n`,
    wlStarting: '\n> Switching to wireless mode...\n',
    wlNoIp: "Could not detect the device's IP. Is it on wifi?",
    wlFail: 'Could not connect over wifi.',
    wlAlready: 'That device is already connected over wifi.',
    brStarting: '\n> Building bug report...\n',
    brFail: 'Could not build the report.',
    spaceTitle: 'Low space on device',
    spaceMsg: 'There may not be enough space to install.',
    spaceDetail: (free, need) =>
      `Free on device: ${free}\nBuild size: ${need}\n\n` + `The install may fail. Try anyway?`,
    spaceCancel: 'Cancel',
    spaceConfirm: 'Try anyway',
    pickBuildsTitle: 'Choose the folder where your builds (.apk) live',
    pickOutputTitle: 'Choose where to save screenshots, videos and reports',
    pickImagesTitle: 'Choose the images to upload to the device',
    pickFolderBtn: 'Use this folder',
    launchCrashed:
      '\n⚠ The app opened and closed itself (it crashes on startup).\n' +
      '  Check the Logcat tab with the "Errors" preset to see why.\n',
    stoppingOther: (p) => `> Closing ${p} (it was open)...\n`,
  },
  pt: {
    noDevice: 'Nenhum device selecionado.',
    cleanUninstall: (p) => `\n> Desinstalando ${p} (reinstalação limpa)...\n`,
    installing: (n) => `\n> Instalando ${n}...\n`,
    launching: (p) => `\n> Abrindo ${p}...\n`,
    uninstalling: (p) => `\n> Desinstalando ${p}...\n`,
    restarting: (p) => `\n> Reiniciando ${p}...\n`,
    mkdirFail: (m) => 'Não foi possível criar a pasta: ' + m,
    noImage: 'Nenhum dado de imagem recebido.',
    saveFail: (m) => 'Não foi possível salvar: ' + m,
    uploadingN: (n, dir) => `\n> Enviando ${n} imagem(ns) para ${dir}...\n`,
    pushOne: (n) => `  ${n} ... `,
    pushOk: 'ok\n',
    pushErr: 'ERRO\n',
    delTitle: 'Excluir build',
    delMsg: (n) => `Excluir ${n}?`,
    delDetail: 'Vai para a Lixeira (você pode recuperar).',
    delCancel: 'Cancelar',
    delConfirm: 'Excluir',
    recStarting: '\n> Gravando a tela do device (máx 3 min, sem áudio)...\n',
    recSaving: '\n> Salvando vídeo...\n',
    recNoFile: 'Não foi possível trazer o vídeo do device.',
    recBusy: 'Já existe uma gravação em andamento.',
    replTitle: 'Falha na instalação',
    replMsg: 'Substituir o app já instalado?',
    replDetail: (p) =>
      `A versão de ${p} instalada no device é incompatível com esta ` +
      `(assinatura diferente, ou a instalada é mais nova).\n\n` +
      `Para instalar este build é preciso desinstalar o atual primeiro. ` +
      `Os dados salvos do app no device serão perdidos.`,
    replCancel: 'Cancelar',
    replConfirm: 'Desinstalar e instalar',
    replUninstalling: (p) => `\n> Desinstalando ${p} para substituir...\n`,
    dgTitle: 'Versão mais antiga',
    dgMsg: 'Você vai instalar uma versão mais antiga do que a que está no device.',
    dgDetail: (inst, neu) =>
      `Instalada no device: ${inst}\nVocê vai instalar: ${neu}\n\n` +
      `Os dados salvos serão mantidos. Continuar?`,
    dgCancel: 'Cancelar',
    dgConfirm: 'Instalar mesmo assim',
    resetTitle: 'Resetar dados',
    resetMsg: (p) => `Apagar todos os dados de ${p}?`,
    resetDetail:
      'O app fica como recém-instalado: você perde o save, o progresso e as configurações. ' +
      'O app NÃO é desinstalado.',
    resetCancel: 'Cancelar',
    resetConfirm: 'Apagar dados',
    resetting: (p) => `\n> Apagando dados de ${p}...\n`,
    wlStarting: '\n> Ativando o modo sem fio...\n',
    wlNoIp: 'Não foi possível detectar o IP do device. Ele está no wifi?',
    wlFail: 'Não foi possível conectar por wifi.',
    wlAlready: 'Esse device já está conectado por wifi.',
    brStarting: '\n> Montando o relatório de bug...\n',
    brFail: 'Não foi possível montar o relatório.',
    spaceTitle: 'Pouco espaço no device',
    spaceMsg: 'Pode não haver espaço suficiente para instalar.',
    spaceDetail: (free, need) =>
      `Livre no device: ${free}\nO build ocupa: ${need}\n\n` +
      `A instalação pode falhar. Tentar mesmo assim?`,
    spaceCancel: 'Cancelar',
    spaceConfirm: 'Tentar mesmo assim',
    pickBuildsTitle: 'Escolha a pasta onde estão seus builds (.apk)',
    pickOutputTitle: 'Escolha onde salvar capturas, vídeos e relatórios',
    pickImagesTitle: 'Escolha as imagens para enviar ao device',
    pickFolderBtn: 'Usar esta pasta',
    launchCrashed:
      '\n⚠ O app abriu e fechou sozinho (crasha ao iniciar).\n' +
      '  Veja a aba Logcat com o preset "Erros" para entender o porquê.\n',
    stoppingOther: (p) => `> Fechando ${p} (estava aberto)...\n`,
  },
}

function M(key, ...args) {
  const dict = MSG[uiLang] || MSG.es
  const v = dict[key]
  return typeof v === 'function' ? v(...args) : v
}

function setUiLang(lang) {
  if (['en', 'es', 'pt'].includes(lang)) uiLang = lang
}

// ---------------------------------------------------------------------------
// Confirmations: asked in-app (renderer modal) instead of a native Windows box,
// so they match the theme. Same shape as dialog.showMessageBox: -> { response }
// ---------------------------------------------------------------------------
let confirmSeq = 0
const pendingConfirms = new Map()

function askUser(opts) {
  return new Promise((resolve) => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return resolve({ response: opts.cancelId || 0 }) // no window: treat as cancel
    }
    const id = ++confirmSeq
    pendingConfirms.set(id, resolve)
    mainWindow.webContents.send('confirm-request', { id, ...opts })
  })
}

ipcMain.on('confirm-reply', (e, { id, response }) => {
  const resolve = pendingConfirms.get(id)
  if (resolve) {
    pendingConfirms.delete(id)
    resolve({ response })
  }
})

// ---------------------------------------------------------------------------
// adb runners
// ---------------------------------------------------------------------------
function emitLog(text) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('op-log', text)
  }
}

function runAdb(args, { serial, onData } = {}) {
  return new Promise((resolve) => {
    const full = serial ? ['-s', serial, ...args] : args
    let proc
    try {
      proc = spawn(adbPath(), full, { windowsHide: true })
    } catch (e) {
      return resolve({ ok: false, code: -1, output: String(e.message || e) })
    }
    let out = ''
    const handle = (d) => {
      const s = d.toString()
      out += s
      if (onData) onData(s)
    }
    proc.stdout.on('data', handle)
    proc.stderr.on('data', handle)
    proc.on('error', (e) => resolve({ ok: false, code: -1, output: out + '\n' + e.message }))
    proc.on('close', (code) => resolve({ ok: code === 0, code, output: out.trim() }))
  })
}

function runAdbBinary(args, { serial } = {}) {
  return new Promise((resolve) => {
    const full = serial ? ['-s', serial, ...args] : args
    let proc
    try {
      proc = spawn(adbPath(), full, { windowsHide: true })
    } catch (e) {
      return resolve({ ok: false, buffer: null, error: String(e.message || e) })
    }
    const chunks = []
    let err = ''
    proc.stdout.on('data', (d) => chunks.push(d))
    proc.stderr.on('data', (d) => (err += d.toString()))
    proc.on('error', (e) => resolve({ ok: false, buffer: null, error: e.message }))
    proc.on('close', (code) =>
      resolve({ ok: code === 0, buffer: Buffer.concat(chunks), error: err.trim() })
    )
  })
}

// ---------------------------------------------------------------------------
// Devices
// ---------------------------------------------------------------------------
function parseDevices(output) {
  const lines = output.split(/\r?\n/).slice(1) // drop "List of devices attached"
  const devices = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const parts = trimmed.split(/\s+/)
    const serial = parts[0]
    const state = parts[1] || 'unknown'
    let model = ''
    for (const p of parts.slice(2)) {
      if (p.startsWith('model:')) model = p.slice(6).replace(/_/g, ' ')
    }
    devices.push({ serial, state, model })
  }
  return devices
}

async function listDevices() {
  const res = await runAdb(['devices', '-l'])
  if (!res.ok && !res.output) return []
  return parseDevices(res.output)
}

// ---------------------------------------------------------------------------
// Builds folder watcher: refresh the list when a new build lands
// ---------------------------------------------------------------------------
let folderWatcher = null
let folderDebounce = null

function watchBuildsFolder(folder) {
  if (folderWatcher) {
    try {
      folderWatcher.close()
    } catch {
      /* ignore */
    }
    folderWatcher = null
  }
  if (!folder || !fs.existsSync(folder)) return
  try {
    folderWatcher = fs.watch(folder, (eventType, filename) => {
      if (filename && !/\.apk$/i.test(filename)) return
      // builds land in chunks — wait for the writes to settle
      clearTimeout(folderDebounce)
      folderDebounce = setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('folder-changed')
        }
      }, 1200)
    })
  } catch {
    /* watching is a nicety; ignore failures */
  }
}

function startDevicePolling() {
  const tick = async () => {
    const devices = await listDevices()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('devices', devices)
    }
  }
  tick()
  devicePollTimer = setInterval(tick, 2500)
}

// ---------------------------------------------------------------------------
// APK helpers
// ---------------------------------------------------------------------------
function scanApks(folder) {
  if (!folder || !fs.existsSync(folder)) return []
  let entries = []
  try {
    entries = fs.readdirSync(folder)
  } catch {
    return []
  }
  const apks = []
  for (const name of entries) {
    if (!name.toLowerCase().endsWith('.apk')) continue
    const full = path.join(folder, name)
    try {
      const st = fs.statSync(full)
      if (st.isFile()) {
        apks.push({ path: full, name, size: st.size, mtime: st.mtimeMs })
      }
    } catch {
      /* ignore */
    }
  }
  apks.sort((a, b) => b.mtime - a.mtime)
  return apks
}

async function readApkInfo(apkPath) {
  try {
    const parser = new AppInfoParser(apkPath)
    const r = await parser.parse()
    let label = ''
    if (r.application && r.application.label) {
      label = Array.isArray(r.application.label) ? r.application.label[0] : r.application.label
    }
    return {
      ok: true,
      package: r.package || '',
      versionName: r.versionName || '',
      versionCode: r.versionCode || '',
      label: label || '',
      icon: r.icon || null,
    }
  } catch (e) {
    return { ok: false, error: String(e.message || e) }
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
// The device's home/launcher package — never force-stop this one.
let homePkg = null
async function getHomePackage(serial) {
  if (homePkg !== null) return homePkg
  const r = await runAdb(
    [
      'shell',
      'cmd',
      'package',
      'resolve-activity',
      '--brief',
      '-a',
      'android.intent.action.MAIN',
      '-c',
      'android.intent.category.HOME',
    ],
    { serial }
  )
  const m = (r.output || '').match(/^([A-Za-z0-9_.]+)\//m)
  homePkg = m ? m[1] : ''
  return homePkg
}

// Everything we've launched this session, so we can clean up after ourselves.
const launchedPkgs = new Set()

// Board surfaces the user must be able to return to — never force-stop these.
// (The Board library isn't registered as the HOME launcher, so it needs its own
// entry; the registered launcher is com.android.launcher3, already excluded below.)
const PROTECTED_PKGS = new Set(['co.harrishill.library', 'co.harrishill.mediaplayer'])

// The Board is a dedicated device: leaving a previous Unity game resident eats
// RAM/GPU and bogs it down. Android won't close it on its own, so we do — the
// games we launched AND whatever game is currently in the foreground (covers games
// opened from the library) — but never the library, launcher, or system apps.
async function stopOtherApps(serial, keepPkg) {
  const home = await getHomePackage(serial)
  const candidates = new Set(launchedPkgs)
  const fg = await getForegroundApp(serial)
  if (fg && fg.pkg) candidates.add(fg.pkg)

  for (const other of candidates) {
    if (!other || other === keepPkg || other === home) continue
    if (other.startsWith('com.android.')) continue // system, not a game
    if (PROTECTED_PKGS.has(other)) continue // Board library / media player
    emitLog(M('stoppingOther', other))
    await runAdb(['shell', 'am', 'force-stop', other], { serial })
    launchedPkgs.delete(other)
  }
}

// monkey reports "Events injected: 1" even when the app segfaults a millisecond
// later, so it can't be trusted on its own: check the process is actually alive.
async function launchApp(serial, pkg) {
  await stopOtherApps(serial, pkg)
  launchedPkgs.add(pkg)

  const res = await runAdb(
    ['shell', 'monkey', '-p', pkg, '-c', 'android.intent.category.LAUNCHER', '1'],
    { serial, onData: emitLog }
  )
  if (!res.ok) return res

  await new Promise((r) => setTimeout(r, 2000)) // give it a moment to come up (or die)
  const alive = (await runAdb(['shell', 'pidof', '-s', pkg], { serial })).output.trim()
  if (!alive) {
    emitLog(M('launchCrashed'))
    return { ...res, ok: false, crashed: true }
  }
  return res
}

// ---------------------------------------------------------------------------
// Logcat
// ---------------------------------------------------------------------------
function stopLogcat() {
  if (logcatProc) {
    try {
      logcatProc.kill()
    } catch {
      /* ignore */
    }
    logcatProc = null
  }
}

// ---------------------------------------------------------------------------
// Window
// ---------------------------------------------------------------------------
function createWindow() {
  const iconPath = path.join(__dirname, 'build', 'icon.ico')
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 864,
    minWidth: 940,
    minHeight: 640,
    backgroundColor: '#14121c',
    title: 'Board Toolkit',
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'))
}

app.whenReady().then(() => {
  const cfg = getConfig()
  setUiLang(cfg.lang)
  createWindow()
  startDevicePolling()
  watchBuildsFolder(cfg.buildsFolder)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  stopLogcat()
  // abandon any in-flight recording: skip the pull, just stop the adb process
  if (recordProc) {
    recordDevicePath = ''
    try {
      recordProc.kill()
    } catch {
      /* ignore */
    }
    recordProc = null
  }
  if (devicePollTimer) clearInterval(devicePollTimer)
  app.quit()
})

// ---------------------------------------------------------------------------
// IPC
// ---------------------------------------------------------------------------
ipcMain.handle('get-version', () => app.getVersion())

ipcMain.handle('open-external', (e, url) => {
  if (/^https?:\/\//i.test(url || '')) shell.openExternal(url)
})

// Asks GitHub for the latest published release and compares it to us.
// Everything is best-effort: no network / no releases yet -> {available:false}.
ipcMain.handle('check-update', async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${UPDATE_REPO}/releases/latest`, {
      headers: { 'User-Agent': 'Board-Toolkit', Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return { available: false }
    const rel = await res.json()
    const latest = (rel.tag_name || '').replace(/^v/i, '').trim()
    if (!latest) return { available: false }
    const current = app.getVersion()
    return {
      available: compareVersionNames(current, latest) === -1, // current is older
      latest,
      current,
      url: rel.html_url || `https://github.com/${UPDATE_REPO}/releases/latest`,
    }
  } catch {
    return { available: false }
  }
})
ipcMain.handle('get-config', () => getConfig())
ipcMain.handle('set-config', (e, partial) => {
  if (partial && partial.lang) setUiLang(partial.lang)
  const cfg = saveConfig(partial)
  if (partial && partial.buildsFolder) watchBuildsFolder(cfg.buildsFolder)
  return cfg
})

// The picker is the first thing a new user sees, so it has to say what it wants:
// a bare "Select Folder" box tells them nothing.
ipcMain.handle('pick-folder', async (e, { kind, lang } = {}) => {
  setUiLang(lang)
  const cfg = getConfig()
  const isOutput = kind === 'output'
  const r = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: isOutput ? M('pickOutputTitle') : M('pickBuildsTitle'),
    buttonLabel: M('pickFolderBtn'),
    defaultPath: (isOutput ? cfg.outputFolder : cfg.buildsFolder) || undefined,
  })
  return r.canceled ? null : r.filePaths[0]
})

ipcMain.handle('pick-apk', async () => {
  const r = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Android package', extensions: ['apk'] }],
  })
  return r.canceled ? null : r.filePaths[0]
})

ipcMain.handle('scan-apks', (e, folder) => scanApks(folder))

ipcMain.handle('save-text', async (e, { defaultName, text }) => {
  const r = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName,
    filters: [{ name: 'Text', extensions: ['txt', 'log'] }],
  })
  if (r.canceled || !r.filePath) return { ok: false, canceled: true }
  try {
    fs.writeFileSync(r.filePath, text)
    return { ok: true, file: r.filePath }
  } catch (err) {
    return { ok: false, error: err.message }
  }
})

ipcMain.handle('delete-apk', async (e, { path: apkPath, lang }) => {
  setUiLang(lang)
  const name = path.basename(apkPath)
  const r = await askUser({
    type: 'warning',
    danger: true,
    buttons: [M('delCancel'), M('delConfirm')],
    defaultId: 1,
    cancelId: 0,
    title: M('delTitle'),
    message: M('delMsg', name),
    detail: M('delDetail'),
  })
  if (r.response !== 1) return { ok: false, canceled: true }
  try {
    await shell.trashItem(apkPath)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
})
ipcMain.handle('read-apk-info', (e, apkPath) => readApkInfo(apkPath))
ipcMain.handle('list-devices', () => listDevices())

// What's on the device for this package, and how it compares to the selected apk.
// cmp: 1 = installed is newer, 0 = same, -1 = installed is older, null = can't tell.
ipcMain.handle('installed-version', async (e, { serial, pkg, version }) => {
  if (!serial || !pkg) return null
  const inst = await getInstalledVersion(serial, pkg)
  if (!inst) return { installed: false }
  return {
    installed: true,
    versionName: inst.versionName,
    versionCode: inst.versionCode,
    cmp: version ? compareVersionNames(inst.versionName, version) : null,
  }
})

// The install can't proceed while the currently-installed app is in the way:
// different signing key (dev vs production build) or a newer version installed.
// Uninstalling first is the only fix — but it wipes the app's saved data.
function isBlockedByInstalledApp(output) {
  const o = (output || '').toUpperCase()
  return (
    o.includes('INSTALL_FAILED_UPDATE_INCOMPATIBLE') ||
    o.includes('INCONSISTENT_CERTIFICATES') ||
    o.includes('INSTALL_FAILED_VERSION_DOWNGRADE') ||
    o.includes('SIGNATURES DO NOT MATCH')
  )
}

// adb install is inconsistent about exit codes: several versions print
// "Failure [INSTALL_FAILED_...]" and still exit 0. Trust the output text.
function installFailed(res) {
  const o = res.output || ''
  if (/Failure\s*\[/i.test(o)) return true
  if (/^\s*Success\s*$/im.test(o)) return false
  return !res.ok
}

// What's installed right now, or null if the package isn't on the device.
async function getInstalledVersion(serial, pkg) {
  const r = await runAdb(['shell', 'dumpsys', 'package', pkg], { serial })
  const out = r.output || ''
  const name = out.match(/versionName=(\S+)/)
  const code = out.match(/versionCode=(\d+)/)
  if (!name && !code) return null // not installed
  return { versionName: name ? name[1] : '', versionCode: code ? code[1] : '' }
}

// Compares "0.7.1" style names. Returns -1 / 0 / 1, or null when either side
// isn't numeric enough to judge (then we stay quiet rather than warn wrongly).
// NOTE: versionCode is useless here — every build ships with versionCode=1.
function compareVersionNames(a, b) {
  const parse = (v) =>
    String(v || '')
      .split(/[.\-+_]/)
      .map((x) => parseInt(x, 10))
  const pa = parse(a)
  const pb = parse(b)
  if (!pa.some(Number.isFinite) || !pb.some(Number.isFinite)) return null
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = Number.isFinite(pa[i]) ? pa[i] : 0
    const y = Number.isFinite(pb[i]) ? pb[i] : 0
    if (x !== y) return x < y ? -1 : 1
  }
  return 0
}

function fmtBytes(b) {
  const mb = b / (1024 * 1024)
  return mb >= 1024 ? (mb / 1024).toFixed(1) + ' GB' : Math.round(mb) + ' MB'
}

// Free bytes on /data, or null if df's output isn't parseable.
// Don't match on the mount point: `df /data` can report it as something else
// entirely (the Board says /storage/emulated/0/Android/obb). `df /data` returns
// one filesystem row, so anchor on the "Use%" column — Available sits before it.
async function getFreeSpace(serial) {
  const out = (await runAdb(['shell', 'df', '/data'], { serial })).output || ''
  const rows = out
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^Filesystem/i.test(l))
  const row = rows.find((l) => /\s\d+%\s/.test(l))
  if (!row) return null
  const cols = row.split(/\s+/)
  const pctIdx = cols.findIndex((c) => /^\d+%$/.test(c))
  if (pctIdx < 1) return null
  const avail = parseInt(cols[pctIdx - 1], 10) // 1K-blocks
  return Number.isFinite(avail) ? avail * 1024 : null
}

ipcMain.handle('install', async (e, { serial, apk, pkg, version, launch, clean, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, output: M('noDevice') }

  // adb's out-of-space error is cryptic; warn up front instead
  try {
    const need = fs.statSync(apk).size
    const free = await getFreeSpace(serial)
    if (free !== null && free < need * 1.15) {
      const answer = await askUser({
        type: 'warning',
        buttons: [M('spaceCancel'), M('spaceConfirm')],
        defaultId: 0,
        cancelId: 0,
        title: M('spaceTitle'),
        message: M('spaceMsg'),
        detail: M('spaceDetail', fmtBytes(free), fmtBytes(need)),
      })
      if (answer.response !== 1) return { ok: false, canceled: true, output: '' }
    }
  } catch {
    /* can't stat or df: just try the install */
  }

  // Warn before going backwards. Compares versionName, since versionCode is 1
  // in every build and Android therefore sees these as the same version.
  if (pkg && version && !clean) {
    const installed = await getInstalledVersion(serial, pkg)
    if (installed && installed.versionName) {
      const cmp = compareVersionNames(installed.versionName, version)
      if (cmp === 1) {
        const answer = await askUser({
          type: 'question',
          buttons: [M('dgCancel'), M('dgConfirm')],
          defaultId: 1,
          cancelId: 0,
          title: M('dgTitle'),
          message: M('dgMsg'),
          detail: M('dgDetail', installed.versionName, version),
        })
        if (answer.response !== 1) return { ok: false, canceled: true, output: '' }
      }
    }
  }

  if (clean && pkg) {
    emitLog(M('cleanUninstall', pkg))
    await runAdb(['uninstall', pkg], { serial, onData: emitLog })
  }
  emitLog(M('installing', path.basename(apk)))
  let res = await runAdb(['install', '-r', '-d', apk], { serial, onData: emitLog })
  res.ok = !installFailed(res)

  if (!res.ok && pkg && isBlockedByInstalledApp(res.output)) {
    const answer = await askUser({
      type: 'warning',
      danger: true,
      buttons: [M('replCancel'), M('replConfirm')],
      defaultId: 1,
      cancelId: 0,
      title: M('replTitle'),
      message: M('replMsg'),
      detail: M('replDetail', pkg),
    })
    if (answer.response !== 1) return { ...res, canceled: true }

    emitLog(M('replUninstalling', pkg))
    await runAdb(['uninstall', pkg], { serial, onData: emitLog })
    emitLog(M('installing', path.basename(apk)))
    res = await runAdb(['install', '-r', '-d', apk], { serial, onData: emitLog })
    res.ok = !installFailed(res)
    res.replaced = true
  }

  if (res.ok && launch && pkg) {
    emitLog(M('launching', pkg))
    const launched = await launchApp(serial, pkg)
    // the install genuinely succeeded; report the crash separately
    if (launched.crashed) res.crashed = true
  }
  return res
})

// Wipes saves/progress without touching the install — much faster than a
// 400MB clean reinstall when you just want a fresh-player state.
ipcMain.handle('clear-data', async (e, { serial, pkg, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, output: M('noDevice') }
  const answer = await askUser({
    type: 'warning',
    danger: true,
    buttons: [M('resetCancel'), M('resetConfirm')],
    defaultId: 1,
    cancelId: 0,
    title: M('resetTitle'),
    message: M('resetMsg', pkg),
    detail: M('resetDetail'),
  })
  if (answer.response !== 1) return { ok: false, canceled: true }
  emitLog(M('resetting', pkg))
  const res = await runAdb(['shell', 'pm', 'clear', pkg], { serial, onData: emitLog })
  res.ok = /Success/i.test(res.output || '') // pm clear prints Success/Failed
  return res
})

// ---------------------------------------------------------------------------
// Wireless adb
// ---------------------------------------------------------------------------
async function getDeviceIp(serial) {
  let r = await runAdb(['shell', 'ip', '-f', 'inet', 'addr', 'show', 'wlan0'], { serial })
  let m = (r.output || '').match(/inet\s+(\d+\.\d+\.\d+\.\d+)/)
  if (m) return m[1]
  r = await runAdb(['shell', 'ip', 'route'], { serial }) // fallback: default route src
  m = (r.output || '').match(/src\s+(\d+\.\d+\.\d+\.\d+)/)
  return m ? m[1] : ''
}

ipcMain.handle('wireless-connect', async (e, { serial, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, error: M('noDevice') }
  if (serial.includes(':')) return { ok: false, error: M('wlAlready') }
  emitLog(M('wlStarting'))
  const ip = await getDeviceIp(serial)
  if (!ip) return { ok: false, error: M('wlNoIp') }
  await runAdb(['tcpip', '5555'], { serial, onData: emitLog })
  await new Promise((r) => setTimeout(r, 1800)) // adbd restarts in tcp mode
  const c = await runAdb(['connect', ip + ':5555'], { onData: emitLog })
  const ok = /connected to/i.test(c.output || '')
  return ok
    ? { ok: true, address: ip + ':5555' }
    : { ok: false, error: (c.output || '').trim() || M('wlFail') }
})

ipcMain.handle('wireless-disconnect', async (e, { serial, lang }) => {
  setUiLang(lang)
  await runAdb(['disconnect', serial], { onData: emitLog })
  return { ok: true }
})

ipcMain.handle('uninstall', async (e, { serial, pkg, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, output: M('noDevice') }
  emitLog(M('uninstalling', pkg))
  return runAdb(['uninstall', pkg], { serial, onData: emitLog })
})

ipcMain.handle('launch', async (e, { serial, pkg, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, output: M('noDevice') }
  emitLog(M('launching', pkg))
  return launchApp(serial, pkg)
})

ipcMain.handle('restart', async (e, { serial, pkg, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, output: M('noDevice') }
  emitLog(M('restarting', pkg))
  await runAdb(['shell', 'am', 'force-stop', pkg], { serial, onData: emitLog })
  return launchApp(serial, pkg)
})

ipcMain.handle('screenshot', async (e, { serial, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, error: M('noDevice') }
  let dir
  try {
    dir = outDir('screenshots')
  } catch (err) {
    return { ok: false, error: M('mkdirFail', err.message) }
  }
  const res = await runAdbBinary(['exec-out', 'screencap', '-p'], { serial })
  if (!res.ok || !res.buffer || res.buffer.length === 0) {
    return { ok: false, error: res.error || M('noImage') }
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const file = path.join(dir, `board-${stamp}.png`)
  try {
    fs.writeFileSync(file, res.buffer)
  } catch (err) {
    return { ok: false, error: M('saveFail', err.message) }
  }
  return { ok: true, file }
})

ipcMain.handle('open-path', async (e, target) => {
  if (!target) return
  try {
    if (!fs.existsSync(target)) {
      // folder not created yet (e.g. screenshots dir before first capture)
      fs.mkdirSync(target, { recursive: true })
    }
    const stat = fs.statSync(target)
    if (stat.isFile()) shell.showItemInFolder(target)
    else shell.openPath(target)
  } catch {
    /* ignore */
  }
})

// ---------------------------------------------------------------------------
// Bug report: screenshot + logcat + device/build info, zipped up to send
// ---------------------------------------------------------------------------
function zipFolder(srcDir, destZip) {
  return new Promise((resolve) => {
    const ps = spawn(
      'powershell',
      [
        '-NoProfile',
        '-Command',
        `Compress-Archive -Path '${srcDir}\\*' -DestinationPath '${destZip}' -Force`,
      ],
      { windowsHide: true }
    )
    ps.on('close', (code) => resolve(code === 0))
    ps.on('error', () => resolve(false))
  })
}

// What the device says is actually in the foreground right now. Never assume
// it's the selected build — the tester may have been in a different app.
async function getForegroundApp(serial) {
  let out = (await runAdb(['shell', 'dumpsys', 'activity', 'activities'], { serial })).output || ''
  let m = out.match(/(?:top|m)ResumedActivity[^\n]*?\s([A-Za-z0-9_.]+)\/([A-Za-z0-9_.$]+)/)
  if (!m) {
    out = (await runAdb(['shell', 'dumpsys', 'window'], { serial })).output || ''
    m = out.match(/mCurrentFocus=Window\{[^}]*?\s([A-Za-z0-9_.]+)\/([A-Za-z0-9_.$]+)\}/)
  }
  return m ? { pkg: m[1], activity: m[2] } : null
}

function pickProps(getpropOut) {
  const grab = (key) => {
    const m = (getpropOut || '').match(new RegExp('\\[' + key + '\\]: \\[([^\\]]*)\\]'))
    return m ? m[1] : '?'
  }
  return {
    manufacturer: grab('ro.product.manufacturer'),
    model: grab('ro.product.model'),
    android: grab('ro.build.version.release'),
    sdk: grab('ro.build.version.sdk'),
  }
}

ipcMain.handle('bug-report', async (e, { serial, pkg, apkName, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, error: M('noDevice') }
  emitLog(M('brStarting'))

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  let dir
  try {
    dir = path.join(outDir('reports'), `bug-report-${stamp}`)
    fs.mkdirSync(dir, { recursive: true })
  } catch (err) {
    return { ok: false, error: M('mkdirFail', err.message) }
  }

  // screenshot (best effort — a report without it is still useful)
  const shot = await runAdbBinary(['exec-out', 'screencap', '-p'], { serial })
  if (shot.ok && shot.buffer && shot.buffer.length) {
    fs.writeFileSync(path.join(dir, 'screenshot.png'), shot.buffer)
  }

  // full logcat buffer dump
  const lg = await runAdb(['logcat', '-d', '-v', 'time'], { serial })
  fs.writeFileSync(path.join(dir, 'logcat.txt'), lg.output || '')

  // device + build context
  const props = pickProps((await runAdb(['shell', 'getprop'], { serial })).output)
  const df = (await runAdb(['shell', 'df', '/data'], { serial })).output || ''

  // what the DEVICE says is running — the source of truth for a bug report
  const fg = await getForegroundApp(serial)
  const fgVer = fg ? await getInstalledVersion(serial, fg.pkg) : null

  // what Board Toolkit had selected — context only, may not be what ran
  const inst = pkg ? await getInstalledVersion(serial, pkg) : null

  const ver = (v) => (v ? `${v.versionName} (versionCode ${v.versionCode})` : '(unknown)')
  const info = [
    'Board Toolkit — bug report',
    'Generated: ' + new Date().toString(),
    '',
    '=== Device ===',
    `Model:   ${props.manufacturer} ${props.model}  (${serial})`,
    `Android: ${props.android} (SDK ${props.sdk})`,
    '',
    '=== Running on the device (reported by the device) ===',
    fg
      ? `App in foreground: ${fg.pkg}\nVersion:           ${ver(fgVer)}\nActivity:          ${fg.activity}`
      : 'App in foreground: (could not determine — screen off or locked?)',
    '',
    '=== Selected in Board Toolkit (context only — may not be what was running) ===',
    `Selected build:   ${apkName || '(none)'}`,
    `Selected package: ${pkg || '(none)'}`,
    `That package on the device: ${inst ? ver(inst) : '(not installed)'}`,
    '',
    '=== Storage (/data) ===',
    df.trim(),
    '',
  ].join('\n')
  fs.writeFileSync(path.join(dir, 'info.txt'), info)

  // zip it and drop the loose folder
  const zip = dir + '.zip'
  const zipped = await zipFolder(dir, zip)
  if (zipped) {
    try {
      fs.rmSync(dir, { recursive: true, force: true })
    } catch {
      /* leave the folder if it won't delete */
    }
    return { ok: true, file: zip }
  }
  return { ok: true, file: dir } // zipping failed: hand back the folder
})

ipcMain.handle('pick-images', async (e, { lang } = {}) => {
  setUiLang(lang)
  const r = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    title: M('pickImagesTitle'),
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] }],
  })
  return r.canceled ? [] : r.filePaths
})

ipcMain.handle('list-packages', async (e, { serial }) => {
  if (!serial) return []
  const res = await runAdb(['shell', 'pm', 'list', 'packages'], { serial })
  if (!res.ok) return []
  return res.output
    .split(/\r?\n/)
    .map((l) => l.replace('package:', '').trim())
    .filter(Boolean)
    .sort()
})

ipcMain.handle('push-images', async (e, { serial, files, dest, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, error: M('noDevice') }
  const target = (dest && dest.trim()) || '/sdcard/Pictures'
  await runAdb(['shell', 'mkdir', '-p', target], { serial })
  emitLog(M('uploadingN', files.length, target))
  let done = 0
  let failed = 0
  for (const f of files) {
    emitLog(M('pushOne', path.basename(f)))
    const r = await runAdb(['push', f, target + '/'], { serial })
    if (r.ok) {
      done++
      emitLog(M('pushOk'))
      // best-effort: ask MediaStore to index the new file so the manager sees it
      await runAdb(
        [
          'shell',
          'am',
          'broadcast',
          '-a',
          'android.intent.action.MEDIA_SCANNER_SCAN_FILE',
          '-d',
          'file://' + target + '/' + path.basename(f),
        ],
        { serial }
      )
    } else {
      failed++
      emitLog(M('pushErr'))
    }
  }
  return { ok: failed === 0, done, failed }
})

// ---------------------------------------------------------------------------
// Screen recording (adb shell screenrecord)
// ---------------------------------------------------------------------------
function sendRecordDone(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('record-done', payload)
  }
}

// Runs once screenrecord exits (either stopped by us or hit the 3 min limit):
// give it a moment to flush the mp4 header, pull it, then clean up the device.
async function finalizeRecording() {
  const devicePath = recordDevicePath
  const serial = recordSerial
  recordProc = null
  recordDevicePath = ''
  recordSerial = ''
  if (!devicePath) return

  emitLog(M('recSaving'))
  await new Promise((r) => setTimeout(r, 800)) // let screenrecord finish writing

  let dir
  try {
    dir = outDir('videos')
  } catch (err) {
    return sendRecordDone({ ok: false, error: M('mkdirFail', err.message) })
  }

  const local = path.join(dir, path.basename(devicePath))
  const pull = await runAdb(['pull', devicePath, local], { serial, onData: emitLog })
  await runAdb(['shell', 'rm', '-f', devicePath], { serial })

  if (!pull.ok || !fs.existsSync(local)) {
    return sendRecordDone({ ok: false, error: M('recNoFile') })
  }
  sendRecordDone({ ok: true, file: local })
}

ipcMain.handle('record-start', async (e, { serial, lang }) => {
  setUiLang(lang)
  if (!serial) return { ok: false, error: M('noDevice') }
  if (recordProc) return { ok: false, error: M('recBusy') }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  recordDevicePath = `/sdcard/board-rec-${stamp}.mp4`
  recordSerial = serial
  emitLog(M('recStarting'))

  const args = [
    '-s',
    serial,
    'shell',
    'screenrecord',
    '--time-limit',
    String(RECORD_MAX_SECONDS),
    recordDevicePath,
  ]
  try {
    recordProc = spawn(adbPath(), args, { windowsHide: true })
  } catch (err) {
    recordProc = null
    recordDevicePath = ''
    recordSerial = ''
    return { ok: false, error: err.message }
  }
  recordProc.stderr.on('data', (d) => emitLog(d.toString()))
  recordProc.on('close', () => finalizeRecording())
  return { ok: true, max: RECORD_MAX_SECONDS }
})

ipcMain.handle('record-stop', async (e, { serial }) => {
  if (!recordProc) return { ok: false }
  // SIGINT (not kill) so screenrecord closes the mp4 properly
  const r = await runAdb(['shell', 'pkill', '-SIGINT', 'screenrecord'], { serial })
  if (!r.ok) await runAdb(['shell', 'killall', '-INT', 'screenrecord'], { serial })
  return { ok: true } // the 'close' handler pulls the file and notifies
})

ipcMain.handle('logcat-start', async (e, { serial, pkg, preset }) => {
  stopLogcat()
  const base = ['logcat', '-v', 'time']
  let args = base.slice()
  let pid = ''
  let filtered = false

  if (preset === 'unity') {
    // only Unity's own tag (Debug.Log / warnings / errors from the game)
    args = base.concat(['-s', 'Unity:V'])
    filtered = true
  } else if (preset === 'unityErrors') {
    args = base.concat(['-s', 'Unity:E'])
    filtered = true
  } else if (preset === 'errors') {
    // every tag at error priority and above — catches native crashes too
    args = base.concat(['*:E'])
    filtered = true
  } else if (preset === 'all') {
    args = base.slice()
  } else {
    // 'game' (default): scope to the running app's process id
    if (pkg) {
      const r = await runAdb(['shell', 'pidof', '-s', pkg], { serial })
      pid = (r.output || '').trim()
      if (pid) {
        args = base.concat(['--pid=' + pid])
        filtered = true
      }
    }
  }

  const full = serial ? ['-s', serial, ...args] : args
  try {
    logcatProc = spawn(adbPath(), full, { windowsHide: true })
  } catch (err) {
    return { ok: false, error: err.message }
  }
  const send = (d) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('logcat-line', d.toString())
    }
  }
  logcatProc.stdout.on('data', send)
  logcatProc.stderr.on('data', send)
  logcatProc.on('close', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('logcat-end')
  })
  return { ok: true, pid, filtered, preset: preset || 'game' }
})

ipcMain.handle('logcat-stop', () => {
  stopLogcat()
  return { ok: true }
})

ipcMain.handle('logcat-clear', async (e, { serial }) => {
  await runAdb(['logcat', '-c'], { serial })
  return { ok: true }
})
