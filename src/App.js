import React, { Component } from 'react'

// Library
import Client from './lib/Client'

// Components
import CoinHive from './components/CoinHive'
import Dialog from './components/Dialog'
import Presenter from './components/Presenter'
import ClientInfo from './components/ClientInfo'

// Styles
import './App.css'
import styled from 'styled-components'

const MINER_TRYING = 'MINER_TRYING'
const MINER_MINING = 'MINER_MINING'

const H1PS = styled.h1`
font-size: 3.2em;
text-align: center;
color: #EA6B66;
line-height: 0px;
`
const H4PS = styled.p`
font-size: 1.1em;
text-align: center;
color: gray;
line-height: 0px;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.clientData = new Client().getData()

    this.state = {
      dialog: (
        <div>
          <H1PS>{` ${Number(0).toPrecision(4)} `}</H1PS>
          <H4PS>hashed / second</H4PS>
        </div>
      )
    }
  }

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0 }) => {
    this.setState({
      dialog: (
        <div>
          <H1PS>{` ${Number(hashesPerSecond).toPrecision(4)} `}</H1PS>
          <H4PS>hashed / second</H4PS>
        </div>
      )
    })
  }

  onAccepted = () => {
    console.log('[Accepted]')
  }

  onFound = () => {
    console.log('[Found]')
  }

  render () {
    return (
      <div>
        <Dialog text={this.state.dialog} />
        <Presenter tread={this.state.tread} />
        <ClientInfo client={this.clientData} />
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
