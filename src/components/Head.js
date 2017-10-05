import React from 'react'

import { Helmet } from 'react-helmet'

const og = {
  title: 'MineMark',
  description: "MineMark is a mining benchmark to see how's your browser perform against others",
  imageURL: 'https://rabbot.io/minemark/minemark.jpg'
}

const Head = () => (
  <Helmet>
    <meta name='twitter:card' content='summary' />
    <meta property='og:url' content='https://rabbot.io/minemark' />
    <meta property='og:type' content='article' />
    <meta property='og:title' content={og.title} />
    <meta property='og:description' content={og.description} />
    <meta property='og:image' content={og.imageURL} />

    <meta name='twitter:card' content='summary_large_image' />
    <meta property='twitter:title' content={og.title} />
    <meta property='twitter:description' content={og.description} />
    <meta property='twitter:image' content={og.imageURL} />
    <title>MineMark</title>
    <link rel='canonical' href='https://rabbot.io/minemark' />
  </Helmet>
)

export default Head
