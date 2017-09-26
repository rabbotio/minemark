class Terminal {
  terminalTexts = ['', '', '', '', '']
  terminals = [0, 1, 2, 3, 4]

  constructor (svg) {
    this.terminals = this.terminals.map(index => svg.querySelector(`g text#line${index}`))
  }

  update = text => {
    if (text === this.terminalTexts[0]) return
    this.terminalTexts.unshift(text)
    this.terminalTexts.pop()
    this.terminals.forEach((line, index) => (line.innerHTML = this.terminalTexts[index]))
  }
}

export default Terminal
