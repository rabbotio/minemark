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

    const dialogs = [
      {
        delay: 1,
        text: () => `Hi there!`
      },
      {
        delay: 2,
        text: () =>
          `It seem like you're using ${this.client.browser.name} ${this.client.engine.name} ${this.client.browser.version}
        on ${this.client.os.name} ${this.client.os.version}
        with ${this.getCPU(this.client.cpu.architecture)} CPU from ${this.getVendor(this.client.device.vendor)}`
      }
    ]

    // Dialogs
    this.getCurrentDialog = () => dialogs[0].text()
    this.hasNextDialog = () => dialogs.length > 1
    this.nextDialog = () => (this.hasNextDialog() ? dialogs.shift() && this.getCurrentDialog() : <div />)
  }

  onComponentDidmount = () => {
    // First dialog
    this.setState({
      dialog: this.getCurrentDialog()
    })

    // Play scripts
    const ref = setInterval(() => {
      if (!this.hasNextDialog()) {
        clearInterval(ref)
        this.setState({
          status: 'START'
        })
        return
      }

      this.setState({
        dialog: this.nextDialog()
      })
    }, 1000)
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
            You can mine Monero<b>{` ${Number(hps).toPrecision(4)} `}</b>hashes/s
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
