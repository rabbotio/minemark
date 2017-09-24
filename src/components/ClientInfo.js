const decorateClient = (draw, ox, oy, client) => {
  // Client
  draw.text({
    x: ox,
    y: (oy = oy + 6 + 64 + 20),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'middle',
    text: `Mining `,
    children: [
      draw.tspan({ fill: '#e67e22', text: `Monero` }),
      draw.tspan(` by `),
      draw.tspan({ fill: '#2ecc71', text: `${client.browser.name} ${client.browser.version}` })
    ]
  })

  // Client
  draw.text({
    x: ox,
    y: (oy = oy + 14 + 3),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'middle',
    text: `on `,
    children: [
      draw.tspan({ fill: '#2ecc71', text: `${client.os.name} ${client.os.version}` }),
      draw.tspan(` with `),
      draw.tspan({ fill: '#2ecc71', text: client.cpu.architecture }),
      draw.tspan(` from `),
      draw.tspan({ fill: '#2ecc71', text: client.device.vendor })
    ]
  })

  return oy
}
export { decorateClient }
