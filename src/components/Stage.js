import SVG from '../lib/svg-jsx'

import { decorateMiniConsole } from './MiniConsole'
import { decorateGimmick } from './Gimmick'
import { decorateClient } from './ClientInfo'
import { decorateRanking } from './Ranking'

const Stage = ({ clientInfo, ranking }) => {
  const hps = '0.000'

  let y = 32
  const height = 380

  // Canvas
  const draw = new SVG('320', `${height}`)

  // Border
  draw.rect({ x: 0, y: 0, width: 320, height, fill: '#FFFFFF' })

  // Console
  decorateMiniConsole(draw, 320 / 2 + 56, 80)

  // Gimmick
  decorateGimmick(draw, 320 / 2, 320 / 2)

  // Dialog
  draw.text({
    x: 320 / 2,
    y: (y = y + 32),
    id: 'hps',
    fontSize: 42,
    fill: '#EA6B66',
    textAnchor: 'end',
    text: hps
  })

  // 'hashes / second'
  draw.text({
    x: 320 / 2,
    y: (y = y + 18),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'end',
    text: 'hashes / second'
  })

  // /
  draw.line({
    x1: 320 / 2 + 6,
    y1: y + 6,
    x2: 320 / 2 + 16,
    y2: y + 16,
    stroke: 'gray'
  })

  // kat
  draw.image({
    x: 320 / 2 + 8,
    y: (y = y + 6),
    width: 64,
    height: 64,
    href: './kat.png'
  })

  y = decorateClient(draw, 320 / 2, y, clientInfo)

  // Ranking
  y = decorateRanking(draw, 320 / 2, (y = y + 20), ranking)

  // Copy
  draw.text({
    x: 320 / 2,
    y: height - 24,
    fontSize: 9,
    fill: 'gray',
    textAnchor: 'middle',
    text: 'COPYRIGHT ❤ RABBOT.IO'
  })

  return draw.jsx()
}

export default Stage
