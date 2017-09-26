import SVG from '../lib/svg-jsx'

import { decorateMiniConsole } from './MiniConsole'
import { decorateGimmick } from './Gimmick'
import { decorateClient } from './ClientInfo'
import { decorateRanking } from './Ranking'

const Stage = ({ client }) => {
  const hps = '0.000'

  let y = 32

  // Canvas
  const draw = new SVG('320', '320')

  // Border
  draw.rect({ x: 0, y: 0, width: 320, height: 320, fill: '#FFFFFF' })

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

  y = decorateClient(draw, 320 / 2, y, client)

  // Ranking
  y = decorateRanking(draw, 320 / 2, (y = y + 20), [
    {
      min: 21.27,
      max: 32.44,
      thread: 4,
      name: 'Chrome',
      version: '60.0.3112.113'
    },
    {
      min: 19.61,
      max: 24.23,
      thread: 4,
      name: 'Firefox',
      version: '60.0.3112.113'
    },
    {
      min: 15.77,
      max: 18.45,
      thread: 4,
      name: 'Safari',
      version: '60.0.3112.113'
    },
    {
      min: 7.54,
      max: 8.98,
      thread: 4,
      name: 'Edge',
      version: '60.0.3112.113'
    },
    {
      min: 5.54,
      max: 6.98,
      thread: 4,
      name: 'Opera',
      version: '1.2.1'
    }
  ])

  // Copy
  draw.text({
    x: 320 / 2,
    y: 320 - 24,
    fontSize: 9,
    fill: 'gray',
    textAnchor: 'middle',
    text: 'COPYRIGHT 2017 ❤ RABBOT.IO'
  })

  return draw.jsx()
}

export default Stage
