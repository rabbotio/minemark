import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import Runner from './lib/Runner'

// Components
import Stage from './components/Stage'
import Meter from './components/Meter'
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

    this.client = new ClientInfo().getData()

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

    // Meter
    this.meter = new Meter(this.svg)

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
    this.meter.update(this.hps)
  }

  onShareClick = async e => {
    e.target.disabled = true
    const json = await onShare(this.svg)
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
        <Buttonz onClick={e => this.onShareClick(e)}>

          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='16' height='16' style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <g>
              <path d='m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196' fill='#ffffff' />
            </g>
          </svg>

          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            SHARE
          </span>
        </Buttonz>
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}><canvas id='canvas' width='640' height='640' /></div>
      </Containerz>
    )
  }
}

export default App
