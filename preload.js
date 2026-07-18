const { contextBridge, ipcRenderer, webUtils } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // config
  getVersion: () => ipcRenderer.invoke('get-version'),
  checkUpdate: () => ipcRenderer.invoke('check-update'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (partial) => ipcRenderer.invoke('set-config', partial),

  // pickers
  pickFolder: () => ipcRenderer.invoke('pick-folder'),
  pickApk: () => ipcRenderer.invoke('pick-apk'),

  // apks
  scanApks: (folder) => ipcRenderer.invoke('scan-apks', folder),
  readApkInfo: (apkPath) => ipcRenderer.invoke('read-apk-info', apkPath),
  deleteApk: (p) => ipcRenderer.invoke('delete-apk', p),
  installedVersion: (p) => ipcRenderer.invoke('installed-version', p),

  // images / packages
  pickImages: () => ipcRenderer.invoke('pick-images'),
  pushImages: (p) => ipcRenderer.invoke('push-images', p),
  listPackages: (p) => ipcRenderer.invoke('list-packages', p),
  getPathForFile: (file) => webUtils.getPathForFile(file),

  // devices
  listDevices: () => ipcRenderer.invoke('list-devices'),

  // actions
  install: (p) => ipcRenderer.invoke('install', p),
  uninstall: (p) => ipcRenderer.invoke('uninstall', p),
  launch: (p) => ipcRenderer.invoke('launch', p),
  restart: (p) => ipcRenderer.invoke('restart', p),
  clearData: (p) => ipcRenderer.invoke('clear-data', p),
  screenshot: (p) => ipcRenderer.invoke('screenshot', p),
  openPath: (p) => ipcRenderer.invoke('open-path', p),
  saveText: (p) => ipcRenderer.invoke('save-text', p),
  bugReport: (p) => ipcRenderer.invoke('bug-report', p),

  // wireless
  wirelessConnect: (p) => ipcRenderer.invoke('wireless-connect', p),
  wirelessDisconnect: (p) => ipcRenderer.invoke('wireless-disconnect', p),

  // screen recording
  recordStart: (p) => ipcRenderer.invoke('record-start', p),
  recordStop: (p) => ipcRenderer.invoke('record-stop', p),

  // logcat
  logcatStart: (p) => ipcRenderer.invoke('logcat-start', p),
  logcatStop: () => ipcRenderer.invoke('logcat-stop'),
  logcatClear: (p) => ipcRenderer.invoke('logcat-clear', p),

  // push events
  onDevices: (cb) => ipcRenderer.on('devices', (e, d) => cb(d)),
  onOpLog: (cb) => ipcRenderer.on('op-log', (e, d) => cb(d)),
  onLogcatLine: (cb) => ipcRenderer.on('logcat-line', (e, d) => cb(d)),
  onLogcatEnd: (cb) => ipcRenderer.on('logcat-end', () => cb()),
  onRecordDone: (cb) => ipcRenderer.on('record-done', (e, d) => cb(d)),
  onFolderChanged: (cb) => ipcRenderer.on('folder-changed', () => cb()),

  // in-app confirmations asked by the main process
  onConfirmRequest: (cb) => ipcRenderer.on('confirm-request', (e, d) => cb(d)),
  confirmReply: (p) => ipcRenderer.send('confirm-reply', p),
})
