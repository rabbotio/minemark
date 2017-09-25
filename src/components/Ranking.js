const colors = {
  chrome: ['#9b59b6', '#8e44ad'],
  firefox: ['#e67e22', '#d35400'],
  edge: ['#3498db', '#2980b9'],
  safari: ['#f1c40f', '#f39c12'],
  any: ['#e74c3c', '#c0392b']
}

const decorateRanking = (draw, ox, oy, data) => {
  const maximum = data.reduce((p, c) => (c > p ? c : p)).max

  let y = oy
  data.forEach((item, index) => {
    const widthMin = 100 * item.min / maximum
    const widthMax = 100 * item.max / maximum
    y = oy + index * 6 * 2
    const fills = colors[item.name.toLowerCase()] || colors.any

    const text = `${item.thread} x ${item.name} ${item.version}`
    draw.rect({ x: ox - widthMax, y, width: widthMax, height: 6, fill: fills[1] })
    draw.rect({ x: ox - widthMin, y, width: widthMin, height: 6, fill: fills[0] })
    draw.text({ x: ox - widthMax - 5 * String(item.max).length, y: y + 6, text: item.max, fill: 'gray' })
    draw.text({ x: ox + 3 + 3 + 3, y: y + 6, text, fill: 'gray' })
  })

  return y
}
export { decorateRanking }
