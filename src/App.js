import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import SVG from './lib/svg-jsx'

// Components
import CoinHive from './components/CoinHive'
import { decorateMiniConsole } from './components/MiniConsole'
import { decorateGimmick } from './components/Gimmick'
import { decorateClient } from './components/ClientInfo'
import { decorateRanking } from './components/Ranking'

// Styles
import styled from 'styled-components'

const Containerz = styled.div`
  text-align: center
`

let time = 0
class App extends Component {
  constructor (props) {
    super(props)

    this._frameId = null

    this.client = new ClientInfo().getData()
    this.hps = 0
    this._hps = 0

    this.carSpeeds = [1, 2, 3]

    this.state = {
      status: `INIT`
    }
  }

  onInit = miner => {
    setInterval(
      () =>
        miner &&
        this.onMining({
          hashesPerSecond: miner.getHashesPerSecond(),
          totalHashes: miner.getTotalHashes(),
          acceptedHashes: miner.getAcceptedHashes()
        }),
      1000
    )
  }

  updateConsole = text => {
    if (text === this.consoleTexts[0]) return
    this.consoleTexts.unshift(text)
    this.consoleTexts.pop()
    this.consoles.forEach((line, index) => (line.innerHTML = this.consoleTexts[index]))
  }

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0 }) => {
    this.hps = hashesPerSecond
    this.updateConsole(`⛏ Mining...${Number(this.hps).toPrecision(8)}`)
  }

  onFound = () => this.updateConsole('💎 Found!')
  onAccepted = () => this.updateConsole('💵 Accepted!')
  onError = err => this.updateConsole(`❗ Error! ${err}`)

  componentDidMount = () => {
    // Console
    this.consoleTexts = ['', '', '', '', '']
    this.consoles = [0, 1, 2, 3, 4].map(index => this.svg.querySelector(`g text#line${index}`))
    this.updateConsole('⚡ Initializing...')

    // Gimmick
    this.cars = [0, 1, 2].map(index => {
      const car = this.svg.querySelector(`g image#car${index}`)
      const carY = 320 / 2 - 42 - Math.random() * 28
      car.setAttribute('y', carY)
      this.carSpeeds[index] = this.getRandomSpeed()
      return car
    })

    this.startLoop()
  }

  componentWillUnmount = () => this.stopLoop()

  startLoop = () => {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.loop)
    }
  }

  getRandomSpeed = () => 1 + 3 * Math.random()

  loop = () => {
    // Move car
    this.cars.forEach((car, index) => {
      const carX = 1.1 * (this.carSpeeds[index] * time % 320)
      const carY = 320 / 2 - 42 - Math.random() * 28
      car.setAttribute('x', carX)

      // Random start Y
      if (carX > 320 * 1.1) {
        console.log(index)
        car.setAttribute('y', carY)
        this.carSpeeds[index] = this.getRandomSpeed()
      }
    })

    // HPS
    const hps = this.svg.querySelector('g text#hps')
    // console.log(this.hps)
    this._hps += (this.hps - this._hps) / 8
    hps.innerHTML = Number(this._hps).toPrecision(4)

    // Next
    this.frameId = window.requestAnimationFrame(this.loop)
    ++time
  }

  stopLoop = () => window.cancelAnimationFrame(this._frameId)

  render () {
    const hps = '0.000'
    const { client } = this

    let y = 32

    // Canvas
    const draw = new SVG('320', '320')

    // Border
    draw.rect({ x: 0, y: 0, width: 320, height: 320, fill: '#EFEFEF' })

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
      fill: 'lightgray',
      textAnchor: 'middle',
      text: 'COPYRIGHT 2017 ❤ RABBOT.IO'
    })

    return (
      <Containerz>
        {draw.jsx(this)}
        <CoinHive
          status={this.state.status}
          siteKey='QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'
          onInit={miner => this.onInit(miner)}
          onFound={() => this.onFound()}
          onAccepted={() => this.onAccepted()}
          onError={err => this.onError(err)}
        />
      </Containerz>
    )
  }
}

export default App
