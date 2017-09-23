import UAParser from 'ua-parser-js'

class Client {
  constructor () {
    this.ua = new UAParser()
  }

  getData = () => {
    const result = this.ua.getResult()

    // Patch
    result.cpu.architecture = this.getCPU(result.cpu.architecture)
    result.device.vendor = this.getCPU(result.device.vendor)

    return result
  }

  getCPU = architecture => {
    return architecture || this.ua.getUA().includes('Intel') ? 'Intel' : 'unknown'
  }

  getVendor = vendor => {
    return vendor || this.ua.getUA().includes('Apple') ? 'Apple' : 'unknown'
  }
}

export default Client
