import React from 'react'
// Styles
import styled from 'styled-components'

const Prez = styled.pre`
color: #ffffff;
text-shadow: -0.5px -0.5px 0.5px #000;
`

const Logo = () => (
  <Prez>{` _____ _           _____         _   
|     |_|_____ ___|     |___ ___| |_ 
| | | | |     | -_| | | | .'|  _| '_|
|_|_|_|_|_|_|_|___|_|_|_|__,|_| |_,_|`}</Prez>
)

export default Logo
