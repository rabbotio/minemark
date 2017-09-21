import React, { Component } from 'react'
import CoinHive from './components/CoinHive'
import UAParser from 'ua-parser-js'
import Dialog from './components/Dialog'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.ua = new UAParser()
    this.client = this.ua.getResult()
    this.state = {
      status: 'INIT'
    }
  }

  onComponentDidmount = () => {
    this.setState({
      dialog: 'Hi there!'
    })
  }

  getCPU = architecture => {
    return architecture || this.ua.getUA().includes('Intel') ? 'Intel' : 'unknown'
  }

  getVendor = vendor => {
    return vendor || this.ua.getUA().includes('Apple') ? 'Apple' : 'unknown'
  }

  onMining = hps => {
    this.setState({
      dialog: (
        <div>
          <div>
            Currently mining Monero at <b>{` ${Number(hps).toPrecision(4)} `}</b>h/s
          </div>
          <div>
            {`by using ${this.client.browser.name} ${this.client.engine.name} ${this.client.browser.version}`}
          </div>
          <div
          >{`on ${this.client.os.name} ${this.client.os.version} with ${this.getCPU(this.client.cpu.architecture)} from ${this.getVendor(this.client.device.vendor)}`}</div>
        </div>
      )
    })
  }

  onStart = () => {
    console.log('[Start]')
  }

  onStop = () => {
    console.log('[Stop]')
  }

  render () {
    return (
      <div>
        <Dialog text={this.state.dialog} />
        <CoinHive
          status={this.state.status}
          siteKey='QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'
          onInit={miner => setInterval(() => this.onMining(miner.getHashesPerSecond()), 1000)}
          onStart={() => this.onStart()}
          onStop={() => this.onStop()}
        />
      </div>
    )
  }
}

export default App
