import uuidv4 from 'uuid'
import localforage from 'localforage'

class Collector {
  updateUUID = uuid => {
    this.uuid = uuid || uuidv4()
    localforage.setItem('uuid', this.uuid)
  }

  constructor () {
    localforage.getItem('uuid').then(uuid => this.updateUUID(uuid)).catch(() => this.updateUUID())
  }
}

export default Collector
