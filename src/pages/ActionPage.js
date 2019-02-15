import React, { Component } from 'react'

// Library
import is from 'is_js'
import gql from 'graphql-tag'
import { trackScreen, trackEvent, trackException } from '../lib/analytics'

import { Buttonz } from '../styles/buttons'

// Styles
import styled from 'styled-components'

const Containerz = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  text-align: center;
  padding-top: 25vh;
`
const Imagez = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
`

class ActionPage extends Component {
  constructor (props) {
    super(props)

    const { search } = this.props

    // Track
    trackScreen(search.action)

    // Default status
    let status = 'EMPTY_QUERY'

    if (search.action === 'verify') {
      status = 'VERIFY'
      this.verify(search.id)
    }

    this.state = { status }
  }

  verify = id => {
    console.log('verify:', id)

    // Guard empty
    if (is.undefined(id) || is.null(id)) {
      return
    }

    // Track
    trackEvent('verify', { id })

    // Mark as verify
    this.props.client
      .mutate({
        mutation: gql`mutation {
        updateUser(
          id: "${id}",
          emailVerified: true
        ) {
          emailVerified
        }
      }`
      })
      .then(({ emailVerified }) => {
        trackEvent('verified.succeed', { id })
        this.setState({ status: 'VERIFIED' })
      })
      .catch(err => {
        trackEvent('verify.failed', { id, err })
        trackException(err)
        this.setState({ status: 'NOT_VERIFIED' })
      })
  }

  onClickHome = e => {
    trackEvent('go', { page: window.location.origin })
    window.location.href = window.location.origin + window.location.pathname
  }

  render () {
    return (
      <Containerz>
        {
          {
            EMPTY_QUERY: <div>Something gone wrong!?</div>,
            VERIFY: <div>Subscribing, Please wait...</div>,
            VERIFIED: <div>You has been subscribe to our mailing list! Thanks!</div>,
            NOT_VERIFIED: <div>Something gone wrong! Please try again later.</div>
          }[this.state.status]
        }
        <p style={{ color: '#999999' }}> /</p>
        <Imagez src='./kat.png' />
        <br />
        <Buttonz onClick={this.onClickHome}>
          <span>GO HOME</span>
        </Buttonz>
      </Containerz>
    )
  }
}

export default ActionPage
