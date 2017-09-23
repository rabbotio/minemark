import React from 'react'

// Styles
import styled from 'styled-components'

const ScrollPanez = styled.div`
font-size: 1.1em;
color: lightgray;
width: 128px;
height: 64px;
overflow: auto;
`
const Pz = styled.p`
line-height: 0;
`

let outputs = []
let currentText = ''
let lineNum = 0

class MiniConsole extends React.Component {
  render () {
    const { text } = this.props
    if (currentText === text) return <ScrollPanez ref={`thing`}>{outputs}</ScrollPanez>
    currentText = text
    outputs.push(<Pz key={++lineNum}>{currentText}</Pz>)

    return <ScrollPanez ref={`thing`} />
  }
}

export default MiniConsole
