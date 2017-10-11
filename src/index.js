import React from 'react'
import { render } from 'react-dom'

// apollo imports
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import App from './App'
import './index.css'

const GRAPHQL_END_POINT = 'https://api.graph.cool/simple/v1/cj82k7wkh0bqq0177qv1vbb8r'

export const start = () => {
  const client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: GRAPHQL_END_POINT
    })
  })

  const WrappedApp = (
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  )

  render(WrappedApp, document.getElementById('root'))
}

start()
