import React, { Component } from 'react'

// Library
import ClientInfo from './lib/clientInfo'
import SVG from './lib/svg-jsx'

// Components
import CoinHive from './components/CoinHive'
import { decorateGimmick } from './components/Gimmick'
import { decorateClient } from './components/ClientInfo'
import { decorateRanking } from './components/Ranking'

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

let time = 0
class App extends Component {
  constructor (props) {
    super(props)

    this._frameId = null

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

  componentDidMount = () => {
    this.startLoop()
  }

  componentWillUnmount = () => {
    this.stopLoop()
  }

  startLoop = () => {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.loop)
    }
  }

  loop = () => {
    // Move car
    const car = this.svg.querySelector('g image')
    const carX = 2 * time % 320
    const carY = 320 / 2 - 40 - Math.random() * 32
    car.setAttribute('x', carX)

    // Random start Y
    if (carX === 0) car.setAttribute('y', carY)

    // Next
    this.frameId = window.requestAnimationFrame(this.loop)
    ++time
  }

  stopLoop = () => {
    window.cancelAnimationFrame(this._frameId)
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  render () {
    const hps = '32.12'
    const { client } = this

    let y = 32

    // Canvas
    const draw = new SVG('320', '320')

    // Gimmick
    decorateGimmick(draw, 320 / 2, 320 / 2)

    // Dialog
    draw.text({
      x: 320 / 2,
      y: (y = y + 32),
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
      y2: y + 16,
      stroke: 'gray'
    })

    // kat
    draw.image({
      x: 320 / 2 + 8,
      y,
      width: 64,
      height: 64,
      href: './kat.png'
    })

    y = decorateClient(draw, 320 / 2, y, client)

    // Ranking
    y = decorateRanking(draw, 320 / 2, (y = y + 16), [
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
          onInit={() => this.onInit()}
          onAccepted={() => this.onAccepted()}
          onFound={() => this.onFound()}
        />
      </Containerz>
    )
  }
}

export default App
