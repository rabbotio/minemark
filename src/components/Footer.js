import React from 'react'

// Styles
import styled from 'styled-components'

const Divz = styled.div`
ul {
  list-style: none;
  padding: 0;
}

ul  li{
  display: inline;
}
`

const facebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.URL)}&t=${encodeURIComponent(document.URL)}`)
}

const twitter = () => {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}:%20${encodeURIComponent(document.URL)})`)
}

const google = () => {
  window.open(`https://plus.google.com/share?url=${encodeURIComponent(document.URL)}`)
}

const pocket = () => {
  window.open(`https://getpocket.com/save?url=${encodeURIComponent(document.URL)}&title=${encodeURIComponent(document.title)})`)
}

const reddit = () => window.open(`http://www.reddit.com/submit?url=${encodeURIComponent(document.URL)}&title=${encodeURIComponent(document.title)})`)

const Footer = () => (
  <Divz>
    <ul>
      <li>
        <a
          href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frabbot.io%2Fminemark&t='
          title='Share on Facebook'
          target='_blank'
          rel='noopener noreferrer'
          onClick={facebook}
        >
          <img alt='Share on Facebook' src='images/facebook.png' />
        </a>
      </li>
      <li>
        <a
          href='https://twitter.com/intent/tweet?source=https%3A%2F%2Frabbot.io%2Fminemark&text=:%20https%3A%2F%2Frabbot.io%2Fminemark'
          target='_blank'
          title='Tweet'
          rel='noopener noreferrer'
          onClick={twitter}
        >
          <img alt='Tweet' src='images/twitter.png' />
        </a>
      </li>
      <li>
        <a
          href='https://plus.google.com/share?url=https%3A%2F%2Frabbot.io%2Fminemark'
          target='_blank'
          title='Share on Google+'
          rel='noopener noreferrer'
          onClick={google}
        >
          <img alt='Share on Google+' src='images/google.png' />
        </a>
      </li>
      <li>
        <a
          href='https://getpocket.com/save?url=https%3A%2F%2Frabbot.io%2Fminemark&title='
          target='_blank'
          title='Add to Pocket'
          rel='noopener noreferrer'
          onClick={pocket}
        >
          <img alt='Add to Pocket' src='images/pocket.png' />
        </a>
      </li>
      <li>
        <a
          href='http://www.reddit.com/submit?url=https%3A%2F%2Frabbot.io%2Fminemark&title='
          target='_blank'
          title='Submit to Reddit'
          rel='noopener noreferrer'
          onClick={reddit}
        >
          <img alt='Submit to Reddit' src='images/reddit.png' />
        </a>
      </li>
    </ul>
  </Divz>
)

export default Footer
