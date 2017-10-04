import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import Runner from './lib/Runner'

// Services
import Model from './model'
import { getDeviceRanking, collect } from './model/Ranking'

// Components
import Head from './components/Head'
import Stage from './components/Stage'
import Meter from './components/Meter'
import Terminal from './components/Terminal'
import Cars from './components/Cars'
import CoinHive from './components/CoinHive'
// TODO // import { onShare } from './components/Share'
import { Buttonz } from './styles/buttons'
import { icon_facebook } from './styles/icons'
import Footer from './components/Footer'

// Styles
import styled from 'styled-components'

const Containerz = styled.div`
  text-align: center
`
const ShadowContainerz = styled.div`
width: fit-content;
display: inline-block;

svg {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
`
const COIN_HIVE_SITE_KEY = 'QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'

class App extends Component {
  constructor (props) {
    super(props)

    this.clientInfo = new ClientInfo().getData()
    this.model = new Model()

    // Ranking
    const ranking = [
      {
        min: 21.27,
        max: 32.44,
        thread: 4,
        browserName: 'Chrome',
        browserVersion: '60.0.3112.113'
      },
      {
        min: 19.61,
        max: 24.23,
        thread: 4,
        browserName: 'Firefox',
        browserVersion: '60.0.3112.113'
      },
      {
        min: 15.77,
        max: 18.45,
        thread: 4,
        browserName: 'Safari',
        browserVersion: '60.0.3112.113'
      },
      {
        min: 7.54,
        max: 8.98,
        thread: 4,
        browserName: 'Edge',
        browserVersion: '60.0.3112.113'
      },
      {
        min: 5.54,
        max: 6.98,
        thread: 4,
        browserName: 'Opera',
        browserVersion: '1.2.1'
      }
    ]

    this.state = {
      status: `INIT`,
      ranking
    }
  }

  onInit = async miner => {
    // Get old data
    this.persistanceData = await this.model.getData()

    // Register
    await collect(this.props.client, this.clientInfo, this.persistanceData, 0, 0).then(result => {
      if (!result) return

      const { id } = result.data.createDevice
      this.model.setId(id)
      this.persistanceData.id = id
    })

    // Mining
    setInterval(
      () =>
        miner &&
        this.onMining({
          hashesPerSecond: miner.getHashesPerSecond(),
          totalHashes: miner.getTotalHashes(),
          acceptedHashes: miner.getAcceptedHashes(),
          thread: miner.getNumThreads()
        }),
      1000
    )
  }

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0, thread = 0 }) => {
    this.hps = hashesPerSecond

    // Terminal
    this.terminal.update(`⛏ Mining...${Number(this.hps).toPrecision(8)}`)

    if (!this.persistanceData.id) return

    // Upsert result?
    collect(this.props.client, this.clientInfo, this.persistanceData, this.hps, thread).then(result => {
      if (!result) return
    })
  }

  onFound = () => this.terminal.update('💎 Found!')
  onAccepted = () => this.terminal.update('💵 Accepted!')
  onError = err => this.terminal.update(`🔥 Error! ${err}`)

  componentDidMount = async () => {
    // SVG
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

    // Pull new data
    const ranking = await getDeviceRanking(this.props.client)
    this.setState({ ranking })
  }

  componentWillUnmount = () => this.runner.stopLoop()

  onRun = () => {
    // Move car
    this.cars.update()

    // HPS
    this.meter.update(this.hps)
  }

  onShareClick = e => {
    console.log(e.target)
    // TODO : const json = await onShare(this.svg)
  }

  render () {
    return (
      <div>
        <Head />
        <Containerz>
          <ShadowContainerz>
            <Stage clientInfo={this.clientInfo} ranking={this.state.ranking} />
          </ShadowContainerz>
          <CoinHive
            status={this.state.status}
            siteKey={COIN_HIVE_SITE_KEY}
            onInit={miner => this.onInit(miner)}
            onFound={() => this.onFound()}
            onAccepted={() => this.onAccepted()}
            onError={err => this.onError(err)}
          />
          <Buttonz onClick={e => this.onShareClick(e)}>
            {icon_facebook}
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>SHARE</span>
          </Buttonz>
          <div style={{ width: 0, height: 0, overflow: 'hidden' }}><canvas id='canvas' width='640' height='640' /></div>
          <Footer />
        </Containerz>
      </div>
    )
  }
}

export default App
