const decorateGimmick = (draw, ox, oy, data) => {
  return draw.image({
    x: ox + 80,
    y: oy - 40,
    width: 24,
    height: 24,
    href: './f1.png'
  })
}
export { decorateGimmick }
