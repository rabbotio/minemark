import React, { Component } from 'react'

// Library
import is from 'is_js'
import { gql } from 'react-apollo'
import { Buttonz } from '../styles/buttons'

// Material-UI
import TextField from 'material-ui/TextField'

// Theme
import { deepOrange500, blue500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Styles
import styled from 'styled-components'
import { icon_email } from '../styles/icons'

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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

    // TODO : mutation add email, device id, uid
    const { id, uuid } = this.persistanceData
    console.log(id, uuid, email)

    this.props.client.mutate({
      mutation: gql`mutation createUser {
        createUser(
          email: "${email}"
        ) {
          id
        }
      }`
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Formz onSubmit={this.onSubmit}>
          <TextField
            ref='email'
            underlineStyle={{ borderColor: blue500 }}
            floatingLabelText=' Fill email here, I will keep you post.'
            defaultValue='katopz@gmail.com'
          />
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
