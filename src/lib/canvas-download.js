import canvg from 'canvg-browser'
import '../lib/canvas-blob'

const toBlob = svg =>
  new Promise((resolve, reject) => {
    try {
      // Make 2x picture
      svg.setAttribute('width', 640)
      svg.setAttribute('height', 640)
      // svg.setAttribute('transform', `scale(2,2)`)

      // Capture
      const canvas = document.getElementById('canvas')

      // SVG -> Canvas
      canvg(canvas, svg.outerHTML, { scaleWidth: 640, scaleHeight: 640 })

      // Revert to 1x
      svg.setAttribute('width', 320)
      svg.setAttribute('height', 320)
      // svg.setAttribute('transform', 'scale(1,1)')

      // Delay a bit to let canvas draw ;(
      setTimeout(() => canvas.toBlob(blob => resolve(blob)), 200)
    } catch (err) {
      reject(err)
    }
  })

const downloadPNG = async (svg, fileName = 'download.png') => {
  const blob = await toBlob(svg)
  const a = document.createElement('a')
  // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
  // a.href = dataURL.replace('image/jpeg', 'image/octet-stream')
  a.download = fileName
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.click()
  window.URL.revokeObjectURL(url)
}

export { downloadPNG }
