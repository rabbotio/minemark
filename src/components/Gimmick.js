const decorateGimmick = (draw, ox, oy, data) => {
  draw.rect({ x: 0, y: oy - 50, width: 320, height: 32, fill: '#DEDEDE' })

  return [0, 1, 2].map(index =>
    draw.image({
      x: 0,
      y: 0,
      id: `car${index}`,
      width: 24,
      height: 24,
      href: './f1.png'
    })
  )
}

export { decorateGimmick }
