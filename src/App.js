import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import SVG from './lib/svg-jsx'

// Components
import CoinHive from './components/CoinHive'
import Dialog from './components/Dialog'
import MiniConsole from './components/MiniConsole'
import Presenter from './components/Presenter'
import ClientInfoView from './components/ClientInfoView'

// Styles
import styled from 'styled-components'

const Containerz = styled.div`
  text-align: center
`
const H1Pz = styled.h1`
font-size: 3.2em;
text-align: center;
color: #EA6B66;
line-height: 0px;
`
const H4Pz = styled.p`
font-size: 1.1em;
text-align: center;
color: gray;
line-height: 0px;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.client = new ClientInfo().getData()

    this.state = {
      dialog: (
        <div>
          <H1Pz>{` ${Number(0).toPrecision(4)} `}</H1Pz>
          <H4Pz>hashed / second</H4Pz>
        </div>
      ),
      output: 'Initializing...'
    }
  }

  onInit = miner =>
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

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0 }) => {
    this.setState({
      dialog: (
        <div>
          <H1Pz>{` ${Number(hashesPerSecond).toPrecision(4)} `}</H1Pz>
          <H4Pz>hashed / second</H4Pz>
        </div>
      )
    })
  }

  onAccepted = () => {
    console.log('[Accepted]')
    this.setState({
      output: 'Accepted'
    })
  }

  onFound = () => {
    console.log('[Found]')
    this.setState({
      output: 'Found'
    })
  }

  render () {
    const hps = '32.12'
    const tspanWithFill = text => <tspan fill='#2ecc71'>{text}</tspan>
    const { client } = this

    let y = 100

    // Canvas
    const draw = new SVG('320', '320')

    // Dialog
    draw.text({
      x: 320 / 2,
      y,
      fontSize: 42,
      fill: '#EA6B66',
      textAnchor: 'end',
      text: hps
    })

    // 'hashes / second'
    draw.text({
      x: 320 / 2,
      y: (y = y + 20),
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
      y2: 120 + 16,
      stroke: 'gray'
    })

    // image
    draw.image({
      x: 320 / 2 + 8,
      y,
      width: 64,
      height: 64,
      href: './kat.png'
    })

    // Client
    draw.text({
      x: 320 / 2,
      y: (y = y + 6 + 64 + 20),
      fontSize: 14,
      fill: 'gray',
      textAnchor: 'middle',
      text: `Mining `,
      children: [
        draw.tspan({ fill: '#e67e22', text: `Monero` }),
        draw.tspan(` by `),
        draw.tspan({ fill: '#2ecc71', text: `${client.browser.name} ${client.browser.version}` })
      ]
    })

    // Client
    draw.text({
      x: 320 / 2,
      y: (y = y + 14 + 3),
      fontSize: 14,
      fill: 'gray',
      textAnchor: 'middle',
      text: `on `,
      children: [
        draw.tspan({ fill: '#2ecc71', text: `${client.os.name} ${client.os.version}` }),
        draw.tspan(` with `),
        draw.tspan({ fill: '#2ecc71', text: client.cpu.architecture }),
        draw.tspan(` from `),
        draw.tspan({ fill: '#2ecc71', text: client.device.vendor })
      ]
    })

    return (
      <Containerz>
        {draw.jsx()}
        <CoinHive
          status={this.state.status}
          siteKey='QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'
          onInit={() => this.onInit()}
          onAccepted={() => this.onAccepted()}
          onFound={() => this.onFound()}
        />
      </Containerz>
    )
  }
}

export default App
