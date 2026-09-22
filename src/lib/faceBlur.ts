// Client-side face blurring for party photos.
//
// Runs entirely in the browser (Admin only): the original file never leaves the
// device — only the blurred, resized JPEG is uploaded to Storage. Detection uses
// MediaPipe's BlazeFace short-range model, loaded lazily from the MediaPipe CDN
// the first time it is needed.
//
// Every detected face is blurred by default; the admin can un-blur individual
// faces (adults, the birthday child if the parents said yes) before upload.

import type { FaceDetection as FaceDetectionType, Results } from '@mediapipe/face_detection'

export interface FaceBox {
  x: number
  y: number
  w: number
  h: number
  /** Whether to blur this face in the output. Defaults to true. */
  blur: boolean
}

export interface PreparedPhoto {
  file: File
  /** Downscaled source bitmap used for detection and rendering. */
  bitmap: ImageBitmap
  width: number
  height: number
  faces: FaceBox[]
}

const MAX_EDGE = 1600
// Model + wasm are served from our own hosting (public/face-detection, copied from
// @mediapipe/face_detection) so there is no CDN dependency or version mismatch.
const ASSET_BASE = '/face-detection'

let detectorPromise: Promise<FaceDetectionType> | null = null
let pendingResolve: ((r: Results) => void) | null = null
// The legacy solution API is callback-based and not re-entrant: serialise detections.
let queue: Promise<unknown> = Promise.resolve()

async function getDetector(): Promise<FaceDetectionType> {
  if (!detectorPromise) {
    detectorPromise = (async () => {
      const { FaceDetection } = await import('@mediapipe/face_detection')
      const fd = new FaceDetection({ locateFile: (f: string) => `${ASSET_BASE}/${f}` })
      // 'full' = full-range model: better for group shots where faces are small.
      fd.setOptions({ model: 'full', minDetectionConfidence: 0.3, selfieMode: false })
      fd.onResults((r: Results) => { pendingResolve?.(r); pendingResolve = null })
      await fd.initialize()
      return fd
    })().catch(err => { detectorPromise = null; throw err })
  }
  return detectorPromise
}

function detect(bitmap: ImageBitmap): Promise<Results> {
  const run = async () => {
    const fd = await getDetector()
    // The legacy solution wants an HTMLImageElement/Canvas/Video, not an ImageBitmap.
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
    return new Promise<Results>((resolve, reject) => {
      pendingResolve = resolve
      fd.send({ image: canvas }).catch(reject)
    })
  }
  const p = queue.then(run, run)
  queue = p.catch(() => {})
  return p
}

/** Decode + downscale a file, then detect faces. */
export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  const full = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions)
  const scale = Math.min(1, MAX_EDGE / Math.max(full.width, full.height))
  const width = Math.round(full.width * scale)
  const height = Math.round(full.height * scale)

  let bitmap = full
  if (scale < 1) {
    const c = document.createElement('canvas')
    c.width = width
    c.height = height
    c.getContext('2d')!.drawImage(full, 0, 0, width, height)
    bitmap = await createImageBitmap(c)
    full.close()
  }

  // Pass 1: whole frame. Pass 2: 2x2 overlapping tiles rendered at 2x so small faces in
  // group shots (the common party photo) are big enough for the detector. Merge with NMS.
  const found: FaceBox[] = []
  const toBoxes = (r: Results, ox: number, oy: number, sw: number, sh: number) =>
    (r.detections || []).forEach(d => {
      const b = d.boundingBox // normalised centre + size within the sent image
      const w = b.width * sw
      const h = b.height * sh
      found.push({ x: ox + b.xCenter * sw - w / 2, y: oy + b.yCenter * sh - h / 2, w, h, blur: true })
    })

  toBoxes(await detect(bitmap), 0, 0, width, height)

  const tw = Math.round(width * 0.6)
  const th = Math.round(height * 0.6)
  for (const [ox, oy] of [[0, 0], [width - tw, 0], [0, height - th], [width - tw, height - th]] as const) {
    const c = document.createElement('canvas')
    c.width = tw * 2
    c.height = th * 2
    c.getContext('2d')!.drawImage(bitmap, ox, oy, tw, th, 0, 0, tw * 2, th * 2)
    const tile = await createImageBitmap(c)
    toBoxes(await detect(tile), ox, oy, tw, th)
    tile.close()
  }

  const faces = dedupe(found)

  return { file, bitmap, width, height, faces }
}

function iou(a: FaceBox, b: FaceBox) {
  const x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y)
  const x2 = Math.min(a.x + a.w, b.x + b.w), y2 = Math.min(a.y + a.h, b.y + b.h)
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1)
  return inter / (a.w * a.h + b.w * b.h - inter)
}

function dedupe(boxes: FaceBox[]): FaceBox[] {
  const out: FaceBox[] = []
  for (const b of boxes.sort((p, q) => q.w * q.h - p.w * p.h)) {
    if (!out.some(o => iou(o, b) > 0.3)) out.push(b)
  }
  return out
}

/** Render the photo with the selected faces blurred. Returns the canvas (for preview) — call toBlob() for upload. */
export function renderBlurred(photo: PreparedPhoto): HTMLCanvasElement {
  const { bitmap, width, height, faces } = photo
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)

  for (const f of faces) {
    if (!f.blur) continue
    // Pad the box: the detector's box is tight around eyes-to-chin; we want hair + neck too.
    const padX = f.w * 0.35
    const padY = f.h * 0.5
    const x = Math.max(0, f.x - padX)
    const y = Math.max(0, f.y - padY)
    const w = Math.min(width - x, f.w + padX * 2)
    const h = Math.min(height - y, f.h + padY * 2)
    const radius = Math.max(12, Math.round(Math.max(w, h) / 6))

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
    ctx.clip()
    ctx.filter = `blur(${radius}px)`
    // Draw a slightly larger region so the blur has pixels to sample at the edges.
    ctx.drawImage(bitmap, x - radius, y - radius, w + radius * 2, h + radius * 2, x - radius, y - radius, w + radius * 2, h + radius * 2)
    ctx.restore()
  }
  return canvas
}

export function canvasToJpeg(canvas: HTMLCanvasElement, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', quality)
  })
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9฀-๿]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}
