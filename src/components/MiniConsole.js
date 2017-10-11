const decorateMiniConsole = (draw, ox, oy) => {
  return ['Hmm...', '', '', '', ''].map(index =>
    draw.text({
      x: ox,
      y: oy - index * 9,
      id: `line${index}`,
      text: index,
      fill: 'gray'
    })
  )
}

export { decorateMiniConsole }
