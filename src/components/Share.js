import canvg from 'canvg-browser'
import '../lib/canvas-blob'

import Facebook from '../lib/Facebook'
import Twitter from '../lib/Twitter'

const FB_APP_ID = '113587919136550'

const onShare = (svg, provider = 'facebook') => {
  // Make 2x picture
  svg.setAttribute('width', 640)
  svg.setAttribute('height', 640)
  svg.setAttribute('transform', `scale(2,2)`)

  // Capture
  const canvas = document.getElementById('canvas')

  // SVG -> Canvas
  canvg(canvas, svg.outerHTML, { scaleWidth: 640, scaleHeight: 640 })

  // Revert to 1x
  svg.setAttribute('width', 320)
  svg.setAttribute('height', 320)
  svg.setAttribute('transform', 'scale(1,1)')

  // Delay a bit to let canvas draw ;(
  setTimeout(
    () =>
      canvas.toBlob(blob => {
        // Share Facebook
        switch (provider) {
          case 'facebook':
            new Facebook().shareBlob(FB_APP_ID, blob)
            break
          case 'twitter':
            new Twitter().shareBlob(blob)
            break
          default:
            console.error('Not implement')
            break
        }
      }),
    100
  )
}

export { onShare }
