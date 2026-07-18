// Applies build/icon.ico to the built exe (electron-builder is left unsigned to
// avoid the winCodeSign symlink issue, so we set the icon here with rcedit).
// Run automatically as `postdist`.
const path = require('path')
const fs = require('fs')
const _rc = require('rcedit')
const rcedit = typeof _rc === 'function' ? _rc : _rc.rcedit || _rc.default

const ROOT = path.join(__dirname, '..')
const EXE = path.join(ROOT, 'dist', 'win-unpacked', 'Board Toolkit.exe')
const ICON = path.join(ROOT, 'build', 'icon.ico')

async function main() {
  if (!fs.existsSync(EXE)) {
    console.error('exe not found:', EXE)
    process.exit(1)
  }
  await rcedit(EXE, {
    icon: ICON,
    'version-string': {
      ProductName: 'Board Toolkit',
      FileDescription: 'Board Toolkit',
      CompanyName: 'Game Ever',
    },
  })
  console.log('icon applied to', path.basename(EXE))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
