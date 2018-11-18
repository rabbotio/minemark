import React, { Component } from 'react'

// Library
import is from 'is_js'
import { gql } from 'react-apollo'
import { Buttonz } from '../styles/buttons'
import { trackEvent, trackException } from '../lib/analytics'

// Material-UI
import TextField from 'material-ui/TextField'

// Theme
import { deepOrange500, blue500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Styles
import styled from 'styled-components'
import { icon_email } from '../styles/icons'

const Formz = styled.form`
  padding-bottom: 10vh;
`

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

class Subscription extends Component {
  constructor (props) {
    super(props)
    this.persistanceData = props.persistanceData
  }

  onSubmit = e => {
    // No real submit
    e.preventDefault()

    const email = this.refs.email.input.value

    // Track
    trackEvent('submit', { email })

    // Guard empty
    if (is.undefined(email) || is.null(email)) {
      alert('Empty email')
      return
    }

    // Guard invalid
    if (is.not.email(email)) {
      alert('Invalid email')
      return
    }

    const { id, uuid } = this.persistanceData
    trackEvent('subscribe.succeed', { id, uuid, email })

    this.props.client
      .mutate({
        mutation: gql`mutation createUser {
        createUser(
          email: "${email}"
        ) {
          id
          email
          emailVerified
        }
      }`
      })
      .then(({ id, email, emailVerified }) => {
        trackEvent('subscribe.succeed', { id, email, emailVerified })
        if (emailVerified) {
          alert(`Thanks! You already subscribe!`)
        } else {
          alert(`Thanks! Please check you email for confirmation!`)
        }
      })
      .catch(err => {
        trackEvent('subscribe.failed', { email, err })
        trackException(err)

        if (err.message === 'GraphQL error: A unique constraint would be violated on User. Details: Field name = email') {
          alert(`Sorry! ${email} has been use.`)
        }
      })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Formz onSubmit={this.onSubmit}>
          <TextField ref='email' underlineStyle={{ borderColor: blue500 }} floatingLabelText=' Fill email here, I will keep you post.' />
          <br />
          <Buttonz type='submit'>
            {icon_email}
            <span>SUBSCRIBE</span>
          </Buttonz>
        </Formz>
      </MuiThemeProvider>
    )
  }
}

export default Subscription
