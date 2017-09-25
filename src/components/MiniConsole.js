const decorateMiniConsole = (draw, ox, oy) => {
  return [0, 1, 2, 3, 4].map(index =>
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
