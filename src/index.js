import React from 'react'
import { render } from 'react-dom'

// apollo imports
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'

import App from './App'
import './index.css'

const GRAPHQL_END_POINT = 'https://api.graph.cool/simple/v1/cj82k7wkh0bqq0177qv1vbb8r'

export const start = () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_END_POINT }),
    cache: new InMemoryCache().restore({})
  })

  const WrappedApp = (
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  )

  render(WrappedApp, document.getElementById('root'))
}

start()
