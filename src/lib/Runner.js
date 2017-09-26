class Runner {
  _frameId = null

  constructor (onRun) {
    this.onRun = onRun
  }

  startLoop = () => {
    if (!this._frameId) this._frameId = window.requestAnimationFrame(this.loop)
  }

  loop = () => {
    this.onRun()

    // Next
    this._frameId = window.requestAnimationFrame(this.loop)
  }

  stopLoop = () => window.cancelAnimationFrame(this._frameId)
}

export default Runner
