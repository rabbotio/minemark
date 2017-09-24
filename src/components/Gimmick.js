const decorateGimmick = (draw, ox, oy, data) => {
  return [0, 1, 2].map(index =>
    draw.image({
      x: 0,
      y: oy - 40 - Math.random() * 32,
      id: `car${index}`,
      width: 24,
      height: 24,
      href: './f1.png'
    })
  )
}
export { decorateGimmick }
