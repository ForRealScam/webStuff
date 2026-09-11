import fs from 'fs'
import path from 'path'

const dist = 'dist'
const assets = fs.readdirSync(path.join(dist, 'assets'))
const jsFile = assets.find(f => f.endsWith('.js'))
const cssFile = assets.find(f => f.endsWith('.css'))

let js = fs.readFileSync(path.join(dist, 'assets', jsFile), 'utf8')
const css = fs.readFileSync(path.join(dist, 'assets', cssFile), 'utf8')

const b64 = (f) => 'data:video/mp4;base64,' + fs.readFileSync(path.join('.web', f)).toString('base64')
js = js.split('e.src+"#t=0.1"').join('e.src')
js = js.split('videos/Car.mp4').join(b64('car.mp4'))
js = js.split('videos/CarpetWash.mp4').join(b64('carpetwash.mp4'))
js = js.split('videos/DynamicSkillTreeWithProgressionSaving.mp4').join(b64('skilltree.mp4'))
js = js.split('videos/HellDiversBasedSystemWithDynamicCamera.mp4').join(b64('helldivers.mp4'))

const out = `<title>amacow — Roblox scripter</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Space+Mono:wght@400;700&display=swap');
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`
fs.writeFileSync('.web/artifact.html', out)
console.log('bytes', out.length)
