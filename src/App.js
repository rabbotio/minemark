import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'

// Components
import Stage from './components/Stage'
import CoinHive from './components/CoinHive'
import { onShare } from './components/Share'
import { Buttonz } from './styles/buttons'

// Styles
import styled from 'styled-components'

const Containerz = styled.div`
  text-align: center
`
class App extends Component {
  constructor (props) {
    super(props)

    this._frameId = null

    this.client = new ClientInfo().getData()
    this.hps = 0
    this._hps = 0

    this.carSpeeds = [1, 2, 3]
    this.carTargetSpeeds = [3, 2, 1]

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
  onError = err => this.updateConsole(`🔥 Error! ${err}`)

  componentDidMount = () => {
    this.svg = document.getElementById('svg')

    // Console
    this.consoleTexts = ['', '', '', '', '']
    this.consoles = [0, 1, 2, 3, 4].map(index => this.svg.querySelector(`g text#line${index}`))
    this.updateConsole('⚡ Initializing...')

    // Gimmick
    this.cars = [0, 1, 2].map(index => {
      const car = this.svg.querySelector(`g image#car${index}`)
      const carY = this.getRandomCarY(index)
      car.setAttribute('y', carY)
      this.carSpeeds[index] = this.getRandomSpeed()
      this.carTargetSpeeds[index] = this.getRandomSpeed()
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

  getRandomSpeed = () => 2 + 3 * Math.random()
  getRandomCarY = index => 320 / 2 - 36 - 10 * (3 - index) - Math.random() * 6 + Math.random() * 6

  loop = () => {
    // Move car
    this.cars.forEach((car, index) => {
      this.carSpeeds[index] += (this.carTargetSpeeds[index] - this.carSpeeds[index]) / 10
      const _carX = Number(car.getAttribute('x'))
      const carX = _carX + this.carSpeeds[index]
      car.setAttribute('x', carX)

      // Random start Y
      if (carX > 320) {
        car.setAttribute('x', 0)
        const carY = this.getRandomCarY(index)
        car.setAttribute('y', carY)
        this.carTargetSpeeds[index] = this.getRandomSpeed()
      }
    })

    // HPS
    const hps = this.svg.querySelector('g text#hps')
    this._hps += (this.hps - this._hps) / 8
    hps.innerHTML = Number(this._hps).toPrecision(4)

    // Next
    this.frameId = window.requestAnimationFrame(this.loop)
  }

  stopLoop = () => window.cancelAnimationFrame(this._frameId)

  render () {
    return (
      <Containerz>
        <Containerz>
          <Stage client={this.client} />
          <CoinHive
            status={this.state.status}
            siteKey='QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'
            onInit={miner => this.onInit(miner)}
            onFound={() => this.onFound()}
            onAccepted={() => this.onAccepted()}
            onError={err => this.onError(err)}
          />
        </Containerz>
        <Buttonz onClick={() => onShare(this.svg)}>
          SHARE
        </Buttonz>
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}><canvas id='canvas' width='640' height='640' /></div>
      </Containerz>
    )
  }
}

export default App
