const decorateGimmick = (draw, ox, oy, data) => {
  return draw.image({
    x: 0,
    y: oy - 40 - Math.random() * 32,
    width: 24,
    height: 24,
    href: './f1.png'
  })
}
export { decorateGimmick }
