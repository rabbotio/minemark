class Meter {
  currentHPS = 0

  constructor (svg) {
    this.hps = svg.querySelector('g text#hps')
  }

  update = (targetHPS = 0.000) => {
    this.currentHPS += (targetHPS - this.currentHPS) / 8
    this.hps.innerHTML = Number(this.currentHPS).toPrecision(4)
  }
}

export default Meter
