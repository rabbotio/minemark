import UAParser from 'ua-parser-js'

class clientInfo {
  constructor () {
    this.ua = new UAParser()
  }

  getData = () => {
    const result = this.ua.getResult()

    // Patch
    result.cpu.architecture = this.getCPU(result.cpu.architecture)
    result.device.vendor = this.getVendor(result.device.vendor)

    return result
  }

  maybeIntel = () => {
    try {
      return this.ua.getUA().includes('Intel') ? 'Intel' : 'unknown'
    } catch (err) {
      return 'unknown'
    }
  }

  maybeApple = () => {
    try {
      return this.ua.getUA().includes('Apple') ? 'Apple' : 'unknown'
    } catch (err) {
      return 'unknown'
    }
  }

  getCPU = architecture => architecture || this.maybeIntel()
  getVendor = vendor => vendor || this.maybeApple()
}

export default clientInfo
