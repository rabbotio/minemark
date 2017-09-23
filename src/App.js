import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'

// Components
import CoinHive from './components/CoinHive'
import Dialog from './components/Dialog'
import MiniConsole from './components/MiniConsole'
import Presenter from './components/Presenter'
import ClientInfoView from './components/ClientInfoView'

// Styles
import styled from 'styled-components'

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

    this.clientData = new ClientInfo().getData()

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
    return (
      <div>
        <Dialog text={this.state.dialog} />
        <MiniConsole text={this.state.output} />
        <Presenter tread={this.state.tread} />
        <ClientInfoView client={this.clientData} />
        <CoinHive
          status={this.state.status}
          siteKey='QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK'
          onInit={miner =>
            setInterval(
              () =>
                this.onMining({
                  hashesPerSecond: miner.getHashesPerSecond(),
                  totalHashes: miner.getTotalHashes(),
                  acceptedHashes: miner.getAcceptedHashes()
                }),
              1000
            )}
          onAccepted={() => this.onAccepted()}
          onFound={() => this.onFound()}
        />
      </div>
    )
  }
}

export default App
