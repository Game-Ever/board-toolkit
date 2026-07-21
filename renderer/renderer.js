// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------
const I18N = {
  es: {
    browseApk: 'Buscar archivo…',
    rescan: 'Escanear la carpeta de nuevo',
    changeFolder: 'Cambiar carpeta',
    refreshTitle: 'Actualizar la lista de dispositivos',
    updateAvailable: (v) => `Hay una versión nueva disponible: v${v}`,
    updateDownload: 'Descargar',
    sortTitle: 'Ordenar por',
    sortDateDesc: 'Más nuevo primero',
    sortDateAsc: 'Más viejo primero',
    sortNameAsc: 'Nombre A→Z',
    sortNameDesc: 'Nombre Z→A',
    sortSizeDesc: 'Más grande primero',
    selected: 'Seleccionado',
    selectedEmpty: 'Elegí un build de la lista, o arrastrá un .apk acá.',
    optLaunch: 'Lanzar al instalar',
    optClean: 'Reinstalación limpia (borra datos)',
    install: 'Instalar',
    launch: 'Lanzar',
    restart: 'Reiniciar app',
    screenshot: 'Captura',
    uninstall: 'Desinstalar',
    resetData: 'Resetear datos',
    resetOk: 'Datos borrados ✔',
    wlHintNoDevice:
      'Conectar sin cable: enchufá primero el device por USB, después tocá acá y ya podés desenchufarlo.',
    wlHintUsb:
      'Conectar sin cable: tocá acá y después podés desenchufar el cable USB. Tienen que estar en la misma red wifi.',
    wlHintWireless: 'Conectado sin cable. Tocá para desconectar (vas a necesitar el USB de nuevo).',
    wlConnecting: 'Conectando por wifi…',
    wlOk: 'Conectado sin cable ✔',
    wlErr: 'No se pudo conectar',
    wlBye: 'Wifi desconectado',
    bugReport: '🐞 Reporte de bug',
    brWorking: 'Armando reporte…',
    brOk: 'Reporte listo ✔',
    brErr: 'No se pudo armar el reporte',
    saveLog: 'Guardar',
    logSaved: 'Logcat guardado ✔',
    deviceSection: 'Multimedia',
    record: 'Grabar',
    stopRec: 'Detener',
    savingRec: 'Guardando…',
    recHint: 'Graba la pantalla del device (máx 3 min, sin audio)',
    recStarted: 'Grabando…',
    recStartFail: 'No se pudo empezar a grabar',
    recSavedOk: 'Video guardado ✔',
    recSaveFail: 'No se pudo guardar el video',
    deleteBuild: 'Eliminar',
    deletedOk: 'Build eliminado ✔',
    shotsTo: 'Guardar en:',
    changeShort: 'Cambiar',
    uploadImages: 'Subir imágenes',
    openMediaManager: 'Media Manager',
    chooseApp: 'Elegir app',
    uploadTitle: 'Subir imágenes al device',
    dropHint: 'Arrastrá imágenes acá, o',
    pickImages: 'Elegir archivos',
    destLabel: 'Carpeta en el device:',
    cancel: 'Cancelar',
    uploadDo: 'Subir',
    pickAppTitle: 'Elegí el Board Media Manager',
    filterApps: 'Filtrar apps…',
    filesEmpty: 'Sin imágenes seleccionadas',
    uploadedOk: 'Imágenes subidas ✔',
    uploadPartial: (d, f) => `${d} subidas, ${f} fallaron`,
    uploadFail: 'Falló la subida',
    mgrOpened: 'Media Manager abierto ✔',
    loadingApps: 'Cargando apps…',
    noApps: 'No se pudieron listar las apps',
    tabActivity: 'Actividad',
    clear: 'Limpiar',
    filter: 'Filtrar texto…',
    start: 'Iniciar',
    stop: 'Detener',
    lcGame: 'Juego',
    lcUnity: 'Unity',
    lcUnityErr: 'Unity errores',
    lcErrors: 'Errores',
    lcAll: 'Todo',
    // dynamic
    searching: 'Buscando dispositivos…',
    noDevices: 'Ningún dispositivo conectado',
    hintNoDevice: '🔌 Conectá la board por USB, con la depuración USB activada.',
    hintUnauthorized:
      '⚠️ Aceptá el permiso de depuración USB que apareció en la pantalla de la board.',
    hintOffline: '⚠️ La board no responde. Probá desenchufar y volver a enchufar el cable.',
    stUnauthorized: 'sin autorizar',
    stOffline: 'sin conexión',
    noFolder: 'Sin carpeta configurada',
    setFolderHint: 'Elegí la carpeta donde están tus builds (.apk) para empezar.',
    chooseFolderBtn: '📁 Elegir carpeta de builds',
    noApks: 'No hay .apk en esta carpeta.',
    newest: 'más reciente',
    readingPkg: 'Leyendo package…',
    pkgFail: '⚠ No se pudo leer el package',
    instChecking: 'Consultando el device…',
    instNotInstalled: 'No instalada en el device',
    instSame: (v) => `En el device: ${v} — la misma`,
    instOlder: (v) => `En el device: ${v} — más vieja`,
    instNewer: (v) => `En el device: ${v} — más nueva`,
    instUnknown: (v) => `En el device: ${v}`,
    installedOk: 'Instalado ✔',
    replacedOk: 'Reemplazado e instalado ✔',
    installCanceled: 'Instalación cancelada',
    installFail: 'Falló la instalación',
    seeActivity: 'Ver Actividad',
    launchedOk: 'App lanzada ✔',
    launchCrashedTitle: 'La app crasheó al iniciar',
    launchCrashedSub: 'Se abrió y se cerró sola — mirá el Logcat',
    restartedOk: 'App reiniciada ✔',
    uninstalledOk: 'Desinstalada ✔',
    errorTitle: 'Error',
    shotOk: 'Captura guardada ✔',
    shotFail: 'No se pudo capturar',
    openFolder: 'Abrir carpeta',
    noDeviceTitle: 'Sin dispositivo',
    connectFirst: 'Conectá la board primero',
    logcatStarted: 'Logcat iniciado',
    logcatFiltered: (pid) => `Filtrado al juego (pid ${pid})`,
    logcatNoFilter: 'Sin filtro de proceso',
    logcatFail: 'No se pudo iniciar logcat',
    locale: 'es-AR',
  },
  en: {
    browseApk: 'Browse file…',
    rescan: 'Rescan the folder',
    changeFolder: 'Change folder',
    refreshTitle: 'Refresh the device list',
    updateAvailable: (v) => `A new version is available: v${v}`,
    updateDownload: 'Download',
    sortTitle: 'Sort by',
    sortDateDesc: 'Newest first',
    sortDateAsc: 'Oldest first',
    sortNameAsc: 'Name A→Z',
    sortNameDesc: 'Name Z→A',
    sortSizeDesc: 'Largest first',
    selected: 'Selected',
    selectedEmpty: 'Pick a build from the list, or drop an .apk here.',
    optLaunch: 'Launch after install',
    optClean: 'Clean reinstall (wipes data)',
    install: 'Install',
    launch: 'Launch',
    restart: 'Restart app',
    screenshot: 'Screenshot',
    uninstall: 'Uninstall',
    resetData: 'Reset data',
    resetOk: 'Data wiped ✔',
    wlHintNoDevice:
      'Connect wirelessly: plug the device in over USB first, then click here and you can unplug it.',
    wlHintUsb:
      'Connect wirelessly: click here and you can then unplug the USB cable. Both must be on the same wifi network.',
    wlHintWireless: 'Connected wirelessly. Click to disconnect (you will need USB again).',
    wlConnecting: 'Connecting over wifi…',
    wlOk: 'Connected wirelessly ✔',
    wlErr: 'Could not connect',
    wlBye: 'Wifi disconnected',
    bugReport: '🐞 Bug report',
    brWorking: 'Building report…',
    brOk: 'Report ready ✔',
    brErr: 'Could not build the report',
    saveLog: 'Save',
    logSaved: 'Logcat saved ✔',
    deviceSection: 'Media',
    record: 'Record',
    stopRec: 'Stop',
    savingRec: 'Saving…',
    recHint: 'Record the device screen (max 3 min, no audio)',
    recStarted: 'Recording…',
    recStartFail: 'Could not start recording',
    recSavedOk: 'Video saved ✔',
    recSaveFail: 'Could not save the video',
    deleteBuild: 'Delete',
    deletedOk: 'Build deleted ✔',
    shotsTo: 'Save to:',
    changeShort: 'Change',
    uploadImages: 'Upload images',
    openMediaManager: 'Media Manager',
    chooseApp: 'Choose app',
    uploadTitle: 'Upload images to device',
    dropHint: 'Drag images here, or',
    pickImages: 'Choose files',
    destLabel: 'Device folder:',
    cancel: 'Cancel',
    uploadDo: 'Upload',
    pickAppTitle: 'Pick the Board Media Manager',
    filterApps: 'Filter apps…',
    filesEmpty: 'No images selected',
    uploadedOk: 'Images uploaded ✔',
    uploadPartial: (d, f) => `${d} uploaded, ${f} failed`,
    uploadFail: 'Upload failed',
    mgrOpened: 'Media Manager opened ✔',
    loadingApps: 'Loading apps…',
    noApps: 'Could not list apps',
    tabActivity: 'Activity',
    clear: 'Clear',
    filter: 'Filter text…',
    start: 'Start',
    stop: 'Stop',
    lcGame: 'Game',
    lcUnity: 'Unity',
    lcUnityErr: 'Unity errors',
    lcErrors: 'Errors',
    lcAll: 'All',
    // dynamic
    searching: 'Searching devices…',
    noDevices: 'No device connected',
    hintNoDevice: '🔌 Plug the board in over USB, with USB debugging enabled.',
    hintUnauthorized: '⚠️ Accept the USB debugging prompt that appeared on the board’s screen.',
    hintOffline: '⚠️ The board is not responding. Try unplugging and plugging the cable back in.',
    stUnauthorized: 'unauthorized',
    stOffline: 'offline',
    noFolder: 'No folder configured',
    setFolderHint: 'Choose the folder where your builds (.apk) live to get started.',
    chooseFolderBtn: '📁 Choose builds folder',
    noApks: 'No .apk files in this folder.',
    newest: 'newest',
    readingPkg: 'Reading package…',
    pkgFail: '⚠ Could not read package',
    instChecking: 'Checking the device…',
    instNotInstalled: 'Not installed on the device',
    instSame: (v) => `On device: ${v} — same`,
    instOlder: (v) => `On device: ${v} — older`,
    instNewer: (v) => `On device: ${v} — newer`,
    instUnknown: (v) => `On device: ${v}`,
    installedOk: 'Installed ✔',
    replacedOk: 'Replaced & installed ✔',
    installCanceled: 'Install canceled',
    installFail: 'Install failed',
    seeActivity: 'See Activity',
    launchedOk: 'App launched ✔',
    launchCrashedTitle: 'The app crashed on startup',
    launchCrashedSub: 'It opened and closed itself — check the Logcat',
    restartedOk: 'App restarted ✔',
    uninstalledOk: 'Uninstalled ✔',
    errorTitle: 'Error',
    shotOk: 'Screenshot saved ✔',
    shotFail: 'Could not capture',
    openFolder: 'Open folder',
    noDeviceTitle: 'No device',
    connectFirst: 'Connect the board first',
    logcatStarted: 'Logcat started',
    logcatFiltered: (pid) => `Filtered to game (pid ${pid})`,
    logcatNoFilter: 'No process filter',
    logcatFail: 'Could not start logcat',
    locale: 'en-US',
  },
  pt: {
    browseApk: 'Procurar arquivo…',
    rescan: 'Reescanear a pasta',
    changeFolder: 'Mudar pasta',
    refreshTitle: 'Atualizar a lista de dispositivos',
    updateAvailable: (v) => `Há uma versão nova disponível: v${v}`,
    updateDownload: 'Baixar',
    sortTitle: 'Ordenar por',
    sortDateDesc: 'Mais novo primeiro',
    sortDateAsc: 'Mais antigo primeiro',
    sortNameAsc: 'Nome A→Z',
    sortNameDesc: 'Nome Z→A',
    sortSizeDesc: 'Maior primeiro',
    selected: 'Selecionado',
    selectedEmpty: 'Escolha um build da lista, ou arraste um .apk aqui.',
    optLaunch: 'Abrir após instalar',
    optClean: 'Reinstalação limpa (apaga dados)',
    install: 'Instalar',
    launch: 'Abrir',
    restart: 'Reiniciar app',
    screenshot: 'Captura',
    uninstall: 'Desinstalar',
    resetData: 'Resetar dados',
    resetOk: 'Dados apagados ✔',
    wlHintNoDevice:
      'Conectar sem cabo: primeiro conecte o device por USB, depois clique aqui e já pode desconectar.',
    wlHintUsb:
      'Conectar sem cabo: clique aqui e depois pode tirar o cabo USB. Os dois precisam estar na mesma rede wifi.',
    wlHintWireless: 'Conectado sem cabo. Clique para desconectar (vai precisar do USB de novo).',
    wlConnecting: 'Conectando por wifi…',
    wlOk: 'Conectado sem cabo ✔',
    wlErr: 'Não foi possível conectar',
    wlBye: 'Wifi desconectado',
    bugReport: '🐞 Relatório de bug',
    brWorking: 'Montando relatório…',
    brOk: 'Relatório pronto ✔',
    brErr: 'Não foi possível montar o relatório',
    saveLog: 'Salvar',
    logSaved: 'Logcat salvo ✔',
    deviceSection: 'Multimídia',
    record: 'Gravar',
    stopRec: 'Parar',
    savingRec: 'Salvando…',
    recHint: 'Grava a tela do device (máx 3 min, sem áudio)',
    recStarted: 'Gravando…',
    recStartFail: 'Não foi possível iniciar a gravação',
    recSavedOk: 'Vídeo salvo ✔',
    recSaveFail: 'Não foi possível salvar o vídeo',
    deleteBuild: 'Excluir',
    deletedOk: 'Build excluído ✔',
    shotsTo: 'Salvar em:',
    changeShort: 'Mudar',
    uploadImages: 'Enviar imagens',
    openMediaManager: 'Media Manager',
    chooseApp: 'Escolher app',
    uploadTitle: 'Enviar imagens ao device',
    dropHint: 'Arraste imagens aqui, ou',
    pickImages: 'Escolher arquivos',
    destLabel: 'Pasta no device:',
    cancel: 'Cancelar',
    uploadDo: 'Enviar',
    pickAppTitle: 'Escolha o Board Media Manager',
    filterApps: 'Filtrar apps…',
    filesEmpty: 'Nenhuma imagem selecionada',
    uploadedOk: 'Imagens enviadas ✔',
    uploadPartial: (d, f) => `${d} enviadas, ${f} falharam`,
    uploadFail: 'Falha no envio',
    mgrOpened: 'Media Manager aberto ✔',
    loadingApps: 'Carregando apps…',
    noApps: 'Não foi possível listar os apps',
    tabActivity: 'Atividade',
    clear: 'Limpar',
    filter: 'Filtrar texto…',
    start: 'Iniciar',
    stop: 'Parar',
    lcGame: 'Jogo',
    lcUnity: 'Unity',
    lcUnityErr: 'Unity erros',
    lcErrors: 'Erros',
    lcAll: 'Tudo',
    // dynamic
    searching: 'Procurando dispositivos…',
    noDevices: 'Nenhum dispositivo conectado',
    hintNoDevice: '🔌 Conecte a board por USB, com a depuração USB ativada.',
    hintUnauthorized: '⚠️ Aceite o pedido de depuração USB que apareceu na tela da board.',
    hintOffline: '⚠️ A board não responde. Tente tirar e recolocar o cabo.',
    stUnauthorized: 'não autorizado',
    stOffline: 'sem conexão',
    noFolder: 'Nenhuma pasta configurada',
    setFolderHint: 'Escolha a pasta onde estão seus builds (.apk) para começar.',
    chooseFolderBtn: '📁 Escolher pasta de builds',
    noApks: 'Nenhum .apk nesta pasta.',
    newest: 'mais recente',
    readingPkg: 'Lendo package…',
    pkgFail: '⚠ Não foi possível ler o package',
    instChecking: 'Consultando o device…',
    instNotInstalled: 'Não instalada no device',
    instSame: (v) => `No device: ${v} — a mesma`,
    instOlder: (v) => `No device: ${v} — mais antiga`,
    instNewer: (v) => `No device: ${v} — mais nova`,
    instUnknown: (v) => `No device: ${v}`,
    installedOk: 'Instalado ✔',
    replacedOk: 'Substituído e instalado ✔',
    installCanceled: 'Instalação cancelada',
    installFail: 'Falha na instalação',
    seeActivity: 'Ver Atividade',
    launchedOk: 'App aberto ✔',
    launchCrashedTitle: 'O app crashou ao iniciar',
    launchCrashedSub: 'Abriu e fechou sozinho — veja o Logcat',
    restartedOk: 'App reiniciado ✔',
    uninstalledOk: 'Desinstalado ✔',
    errorTitle: 'Erro',
    shotOk: 'Captura salva ✔',
    shotFail: 'Não foi possível capturar',
    openFolder: 'Abrir pasta',
    noDeviceTitle: 'Sem dispositivo',
    connectFirst: 'Conecte a board primeiro',
    logcatStarted: 'Logcat iniciado',
    logcatFiltered: (pid) => `Filtrado no jogo (pid ${pid})`,
    logcatNoFilter: 'Sem filtro de processo',
    logcatFail: 'Não foi possível iniciar o logcat',
    locale: 'pt-BR',
  },
}

function t(key, ...args) {
  const dict = I18N[state.lang] || I18N.es
  const v = dict[key]
  return typeof v === 'function' ? v(...args) : v != null ? v : key
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  config: { buildsFolder: '', outputFolder: '', lang: 'es' },
  lang: 'es',
  apks: [],
  sortBy: 'date-desc',
  selected: null, // { path, name, size, mtime, info }
  installedInfo: null, // what's on the device for the selected package
  device: '',
  lastDevices: [],
  devicesKnown: false, // have we had any reply from adb yet?
  emptyPolls: 0, // consecutive empty replies (adb's first one lies while it boots)
  logcatRunning: false,
  logcatBuffer: [],
  logcatPartial: '',
  logcatPreset: 'game',
  uploadFiles: [],
  allPackages: [],
  recording: false,
  recSaving: false,
  recStartMs: 0,
  recTimer: null,
}

const $ = (id) => document.getElementById(id)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fmtSize(bytes) {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? mb.toFixed(1) + ' MB' : (bytes / 1024).toFixed(0) + ' KB'
}

function fmtDate(ms) {
  const d = new Date(ms)
  return d.toLocaleString(t('locale'), {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function metaLine(apk) {
  const parts = []
  if (apk.size) parts.push(fmtSize(apk.size))
  if (apk.mtime) parts.push(fmtDate(apk.mtime))
  if (apk.info && apk.info.ok && apk.info.versionName) {
    let v = 'v' + apk.info.versionName
    if (apk.info.versionCode) v += ` (${apk.info.versionCode})`
    parts.push(v)
  }
  return parts.join(' · ')
}

// ---------------------------------------------------------------------------
// Tooltips — native `title` waits ~1s and is styled by Windows, so we roll our
// own: instant, themed, and positioned so it can't be clipped by a panel.
// ---------------------------------------------------------------------------
let tipEl = null
let tipTarget = null

function hideTip() {
  if (tipEl) {
    tipEl.remove()
    tipEl = null
  }
  tipTarget = null
}

function showTip(target) {
  const text = target.dataset.tip
  if (!text) return
  tipEl = document.createElement('div')
  tipEl.className = 'tip'
  tipEl.textContent = text
  document.body.appendChild(tipEl)

  const r = target.getBoundingClientRect()
  const t = tipEl.getBoundingClientRect()
  let left = r.left + r.width / 2 - t.width / 2
  let top = r.bottom + 8
  if (top + t.height > window.innerHeight - 8) top = r.top - t.height - 8 // flip above
  left = Math.max(8, Math.min(left, window.innerWidth - t.width - 8)) // keep on screen
  tipEl.style.left = Math.round(left) + 'px'
  tipEl.style.top = Math.round(top) + 'px'
}

function initTooltips() {
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest ? e.target.closest('[data-tip]') : null
    if (el === tipTarget) return // same target, don't rebuild
    hideTip()
    if (el) {
      tipTarget = el
      showTip(el)
    }
  })
  document.addEventListener('mousedown', hideTip)
  window.addEventListener('scroll', hideTip, true)
  window.addEventListener('blur', hideTip)
}

function toast(title, sub, kind, linkPath) {
  const el = document.createElement('div')
  el.className = 'toast' + (kind ? ' ' + kind : '')
  const linkHtml = linkPath
    ? `<div class="toast-sub"><span class="toast-link">${t('openFolder')}</span></div>`
    : sub
    ? `<div class="toast-sub">${sub}</div>`
    : ''
  el.innerHTML = `<div class="toast-title">${title}</div>${linkHtml}`
  if (linkPath) {
    el.querySelector('.toast-link').onclick = () => window.api.openPath(linkPath)
  }
  $('toastWrap').appendChild(el)
  setTimeout(() => {
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 300)
  }, 4500)
}

function activityLog(text, kind) {
  const out = $('activityOut')
  const span = document.createElement('span')
  if (kind) span.className = kind
  span.textContent = text
  out.appendChild(span)
  out.scrollTop = out.scrollHeight
}

// ---------------------------------------------------------------------------
// Language
// ---------------------------------------------------------------------------
const LANGS = ['es', 'en', 'pt']

function applyLang(lang, persist) {
  state.lang = LANGS.includes(lang) ? lang : 'en'
  document.documentElement.lang = state.lang

  // static text nodes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n)
  })
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPh)
  })
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.dataset.tip = t(el.dataset.i18nTitle)
  })

  // flag highlight
  $('langEs').classList.toggle('active', state.lang === 'es')
  $('langEn').classList.toggle('active', state.lang === 'en')
  $('langPt').classList.toggle('active', state.lang === 'pt')

  // dynamic pieces
  updateRecLabel()
  $('logcatToggle').textContent = state.logcatRunning ? t('stop') : t('start')
  $('folderLabel').textContent = state.config.buildsFolder || t('noFolder')
  renderApkList()
  renderSelectedCard()
  renderDevices(state.lastDevices)

  if (persist) window.api.setConfig({ lang: state.lang })
}

// ---------------------------------------------------------------------------
// Devices
// ---------------------------------------------------------------------------
// adb's raw states mean nothing to a non-technical user
function stateLabel(st) {
  if (st === 'unauthorized') return t('stUnauthorized')
  if (st === 'offline') return t('stOffline')
  return st
}

// "No device" is only true once adb has actually answered, twice. Its first
// reply is often empty while the adb server boots, and claiming "plug the board
// in" at someone who already did is worse than saying nothing.
function devicesSettled() {
  return state.devicesKnown && state.emptyPolls >= 2
}

// Records a poll result. Empty replies only count once we've seen a few.
function onDevicesResult(devices) {
  state.devicesKnown = true
  state.emptyPolls = devices && devices.length ? 0 : state.emptyPolls + 1
  renderDevices(devices)
}

// Tells the user what to actually DO, instead of leaving every button greyed out
// with no explanation.
function renderDeviceHint() {
  const el = $('deviceHint')
  const usable = state.lastDevices.filter((d) => d.state === 'device')
  let hint = ''
  if (state.lastDevices.length === 0) {
    if (devicesSettled()) hint = t('hintNoDevice') // still looking: stay quiet
  } else if (usable.length === 0) {
    // a device IS there — its state is definitive, so speak up right away
    const st = state.lastDevices[0].state
    hint =
      st === 'unauthorized' ? t('hintUnauthorized') : st === 'offline' ? t('hintOffline') : ''
  }
  el.textContent = hint
  el.classList.toggle('hidden', !hint)
}

function renderDevices(devices) {
  state.lastDevices = devices || []
  const sel = $('deviceSelect')
  const dot = $('deviceDot')
  const prev = state.device
  const usable = state.lastDevices.filter((d) => d.state === 'device')

  sel.innerHTML = ''
  if (state.lastDevices.length === 0) {
    const opt = document.createElement('option')
    opt.value = ''
    opt.textContent = devicesSettled() ? t('noDevices') : t('searching')
    sel.appendChild(opt)
    state.device = ''
    dot.className = 'status-dot'
  } else {
    for (const d of state.lastDevices) {
      const opt = document.createElement('option')
      opt.value = d.state === 'device' ? d.serial : ''
      let label = d.model ? `${d.model} (${d.serial})` : d.serial
      if (d.state !== 'device') label += ` — ${stateLabel(d.state)}`
      opt.textContent = label
      opt.disabled = d.state !== 'device'
      sel.appendChild(opt)
    }
    if (prev && usable.some((d) => d.serial === prev)) {
      sel.value = prev
      state.device = prev
    } else if (usable.length > 0) {
      sel.value = usable[0].serial
      state.device = usable[0].serial
    } else {
      state.device = ''
    }
    dot.className = 'status-dot ' + (usable.length > 0 ? 'online' : 'warn')
  }
  renderDeviceHint()
  updateActionButtons()
  // only when it actually changed — this runs on every poll tick
  if (state.device !== prev) refreshInstalledInfo()
}

// ---------------------------------------------------------------------------
// APK list
// ---------------------------------------------------------------------------
async function loadFolder() {
  const folder = state.config.buildsFolder
  $('folderLabel').textContent = folder || t('noFolder')
  $('folderLabel').dataset.tip = folder || ''
  if (!folder) {
    state.apks = []
    renderApkList()
    return
  }
  state.apks = await window.api.scanApks(folder)
  renderApkList()
}

async function chooseBuildsFolder() {
  const folder = await window.api.pickFolder({ kind: 'builds', lang: state.lang })
  if (folder) {
    state.config = await window.api.setConfig({ buildsFolder: folder })
    await loadFolder()
  }
}

function sortedApks() {
  // numeric:true so v0.7.9 sorts before v0.7.10; group by subfolder (per-game)
  // first so builds of the same game stay together when sorting by name
  const byName = (a, b) =>
    (a.subfolder || '').localeCompare(b.subfolder || '', undefined, { sensitivity: 'base' }) ||
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
  const arr = state.apks.slice()
  switch (state.sortBy) {
    case 'date-asc':
      return arr.sort((a, b) => a.mtime - b.mtime)
    case 'name-asc':
      return arr.sort(byName)
    case 'name-desc':
      return arr.sort((a, b) => byName(b, a))
    case 'size-desc':
      return arr.sort((a, b) => b.size - a.size)
    default: // 'date-desc'
      return arr.sort((a, b) => b.mtime - a.mtime)
  }
}

function renderApkList() {
  const list = $('apkList')
  list.innerHTML = ''
  if (!state.config.buildsFolder) {
    list.innerHTML = `
      <div class="empty-cta">
        <div class="empty-cta-ico">📁</div>
        <div class="empty-cta-text">${t('setFolderHint')}</div>
        <button class="btn primary" id="emptyPickFolder">${t('chooseFolderBtn')}</button>
      </div>`
    const b = document.getElementById('emptyPickFolder')
    if (b) b.onclick = chooseBuildsFolder
    return
  }
  if (state.apks.length === 0) {
    list.innerHTML = `<div class="empty-hint">${t('noApks')}</div>`
    return
  }
  // the badge means "most recent build", so find it by date — not by list position,
  // which changes with the sort order
  const newestPath = state.apks.reduce(
    (best, a) => (!best || a.mtime > best.mtime ? a : best),
    null
  ).path

  sortedApks().forEach((apk) => {
    const el = document.createElement('div')
    el.className =
      'apk-item' + (state.selected && state.selected.path === apk.path ? ' selected' : '')
    const folderTag = apk.subfolder
      ? `<span class="apk-folder">📁 ${escHtml(apk.subfolder)}</span>`
      : ''
    el.innerHTML = `
      <span class="dot"></span>
      <div class="meta">
        <div class="name">${escHtml(apk.name)}${folderTag}</div>
        <div class="sub">${fmtSize(apk.size)} · ${fmtDate(apk.mtime)}</div>
      </div>
      ${apk.path === newestPath ? `<span class="badge">${t('newest')}</span>` : ''}
      <button class="apk-del" data-tip="${t('deleteBuild')}">🗑</button>
    `
    el.onclick = () => selectApk(apk)
    el.querySelector('.apk-del').onclick = (e) => {
      e.stopPropagation()
      deleteBuild(apk)
    }
    list.appendChild(el)
  })
}

function currentVersion() {
  return state.selected && state.selected.info && state.selected.info.ok
    ? state.selected.info.versionName
    : ''
}

function renderInstalledLine() {
  const el = $('selInstalled')
  const i = state.installedInfo
  el.className = 'selected-installed'
  if (!state.selected || !currentPkg() || !state.device) {
    el.textContent = ''
    return
  }
  if (i === 'checking') {
    el.textContent = t('instChecking')
    return
  }
  if (!i || !i.installed) {
    el.textContent = t('instNotInstalled')
    el.classList.add('none')
    return
  }
  if (i.cmp === 0) {
    el.textContent = t('instSame', i.versionName)
    el.classList.add('same')
  } else if (i.cmp === 1) {
    el.textContent = t('instNewer', i.versionName)
    el.classList.add('newer')
  } else if (i.cmp === -1) {
    el.textContent = t('instOlder', i.versionName)
    el.classList.add('older')
  } else {
    el.textContent = t('instUnknown', i.versionName)
  }
}

async function refreshInstalledInfo() {
  const pkg = currentPkg()
  if (!pkg || !state.device) {
    state.installedInfo = null
    renderInstalledLine()
    return
  }
  state.installedInfo = 'checking'
  renderInstalledLine()
  const info = await window.api.installedVersion({
    serial: state.device,
    pkg,
    version: currentVersion(),
  })
  if (currentPkg() !== pkg) return // selection changed while querying
  state.installedInfo = info
  renderInstalledLine()
}

function renderSelectedCard() {
  if (!state.selected) {
    $('selectedEmpty').classList.remove('hidden')
    $('selectedBody').classList.add('hidden')
    return
  }
  const apk = state.selected
  $('selectedEmpty').classList.add('hidden')
  $('selectedBody').classList.remove('hidden')
  $('selName').textContent = apk.name
  $('selMeta').textContent = metaLine(apk)

  if (!apk.info) {
    $('selPkg').textContent = t('readingPkg')
    $('apkIcon').src = ''
  } else if (apk.info.ok && apk.info.package) {
    $('selPkg').textContent = apk.info.package
    $('apkIcon').src = apk.info.icon || ''
  } else {
    $('selPkg').textContent = t('pkgFail')
    $('apkIcon').src = ''
  }
  renderInstalledLine()
}

async function deleteBuild(apk) {
  const res = await window.api.deleteApk({ path: apk.path, lang: state.lang })
  if (!res || res.canceled) return
  if (res.ok) {
    if (state.selected && state.selected.path === apk.path) {
      state.selected = null
      renderSelectedCard()
      updateActionButtons()
    }
    toast(t('deletedOk'), apk.name, 'ok')
    await loadFolder()
  } else {
    toast(t('errorTitle'), res.error || '', 'err')
  }
}

async function selectApk(apk) {
  state.selected = apk
  state.installedInfo = null
  renderApkList()

  if (apk.__read) {
    // info already cached from a previous selection
    renderSelectedCard()
    updateActionButtons()
    refreshInstalledInfo()
    return
  }

  apk.info = undefined // "reading…" state
  renderSelectedCard()
  updateActionButtons()

  const info = await window.api.readApkInfo(apk.path)
  apk.__read = true
  apk.info = info
  if (state.selected !== apk) return // selection changed while reading
  renderSelectedCard()
  updateActionButtons()
  refreshInstalledInfo()
}

// ---------------------------------------------------------------------------
// Screenshots folder
// ---------------------------------------------------------------------------
function updateShotsFolder() {
  const f = state.config.outputFolder || ''
  $('shotsFolder').textContent = f
  $('shotsFolderWrap').dataset.tip = f
}

// ---------------------------------------------------------------------------
// Action buttons
// ---------------------------------------------------------------------------
function currentPkg() {
  return state.selected && state.selected.info && state.selected.info.ok
    ? state.selected.info.package
    : ''
}

function updateActionButtons() {
  const hasDevice = !!state.device
  const hasApk = !!state.selected
  const hasPkg = !!currentPkg()
  $('btnInstall').disabled = !(hasDevice && hasApk)
  $('btnLaunch').disabled = !(hasDevice && hasPkg)
  $('btnRestart').disabled = !(hasDevice && hasPkg)
  $('btnClearData').disabled = !(hasDevice && hasPkg)
  $('btnUninstall').disabled = !(hasDevice && hasPkg)
  $('btnBugReport').disabled = !hasDevice
  // never disabled: a disabled button shows no tooltip, and the tooltip is
  // exactly where we explain what to do when nothing is plugged in
  $('btnWireless').dataset.tip = !hasDevice
    ? t('wlHintNoDevice')
    : isWirelessDevice()
    ? t('wlHintWireless')
    : t('wlHintUsb')
  $('btnWireless').classList.toggle('active', isWirelessDevice())
  $('btnScreenshot').disabled = !hasDevice
  $('btnRecord').disabled = (!hasDevice && !state.recording) || state.recSaving
  $('btnUpload').disabled = !hasDevice
  $('btnMediaMgr').disabled = !hasDevice
  $('pickMediaMgr').disabled = !hasDevice
}

function setBusy(busy) {
  if (busy) {
    document
      .querySelectorAll('.actions-grid .btn, #btnScreenshot')
      .forEach((b) => (b.disabled = true))
  } else {
    updateActionButtons()
  }
}

async function doInstall() {
  const apk = state.selected
  if (!apk) return
  setBusy(true)
  switchTab('activity')
  const res = await window.api.install({
    serial: state.device,
    apk: apk.path,
    pkg: currentPkg(),
    version: apk.info && apk.info.ok ? apk.info.versionName : '',
    lang: state.lang,
    launch: $('optLaunch').checked,
    clean: $('optClean').checked,
  })
  if (res.ok) {
    toast(res.replaced ? t('replacedOk') : t('installedOk'), apk.name, 'ok')
    // installing worked but the app died on launch — both facts are true
    if (res.crashed) toast(t('launchCrashedTitle'), t('launchCrashedSub'), 'err')
  } else if (res.canceled) toast(t('installCanceled'), apk.name)
  else toast(t('installFail'), t('seeActivity'), 'err')
  setBusy(false)
  refreshInstalledInfo()
}

async function doAction(fn, okKey, refreshInstalled) {
  setBusy(true)
  switchTab('activity')
  const res = await fn({ serial: state.device, pkg: currentPkg(), lang: state.lang })
  if (res.ok) toast(t(okKey), '', 'ok')
  else if (res.crashed) toast(t('launchCrashedTitle'), t('launchCrashedSub'), 'err')
  else toast(t('errorTitle'), t('seeActivity'), 'err')
  setBusy(false)
  if (refreshInstalled) refreshInstalledInfo()
}

// ---------------------------------------------------------------------------
// Wireless adb / bug report / logcat export
// ---------------------------------------------------------------------------
function isWirelessDevice() {
  return !!state.device && state.device.includes(':')
}

async function toggleWireless() {
  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  $('btnWireless').disabled = true
  if (isWirelessDevice()) {
    await window.api.wirelessDisconnect({ serial: state.device, lang: state.lang })
    toast(t('wlBye'), '', 'ok')
  } else {
    toast(t('wlConnecting'), '')
    switchTab('activity')
    const res = await window.api.wirelessConnect({ serial: state.device, lang: state.lang })
    if (res.ok) toast(t('wlOk'), res.address, 'ok')
    else toast(t('wlErr'), res.error || '', 'err')
  }
  onDevicesResult(await window.api.listDevices())
  updateActionButtons()
}

async function doBugReport() {
  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  $('btnBugReport').disabled = true
  toast(t('brWorking'), '')
  const res = await window.api.bugReport({
    serial: state.device,
    pkg: currentPkg(),
    apkName: state.selected ? state.selected.name : '',
    lang: state.lang,
  })
  if (res.ok) toast(t('brOk'), res.file, 'ok', res.file)
  else toast(t('brErr'), res.error || '', 'err')
  updateActionButtons()
}

async function saveLogcat() {
  const text = state.logcatBuffer.join('\n')
  const res = await window.api.saveText({ defaultName: 'logcat.txt', text })
  if (res.ok) toast(t('logSaved'), res.file, 'ok', res.file)
  else if (!res.canceled) toast(t('errorTitle'), res.error || '', 'err')
}

// ---------------------------------------------------------------------------
// Screen recording
// ---------------------------------------------------------------------------
function fmtElapsed() {
  const s = Math.floor((Date.now() - state.recStartMs) / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function updateRecLabel() {
  const el = $('recLabel')
  if (state.recSaving) el.textContent = t('savingRec')
  else if (state.recording) el.textContent = `${t('stopRec')} ${fmtElapsed()}`
  else el.textContent = t('record')
}

function setRecordingUi(on) {
  state.recording = on
  $('btnRecord').classList.toggle('recording', on)
  if (state.recTimer) clearInterval(state.recTimer)
  state.recTimer = on ? setInterval(updateRecLabel, 500) : null
  updateRecLabel()
}

async function toggleRecord() {
  if (state.recSaving) return

  if (state.recording) {
    state.recSaving = true
    $('btnRecord').disabled = true
    updateRecLabel()
    await window.api.recordStop({ serial: state.device })
    return // 'record-done' finishes the flow (also fires on the 3 min auto-stop)
  }

  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  const res = await window.api.recordStart({ serial: state.device, lang: state.lang })
  if (!res.ok) {
    toast(t('recStartFail'), res.error || '', 'err')
    return
  }
  state.recStartMs = Date.now()
  setRecordingUi(true)
  toast(t('recStarted'), t('recHint'), 'ok')
}

function onRecordDone(res) {
  state.recSaving = false
  setRecordingUi(false)
  updateActionButtons()
  if (res.ok) toast(t('recSavedOk'), res.file, 'ok', res.file)
  else toast(t('recSaveFail'), res.error || '', 'err')
}

async function doScreenshot() {
  setBusy(true)
  const res = await window.api.screenshot({ serial: state.device, lang: state.lang })
  if (res.ok) toast(t('shotOk'), res.file, 'ok', res.file)
  else toast(t('shotFail'), res.error, 'err')
  setBusy(false)
}

// ---------------------------------------------------------------------------
// Upload images
// ---------------------------------------------------------------------------
const IMG_RE = /\.(png|jpe?g|gif|webp|bmp)$/i

function openUploadModal() {
  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  state.uploadFiles = []
  $('destInput').value = state.config.uploadFolder || '/sdcard/Pictures'
  renderFileList()
  $('uploadModal').classList.remove('hidden')
}

function closeUploadModal() {
  $('uploadModal').classList.add('hidden')
}

function addFiles(paths) {
  for (const p of paths) {
    if (IMG_RE.test(p) && !state.uploadFiles.includes(p)) state.uploadFiles.push(p)
  }
  renderFileList()
}

function renderFileList() {
  const list = $('fileList')
  list.innerHTML = ''
  if (state.uploadFiles.length === 0) {
    list.innerHTML = `<div class="file-empty">${t('filesEmpty')}</div>`
  } else {
    state.uploadFiles.forEach((p, i) => {
      const name = p.split(/[\\/]/).pop()
      const el = document.createElement('div')
      el.className = 'file-item'
      el.innerHTML = `<span class="fname">${name}</span><button class="fremove">✕</button>`
      el.querySelector('.fremove').onclick = () => {
        state.uploadFiles.splice(i, 1)
        renderFileList()
      }
      list.appendChild(el)
    })
  }
  const n = state.uploadFiles.length
  $('uploadDo').disabled = n === 0
  $('uploadDo').textContent = n > 0 ? `${t('uploadDo')} (${n})` : t('uploadDo')
}

async function doUpload() {
  const files = state.uploadFiles.slice()
  if (files.length === 0) return
  const dest = $('destInput').value.trim() || '/sdcard/Pictures'
  state.config = await window.api.setConfig({ uploadFolder: dest })
  $('uploadDo').disabled = true
  closeUploadModal()
  switchTab('activity')
  const res = await window.api.pushImages({ serial: state.device, files, dest, lang: state.lang })
  if (res.ok) toast(t('uploadedOk'), dest, 'ok')
  else if (res.done > 0) toast(t('uploadFail'), t('uploadPartial', res.done, res.failed), 'err')
  else toast(t('uploadFail'), t('seeActivity'), 'err')
}

// ---------------------------------------------------------------------------
// Media Manager (app picker)
// ---------------------------------------------------------------------------
async function openMediaManager() {
  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  if (!state.config.mediaManagerPkg) {
    openAppPicker(true)
    return
  }
  const res = await window.api.launch({
    serial: state.device,
    pkg: state.config.mediaManagerPkg,
    lang: state.lang,
  })
  if (res.ok) toast(t('mgrOpened'), state.config.mediaManagerPkg, 'ok')
  else toast(t('errorTitle'), t('seeActivity'), 'err')
}

async function openAppPicker(launchAfter) {
  $('appModal').dataset.launchAfter = launchAfter ? '1' : ''
  $('appFilter').value = ''
  $('appList').innerHTML = `<div class="app-loading">${t('loadingApps')}</div>`
  $('appModal').classList.remove('hidden')
  const pkgs = await window.api.listPackages({ serial: state.device })
  state.allPackages = pkgs
  if (pkgs.length === 0) {
    $('appList').innerHTML = `<div class="app-loading">${t('noApps')}</div>`
    return
  }
  renderAppList()
}

function renderAppList() {
  const filter = $('appFilter').value.toLowerCase()
  const list = $('appList')
  const current = state.config.mediaManagerPkg
  const pkgs = filter
    ? state.allPackages.filter((p) => p.toLowerCase().includes(filter))
    : state.allPackages
  list.innerHTML = ''
  pkgs.slice(0, 400).forEach((pkg) => {
    const el = document.createElement('div')
    el.className = 'app-item' + (pkg === current ? ' current' : '')
    el.textContent = pkg
    el.onclick = () => selectMediaManager(pkg)
    list.appendChild(el)
  })
}

async function selectMediaManager(pkg) {
  state.config = await window.api.setConfig({ mediaManagerPkg: pkg })
  const launchAfter = $('appModal').dataset.launchAfter === '1'
  $('appModal').classList.add('hidden')
  if (launchAfter) openMediaManager()
}

// ---------------------------------------------------------------------------
// Confirm modal — the main process asks, we answer. Every exit path must reply
// or main would wait forever.
// ---------------------------------------------------------------------------
let pendingConfirm = null

function showConfirm(req) {
  pendingConfirm = req
  $('cfIco').textContent = req.type === 'question' ? '❓' : req.type === 'warning' ? '⚠️' : 'ℹ️'
  $('cfTitle').textContent = req.title || ''
  $('cfMessage').textContent = req.message || ''
  $('cfDetail').textContent = req.detail || ''

  const box = $('cfButtons')
  box.innerHTML = ''
  const buttons = req.buttons && req.buttons.length ? req.buttons : ['OK']
  const defaultId = req.defaultId != null ? req.defaultId : 0
  buttons.forEach((label, i) => {
    const b = document.createElement('button')
    b.className = 'btn'
    if (i === defaultId) b.className += req.danger ? ' danger' : ' primary'
    b.textContent = label
    b.onclick = () => replyConfirm(i)
    box.appendChild(b)
  })
  $('confirmModal').classList.remove('hidden')
  const def = box.children[defaultId]
  if (def) def.focus()
}

function replyConfirm(response) {
  if (!pendingConfirm) return
  window.api.confirmReply({ id: pendingConfirm.id, response })
  pendingConfirm = null
  $('confirmModal').classList.add('hidden')
}

function cancelConfirm() {
  if (!pendingConfirm) return
  replyConfirm(pendingConfirm.cancelId != null ? pendingConfirm.cancelId : 0)
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
function switchTab(name) {
  document
    .querySelectorAll('.tab')
    .forEach((tb) => tb.classList.toggle('active', tb.dataset.tab === name))
  $('activityOut').classList.toggle('hidden', name !== 'activity')
  $('logcatOut').classList.toggle('hidden', name !== 'logcat')
  $('activityTools').classList.toggle('hidden', name !== 'activity')
  $('logcatTools').classList.toggle('hidden', name !== 'logcat')
}

// ---------------------------------------------------------------------------
// Logcat
// ---------------------------------------------------------------------------
function escHtml(s) {
  return s.replace(/[&<>]/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'))
}

function levelClass(line) {
  // "-v time" format: "MM-DD HH:MM:SS.mmm E/Tag( 1234): msg"
  const m = line.match(/\s([VDIWEF])\//)
  if (!m) return 'lc-i'
  const L = m[1]
  if (L === 'E' || L === 'F') return 'lc-e'
  if (L === 'W') return 'lc-w'
  if (L === 'D' || L === 'V') return 'lc-d'
  return 'lc-i'
}

function renderLogcat() {
  const filter = $('logcatFilter').value.toLowerCase()
  const out = $('logcatOut')
  let lines = state.logcatBuffer
  if (filter) lines = lines.filter((l) => l.toLowerCase().includes(filter))
  lines = lines.slice(-2000)
  out.innerHTML = lines.map((l) => `<span class="${levelClass(l)}">${escHtml(l)}</span>`).join('\n')
  out.scrollTop = out.scrollHeight
}

function pushLogcatChunk(chunk) {
  state.logcatPartial += chunk
  const parts = state.logcatPartial.split('\n')
  state.logcatPartial = parts.pop() // keep the last, possibly-incomplete line
  for (const line of parts) state.logcatBuffer.push(line.replace(/\r$/, ''))
  if (state.logcatBuffer.length > 5000) state.logcatBuffer = state.logcatBuffer.slice(-3000)
  renderLogcat()
}

async function startLogcat() {
  if (!state.device) {
    toast(t('noDeviceTitle'), t('connectFirst'), 'err')
    return
  }
  state.logcatBuffer = []
  state.logcatPartial = ''
  renderLogcat()
  const res = await window.api.logcatStart({
    serial: state.device,
    pkg: currentPkg(),
    preset: state.logcatPreset,
  })
  if (res.ok) {
    state.logcatRunning = true
    $('logcatToggle').textContent = t('stop')
    switchTab('logcat')
    const label = t('lc' + { game: 'Game', unity: 'Unity', unityErrors: 'UnityErr', errors: 'Errors', all: 'All' }[res.preset])
    if (res.preset === 'game' && res.pid) toast(t('logcatStarted'), t('logcatFiltered', res.pid), 'ok')
    else toast(t('logcatStarted'), label, 'ok')
  } else {
    toast(t('logcatFail'), res.error, 'err')
  }
}

async function toggleLogcat() {
  if (state.logcatRunning) {
    await window.api.logcatStop()
    state.logcatRunning = false
    $('logcatToggle').textContent = t('start')
    return
  }
  startLogcat()
}

async function onPresetChange() {
  state.logcatPreset = $('logcatPreset').value
  if (state.logcatRunning) {
    await window.api.logcatStop()
    await startLogcat()
  }
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
async function checkForUpdate() {
  const r = await window.api.checkUpdate()
  if (!r || !r.available) return
  $('updateText').textContent = t('updateAvailable', r.latest)
  $('updateDownload').textContent = t('updateDownload')
  $('updateDownload').onclick = () => window.api.openExternal(r.url)
  $('updateDismiss').onclick = () => $('updateBanner').classList.add('hidden')
  $('updateBanner').classList.remove('hidden')
}

async function init() {
  initTooltips()
  state.config = await window.api.getConfig()
  state.sortBy = state.config.sortBy || 'date-desc'
  applyLang(state.config.lang || 'es', false)
  updateShotsFolder()
  window.api.getVersion().then((v) => ($('appVersion').textContent = 'v' + v))
  checkForUpdate()
  await loadFolder()
  // no auto-prompt on first run: the empty-state CTA and the pulsing
  // "change folder" button are enough — a picker in your face is obnoxious

  // language
  $('langEs').onclick = () => applyLang('es', true)
  $('langEn').onclick = () => applyLang('en', true)
  $('langPt').onclick = () => applyLang('pt', true)

  // device select
  $('deviceSelect').onchange = (e) => {
    state.device = e.target.value
    updateActionButtons()
    refreshInstalledInfo()
  }
  $('refreshDevices').onclick = async () => onDevicesResult(await window.api.listDevices())

  // folder controls
  $('changeFolder').onclick = chooseBuildsFolder
  $('rescan').onclick = loadFolder
  $('sortBy').value = state.sortBy
  $('sortBy').onchange = async () => {
    state.sortBy = $('sortBy').value
    renderApkList()
    state.config = await window.api.setConfig({ sortBy: state.sortBy })
  }

  // screenshots folder controls
  $('changeShotsFolder').onclick = async () => {
    const folder = await window.api.pickFolder({ kind: 'output', lang: state.lang })
    if (folder) {
      state.config = await window.api.setConfig({ outputFolder: folder })
      updateShotsFolder()
    }
  }
  $('openShotsFolder').onclick = () => {
    if (state.config.outputFolder) window.api.openPath(state.config.outputFolder)
  }

  // upload images
  $('btnUpload').onclick = openUploadModal
  $('uploadClose').onclick = closeUploadModal
  $('uploadCancel').onclick = closeUploadModal
  $('uploadDo').onclick = doUpload
  $('pickImages').onclick = async () => addFiles(await window.api.pickImages({ lang: state.lang }))
  $('uploadModal').addEventListener('click', (e) => {
    if (e.target.id === 'uploadModal') closeUploadModal()
  })

  const dz = $('dropZone')
  ;['dragenter', 'dragover'].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault()
      dz.classList.add('dragover')
    })
  )
  ;['dragleave', 'dragend', 'drop'].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault()
      dz.classList.remove('dragover')
    })
  )
  dz.addEventListener('drop', (e) => {
    const paths = Array.from(e.dataTransfer.files)
      .map((f) => window.api.getPathForFile(f))
      .filter(Boolean)
    addFiles(paths)
  })
  // stop the window from navigating when files are dropped outside the zone,
  // and treat a dropped .apk as "select this build"
  window.addEventListener('dragover', (e) => e.preventDefault())
  window.addEventListener('drop', (e) => {
    e.preventDefault()
    if (!$('uploadModal').classList.contains('hidden')) return // the modal handles its own drops
    const apkFile = Array.from(e.dataTransfer.files).find((f) => /\.apk$/i.test(f.name))
    if (!apkFile) return
    const p = window.api.getPathForFile(apkFile)
    if (p) selectApk({ path: p, name: apkFile.name, size: apkFile.size || 0, mtime: 0 })
  })

  // media manager
  $('btnMediaMgr').onclick = openMediaManager
  $('pickMediaMgr').onclick = () => openAppPicker(false)
  $('appClose').onclick = () => $('appModal').classList.add('hidden')
  $('appFilter').oninput = renderAppList
  $('appModal').addEventListener('click', (e) => {
    if (e.target.id === 'appModal') $('appModal').classList.add('hidden')
  })

  // confirm modal driven by main
  window.api.onConfirmRequest(showConfirm)
  $('confirmModal').addEventListener('click', (e) => {
    if (e.target.id === 'confirmModal') cancelConfirm()
  })

  // Escape closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    if (pendingConfirm) {
      cancelConfirm() // must reply, not just hide
      return
    }
    $('uploadModal').classList.add('hidden')
    $('appModal').classList.add('hidden')
  })

  $('browseApk').onclick = async () => {
    const p = await window.api.pickApk()
    if (p) {
      const name = p.split(/[\\/]/).pop()
      selectApk({ path: p, name, size: 0, mtime: 0 })
    }
  }

  // actions
  $('btnInstall').onclick = doInstall
  $('btnLaunch').onclick = () => doAction(window.api.launch, 'launchedOk')
  $('btnRestart').onclick = () => doAction(window.api.restart, 'restartedOk')
  $('btnUninstall').onclick = () => doAction(window.api.uninstall, 'uninstalledOk', true)
  $('btnClearData').onclick = () => doAction(window.api.clearData, 'resetOk')
  $('btnScreenshot').onclick = doScreenshot
  $('btnRecord').onclick = toggleRecord
  $('btnWireless').onclick = toggleWireless
  $('btnBugReport').onclick = doBugReport
  $('saveLogcat').onclick = saveLogcat

  // tabs
  document.querySelectorAll('.tab').forEach((tb) => (tb.onclick = () => switchTab(tb.dataset.tab)))
  $('clearActivity').onclick = () => ($('activityOut').textContent = '')
  $('clearLogcat').onclick = async () => {
    state.logcatBuffer = []
    state.logcatPartial = ''
    if (state.device) await window.api.logcatClear({ serial: state.device })
    renderLogcat()
  }
  $('logcatToggle').onclick = toggleLogcat
  $('logcatFilter').oninput = renderLogcat
  $('logcatPreset').onchange = onPresetChange

  // push events
  window.api.onDevices(onDevicesResult)
  window.api.onOpLog((text) => activityLog(text))
  window.api.onLogcatLine(pushLogcatChunk)
  window.api.onLogcatEnd(() => {
    state.logcatRunning = false
    $('logcatToggle').textContent = t('start')
  })
  window.api.onRecordDone(onRecordDone)
  window.api.onFolderChanged(loadFolder)
}

init()
