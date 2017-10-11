const decorateMiniConsole = (draw, ox, oy) => {
  return ['Hmm...', '', '', '', ''].map((msg, index) =>
    draw.text({
      x: ox,
      y: oy - index * 9,
      id: `line${index}`,
      text: msg,
      fill: 'gray'
    })
  )
}

export { decorateMiniConsole }
