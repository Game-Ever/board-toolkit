// Converts resources/board_logo.jpg into build/icon.ico (+ icon.png)
// Run: node scripts/build-icon.js
const path = require('path')
const fs = require('fs')
const Jimp = require('jimp')
const _pti = require('png-to-ico')
const pngToIco = typeof _pti === 'function' ? _pti : _pti.default

const ROOT = path.join(__dirname, '..')
const SRC = path.join(ROOT, 'resources', 'board_logo.jpg')
const OUT_DIR = path.join(ROOT, 'build')

async function main() {
  const img = await Jimp.read(SRC)
  fs.mkdirSync(OUT_DIR, { recursive: true })

  // multiple square sizes so the icon is crisp at every scale
  const sizes = [256, 128, 64, 48, 32, 16]
  const buffers = []
  for (const s of sizes) {
    const c = img.clone().cover(s, s)
    buffers.push(await c.getBufferAsync(Jimp.MIME_PNG))
  }
  const ico = await pngToIco(buffers)
  fs.writeFileSync(path.join(OUT_DIR, 'icon.ico'), ico)

  const png512 = await img.clone().cover(512, 512).getBufferAsync(Jimp.MIME_PNG)
  fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), png512)

  console.log('icon.ico + icon.png written to build/')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
