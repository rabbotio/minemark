import React from 'react'

import { Helmet } from 'react-helmet'

const Head = () => (
  <Helmet>
    <meta property='og:url' content='https://rabbot.io/minemark' />
    <meta property='og:type' content='article' />
    <meta property='og:title' content='Mine Mark' />
    <meta property='og:description' content='Mining Benchmark' />
    <meta property='og:image' content='https://rabbot.io/minemark/minemark.jpg' />
    <title>MineMark</title>
    <link rel='canonical' href='https://rabbot.io/minemark' />
  </Helmet>
)

export default Head
