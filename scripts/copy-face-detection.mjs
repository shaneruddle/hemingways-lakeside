// Copies the MediaPipe face-detection wasm/model files into public/ so the Admin
// party-photo blur runs from our own hosting (no CDN, no version drift).
// Runs automatically before `vite build` (see package.json "prebuild").
import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const src = 'node_modules/@mediapipe/face_detection'
const dest = 'public/face-detection'
mkdirSync(dest, { recursive: true })
for (const f of readdirSync(src)) {
  if (f.startsWith('face_detection') && f !== 'face_detection.js') cpSync(join(src, f), join(dest, f))
}
console.log(`face-detection assets copied to ${dest}`)
